'use strict';

require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const BookHandler = require('./Modules/mangoose-book');
const addBookHandler = require('./Modules/addBookHandler');
const deletebooksHandler = require("./Modules/DeleteBooks");
const updatebooksHandler = require("./Modules/updateBooks");


const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT;

///////////////////////////////////////////routes////////////////////////

//localhost:3001
server.get('/', HomePage);

//localhost:3001/books
server.get('/books', BookHandler.BookHandler);

//localhost:3001/addBooks
server.post('/addBooks', addBookHandler);

//localhost:3001/deletebooks
server.delete('/deletebooks/:id', deletebooksHandler)

//localhost:3001/updatebooks
server.put("/updatebooks/:id", updatebooksHandler);



///////////////////////////////////////////////////////////


function HomePage (req,res){
    res.send('Home Page');
};


///////////////////////////////////////////////////////////////listen/////////////////////////

server.listen(PORT,() => {
    console.log(`listening on ${PORT}`);
});