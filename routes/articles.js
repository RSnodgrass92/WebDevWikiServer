const express = require("express")
const Article = require("../models/article")
const cors= require('./cors')

const articleRouter = express.Router()

//* ENDPOINTS
articleRouter.route("/")
.options(cors.corsWithOptions, (req,res)=>res.sendStatus(200))
.get(cors.cors, (req,res, next)=>{
   
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

.post(cors.corsWithOptions,(req,res, next)=>
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
.put(cors.corsWithOptions,(req,res)=>{
    res.statusCode = 403; 
    res.end("PUT operation not supported on /articles")
})

.delete(cors.corsWithOptions,(req,res, next)=>{
    Article.deleteMany()
    .then(response => {
        res.statusCode= 200
        res.setHeader("Content-Type", "application/json")
        res.json(response)
    })
    .catch(err => next(err))
})

articleRouter.route(`/:articleId`)
.options(cors.corsWithOptions, (req,res)=>res.sendStatus(200))
.get(cors.cors,(req,res, next)=>{
    Article.findById(req.params.articleId)
    .then(article=>{
        console.log("article Created", article);
        res.statusCode= 200
        res.setHeader("Content-Type", "application/json")
        res.json(article)
    })
    .catch(err => next(err))
})

.post(cors.corsWithOptions,(req,res)=>
{
    res.statusCode=403
    res.end(`POST operation not supported on /articles/${req.params.articleId}`)
})

.put(cors.corsWithOptions,(req,res, next)=>{
    Article.findByIdAndUpdate(req.params.articleId, {$set: req.body}, {new: true})
    .then(article =>{
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.json(article)
    }) 
    .catch(err => next(err))
})

.delete(cors.corsWithOptions,(req,res, next)=>{
    Article.findByIdAndDelete(req.params.articleId)
    .then(response =>{
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.json(response)
    }) 
    .catch(err => next(err))
})

module.exports = articleRouter