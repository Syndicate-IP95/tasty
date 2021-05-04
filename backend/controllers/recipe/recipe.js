"use strict";

const Recipe = require("../../models/recipe");
const { uploadFileToAWS } = require("../../utils/uploadFileToAWS");
const getUserInfoByToken = require("../../utils/getUserInfoByToken");
const { headers } = require("../../utils/headers/headers");

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
    const token = req.headers["authorization"];
    const userInfo = await getUserInfoByToken(token);

    if (userInfo.message) {
      res.writeHead(404, headers);
      return res.end(JSON.stringify({ message: "logout" }));
    }

    const author = {
      userId: userInfo.userId,
      name: userInfo.name,
      surname: userInfo.surname,
    };

    try {
      const savedUrl = await uploadFileToAWS(body.file);

      const newRecipe = new Recipe({
        author,
        title: body.title,
        content: body.content,
        ings: JSON.parse(body.ings),
        file: savedUrl,
      });

      if (savedUrl && savedUrl.message) {
        res.writeHead(500, headers);
        return res.end(
          JSON.stringify({ message: "Сталась серверна помилка..." })
        );
      }

      await newRecipe.save();
    } catch (e) {
      console.log(e);
      res.writeHead(500, headers);
      return res.end(
        JSON.stringify({ message: "Сталась серверна помилка..." })
      );
    }

    //console.log(body);
    //console.log(userInfo);

    //const result = await uploadFileToAWS(body.file);
    //console.log(result);
  });
};
