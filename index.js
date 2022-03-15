// let sqlite3 = require('sqlite3');
const sqlite3 = require('sqlite3');
const express = require('express');
const cors = require('cors');
const app = express();
app.disable('x-powered-by');
app.use(cors());
const PORT = 8000;


let db = new sqlite3.Database('database.db',(err) =>{
    if(!err){
        db.run('CREATE TABLE IF NOT EXISTS tbl_about_myself (name text,email text, UNIQUE(name,email))', (err2) => {
            if (!err2) {
                db.run(
                    "INSERT OR IGNORE INTO tbl_about_myself (name, email) VALUES ('MAXGUN','chleorjs37@gmail.com')"
                )
            }
            else {
                console.error('CREATE ERROR : ', err2);
            }
        });

        db.run(
            'CREATE TABLE IF NOT EXISTS tbl_my_resume (date DATE, title TEXT, content TEXT, URL TEXT, UNIQUE(date,title))',
            (err2) => {
                if (!err2) {
                    const resume = [
                        {
                            date: '1980-11-27',
                            title: '탄생',
                            content: '널리 이롭게 하라는 홍익인간의 뜻을 담아 탄생!!!',
                            URL: null,
                        },
                        {
                            date: '2003-01-01',
                            title: 'Play Ground Gaming Inc.',
                            content: '당시 게임 시장에 대한 정확한 분석과 정보를 바탕으로 사람들의 게임에 대한 알권리를 제공하는.',
                            URL: null,
                        },
                        {
                            date: '2014-01-01',
                            title: 'DOPT 생성',
                            content: '사람들에게 더욱 더 많은 프로그램을 배포하고자 하는 목적으로 Dong Project Team',
                            URL: 'https://naver.com',
                        }
                        
                    ];

                    resume.forEach((item) => {
                        const query = `INSERT OR IGNORE INTO tbl_my_resume(date,title,content,URL) values('${item.date}','${item.title}','${item.content}','${item.URL}')`;
                        db.run(query);
                    })
                }

                else {
                    console.error('tbl_my_resume error :  ',err2);
                }
            }
        );
    }
    else{
        console.error('database.db ERROR : ', err);
    }
});


app.listen(PORT,()=>{
    console.log(`Listengint... ${PORT}`);
})

app.get('/',(req,res,next) =>{
    res.json({rsp:'ok'})
});

app.get('/db/about-me', (req, res, next) => {
    let result = {
        rsp: 'fail',
    };

    db.get('SELECT * FROM tbl_about_myself', (err, row) => {
        if (!err) {
            result.data = row;

            db.all('SELECT * FROM tbl_my_resume ORDER BY date desc', (err2, rows) => {
                if (!err2) {
                    result.rsp = 'ok';
                    result.data.resume = rows;
                    res.json(result);
                } else {
                    console.error('tbl_my_resume : ', err2);
                    res.json(result);
                }
            })
        }
        else {
            res.json(result);
        }
    });
});