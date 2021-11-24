const express = require("express")
const { nextTick } = require("process")
const books = require("./books.json")
const app = express()

//app.use(express.json())  


const logger = (permission)=>{
    return (req,res)=>{
       const originalSendFunc = res.send.bind(res)
       res.send = function(body){
           body.name = "vinay"
           console.log(body)
           return originalSendFunc(bofy)
       }
       next()
    }
}
app.use(logger)

app.get("/",(req,res)=>{
    res.send({books})
})



app.post("/books",(req,res)=>{
  
     const newBook = [...books,req.body]
     res.send(newBook)
 

})




app.get("/books/:author",(req,res)=>{
    const newBook = books.filter((book)=>   req.params.author == book.author   )
    res.send(newBook)
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