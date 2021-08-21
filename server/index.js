import express from 'express';
import dotenv from 'dotenv';
import db from './database/db.js';
import router from './api/api.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use('/api',router);


const URL = `mongodb://${username}:${password}@pharmacy-shard-00-00.t15sn.mongodb.net:27017,pharmacy-shard-00-01.t15sn.mongodb.net:27017,pharmacy-shard-00-02.t15sn.mongodb.net:27017/PHARMACY?ssl=true&replicaSet=atlas-2y4237-shard-0&authSource=admin&retryWrites=true&w=majority`
db(URL);

app.listen(5000,() => {
    console.log('server is up and running on port 5000');
})