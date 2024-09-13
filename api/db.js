import mysql from "mysql";

export default mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "silkroad",
});
//database working?
