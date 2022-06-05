var { Schema, model, connect }  = require("mongoose");

let db=null;

const ContagemSchema = new Schema(
  {
    id_estabelecimento: Number,
    nome_estabelecimento: String,
    id_transacao: String,
    data: Date,
    valor: Number
  }
);

const ContagemModel = model("Contagem", ContagemSchema, "Contagem");


module.exports.init = async () => {
  if(!db) {
    db = await connect(process.env["CosmosDbConnectionString"]);
  }
};


module.exports.addItem = async (contagem) => {
  let contagemParaInserir = new ContagemModel();
  contagemParaInserir.id_estabelecimento = contagem.id_estabelecimento;
  contagemParaInserir.nome_estabelecimento = contagem.nome_estabelecimento;
  contagemParaInserir.id_transacao = contagem.id_transacao;
  contagemParaInserir.data = contagem.data;
  contagemParaInserir.valor = contagem.valor;


  return await contagemParaInserir.save();
};
// export const findItemById = async (id) => {
//   return await CategoryModel.findById(id);
// };
// export const findItems = async (query = {}) => {
//   return await CategoryModel.find({});
// };
// export const deleteItemById = async (id) => {
//   return await CategoryModel.findByIdAndDelete(id);
// };

module.exports