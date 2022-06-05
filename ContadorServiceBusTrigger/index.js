var db = require("../lib/mongodb.js");


module.exports = async function(context, mySbMsg) {


    const mensagem = mySbMsg;
    db.init();

    if(mySbMsg.valor > 0){
        db.addItem(mySbMsg)
    }
    else{
        context.log('Mensagem não salva: ', mySbMsg);
    }

    

    context.log('Mensagem salva: ', mySbMsg);
};



