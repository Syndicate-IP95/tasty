"use strict";

exports.getAll = (req, res) => {
  let body = "";
  req.on("data", (buffer) => {
    body += buffer.toString();
  });

  req.on("end", async () => {
    console.log(1);
  });
};
