const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    empName : {
        type : String,
        required : true
    },
    dobemp : {
        type : Date,
        required : true
    },
    skillemp : [
        {
        type : String,
        required : true
       }
    ],
    salaryemp : {
        type : Number,
        required : true
    },
    sNo : {
        type : Number,
        required : true,
        unique: true
    },
    imageUpload:{
        type: String, 
        required: true
    }
})

const EmpModel = mongoose.model('Emp', empSchema)


module.exports = EmpModel;