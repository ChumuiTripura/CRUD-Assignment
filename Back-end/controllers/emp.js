const { db } = require('../models/emp');
const EmpModel = require('../models/emp');
const CountModel = require('../models/count')


// get the all employee details 
exports.getEmployee = async (req, res) => {
    try{
        // const emp1 = await EmpModel.find();
        // res.status(200).json({total:emp1.length, emp1 });
        const {page, limit, search = " "} = req.query;
        if(page < 0 && limit < 0){
            res.status(400).send("Page Error")
        }
        const emp1 = await EmpModel.find({
              '$or' : [
                    {"empName" : {$regex : `.*${search}.*`, $options : "i"}},
                    {"skillemp" : {$regex : `.*${search}.*`, $options : "i"}}
              ]
        })
        .limit(limit)
        .skip((page-1)*limit);
        res.status(200).json({total:emp1.length, emp1 });
        // res.json(emp1);
    }catch(err){
        res.status(500).send(err.message)
    }
};

// get the specifice employee details
exports.getEmployeeById = async(req, res) => {
    try{
        const emps = await EmpModel.findById(req.params.id);
        res.json(emps);
    }catch(err){
        res.status(500).send(err.message)
    }
};

// post means to add the employee details
exports.postEmployee =  async(req, res) => {
    try{
        const {empName, dobemp, skillemp, salaryemp, imageUpload} = req.body;
        
        // unique id 
        await CountModel.updateOne({$inc: {sNo : 1}});
        const employeeId = await CountModel.find();
        const sNo = employeeId[0].sNo;
        // console.log(sNo)
        // console.log(temp);
        const emp = new EmpModel({
            empName,
            dobemp,
            skillemp,
            salaryemp,
            sNo,
            imageUpload
        });
        // console.log(req.body)
        const a1 = await emp.save();
        res.json(a1);
    }catch(err){
        res.status(500).send(err.message)
    }
};

// patch means update the employee details
exports.patchEmployee = async(req, res) =>{
    try{
        const update = req.body;
        const option = {new: "true"};
        const emp = await EmpModel.findByIdAndUpdate(req.params.id,update,option);
        res.json(emp)
        console.log(req.params.id)
    }catch (err){
        res.status(500).send(err.message)
        console.log(res);
    } 
};

// delete the given id employee 
exports.deleteEmployee = async (req, res) => {
    try{
        const id = req.params.id;
        const deleteEmp = await EmpModel.findByIdAndDelete(id);
        res.json(deleteEmp);
    }catch(err){
        console.log(res);
        res.status(500).send(err.message);
    }
};