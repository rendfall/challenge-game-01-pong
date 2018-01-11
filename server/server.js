const express = require('express');
const path = require('path');
const app = express();

const BASE_PATH = path.join(__dirname, '..', 'dist');
const DEFAULT_PORT = 3000;

const appConfig = {
    url: 'localhost',
    protocol: 'http',
    port: process.env.PORT || DEFAULT_PORT
};

app.use(express.static(BASE_PATH));

app.get('/', (req, res) => {
    const entryPoint = `${BASE_PATH}/index.html`;
    res.sendFile(entryPoint);
});

app.listen(appConfig.port, () => {
    console.log(`Listening at ${appConfig.protocol}://${appConfig.url}:${appConfig.port}`);
});
