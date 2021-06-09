const { port, mongoUri } = require('./config.json');
const middleware = require('./middleware/middleware');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect(mongoUri, 
{
    useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
.then(() => {
    console.log('Connect to DB');
})
.catch((e) => {
    console.log(e);
    process.exit(1);
});

app.use(middleware);

app.listen(port, () => {
    console.log('Server listen in port -', port);
});