var db = require("../lib/mongodb.js");


module.exports = async function(context, mySbMsg) {


    const mensagem = mySbMsg;
    db.init();
    
    db.addItem(mySbMsg)

    context.log('Mensagem salva: ', mySbMsg);
};



