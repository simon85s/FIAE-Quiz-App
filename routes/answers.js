var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://user1:user123@ds037015.mlab.com:37015/fiae_quizdb', ['answers'])

router.get('/answers', function(req, res, next){

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

  db.answers.find(function(err,answers)
  {
            if(err)
            {
                res.send(err);
            }
            res.json(answers);
  });
});


//Add Answers
router.post('/answers', function(req, res, next){

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    var answer = req.body;
    if(!answer.answer){
        res.status(400);
        res.json({"error": "Bad Data"});
    } else {
        db.answers.save(answer, function(err, answer){
                 if(err)
            {
                res.send(err);
            }
            res.json(answer);
            res.status(200)
        });
    }
});

router.delete('/answers/:id', function(req, res, next){

    db.answers.remove({_id: mongojs.ObjectID(req.params.id)}), function(err,answer){

        if(err){
            
            res.send(error)
        }
        res.json(answer)
    }
  });

module.exports = router;