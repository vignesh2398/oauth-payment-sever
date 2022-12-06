const mongoose = require('mongoose');

const Schema= mongoose.Schema;

const userSchema = new Schema({
    userId:{type:"String"
    },
    username:{type:"String"},
    picture:{type:"String"}
})

const Users=mongoose.model("users",userSchema);
module.exports={Users}