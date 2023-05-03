
const express=require('express');
const router=express.Router();
const {table,getdata}=require('../controller/userController');

router.route('/table').get(table);
router.route('/get_data').get(getdata);

module.exports = router;