const router = require('express').Router();
const homeRoute = require('./homeRoute.js');
const dashboardRoute = require('./dashboardRoute.js');
const apiRoute = require('./api');

router.use('/', homeRoute);
router.use('/dashboard', dashboardRoute);
router.use('/api', apiRoute);

module.exports = router;