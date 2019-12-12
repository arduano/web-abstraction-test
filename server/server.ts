import express from 'express';
const bodyparser = require('body-parser');
import { restfulEndpoints } from './restful';

const app = express()
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const port = 8080

let baseUrl = '/api'

//Add endpoints
restfulEndpoints.forEach(endpoint => {
    let appfn = endpoint.method.toLowerCase();
    app[appfn](baseUrl + endpoint.url, endpoint.handler);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))