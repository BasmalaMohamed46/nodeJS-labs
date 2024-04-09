const Ajv= require('ajv');
const ajv= new Ajv();

let UserSchema={
    type:"object",
    properties:{
        Name:{type:"string", "minLength":3},
        Age:{type:"integer", "minimum":10},
        Address:{type:"string", "minLength":5},
        Email:{type:"string"},
        Password:{type:"string", "minLength":6}
    },
    required:["Name", "Age", "Address", "Email", "Password"],
    additionalProperties:false
}
module.exports = ajv.compile(UserSchema);