
var Todo = require('./todo.js');

module.exports = function(app) {
   
   // by using this method we are getting info from database
    app.get('/api/todos', function(req, res) {
  
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)

            res.json(todos); 
    });
    });

    app.post('/api/todos', function(req, res) {

        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
};