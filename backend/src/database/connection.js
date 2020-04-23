//Arquivo de configuração para conexão do banco de dados
const knex = require("knex");
const config = require("../../knexfile");

const conncetion = knex(config.development);

module.exports = conncetion;
