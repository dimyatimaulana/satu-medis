import { Sequelize } from "sequelize";

const db = new Sequelize("satumedis_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;