const express = require('express');
const router = express.Router();
const { login, transfer, getTransactions } = require('../controllers/googlePayControllers');

router.post('/login', login);
router.post('/transfer', transfer);
router.get('/transactions/:phoneNum', getTransactions);

// if API is Invalid OR wrong URL 
router.all("/**", function (req, res) {
    res.status(404).send({ status: false, msg: "The api you request is not available" })
  });
  
module.exports = router;
