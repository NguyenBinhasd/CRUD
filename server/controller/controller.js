var UserDB = require('../model/model');

//create and save new user
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({messages: "Content cannot be empty"});
        return;
    }

    const user = new UserDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    //save user to db

    user.save(user)
        .then(data => {
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating new user"
            });
        });
}

//goi toanf bo user hoac goi 1 user
exports.find = (req, res) => {
    //if laf tim 1 nguoi, else la tra ve toan bo
    if(req.query.id) {
        const id = req.query.id;

        UserDB.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({message: 'User not found'});
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({message: 'User not found'});
            });
    } else {
        UserDB.find()
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occurred while reading user information" });
        })
    }
}

//update
exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({ message: "Data update cannot be empty" });
    }

    const id = req.params.id;

    UserDB.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
            .then(data => {
                if(!data) {
                    res.status(404).send({ message: `Cannot update user with id: ${id}, May be user not found!` });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || `Cannot update user with id: ${id}`});
            });
}

//delete user
exports.delete = (req, res) => {
    const id = req.params.id;

    UserDB.findByIdAndDelete(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({ message: `Cannot delete user with id: ${id}, May be user not found!` });
                } else {
                    res.send({ message : "Delete successfully"});
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Can not delete user0"});
            });
}