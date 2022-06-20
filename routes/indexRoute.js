const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const expressValidator = require('express-validator')
router.use(expressValidator())

// exposing the schema model to other files
const Index = require('../models/indexModel');

// get route for the index page
router.get('/', function(req, res){
  res.render('index');
});

// post route for the index page
router.post('/index', function(req, res){
  
  const email = req.body.email;
  const password = req.body.password;

  req.checkBody('email', 'Email is required').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();

  let errors = req.validationErrors();

  if(errors){
    res.render('index', {
      errors: errors
    });
  } else {
    let newUser = new Index({
      email: email,
      password: password
    });
      
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          logger.error(err);
        }
        newUser.password = hash;

        newUser.save(function(err){
          if(err) {
            logger.error(err);
            return;
          } else {
            req.flash('success', 'You are now registered and can log in');
            res.redirect('/index');
          }
        });
      });
    })
  }
});

module.exports = router;