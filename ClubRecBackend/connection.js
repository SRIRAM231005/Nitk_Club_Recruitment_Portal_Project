const mongoose = require("mongoose");

async function MongoseConnect(url){
    mongoose.connect(url);
}

module.exports = {
    MongoseConnect,
}