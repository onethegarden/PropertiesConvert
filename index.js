import dotenv from "dotenv";
import { insertPropertiesFile, readPropertiesDB, propertiesToJSON, writePropertiesFile } from "./convertFile.js";

//환경변수 설정
dotenv.config();

const filePath = `${__dirname}/test_example`;

//properties 파일 내용 읽어서 json으로 바꾸기
propertiesToJSON(`${filePath}/test.properties`);

//properties 파일 읽어서 그대로 oracledb에 넣기
//insertPropertiesFile(`${filePath}/test_ko.properties`);

//db에 넣은 파일 읽기
//readPropertiesDB();

//파일쓰기
const tempData = [
  {
    KEY: "fluts.apple",
    LANG: "eng",
    TEXT: "this is apple",
  },
  {
    KEY: "fluts.orange",
    LANG: "eng",
    TEXT: "this is orange",
  },
];

const writePath = `${__dirname}/test_example/test.properties`;
writePropertiesFile(writePath, tempData);
/***** 실행 *****/
//node -r esm index.js

//https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html
