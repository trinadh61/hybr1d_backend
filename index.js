const express = require('express');
const user_router = require('./routes/userroute')
const body_parser = require('body-parser');
const app = express();
const port =  8080;


app.listen(port, (error) => {
    if(!error){
        console.log('Server started listening on : ' , port);
    }

    else{
        console.log('Server not started', error)
    }
})

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}))
app.use('/user', user_router);