const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const multer  = require('multer');
const fs = require('fs');

const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();


const storage = multer.diskStorage({
    destination: './public/users',
    filename: function (req, file, cb) {
        switch (file.mimetype) {
            case 'image/jpeg':
                ext = '.jpeg';
                break;
            case 'image/png':
                ext = '.png';
                break;
        }
        cb(null, file.originalname + ext);
    }
});

const upload = multer({storage: storage});

app.use(upload.single('photo'));

app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/photo', (req, res) => {
    let base64Data = req.body.photo.replace(/^data:image\/png;base64,/, "");
    // console.log(JSON.stringify(req.body.photo)) // form fields
    let rand = Math.floor(Math.random() * 99999) + 1;
    fs.writeFile(`./uploads/${rand}-out.png`, base64Data, 'base64', (err) => {
        // console.log(`${rand} Done Yo`);
        const fileName = `./uploads/${rand}-out.png`;
        client
            .webDetection(fileName)
            .then(results => {
                res.send(JSON.stringify({ results: results }));
                // console.log(results);
                // const properties = results[0].imagePropertiesAnnotation;
                // const colors = properties.dominantColors.colors;
                // colors.forEach(color => console.log(color));
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    });
});

app.listen(5000, () => console.log('Example app listening on port 3000!'))