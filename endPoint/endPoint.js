const { roles } = require("../middleWear/authen");


const endpoint={

users:{
signUp:[roles.User],
update:[roles.User],
delete:[roles.User,roles.Admin],
addPic:[roles.User,roles.Admin],
deleteUser:[roles.Admin],



},
product:{
addProduct:[roles.User],
Updateproduct:[roles.User],
deleteproduct:[roles.User,roles.Admin],
like:[roles.User],


},

comment:{
 addcomment:[roles.User],
updateomment:[roles.User],





}






}
module.exports = {endpoint}