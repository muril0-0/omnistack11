//Criação do schema
exports.up = function (knex) {
  return knex.schema.createTable("ongs", function (table) {
    //Cria tabela com nome ongs
    table.string("id").primary(); //Define o id como chave primária
    table.string("name").notNullable(); //Componentes do banco (colunas talvez)
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("city").notNullable();
    table.string("uf", 2).notNullable();
  });
};

//Exclusão do schema
exports.down = function (knex) {
  return knex.schema.dropTable("ongs");
};
