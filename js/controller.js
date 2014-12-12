;(function(){
  'use strict';
  angular.module('libraryApp')
  .controller('LoginController', function($scope, $location){
   var vm =  this;
    vm.login =function(){
      var ref = new Firebase("https://librarybookapp.firebaseio.com");

    ref.authWithPassword({
      email : vm.email,
      password : vm.password
    }, function(error, authData) {
      if(error === null){
        console.log('User logged in successfully', authData);
        $location.path('/');
        $scope.$apply();
      }else{
        console.log('Error loggin in user', error);
      }
    });
    }
    vm.register = function(){
      var ref = new Firebase("https://librarybookapp.firebaseio.com"); 
      
      ref.createUser({
        email : vm.email,
        password : vm.password
      }, function(error, authData){
        if(error === null){
          console.log('User created successfully', authData);
          vm.login();
        }else{
          console.log('Error creating user:', error);
        }
      });
     }
     vm.forgotPassword = function(){
      var ref = new Firebase("https://librarybookapp.firebaseio.com"); 
      
      ref.resetPassword({
        email : vm.email
      }, function(error){
        if(error === null){
          console.log('User reset email sent successfully');  
        }else{
          console.log('Error sending password reset email:', error);
        }
      });
     };

   })
  .controller("LogoutController", function($scope, $location) {
      var ref = new Firebase("https://librarybookapp.firebaseio.com"); 
      ref.unauth(function(){
        $location.path('/');
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
    var url = "https://librarybookapp.firebaseio.com/books/" + id + ".json"
   
    libFactory.getLib(id, function(data){
      vm.newBook = data;
    });

    vm.addNewBook = function(){
      libFactory.editLib(id, vm.newBook);
    }
  
    vm.categoryOptions = libFactory.categoryOptions;
    })

    .controller("LibraryAppController", function($http, libFactory) {
    var vm = this;
    libFactory.getAllLib(function(data){
      vm.books = data;
    });

    vm.addNewBook = function(){
     libFactory.createLib(vm.newBook, function(data){
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
})();