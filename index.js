const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const rota_postagem = require('./routes/rota-postagens');
const rota_admin = require('./routes/admin');
const rota_user = require('./routes/rota-users');

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

//REFERENCIANDO ARQUIVOS FIXOS
app.use('/public/css', express.static('public/css'));
app.use('/public/js', express.static('public/js'));
app.use('/public/img', express.static('public/img'));
app.use('/uploads',express.static('uploads'));

//ADICIONANDO A ROTA ADMIN
app.use('/', rota_admin);

//ADICIONANDO ROTA POSTAGEM
app.use('/rota_postagem', rota_postagem);

//ADICIONANDO A ROTA USER
app.use('/rota_user', rota_user);

app.listen(8081, () => {
    console.log("O servidor está rodando");
});