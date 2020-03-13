const express = require('express');
const cors = require('cors');
const handle = require('./handlers')
const routes = require('./routes');
const db = require('./models')
require('dotenv').config()
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.ENV_Port || 5000;
app.get('/', (req, res) => res.send('hallo'));
app.use('/api/auth', routes.auth);
app.use('/api/poll',routes.poll)
app.use(handle.notFound);
app.use(handle.error);

app.listen(port, () => {
    console.log(`server has been created on ${port}`);
    
})