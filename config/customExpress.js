const express = require('express');
const consign = require('consign');
const bodyparser = require('body-parser');

module.exports = () => {

    const app = express();

    app.use(bodyparser.urlencoded({extended: true}));
    app.use(bodyparser.json());

    consign().include('controller').into(app);

    return app

}