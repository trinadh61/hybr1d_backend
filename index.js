const express = require('express');

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