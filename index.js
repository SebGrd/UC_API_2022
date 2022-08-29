const {validateUrl} = require('./utils/validators');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 2001;
const {ChefsManager} = require('./managers/ChefsManager');
const {MenusManager} = require("./managers/MenusManager");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.post('/chefs', async function (req, res) {
    // I would have used multer for image uploading but since an url is enough for this exercise I decided to stick with it
    const {firstname, lastname, description, imageUrl} = req.body;

    // Checking for valid url (if provided)
    if (imageUrl.length > 0 && !validateUrl(imageUrl)) {
        return res.status(400).send('Image URL must be a valid URL');
    }

    const chefsManager = new ChefsManager({
        firstname,
        lastname,
        description,
        imageUrl: imageUrl || 'https://dummyimage.com/300x300/cfcfcf/5e5e5e',
    });
    try {
        const json = await chefsManager.save();
        res.send(json);
    } catch (e) {
        console.error('Chef insertion error :');
        console.error(e);
    }
});

app.get('/chefs', async function (req, res) {
    const chefsManager = new ChefsManager();
    try {
        const json = await chefsManager.getChefs()
        res.status(200).json(json);
    } catch (e) {
        console.error('Error server');
        console.error(e);
    }
});

app.delete('/chefs/:id', async (req, res) => {
    const {id} = req.params;
    const chefsManager = new ChefsManager();
    try {
        const json = await chefsManager.delete(id);
        res.status(200).json(json);
    } catch (e) {
        console.error(e);
    }
});

app.put('/chefs/:id', async (req, res) => {
    const {id} = req.params;
    const {firstname, lastname, description, imageUrl} = req.body;
    if (imageUrl.length > 0 && !validateUrl(imageUrl)) {
        return res.status(400).send('Image URL must be a valid URL');
    }

    const chefsManager = new ChefsManager();
    try {
        const json = await chefsManager.update(
            id,
            {
                firstname,
                lastname,
                description,
                imageUrl: imageUrl || 'https://dummyimage.com/300x300/cfcfcf/5e5e5e',
            }
        );
        res.status(200).json(json);
    } catch (e) {
        console.error(e);
    }
});

// MENUS

app.get('/menus', async (req, res) => {
    const menusManager = new MenusManager();
    try {
        const json = await menusManager.getMenus();
        res.status(200).json(json);
    } catch (e) {
        console.error(e);
    }
});

app.post('/menus', async (req, res) => {
    const {title, chef, starter, plate, dessert} = req.body;
    const menusManager = new MenusManager({title, chef, starter, plate, dessert});
    try {
        const json = await menusManager.save();
        res.status(200).json(json);
    } catch (e) {
        console.error(e);
    }
});

app.listen(port, () => {
    console.log(`LBA_usecase listening on port ${port}`)
})

