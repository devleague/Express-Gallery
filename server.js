const express = require('express');
const bp = require('body-parser');

const PORT = process.env.EXPRESS_CONTAINER_PORT || 8080;

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('sanity check');
});

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
});

