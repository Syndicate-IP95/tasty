"use strict";

const { uploadFileToAWS } = require("../../utils/uploadFileToAWS");

exports.getAll = (req, res) => {
  let body = "";
  req.on("data", (buffer) => {
    body += buffer.toString();
  });

  req.on("end", async () => {
    console.log(1);
  });
};

exports.saveRecipe = (req, res) => {
  let body = "";
  req.on("data", (buffer) => {
    body += buffer.toString();
  });

  req.on("end", async () => {
    body = JSON.parse(body);
    const result = await uploadFileToAWS(body.file);
    console.log(result);
  });
};
