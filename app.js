const express = require('express');
const app = express();
const Joi = require('joi');


app.use(express.json());

const books = [
      {
        "id": 1,
        "name": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "publisher": "J. B. Lippincott & Co."
      },
      {
        "id": 2,
        "name": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "publisher": "Charles Scribner's Sons"
      },
      {
        "id": 3,
        "name": "One Hundred Years of Solitude",
        "author": "Gabriel García Márquez",
        "publisher": "Editorial Sudamericana"
      },
      {
        "id": 4,
        "name": "1984",
        "author": "George Orwell",
        "publisher": "Secker & Warburg"
      },
      {
        "id": 5,
        "name": "Animal Farm",
        "author": "George Orwell",
        "publisher": "Secker & Warburg"
      }
    ];
  

// CRUD operations


// Post - Create
app.post('/api/books',(req,res) => {
    
    const { error } = validateBook(req.body)
    if(error) return res.status(404).send(error.details[0].message);


    const book = {
        id : books.length + 1,
        name : req.body.name, 
        author : req.body.author,
        publisher : req.body.publisher
    }; 

    books.push(book);
    res.send(books);
});




// Get - Read
app.get('/',(req,res) => {
    res.send('Welcome to the library');
});

app.get('/api/books',(req,res)=>{
    res.send(books);
});

app.get('/api/books/:id',(req,res)=>{
    const book = books.find(b => b.id === parseInt(req.params.id));
    
    if(!book) return res.status(404).send('The book with the given id does not exist');
    res.send(book);
});



// Put - Update
app.put('/api/books/:id',(req,res) => {
    
    // Validate existence of book with given id
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) res.status(404).send('The book with the given id does not exist');

    // Validate the updated entry
    const { error } = validateBook(req.body)
    if(error) return res.status(404).send(error.details[0].message);

    // Update and return the entry if it exists
    book.name = req.body.name;
    res.send(`Updated object - ${JSON.stringify(book)}`);
});



// Delete
app.delete('/api/books/:id',(req,res)=>{
    // Validate existence of book with given id
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) res.status(404).send('The book with the given id does not exist');

    // Delete and return
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(`Object - ${JSON.stringify(book)} \n is being deleted.....`);
});



function validateBook(book){
    const schema = Joi.object({
        name : Joi.string().min(1).required(),
        author : Joi.string().min(1).required(),
        publisher : Joi.string().min(1).required()
    });

    const { error } = schema.validate(book);
    return { error };
}



const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening at port ${port}....`));