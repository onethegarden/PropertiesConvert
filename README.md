## .properties connect to Oracle

> java 다국어 properties를 DB화 하고 json으로 변환하여
>
> React  i18next 사용을 준비하기 위한 레포





### project start

1. node module 다운로드

   ```
   npm install
   ```

2. db 연결 및 테이블 생성

   - .env 파일 작성(root경로에 생성해야함)

   ```
   NODE_ORACLEDB_USER=
   NODE_ORACLEDB_PASSWORD=
   NODE_ORACLEDB_CONNECTIONSTRING=
   NODE_ORACLEDB_EXTERNALAUTH=true
   ```

   - 테이블 생성 (key 와 language로 pk를 생성한다)

   ```sql
   CREATE TABLE PROPERTIES 
   ( 
       KEY       VARCHAR2(300),
       LANG      VARCHAR2(2),
       TEXT      VARCHAR2(3000),
       CONSTRAINT PROPERTIES_PK PRIMARY KEY(KEY, LANG)
   );
   ```

3. project start

   ```
   node -r esm index.js
   ```

   node에서 es6모듈을 쓰기 위해 ```esm```을 사용하였다.	

   - 사용법

     - ```npm install esm``` or ```yarn add esm```

     - ```node -r esm index.js```





- 참고 :

  properties :  https://www.npmjs.com/package/properties

  esm : https://www.npmjs.com/package/esm
  
  엑셀 적용 고려 : https://www.npmjs.com/package/export-from-json