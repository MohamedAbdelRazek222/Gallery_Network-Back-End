const { roles } = require("../middleWear/authen");

const endPoint={

user:{
diplayProfile:[roles.Admin,roles.User],
logOut:[roles.Admin,roles.User]
},
post:{

    createofthePost:[roles.Admin,roles.User]

},
admin:{
getAllUsers:[roles.Admin,roles.User],
changeRole:[roles.Admin,roles.User,roles.Hr],


}





}

module.exports = {endPoint}