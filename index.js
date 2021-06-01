const Ajv = require("ajv")
const Extent = require("./schemas/extent.schema.json")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

// console.log("Extent=",Extent)

const express = require('express')
const path = require('path')


const app = express()
const port = 3000

app.use(express.json());
app.use(express.static('assets'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/validate', (req, res) => {
    const validate = ajv.compile(Extent)
    let response;

     console.log('Got body:', req.body);
    // const data = {
    //     foo: 1,
    //     bar: "abc"
    // }

    // let obj = { xmin: -9177811, ymin: 4247000, xmax: -9176791, ymax: 4247784, spatialReference: 102100 }

    const valid = validate(req.body)
    if (!valid){
        response = validate.errors;
    } else{
        response = {
            message: "Valid schema"
        }
    }

    res.json(response)

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
