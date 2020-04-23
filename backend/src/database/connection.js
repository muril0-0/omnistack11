//Arquivo de configuração para conexão do banco de dados
const knex = require("knex");
const config = require("../../knexfile");

const envConfig =
  process.env.NODE_ENV === "test" ? config.test : config.development;

const conncetion = knex(envConfig);

module.exports = conncetion;
