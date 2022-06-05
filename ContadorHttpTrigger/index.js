var db = require("../lib/mongodb.js");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const id = context.bindingData.id;


    db.init();
    

    let itens = await db.findItemsByIdEstabelecimentoAndToday(id);

    let response = "";

    if(itens.length > 0)
    {
        const total = itens.map((item) => item.valor ).reduce((previousValue, currentValue) => previousValue + currentValue, 0.00);

        const item = itens[0];
        let hoje = new Date();
        hoje.setUTCHours(0,0,0,0);
    
    
        
        response = {
            id_estabelecimento: item.id_estabelecimento,
            nome_estabelecimento: item.nome_estabelecimento,
            data: hoje.toISOString(),
            valor: total > 0 ? total : 0.00
        }
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: response
        };


    }else {
        context.res = {
            status: 404, 
            body: "estabelecimento não encontrado"
        };
    }






}