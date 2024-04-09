const Ajv= require('ajv');
const ajv = new Ajv();

let OrdersSchema = {
    type: "object",
    properties:{
        TotalPrice:{type: "number", "minimum":1},
        Items:{type: "array"}
   },
   required:["TotalPrice", "Items"],
   additionalProperties:false
}
module.exports = ajv.compile(OrdersSchema); 