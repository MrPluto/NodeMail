const express = require("express");
const app = express();
const DY = require("./dySign");
const DY2 = require("./dySign2");

const { generateSignature } = DY;
const { generateSignature2 } = DY2;

app.get("/dysign", (req, res) => {
  let query = req.query;
  var url = query.url;
  var tac = query.tac;
  console.log(tac);
  console.log(url);

  if (!url || !tac) {
    res.json({
      code: -1,
      message: "缺少url或者tac"
    });
    return;
  }
  // tac =
  //   'i+2gv0xzhi6rqs!i#fz6s"yZl!%s"l"u&kLs#l l#vr*charCodeAtx0[!cb^i$1em7b*0d#>>>s j￮l  s#';
  let p = {
    url,
    bodyVal2str: false
  };
  let signature = generateSignature([p, tac]);
  res.json({
    code: 200,
    data: {
      signature,
      url
    }
  });
});
app.get("/dysign2", (req, res) => {
  let query = req.query;
  var url = query.url;
  var tac = query.tac;
  console.log(tac);
  console.log(url);

  if (!url || !tac) {
    res.json({
      code: -1,
      message: "缺少url或者tac"
    });
    return;
  }
  // tac =
  //   'i+2gv0xzhi6rqs!i#fz6s"yZl!%s"l"u&kLs#l l#vr*charCodeAtx0[!cb^i$1em7b*0d#>>>s j￮l  s#';
  let p = {
    url,
    bodyVal2str: false
  };
  let signature = generateSignature2([p, tac]);
  res.json({
    code: 200,
    data: {
      signature,
      url
    }
  });
});

app.listen(3888, () => console.log("Example app listening on port 3888!"));
