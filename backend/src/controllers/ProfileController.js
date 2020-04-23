const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incident = await connection("incidents") //Conecta aos incidentes
      .where("ong_id", ong_id) //Procura onde o id do banco é o mesmo do header
      .select("*"); //Seleciona todos

    return response.json(incident);
  },
};
