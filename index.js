import dotenv from "dotenv";
import {
  insertPropertiesFile,
  readPropertiesDB,
  propertiesToJSON,
} from "./convertFile.js";

//환경변수 설정
dotenv.config();

const filePath = `${__dirname}/test_example`;

//properties 파일 내용 읽어서 json으로 바꾸기
propertiesToJSON(`${filePath}/test_ko.properties`);

//properties 파일 읽어서 그대로 oracledb에 넣기
insertPropertiesFile(`${filePath}/test_ko.properties`);

//db에 넣은 파일 읽기
readPropertiesDB();
//node -r esm index.js
