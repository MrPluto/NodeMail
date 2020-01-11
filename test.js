const express = require("express");
const app = express();
const nodemailer = require("nodemailer"); //发送邮件的node插件
const ejs = require("ejs"); //ejs模版引擎
const fs = require("fs"); //文件读写
const path = require("path"); //路径配置
const config = require("./warnConfig");
const { EmailService, EmailAuth, EmailFrom, EmailTo, EmailSubject } = config;
const DY = require("./dySign");
const { generateSignature } = DY;

// 发动邮件
function sendMail(message, useragent) {
  let HtmlData = {
    message,
    date: new Date().toString(),
    useragent
  };
  const template = ejs.compile(
    fs.readFileSync(path.resolve(__dirname, "warnning.ejs"), "utf8")
  );
  const html = template(HtmlData);

  let transporter = nodemailer.createTransport({
    service: EmailService,
    port: 465,
    secureConnection: true,
    auth: EmailAuth
  });

  let mailOptions = {
    from: EmailFrom,
    to: EmailTo,
    subject: EmailSubject,
    html: html
  };
  transporter.sendMail(mailOptions, (error, info = {}) => {
    if (error) {
      console.log(error);
      sendMail(HtmlData); //再次发送
    }
    console.log("邮件发送成功", info.messageId);
  });
}

app.get("/report", (req, res) => {
  console.log(req.query);
  let query = req.query;
  var message = query.message;
  var useragent = query.useragent;
  if (!message) {
    return;
  }
  sendMail(message, useragent);
  res.send("请求成功");
});

app.get("/dysign", (req, res) => {
  let query = req.query;
  var url = query.url;
  var tac = query.tac;
  console.log(tac);
  console.log(url);

  // if (!url || !tac) {
  //   res.json({
  //     code: -1,
  //     message: "缺少url或者tac"
  //   });
  //   return;
  // }
  // tac =
  //   'i+2gv0xzhi6rqs!i#fz6s"yZl!%s"l"u&kLs#l l#vr*charCodeAtx0[!cb^i$1em7b*0d#>>>s j￮l  s#';
  let p = {
    url,
    bodyVal2str: false
  };
  let signature = generateSignature(p, tac);
  res.json({
    code: 200,
    data: {
      signature,
      url
    }
  });
});

app.listen(3888, () => console.log("Example app listening on port 3888!"));
