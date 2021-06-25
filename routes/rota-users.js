const express = require('express');
const router = express.Router();

//CARREGANDO O MODELO
const User = require('../models/User');

//CRIANDO CADASTRO
//ROTA PARA FORM CADASTRO
router.get('/cad_user', (req, res) => {
    res.render('admin/user/cadastro');
})

//ROTA BOTÃO CADASTRO
router.post('/cad_user/add', (req, res) => {
    console.log(req.body.nome);
    User.create({
        nome: req.body.nome,
        senha: req.body.senha
    }).then(function(){
        res.redirect('admin/user/login')
    }).catch(function(erro){
        res.send('ocorreu um erro' + erro);
    });
});

//ROTA FORM LOGIN
router.get('/login', (req, res) => {
    res.render('admin/user/login');
});

//ROTA BOTÃO LOGIN
router.post('/login/autenticar', (req, res) =>{
    var nome=req.body.nome;
    var senha=req.body.senha;
    var session = req.session.id;
    User.findOne({
        where:{
            nome:nome, senha:senha
        }
    }).then(users=>{
        if(users){
            res.render('/admin/postagem/postagem', { session: session });
        }else{
           
           res.send ('Senha ou usuário incorreto! Tente novamente... ');
           res.render('admin/user/login');

        }
    });


});

//ROTA TESTE SESSIONS
router.get('/session/:id', (req, res, next) => {
    req.session.id = req.params.id;
    res.redirect("/rota_user/sessionId");
});

router.get('/sessionId', (req, res, next) => {
    res.send(req.sessionID);
})

module.exports = router;