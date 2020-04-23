const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5) //Limita os resultados a 5
      .offset((page - 1) * 5) //Calcula a página, se estiver na página 1 o resultado é 0 então exibe os 5 primeiros e assim por diante
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf",
      ]);

    response.header("X-Total-Count", count["count(*)"]);

    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization; //O id de identificação das ongs cadastradas é obtido através do header

    //Cria-se uma constante para armazenar o id do caso, que foi configurado para incrementar-se automaticamente, logo depois espera-se até que os dados sejam armazenados no banco
    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json({ id }); //Retorna o id do caso
  },

  async delete(request, response) {
    const { id } = request.params; //Armazena o id do caso
    const ong_id = request.headers.authorization; //Armazena o id da ong logada

    const incident = await connection("incidents") //Conecta ao banco de incidentes
      .where("id", id) //Onde o id do caso (params) for igual ao id cadastrado no banco
      .select("ong_id") //Seleciona o ong_id que estará dentro do banco de incidentes que veio do banco das ongs
      .first(); //Seleciona o primeiro, que no caso é o único

    if (incident.ong_id !== ong_id) {
      //Se a ong logada for diferente da encontrada
      return response.status(401).json({ error: "Operation not permitted." });
    }

    await connection("incidents").where("id", id).delete();

    return response.status(204).send();
  },
};
