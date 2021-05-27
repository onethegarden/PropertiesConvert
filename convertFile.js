import properties from "properties";
import { insertProperties, selectProperties } from "./oracleDB/oracleConnect";
import fs from "fs";

export const readPropertiesDB = async () => {
  const data = await selectProperties();
  console.log("here is data");
  console.log(data);
};

export const insertPropertiesFile = (file) => {
  const options = {
    path: true,
    namespaces: false, //이거 값 체크하면 json depth 넣어줌
    sections: true,
    variables: true,
    include: true,
  };
  properties.parse(file, options, function (error, obj) {
    if (error) return console.error(error);

    let bindData = [];
    //file 이름에서 _뒤의 언어이름 뽑아옴
    const lang = file.substr(file.lastIndexOf("_") + 1, 2);

    Object.keys(obj).map((key) => {
      bindData.push([key, lang, obj[key]]);
    });

    console.log(bindData);
    insertProperties(bindData);
  });
};

export const propertiesToJSON = (file) => {
  const options = {
    path: true,
    namespaces: true, //이거 값 체크하면 json depth 넣어줌
    sections: true,
    variables: true,
    include: true,
  };
  properties.parse(file, options, function (error, obj) {
    if (error) return console.error(error);

    console.log(obj);
  });
};

export const writePropertiesFile = (path, jsonData) => {
  const dict = {};
  jsonData.forEach((proper) => {
    dict[proper.KEY] = proper.TEXT;
  });

  const data = properties.stringify(dict);

  fs.open(path, "a+", function (err, fd) {
    if (err) throw err;
    if (fd == "9") {
      console.log("file create.");
    } else {
      fs.writeFile(path, data, "utf8", function (error) {
        console.log("write end");
      });
    }
  });
};
