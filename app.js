const express = require('express');
require('dotenv').config(true);
const helmet = require('helmet');
const app = express();
const indexRoute = require('./Routes/indexRoute');

app.use(helmet());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api',indexRoute);

app.use('*',async(req,res,next) => {
    res.status(404).json({message: `Url not found.`})
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err.message || 'Something went wrong!' });
});

app.listen(port,() => {
    console.log(`App is listening on port ${port}...`);
});

module.exports = app;