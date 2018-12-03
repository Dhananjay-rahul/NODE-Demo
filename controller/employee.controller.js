
// Model => employee
Employee = require('../model/employee.model');


//############################################## Get All Employee (Method: GET)###############################################
exports.index = function (req, res) {
    Employee.get(function (err, employee) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            data: employee
        });
    });
};
//############################################## Add New Emplouyee (Method: POST)###############################################
exports.add = function (req, res) {
    var employee= new Employee();
    employee.emp_id = req.body.emp_id;
    employee.contact.email = req.body.contact.email;
    employee.contact.mobile = req.body.contact.mobile;
    employee.contact.alt_mobile = req.body.contact.alt_mobile;
    employee.emp_name.emp_firstName = req.body.emp_name.emp_firstName;
    employee.emp_name.emp_lastName = req.body.emp_name.emp_lastName;
    employee.team = req.body.team;
    employee.image= req.body.image;
    employee.address.lines = req.body.address.lines;
    employee.address.city = req.body.address.city;
    employee.address.state = req.body.address.state;
    employee.address.zip=req.body.address.zip;
        
// save the contact and check for errors
    employee.save(function (err) {
        if (err)
            res.json({
                status: "error",
                message: err,
            });
        else 
            res.json({
                message: 'New employee details created!',
                data: employee
            });
    });
};


//############################################## GET Employee Details by emp_id(Method: GET) #######################################
exports.view = function (req, res) {

    Employee.findOne({'emp_id':req.params.emp_id}, function (err, employee) {
        if (err)
            res.send(err);
        
        res.json({
            message: 'Employee details loading..',
            data: employee
        });
    });
};

//############################################### Update By emp_id (Method: PUT/PATCH ) #############################################

exports.update = function (req, res) {
    Employee.findById(req.params.emp_id, function (err, employee) {
            if (err)
                res.send(err);
                employee.emp_id = req.body.emp_id;
                employee.contact.mobile = req.body.contact.mobile;
                employee.contact.alt_mobile = req.body.contact.alt_mobile;
                employee.emp_name.emp_firstName = req.body.emp_name.emp_firstName;
                employee.emp_name.emp_lastName = req.body.emp_name.emp_lastName;
                employee.team = req.body.team;
                employee.image= req.body.image;
                employee.address.lines = req.body.address.lines;
                employee.address.city = req.body.address.city;
                employee.address.state = req.body.address.state;
                employee.address.zip=req.body.address.zip;
    // save the contact and check for errors
            employee.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Employee Details updated',
                    data: employee
                });
            });
        });
    };


//############################################## Delete By emp_id ( Method: DELETE)######################################################
exports.delete = function (req, res) {
    Employee.remove({
        emp_id: req.params.emp_id
    }, function (err, employee) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'employee deleted',
            data:employee
        });
    });
};