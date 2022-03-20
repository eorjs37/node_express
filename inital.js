const TYPE = require('./type');

function fu_about_me(db){
    db.run('CREATE TABLE IF NOT EXISTS tbl_about_myself (name text,email text, UNIQUE(name,email))', (err) => {
        if (!err) {
            db.run(
                "INSERT OR IGNORE INTO tbl_about_myself (name, email) VALUES ('MAXGUN','chleorjs37@gmail.com')"
            )
        }
        else {
            console.error('CREATE ERROR : ', err);
        }
    });
}

function fn_resume(db){
    db.run(
        'CREATE TABLE IF NOT EXISTS tbl_my_resume (date DATE, title TEXT, content TEXT, URL TEXT, UNIQUE(date,title))',
        (err) => {
            if (!err) {
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
                console.error('tbl_my_resume error :  ',err);
            }
        }
    );
}

function fn_applications(db) {
    db.run(
        'CREATE TABLE IF NOT EXISTS tbl_applications (id INT, name TEXT, content TEXT, date DATE, platform TEXT, url TEXT, image TEXT, UNIQUE(name,date))',
        (err)=>{
            if(!err){
                const applications = [
                    {
                        id:1,
                        name:'힘을 찾아런111',
                        content:'아주 간단한 런닝 게임인 "힘을 찾아런"을 소개합니다.',
                        date:'2017-07-01',
                        platform:'android',
                        url:'',
                        image:''
                    },
                ]

                applications.forEach((item) =>{
                    const query = `INSERT OR IGNORE INTO tbl_applications(id, name, content, date, platform, url, image) 
                                   VALUES(${item.id}, '${item.name}','${item.content}','${item.date}','${item.platform}','${item.url}', '${item.image}')`;
                    db.run(query);
                })
            }
            else{
                console.error('CREATE TABLE tbl_applications : ' , err);
            }
        }
    )
}

function fn_notifications(db) {
    db.run(
        "CREATE TABLE IF NOT EXISTS tbl_notification (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, expiration DATE, type TEXT)",
        (err) => {
            if (!err) {
                let query = "DELETE from tbl_notification";
                db.run(query);

                query = `INSERT INTO tbl_notification (content, expiration, type) VALUES('사이트 공사중입니다. 일부 사용에 제약이 있을 수 있습니다.','2099-12-31','warning')`;
                db.run(query);
            }
        }
    )
}

module.exports.run = function(db, type){
    if(type === TYPE.about_me){
        fu_about_me(db);
    }
    else if(type === TYPE.resume){
        fn_resume(db);
    }
    else if(type === TYPE.applications){
        fn_applications(db);
    }
    else if (type === TYPE.notification) {
        fn_notifications(db)
    }
}