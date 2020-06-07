import path from "path";

const database =
  process.env.NODE_ENV === "test" ? "test.sqlite" : "database.sqlite";

module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "src", "database", database),
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "src", "database", "seeds"),
  },
  useNullAsDefault: true,
};
