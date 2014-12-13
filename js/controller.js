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
    }else if(_hasTemporaryPassword()){
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
  .controller("ChangePasswordController", function(authFactory, $scope, $location){
    var vm = this;
    vm.changePassword = function(){
      authFactory.changePassword(vm.oldPassword, vm.newPassword, function(){
        $location.path('/logout');
        $scope.$apply();
      })
    };
  })
  .controller("LoginController", function(authFactory, $scope, $location){
   var vm =  this;
    vm.login =function(){
      authFactory.login(vm.email, vm.password, function(){
        $location.path('/lib');
        $scope.$apply();
      });
    };
  
    vm.register = function(){
      authFactory.register(vm.email, vm.password, function(){
        vm.login();
      });
     };
     vm.forgotPassword = function(){
       authFactory.resetPassword(vm.email);
     };

   })
  .controller("LogoutController", function($scope, $location, authFactory) {
      authFactory.logout(function(){
        $location.path('/login');
        $scope.$apply();

        });
    })
      
  .controller("ShowController", function($routeParams, libFactory) {

      var vm = this;
      var id = $routeParams.id;
      libFactory.getLib(id, function(data){
          vm.book =data;
        });
    })
        
  .controller('EditController', function($routeParams, libFactory){

    var vm = this;
    var id = $routeParams.id;
    
   
    libFactory.getLib(id, function(data){
      vm.newBook = data;
    });

    vm.addNewBook = function(){
      libFactory.editLib(id, vm.newBook);
    };
  
    vm.categoryOptions = libFactory.categoryOptions;
    })

    .controller("LibraryAppController", function(libFactory) {
       var vm = this;
        libFactory.getAllLib(function(data){
        vm.books = data;
        });
    

    vm.addNewBook = function(){
     libFactory.createLib(vm.newBook, function(data){
          vm.books = vm.books || {};
          vm.books[data.name] = vm.newBook;
          vm.newBook = _freshBook();
       });
     };
    	
    vm.removeLib = function(libId) {
      libFactory.deleteLib(libId, function(){
        delete vm.books[libId];
      });
    };

    vm.newBook = _freshBook();

    vm.categoryOptions = libFactory.categoryOptions;

    function _freshBook(){
    	return {
    		category: 'Fiction'
    	};
    }
	});				
}());