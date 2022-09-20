import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./src/router/router";

const app =  express();
const port = 8080;
const DB_URL = 'mongodb://localhost:27017/dbdemo';

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './src/views');
mongoose.connect(DB_URL)
    .then(() => console.log(`DB connected`))
    .catch(err => console.log(err.message));

app.use('/api',router);

app.listen(port, () => {
    console.log(`running at http://localhost:${port}`);
})
