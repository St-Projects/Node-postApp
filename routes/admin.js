const express = require('express');
const router = express();


//CRIANDO ROTAS ADMIN
//ROTA HOME
router.get('/', (req, res) => {
    res.render('home');
});


//EXPORTANDO A ROTA ADMIN
module.exports = router;