'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name:String,
    description:String,
    category:String,
    year:Number,
    langs:String,
    image:String
});
                                // la lo pluraliza y lo pone en minuscular
module.exports = mongoose.model('Project', ProjectSchema);