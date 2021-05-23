const dbconfig = {
  user: process.env.NODE_ORACLEDB_USER || "hr",
  password: process.env.NODE_ORACLEDB_PASSWORD || "hr",
  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost",
  externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
};

export default dbconfig;
