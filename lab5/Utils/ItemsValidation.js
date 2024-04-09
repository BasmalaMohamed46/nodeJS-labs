const Ajv= require('ajv');
const ajv = new Ajv();

let ItemSchema={
    type:"object",
    properties:{
        Name:{type:"string", "minLength":3},
        Price:{type:"number", "minimum":1},
        Description:{type:"string", "minLength":5}
    },
    required:["Name", "Price", "Description"],
    additionalProperties:false 
}
module.exports = ajv.compile(ItemSchema);