const mongoose = require("mongoose")
//setting up a shorthand for accessing mongoose.Schema this is not absolutely necessary 
const Schema = mongoose.Schema

const articleSchema= new Schema({
    title:{
        type: String, 
        required: true, 
        unique: true
    }, 
    documentationLink:{
        type: String, 
        required: true, 
    }, 
    summary:{
        type: Array, 
        required: true, 
    }, 
    relatedArticles:{
        type:Array 
    }, 
    additionalResources:{
        type: Array
    },
    iconName:{
        type:String
    }, 
    iconType:{
        type:String
    }
}, 
{
    timestamps: true
}
)


//* Create model from a schema

//mongoose.model returns a constructor function
const article= mongoose.model("article", articleSchema)

module.exports = article