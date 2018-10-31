module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getGames(res, mysql, context, complete){
        mysql.pool.query('SELECT game.game_id, game.name, published_yr, genre.name AS Genre, developer.name AS Developer, publisher.name AS Publisher, rating AS Rating, hrs_played FROM game INNER JOIN game_genre ON game.game_id = game_genre.game_id INNER JOIN genre ON game_genre.genre_id = genre.genre_id INNER JOIN game_developer ON game.game_id = game_developer.game_id INNER JOIN developer ON game_developer.developer_id = developer.developer_id INNER JOIN game_publisher ON game.game_id = game_publisher.game_id INNER JOIN publisher on game_publisher.publisher_id=publisher.publisher_id ORDER BY game.name', function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.game  = results;
            complete();
        });
    };

    function getGenres(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM genre ORDER BY name", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.genre = results;
            complete();
        });
    };

    function getDevelopers(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM developer ORDER BY name", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.developer = results;
            complete();
        });
    };

    function getPublishers(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM publisher ORDER BY name", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.publisher = results;
            complete();
        });
    };

    function getGame(res, mysql, context, id, complete){
        var sql = "SELECT game_id, name, published_yr AS 'Year Published', genre.name AS Genre, developer.name AS Developer, publisher.name AS Publisher, rating AS Rating, hrs_played AS 'Hours Played', FROM game INNER JOIN game_genre ON game.game_id = game_id INNER JOIN genre ON genre_id = genre.genre_id , INNER JOIN game_developer ON game_id = game_developer.game_id, INNER JOIN developer ON developer_id = developer.developer_id, INNER JOIN game_publisher ON game_id = game_publisher.game_id, INNER JOIN publisher on publisher_id = publisher.publisher_id, ORDER BY game.name WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.game = results[0];
            complete();
        });
    };

    function getGenre(res, mysql, context, id, complete){
        var sql = "SELECT * FROM genre WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.genre = results[0];
            complete();
        });
    };

    function getDeveloper(res, mysql, context, id, complete){
        var sql = "SELECT * FROM developer WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.developer = results[0];
            complete();
        });
    };

    function getPublisher(res, mysql, context, id, complete){
        var sql = "SELECT * FROM publisher WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.publisher = results[0];
            complete();
        });
    };

    router.get('/games', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteGame.js"];
        var mysql = req.app.get('mysql');
        getGames(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('games', context);
            }

        }
    });

    router.get('/genres', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteGenre.js"];
        var mysql = req.app.get('mysql');
        getGenres(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('genres', context);
            }

        }
    });

    router.get('/developers', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteDeveloper.js"];
        var mysql = req.app.get('mysql');
        getDevelopers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('developers', context);
            }

        }
    });

    router.get('/publishers', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletePublisher.js"];
        var mysql = req.app.get('mysql');
        getPublishers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('publishers', context);
            }

        }
    });

    router.get('/games/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedGame.js", "updateGame.js"];
        var mysql = req.app.get('mysql');
        getGame(res, mysql, context, req.params.id, complete);
        getGenre(res, mysql, context, complete);
        getDeveloper(res, mysql, context, complete);
        getPublisher(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-game', context);
            }

        }
    });

    router.get('/genres/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedGenre.js", "updateGenre.js"];
        var mysql = req.app.get('mysql');
        getGenre(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-genre', context);
            }

        }
    });

    router.get('/developers/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedDeveloper.js", "updateDeveloper.js"];
        var mysql = req.app.get('mysql');
        getDeveloper(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-developer', context);
            }

        }
    });

    router.get('/publishers/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedPublisher.js", "updatePublisher.js"];
        var mysql = req.app.get('mysql');
        getPublisher(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-publisher', context);
            }

        }
    });

    router.post('/games', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO game (name, published_yr, rating, hr_played) VALUES (?,?,?,?); INSERT INTO game_genre (game_id, genre_id) VALUES ((SELECT game_id FROM game WHERE name=req.body.name), (SELECT genre_id FROM genre WHERE name=req.body.genre)); INSERT INTO game_developer(game_id, developer_id) VALUES ((SELECT game_id FROM game WHERE name=req.body.name), (SELECT developer_id FROM developer WHERE name=req.body.developer)); INSERT INTO game_publisher (game_id, publisher_id) VALUES ((SELECT game_id FROM game WHERE name=req.body.name), (SELECT publisher_id FROM publisher WHERE name=req.body.publisher))";
        var inserts = [req.body.name, req.body.published_yr, req.body.rating, req.body.hrs_played, req.body.genre, req.body.developer, req.body.publisher];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/games');
            }
        });
    });

    router.post('/genres', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO genre (name) VALUES (?)";
        var inserts = [req.body.name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/genres');
            }
        });
    });

    router.post('/developers', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO developer (name, yr_founded, hq_country) VALUES (?,?,?)";
        var inserts = [req.body.name, req.body.yr_founded, req.body.hq_country];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/developers');
            }
        });
    });

    router.post('/publishers', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO publisher (name, yr_founded, hq_country) VALUES (?,?,?)";
        var inserts = [req.body.name, req.body.yr_founded, req.body.hq_country];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/publishers');
            }
        });
    });

    router.put('/games/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE game SET name=?, published_yr=?, rating=?, hrs_played=? WHERE id=?";
        var inserts = [req.body.name, req.body.published_yr, req.body.rating, req.body.hrs_played, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    router.put('/genres/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE genre SET name=?, WHERE id=?";
        var inserts = [req.body.name, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    router.put('/developers/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE developer SET name=?, yr_founded=?, hq_country=? WHERE id=?";
        var inserts = [req.body.name, req.body.yr_founded, req.body.hq_country, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    router.put('/publishers/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE publisher SET name=?, yr_founded=?, hq_country=? WHERE id=?";
        var inserts = [req.body.name, req.body.yr_founded, req.body.hq_country, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    router.delete('/games/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM game WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

router.delete('/genres/:id', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM genre WHERE id = ?";
    var inserts = [req.params.id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
        }else{
            res.status(202).end();
        }
    })
})

router.delete('/developers/:id', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM developer WHERE id = ?";
    var inserts = [req.params.id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
        }else{
            res.status(202).end();
        }
    })
})

router.delete('/publishers/:id', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM publisher WHERE id = ?";
    var inserts = [req.params.id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
        }else{
            res.status(202).end();
        }
    })
})

return router;
}();
