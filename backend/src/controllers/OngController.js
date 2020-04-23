const connection = require("../database/connection"); //Comunicação com o banco
const GenerateUniqueId = require("../utils/GenerateUniqueId");

module.exports = {
  async index(request, response) {
    const ongs = await connection("ongs").select("*");

    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = GenerateUniqueId();
    await connection("ongs").insert({
      //Inserindo os dados no schema ongs
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  },
};
