// Update with your config settings.
//Arquivo de configuração do KNEX para utilizar SQL dentro do Node
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/db.sqlite", //Arquivo do banco
    },
    migrations: {
      directory: "./src/database/migrations", //Arquivo das migrações (algo como as entidades)
    },
    useNullAsDefault: true, //Permite preencher os campos com valores null
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
