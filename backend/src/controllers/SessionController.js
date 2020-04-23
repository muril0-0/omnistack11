const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection("ongs") //Conecta ao banco de ongs
      .where("id", id) //Onde o id do banco for igual ao id do body
      .select("name") //Selecione o name
      .first();

    if (!ong) {
      return response.status(400).json({ error: "No ONG found with this ID." });
    }

    return response.json(ong);
  },
};
