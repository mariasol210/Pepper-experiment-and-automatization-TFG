const express = require('express')
const app = express()
const port = 5000

const cors = require("cors")
app.use(cors())

let code = '0000';
let repeat = false;

app.get('/api', (req, res) => {
    if (repeat) {
        res.json({repeat})
        repeat=false
    } else {
        res.json({code})
    }

})

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/api', (req, res) => {
code = req.body.q
res.json({mensaje: req.body.q});
});

app.post('/api_repeat', (req, res) => {
    repeat = true
    res.json({mensaje: 'repeat true'});
    });

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})