const express = require("express")
const Article = require("../models/article")

const articleRouter = express.Router()

articleRouter.route("/")

//* ENDPOINTS

.get((req,res, next)=>{
   
    Article.find()
    .then(articles=>{
        res.statusCode=200
        res.setHeader("Content-Type","application/json")
        //res.json will send this information to the client no need to use res.end
        res.json(articles)
    })
    //this allows express to handle the error if there is one
    .catch(err => next(err))
})

.post((req,res, next)=>
{
    //mongoose will already check this to make sure it matches the schema we defined
    Article.create(req.body)
    .then(article=>{
        console.log("article Created", article);
        res.statusCode= 200
        res.setHeader("Content-Type", "application/json")
        res.json(article)
    })
    .catch(err => next(err))
})

//we can leave this as is because put is not an allowed operation on /articles
.put((req,res)=>{
    res.statusCode = 403; 
    res.end("PUT operation not supported on /articles")
})

.delete((req,res, next)=>{
    Article.deleteMany()
    .then(response => {
        res.statusCode= 200
        res.setHeader("Content-Type", "application/json")
        res.json(response)
    })
    .catch(err => next(err))
})

articleRouter.route(`/:articleId`)

.get((req,res, next)=>{
    Article.findById(req.params.articleId)
    .then(article=>{
        console.log("article Created", article);
        res.statusCode= 200
        res.setHeader("Content-Type", "application/json")
        res.json(article)
    })
    .catch(err => next(err))
})

.post((req,res)=>
{
    res.statusCode=403
    res.end(`POST operation not supported on /articles/${req.params.articleId}`)
})

.put((req,res, next)=>{
    Article.findByIdAndUpdate(req.params.articleId, {$set: req.body}, {new: true})
    .then(article =>{
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.json(article)
    }) 
    .catch(err => next(err))
})

.delete((req,res, next)=>{
    Article.findByIdAndDelete(req.params.articleId)
    .then(response =>{
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.json(response)
    }) 
    .catch(err => next(err))
})

module.exports = articleRouter