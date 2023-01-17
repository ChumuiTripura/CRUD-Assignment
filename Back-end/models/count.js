const mongoose = require('mongoose')

const total = new mongoose.Schema({
     sNo :{
        type : Number,
        required : true,
        default : 0
     }
})

const EmpModel = mongoose.model('Count', total)
module.exports = EmpModel;