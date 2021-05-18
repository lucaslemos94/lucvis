const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();

app.use(express.static(`${__dirname}/dist/${nomeApp}`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});

app.use(function(req, res, next) {
    if(!req.secure) {
      return res.redirect('http://lucvis.herokuapp.com/');
    }else if(req.secure){
        return res.redirect('http://lucvis.herokuapp.com/')

    }
    next();
  });

app.listen(process.env.PORT || 8080);