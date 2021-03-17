const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();

app.use(express.static(`${__dirname}/dist/${nomeApp}`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});

app.listen(process.env.PORT || 8080);


if (_environment === 'production') {
    app.use(function (req, res, next) {
        if (req.secure) {
            //transform to http:// request
            res.redirect(301, 'http://' + req.headers.host + req.url);   
            next();
        } else {
            next();
        }
    });
}