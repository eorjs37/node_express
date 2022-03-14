let sqlite3 = require('sqlite3');
const sqlite3 = require('sqlite3');
const express = require('express');
const cors = require('cors');

const PORT = 8000;


let db = new sqlite3.Database('database.db',(err) =>{
    if(!err){
        db.run('CREATE TABLE tbl_about_myself (name text,email text',(err2)=>{
            if(!err2){
                db.run(
                    "INSERT INTO tbl_about_myself (name,email) VALUES('DOPT','armigar@naver.com')"
                )
            }
        })
    }
});