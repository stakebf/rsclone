const router = require('express').Router();
const { OK } = require('http-status-codes');
const loginService = require('./login.service');
const catchErrors = require('../../errors/catchError');

router.route('/').post(
  catchErrors(async (req, res) => {
    const { login, password } = req.body;
    const loginData = await loginService.loginUser(login, password);
    res.status(OK).json(loginData);
  })
);

module.exports = router;
