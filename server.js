'use strict';

require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

///////////////////////////////////////////routes////////////////////////

//localhost:3001
server.get('/', HomePage);

//localhost:3001/books
server.get('/books', BookHandler);


////////////////////////////////////////////////mongoose////////////////////////

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(`${MONGO_URL}/test`, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
});

// schemas 

const book = new mongoose.Schema({
    name: String,
    desc: String,
    img: String,
});

const owner = new mongoose.Schema({
    email: String,
    books: [book],
    
});

// modals

const Owners = mongoose.model('Book', owner);

// functions

function seeOwnersCollection (){
    const Nadeen = new Owners ({
        email: 'shwueihat16@gmail.com',
        books: [
            {
                name: 'book1',
                desc: 'This book is Amazing',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFlAMxLcCmEsYsPzbbaSBzSPrzIRjRS5E2Zw&usqp=CAU'
            },
            {
                name: 'book2',
                desc: 'This book will make you great',
                img: 'https://img.themanual.com/image/themanual/bed-2-416x416.jpg'
            },
        ],
        
    });
    Nadeen.save();
}

// seeOwnersCollection();

/////////////////////////////////////////////////////////functions///////////////////////////


function HomePage (req,res){
    res.send('Home Page');
};

function BookHandler(req,res){
    let email = req.query.email;

    Owners.find({ email : email },(err, data) =>{
        err ? console.log('There is an error') : res.send(data[0].books); 
            
        
    });

}
///////////////////////////////////////////////////////////////listen/////////////////////////

server.listen(PORT,() => {
    console.log(`listening on ${PORT}`);
});