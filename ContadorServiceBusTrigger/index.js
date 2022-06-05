var db = require("../lib/mongodb.js");


module.exports = async function(context, mySbMsg) {


    db.init();

    if(mySbMsg.valor > 0){
        db.addItem(mySbMsg)
        context.log('Mensagem salva: ', mySbMsg);
    }
    else{
        context.log('Mensagem não salva: ', mySbMsg);
    }

    

    
};



