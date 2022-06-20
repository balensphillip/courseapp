const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')
const expressValidator = require('express-validator')
router.use(expressValidator())

// Register model
const Register = require('../models/registerModel');

router.get('/register', function(req, res){
  res.render('register');
});

// Registration process
router.post('/register', function(req, res){
  
  const fullname = req.body.fullname;
  const email = req.body.email;
  const course = req.body.course;
  const phonenumber = req.body.phonenumber;
  const gender = req.body.gender;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  
  req.checkBody('fullname', 'Fullname is required').notEmpty();
  req.checkBody('email', 'Email is required').isEmail();
  req.checkBody('course', 'Course is required').notEmpty();
  req.checkBody('phonenumber', 'Phonenumber is required').notEmpty();
  req.checkBody('gender', 'Gender is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('confirmpassword', 'Confirm password is required').notEmpty();

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors: errors
    });
  } 
  else {
    let newUser = new Register({
      fullname: fullname,
      email: email,
      course: course,
      phonenumber: phonenumber,
      gender: gender,
      password: password,
      confirmpassword: confirmpassword
    });
    // password encryption
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          logger.error(err);
          return;
        }
        else{
          newUser.password = hash;
        }
        
        newUser.save(function(err){
          if(err) {
            logger.error(err);
            return;
          } 
          else {
            req.flash('success', 'You are now registered and able to log in');
            res.redirect('/index');
          }
        });
      });
    })
  }
});

module.exports = router;