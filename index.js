const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/styles.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/styles.css'));
});

app.get('/add.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/add.js'));
});

app.get('/remove.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/remove.js'));
});

app.get('/test.js', function(req, res){
    res.sendFile(path.join(__dirname, '/test.js'));
});

app.get('/initialise.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/initialise.js'));
})

app.get('/initial', (req, res) => {
    getInitialData().then((result) => res.status(200).json(result));
    //console.log(data);
    //res.status(200).json(data);
})

app.post('/add', (req, res) => {
    //console.log(req.body.text)
    addToDatabase(req.body.text).catch(console.dir);
    res.status(200).send({status: 'success'});
})

app.post('/remove', (req, res) => {
    //console.log(req.body.removal);
    removeFromDatabase(req.body.removal).catch(console.dir);
    res.status(200).send({status: 'success'})
})

app.listen(port);



const { MongoClient } = require("mongodb");
const { Template } = require('ejs');
const uri = "mongodb+srv://59ayush:helloabcd1234@teddy.ifueq5k.mongodb.net/?retryWrites=true&w=majority";

async function addToDatabase(text) {
    if (text.length <= 0){
        return;
    }
    const client = new MongoClient(uri);
    try {

        const database = client.db('Todo');
        const todo = database.collection('todo');
        await todo.insertOne({task: text});
      
    } finally {
      await client.close();
    }
}

async function removeFromDatabase(text){
    const client = new MongoClient(uri);
    try {

        const database = client.db('Todo');
        const todo = database.collection('todo');
        await todo.deleteOne({task: text});
      
    } finally {
      await client.close();
    }
}

async function getInitialData(){
    const client = new MongoClient(uri);
    const temp = [];
    try {
        
        const database = client.db('Todo');
        const todo = database.collection('todo');
        const data = todo.find();
        
        await data.forEach((item) => {
            temp.push(item.task);
        });

    } finally {
        await client.close();
    }
    //console.log(temp);
    return temp;
}
  