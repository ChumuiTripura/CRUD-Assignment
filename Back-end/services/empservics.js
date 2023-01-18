const User = require('../models/emp');
const EmpModel = require('../models/emp.js')
// const { search } = require('../routers/emp');


exports.getEmployee = async(search, page, limit)=>{
    if(page < 0 ||  limit < 0){
        throw new Error("Page number underFlow !")
    }
    const emp1 = await EmpModel.find({
          '$or' : [
                {"empName" : {$regex : `.*${search}.*`, $options : "i"}},
                {"skillemp" : {$regex : `.*${search}.*`, $options : "i"}}
          ]
    })
    .limit(limit)
    .skip((page-1)*limit);
    return emp1
}


