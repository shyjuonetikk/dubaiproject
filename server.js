const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

const port = process.env.PORT || 5000;

//BodyParser Middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect Mongo Db
mongoose
    .connect(db)
    .then(() => console.log('Mongo Db connected..'))
    .catch(err => console.log(err));

// Use Api routes
app.use('/api/items', items);

//Serve static assests if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'./client/build/index.html'));
    });
}


app.listen(port, () => console.log(`Server started on port ${port}`));
