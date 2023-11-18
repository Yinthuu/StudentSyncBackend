const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/noti', notificationController.createNoti);
router.get('/noti/:userid', notificationController.getNotiByUser);

module.exports = router;