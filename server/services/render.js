const axios = require('axios');


//use this to render ejs file
exports.homeRoutes = (req, res) => {

    axios.get('http://localhost:3000/control/users')
            .then(response => {
                res.render('index', {
                    users: response.data
                });
            })
            .catch((err) => {
                res.send(err);
            });
}

exports.addRoutes = (req, res) => {
    res.render('add_user');
}

exports.updateRoutes = (req, res) => {

    axios.get('http://localhost:3000/control/users', {params : {id: req.query.id}})
            .then(userData => {
                res.render('update_user', {users: userData.data});
            })
            .catch(err => {
                res.send(err);
            });
}