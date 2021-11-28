const express = require("express")
//const { nextTick } = require("process")
const books = require("./books.json")
const app = express()

function logger(req,res,next){
    req.bb= {"api_requested_by":"vinay"};
    next();
}

app.use(express.json())  

//logger not working 

/*
const authorise = (permission) => {
    return (req, res, next) => {
      const originalSendFunc = res.send.bind(res);
      res.send = function (body) {
        body.name = "Nrupul Dev";
        console.log(body); // do whatever here
        return originalSendFunc(body);
      };
      next();
    };
  };
  
  app.use(authorise)
*/


app.get("/",logger,(req,res)=>{
   req.bb.books = books;
    res.send(req.bb)
})



app.post("/books",(req,res)=>{
  
     const newBook = [...books,req.body]
     res.send(newBook)
 

})




app.get("/books/:author",logger,(req,res)=>{
    const newBook = books.filter((book)=>   req.params.author == book.author   )
   req.bb.book = newBook
   req.bb["api_requested_by"] = newBook[0].author
   
    res.send(req.bb)
})



app.patch("/books/:author",(req,res)=>{
    const newBooks = books.map((book)=>{
        if(req.params.author == book.author){
            return req.body
        }
        return book
    })
    res.send(newBooks)
})

app.delete("/:author",(req,res)=>{
    const newBooks = books.filter((book)=>    req.params.author != book.author)
    res.send(newBooks)
})

app.listen(3456,()=>{
    console.log("listing on port 3456")
})