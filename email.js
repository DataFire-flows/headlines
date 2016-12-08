"use strict";

let makeEmail = module.exports = (to, from, subject, body) => {
   let message = `

From: <${from}>
To: <${to}>
Subject: ${subject}
Date: ${new Date().toString()}
Content-Type: text/html; charset=utf-8

<html>
  <body>
${body}
  </body>
</html>

  `;

  return encodeMessage(message.trim());
}

let encodeMessage = (message) => {
  message = new Buffer(message).toString('base64');
  return message.replace(/\//g,'_').replace(/\+/g,'-');
}

