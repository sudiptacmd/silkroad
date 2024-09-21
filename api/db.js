import mysql from "mysql2";

export default mysql.createConnection({
  host: "localhost",
  user: "root",


  password: "root",


  database: "silkroad",
});
//database working?
