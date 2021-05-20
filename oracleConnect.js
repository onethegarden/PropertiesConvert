const oracledb = require("oracledb");

oracledb.getConnection(
  {
    user: "hr",
    password: "hr",
    host: "localhost",
    database: "xe",
  },
  function (err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }

    const query = "SELECT * FROM PROPERTIES";

    connection.execute(query, function (err, result) {
      if (err) {
        console.error(err.message);
        doRelease(connection);
        return;
      }

      console.log(result.metaData);
      console.log(result.rows);
      result.rows.forEach((v) => {
        console.log(v);
      });
      //async 처리
      doRelease(connection);
    });

    /*
   const query = "INSERT INTO PROPERTIES VALUES(:ID, :LANG, :TEXT)";
    const binddata = ["testId", "en", "this is Text"];

    //sql 실행
    connection.execute(query, binddata, function (err, result) {
      if (err) {
        console.error(err.message);
        doRelease(connection);
        return;
      }
      console.log("Row Insert" + result.rowsAffected);
      //async 처리
      doRelease(connection, result.rowsAffected);
    });
   */
  }
);

function doRelease(connection, result) {
  connection.release(function (err) {
    if (err) {
      console.error(err.message);
    }
    //db종료까지 모두 완료됐으면 응답 데이터 반홯ㄴ
    Response.send("" + result);
  });
}
