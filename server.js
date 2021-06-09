const { port } = require('./config.json');
const middleware = require('./middleware/middleware');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb+srv://Gosha:lzk56gk5@cluster0.hxqey.mongodb.net/sign?retryWrites=true&w=majority', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('Connect to DB');
})
.catch(() => {
    process.exit(1);
});

app.use(middleware);

app.listen(port, () => {
    console.log('Server listen in port -', port);
});