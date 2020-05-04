
var user = require('./routes/user')
var resource = require('./routes/resource')
//export this router to use in our index.js
module.exports = {
    user : user,
    resource:resource
};