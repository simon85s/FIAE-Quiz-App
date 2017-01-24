var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://user1:user123@ds037015.mlab.com:37015/fiae_quizdb', ['answers'])


router.get('/answers', function(req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
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

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
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
//Add questions
// router.post('/questions', function(req, res, next){

//     var question = req.body;
   
//     if(!question.title){
//         res.status(400);
//         res.json({"error": "Bad Data"});
//     } else {
//         db.questions.save(question, function(err, question){
//                  if(err)
//             {
//                 res.send(err);
//             }
//             res.json(question);
//         });
//     }
// });
module.exports = router;