var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://user1:user123@ds037015.mlab.com:37015/fiae_quizdb', ['questions'])
ObjectID = require('mongodb').ObjectID

router.get('/questions', function(req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

  db.questions.find(function(err,questions)
  {
            if(err)
            {
                res.send(err);
            }
            res.json(questions);
  });
});


//Add questions
router.post('/questions', function(req, res, next){

    var question = req.body;
   
    if(!question.title){
        res.status(400);
        res.json({"error": "Bad Data"});
    } else {
        db.questions.save(question, function(err, question){
                 if(err)
            {
                res.send(err);
            }
            res.json(question);
        });
    }
}),
    
router.delete('/questions/:id', function(req, res, next){

    db.questions.remove({_id: mongojs.ObjectID(req.params.id)}), function(err,question){

        if(err){
            
            res.send(error)
        }
        res.json(question)
    }
  });



module.exports = router;