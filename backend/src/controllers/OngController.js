const crypto = require("crypto"); //Lib de criptografia para gerar id's aleatórios
const connection = require("../database/connection"); //Comunicação com o banco

module.exports = {
  async index(request, response) {
    const ongs = await connection("ongs").select("*");

    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString("HEX"); //Criação de id aleatório

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
