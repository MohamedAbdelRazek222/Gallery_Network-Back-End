const { endPoint } = require('../../endPoint/end.Point');
const { authen } = require('../../middleWear/authen');
const { getAllUsers, changeRole, blockuser } = require('./controller/admin.controller');

const router=require('express').Router();


router.get('/getAllusers',authen(endPoint.admin.getAllUsers),getAllUsers)
router.patch('/blockusers/:id',authen(endPoint.admin.changeRole),blockuser)







module.exports=router