global.navigator = {
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
};

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// src="https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/rc/acrawler.js"
// src="https://s3.pstatp.com/inapp/lib/raven.js"
// crossorigin="anonymous"
var doc = `<!DOCTYPE html>
  <html>
    <head>
    <script
        src="file:///home/pluto/data/NodeMail/raven.js"
        crossorigin="anonymous"
      ></script>
      <script src="file:///home/pluto/data/NodeMail/acrawler.js">
      </script>
    </head>
    <body>
    <script>
    byted_acrawler.init({
      aid: 1575, // appid，必填
      dfp: true, // 是否卡其设备指纹模块，海外应用请勿开启！！！
      boe: false,
      intercept: true, // 开启拦截器后，所有符合下面列表条件的 url 都会自动加上 _signature 参数
      // SDK 会拦截所有使用 XMLHTTPRequest 发送的请求，包括第三方库发出的，所以请严格设置 enablePathList
      enablePathList: [
        '/aweme/v1/*'
      ]
    })
    </script>
    </body>
  </html>
  `;

var window = new JSDOM(doc, { resources: "usable", runScripts: "dangerously" })
  .window;
global.document = window.document;

const generateSignature = function(params) {
  var tac = params[1];
  eval(`tac='${tac}'`);

  if (!window.byted_acrawler) {
    console.log("error: acrawler not ready");
    return;
  }

  let signature = window.byted_acrawler.sign(params[0]);
  // console.log(params[0].url + "&_signature=" + signature);
  return signature;
};
// let url =
// "https://e.douyin.com/aweme/v1/bluev/item/comment/list?id=6795434675335728387&anchor=0&count=10";
// let para = [
//   {
//     url: url
//   },
//   'i+2gv0uuewjods!i#842s"yZl!%s"l"u&kLs#l l#vr*charCodeAtx0[!cb^i$1em7b*0d#>>>s j\uffeel  s#'
// ];

// generateSignature(para);

module.exports = {
  generateSignature2: generateSignature
};
