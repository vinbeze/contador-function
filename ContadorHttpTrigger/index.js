var db = require("../lib/mongodb.js");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    db.init();
    

    let itens = await db.findItemsByIdEstabelecimentoAndToday(2543);

    const total = itens.map((item) => item.valor ).reduce((previousValue, currentValue) => previousValue + currentValue, 0.00);

    const item = itens[0];
    let hoje = new Date();
    hoje.setUTCHours(0,0,0,0);


    const response = {
        id_estabelecimento: item.id_estabelecimento,
        nome_estabelecimento: item.nome_estabelecimento,
        data: hoje.toISOString(),
        valor: total
    }



    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
    };
}