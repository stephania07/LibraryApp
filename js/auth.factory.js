;(function(){
  'use strict';
  angular.module('libraryApp')
  .factory('authFactory', function($rootScope, $location, FIREBASE_URL){
    var factory ={},
    ref = new Firebase(FIREBASE_URL);
  $rootScope.user = ref.getAuth();

  factory.requireLogin = function(){
    if(!_isLoggedIn()){
      $location.path('/login');
    }else if(hasTemporaryPassword()){
      $location.path('/changepassword');
    }
  };
  factory.disallowLogin = function(){
    if(_isLoggedIn()) {
      $location.path('/lib');
    }
  };
  function _isLoggedIn(){
    return Boolean(ref.getAuth());
  }
  function hasTemporaryPassword(){
    return ref.getAuth().password.isTemporaryPassword;
  }

  factory.changePassword = function(oldpass, newpass, cb) {
    ref.changePassword({
    email   : ref.getAuth().password.email,
    oldPassword : oldpass,
    newPassword : newpass,
  }, function(error) {
      if (error === null) {
      console.log("Password changed successfully");
      cb();
      }else{
      console.log("Error changing password:", error);
      }
    });
  };
  factory.login = function(email, pass, cb){
    ref.authWithPassword({
      email : email,
      password : pass
    },function(error, authData){
      if(error === null){
      console.log('User logged in successfully', authData);
      $rootScope.user = authData;
  ref.child('users').child(authData.uid).child('authData').set(authData);
      cb();
      }else{
       console.log('Error loggin in user', error);
      }
    });
  };
  
  factory.logout = function(cb){
    ref.unauth(function(){
      $rootScope.user = null;
      cb();
    });
  };
  factory.register = function(email, pass, cb){
    ref.createUser({
      email: email,
      password : pass
    }, function(error, authData){
      if(error === null) {
        console.log('User created successfully', authData);
        cb();
      }else{
        console.log('Error creating user:', error);
      }
    });
  };
  factory.resetPassword = function(email){
    ref.resetPassword({
      email: email
    }, function(error){
      if(error === null) {
        console.log('password reset email sent successfully');
        cb();
      }else{
        console.log('Error sending password reset email:', error);
      }
    });
  };
  return factory;
})
}());