import properties from "properties";
import { insertProperties, selectProperties } from "./oracleDB/oracleConnect";
import fs from "fs";

export const readPropertiesDB = async () => {
  const data = await selectProperties();
  console.log("here is data");
  console.log(data);
};

export const insertPropertiesFile = ({ file, fileName, lang }) => {
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

    Object.keys(obj).map((key) => {
      bindData.push([fileName, key, lang, obj[key]]);
    });

    console.log(bindData);
    insertProperties(bindData);
  });
};

export const propertiesToJSON = async(file) => {
  const options = {
    path: true,
    namespaces: true, //이거 값 체크하면 json depth 넣어줌
    sections: true,
    variables: true,
    include: true,
  };
  await properties.parse(file, options, function (error, obj) {
    if (error) return console.error(error);

    const data = JSON.stringify(obj);
    //넘어오는 file path에서 파일 확장자명만 바꿔서 저장
    const path = file.replace('.properties', '.json');

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
  });
};

export const writePropertiesFile = async (path) => {
  const jsonData = await selectProperties(); //얘는 유사배열
  const dict = {};
  if (jsonData) {
    console.log("here is data");
    console.log(typeof jsonData + 'dd')
    console.log(Array.isArray(jsonData))

    Array.from(jsonData).forEach(function (proper) {
      console.log(proper)
      dict[proper.KEY] = proper.TEXT;
    });
    /*
    jsonData.forEach((proper) => {
      dict[proper.KEY] = proper.TEXT;
    });
    */
    console.log(dict)

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
  }

};
