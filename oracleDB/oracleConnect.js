const oracledb = require("oracledb");
import dbConfig from "./dbconfig.js";

/**
 *
 * properties data 넣기
 */
export async function insertProperties(bindData) {
  let connection;

  try {
    let sql, options, result;

    connection = await oracledb.getConnection(dbConfig);
    sql = `INSERT INTO PROPERTIES VALUES (:key, :lang, :text)`;

    options = {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.STRING, maxSize: 300 },
        { type: oracledb.STRING, maxSize: 2 },
        { type: oracledb.STRING, maxSize: 500 },
      ],
    };
    //bindData Array형태여야 함
    result = await connection.executeMany(sql, bindData, options);

    console.log("Number of rows inserted:", result.rowsAffected);
  } catch (e) {
    console.log(e);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

/**
 *
 * properties data 가져오기
 */
export async function selectProperties() {
  let connection;

  try {
    let sql, binds, options, result;

    connection = await oracledb.getConnection(dbConfig);

    sql = `SELECT * FROM TAB`;

    binds = {};

    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
    };

    result = await connection.execute(sql, binds, options);
    /*
    console.log("Metadata: ");
    console.dir(result.metaData, { depth: null });
    console.log("Query results: ");
    console.dir(result.rows, { depth: null });
    
    */
    return result;
  } catch (e) {
    console.log(e);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export async function createTable() {
  let connection;

  try {
    let sql, binds, options, result;

    connection = await oracledb.getConnection(dbConfig);

    const stmts = [`DROP TABLE no_example`, `CREATE TABLE no_example (id NUMBER, data VARCHAR2(20))`];

    for (const s of stmts) {
      try {
        await connection.execute(s);
      } catch (e) {
        if (e.errorNum != 942) console.error(e);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
