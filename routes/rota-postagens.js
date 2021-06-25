const express = require('express');
const router = express.Router();
const multer = require('multer');
const { QueryTypes } = require('sequelize');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname);
    }
});
const upload = multer({storage: storage});
const fs = require('fs');
const alert = require('alert');

//CARREGANDO MODELO
const Post = require("../models/Post");

//ROTAS DE POSTAGENS
//LISTAGEM DE POSTAGENS
router.get('/postagem', (req, res) => {
    Post.findAll().then((postagens) => {
        postagens = postagens.map((postagem) => {
            return postagem.toJSON();
        }); 
        res.render('admin/postagem/postagem', {postagens: postagens});
    });
});

//LISTAGEM DE POSTS
router.get('/post/:id', (req, res) => {
    Post.findAll({ where: { id: req.params.id } }).then((postagens) => {
        postagens = postagens.map((postagem) => {
            return postagem.toJSON();
        }); 
        res.render('admin/postagem/post', {postagens: postagens});
    });
});

//ROTA ADMIN POST
router.get('/adminpost', (req,res,next) => {
    Post.findAll().then((postagens) => {
        postagens = postagens.map((postagem) => {
            return postagem.toJSON();
        }); 
        res.render('admin/postagem/adminpost', {postagens: postagens});
    });
});

//CADASTRO DE POSTAGENS
router.get('/cadastro', (req, res) => {
    res.render('admin/postagem/addpostagem');
});

//BOTÃO DE CADASTRO DE POSTAGENS
router.post('/cadastro/add', upload.single('img'), (req, res) => {
    //console.log(req.file.filename);
    var path = req.file;
    if(path == undefined || path == null || path == "")
    {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            imagem: "..\\public\\img\\mamaco0.jpg"
        }).then(() => {
            res.redirect('/rota_postagem/postagem');
        }).catch((erro) => {
            alert("Sem todos os atributos completos");
        });
    }else{
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            imagem: "..\\" + req.file.path
        }).then(() => {
            res.redirect('/rota_postagem/postagem');
        }).catch((erro) => {
            alert("Sem todos os atributos completos");
        });
    }
    
});

//ABRINDO E PREENCHENDO O FORM DE EDIÇÃO
router.get('/alterar/:id', (req, res, next) => {
    Post.findAll({ where: { id: req.params.id } }).then((postagens) => {
        postagens = postagens.map((postagem) => {
            return postagem.toJSON();
        }); 
        res.render('admin/postagem/editpostagem', {postagens: postagens});
        console.log(postagens);
    });
});

//FAZENDO A EDIÇÃO DAS POSTAGENS
router.post('/alterar/update', (req, res) => {
    Post.update({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        imagem: req.body.imagem
    },
    {
        where: {id: req.body.id}
    }
    ).then(() => {
        res.redirect('/rota_postagem/postagem');
    }).catch((erro) => {
        res.send("Esta postagem não existe " + erro);
        console.log(erro);
    });
});

//CRIANDO DELEÇÃO DE POSTAGENS
router.get('/deletar/:id', (req, res, next) => {
    Post.sequelize.query("SELECT IMAGEM FROM POSTAGENS WHERE ID = :id",{
    replacements: { id: req.params.id },
    type: QueryTypes.SELECT
    }).then((postagens) => {
        var npostagem = JSON.parse(JSON.stringify(postagens));
        var fp = npostagem[0].IMAGEM.substring(1);
        var filePath = fp;
        if(filePath == ".\\public\\img\\mamaco0.jpg"){
            console.log("Imagem padrão!!!!");
        }else{
            fs.unlinkSync(filePath);
            console.log(filePath);
        }
    }).catch(() =>{
        console.log('Sem imagem upada');
    });
    Post.destroy({where : {id: req.params.id}}).then(() => {
        res.redirect('/rota_postagem/postagem');
    }).catch((erro) => {
        console.log("Ocorreu um erro " + erro);
    })
});

//EXPORTANDO A ROTA
module.exports = router;