const express = require('express');
const router = express.Router();
const empController = require("../controllers/emp.js")


router.get('/', empController.getEmployee);
router.get('/:id', empController.getEmployeeById);
router.post('/', empController.postEmployee);
router.patch('/:id', empController.patchEmployee);
router.delete('/:id', empController.deleteEmployee);


module.exports = router;