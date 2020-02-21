const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes')

//Mongo DB String Connection
mongoose.connect('mongodb+srv://brayner:130212@cluster0-1cppz.mongodb.net/devradar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(express.json())
app.use(routes)
app.listen(3333);

