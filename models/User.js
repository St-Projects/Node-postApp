const db = require('./db');

const User = db.sequelize.define('users',{
    nome:{
        type:db.Sequelize.STRING,
       
    },
    senha:{
        type:db.Sequelize.STRING,
       
    }
});

//User.sync({force:true});
module.exports = User;