import dotenv from "dotenv";
import { insertPropertiesFile, readPropertiesDB, propertiesToJSON, writePropertiesFile } from "./convertFile.js";

//환경변수 설정
dotenv.config();

const filePath = `${__dirname}/test_example/login`;

const propertiesToJsonConverter = async(propertiesFilePath) =>{
  const result = await propertiesToJSON(propertiesFilePath);
  console.log(result)
}
//변환할 언어의 리스트 , 이 길이만큼 properties를 찾아서 돌릴 것임
const languageList = ['en', 'es', 'fr', 'ko', 'ru'];
//fileName, 이 이름으로 path를 찾고, db에 저장함
const fileName = 'signIn'

languageList.forEach(language => {
  // 1. properties 파일 내용 읽어서 json으로 바꾸고
  // 2. 동일한 디렉토리에 확장자명 바꿔서 json파일로 저장
  propertiesToJsonConverter(`${filePath}/${fileName}_${language}.properties`);

  //propertiesDLFRRH db 넣기
  insertPropertiesFile({ file: `${filePath}/${fileName}_${language}.properties`, fileName: fileName, lang: language });

})


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

//properties로 만들기
//const writePath = `${__dirname}/test_example/test.properties`;
//writePropertiesFile(writePath);


/***** 실행 *****/
//node -r esm index.js

//https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html
