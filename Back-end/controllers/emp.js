const EmpModel = require('../models/emp');


// get the all employee details 
exports.getEmployee = async (err, res) => {
    try{
        const emp = await EmpModel.find();
        res.json(emp);
    }catch(err){
        res.send('Error' + err);
    }
};

// get the specifice employee details
exports.getEmployeeById = async(req, res) => {
    try{
        // console.log(EmpModel);
        const emps = await EmpModel.findById(req.params.id);
        res.json(emps);
    }catch(err){
        res.send('Error' + err);
    }
};

// post means to add the employee details
exports.postEmployee =  async(req, res) => {
    try{
        const {empName, dobemp, skillemp, salaryemp} = req.body;
        const emp = new EmpModel({
            empName,
            dobemp,
            skillemp,
            salaryemp,
        });
        console.log(req.body)
        const a1 = await emp.save();
        res.json(a1);
    }catch(err){
        res.status(500).send('Error message ')
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
        res.send("Error found...");
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
        res.send('Error...');
        console.log(res);
    }
};