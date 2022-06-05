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
module.exports.findItems = async (query = {}) => {
   return await ContagemModel.find({});
 };

 module.exports.findItemsByIdEstabelecimentoAndToday = async (id_estabelecimento) => {
  var hoje = new Date();
  hoje.setUTCHours(0,0,0,0);
  let diaHoraInicial = hoje.toISOString();
  hoje.setUTCHours(23,59,59,0);
  let diaHoraFinal = hoje.toISOString();



  return await ContagemModel.find({
      id_estabelecimento: id_estabelecimento,
      data : {$gte: diaHoraInicial, $lt: diaHoraFinal}
  });
};


 
// export const deleteItemById = async (id) => {
//   return await CategoryModel.findByIdAndDelete(id);
// };

module.exports