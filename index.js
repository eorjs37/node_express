const sqlite3 = require('sqlite3');
const express = require('express');
const TYPE = require('./type');
const get = require('./get');
const post = require('./post');
const put = require('./put');
const initial = require('./inital');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.disable('x-powered-by');
app.use(cors());
app.use('/assets', express.static('assets'));

const PORT = 8000;


let db = new sqlite3.Database('database.db',(err) =>{
    if(!err){
        initial.run(db,TYPE.about_me);
        initial.run(db,TYPE.resume);
        initial.run(db, TYPE.applications);
        initial.run(db, TYPE.notification);
        initial.run(db, TYPE.blog);
        initial.run(db, TYPE.accounts);
    }
});


app.listen(PORT,()=>{
    console.log(`Listengint... ${PORT}`);
});


get.setup(app,db);
post.setup(app,db);
put.setup(app,db);