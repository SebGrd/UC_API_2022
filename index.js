const express = require('express');
const cors = require('cors');
const app = express();
const port = 2001;
const { ChefsManager } = require('./managers/ChefsManager');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.post('/chefs', async function(req, res) {
    const { firstname, lastname, description } = req.body;
    const chefsManager = new ChefsManager({ firstname, lastname, description });
    try {
        const json = await chefsManager.save();
        res.send(json);
    } catch (e) {
        console.error('Chef insertion error :');
        console.error(e);
    }
});

app.get('/chefs', async function(req, res) {
    const chefsManager = new ChefsManager();
    try {
        const json = await chefsManager.getChefs()
        res.status(200).json(json);
    } catch (e) {
        console.error('Error server');
        console.error(e);
    }
});


app.listen(port, () => {
    console.log(`LBA_usecase listening on port ${port}`)
})

