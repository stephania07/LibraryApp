;(function(){
  'use strict';
	angular.module("libraryApp", ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/table.html',
        controller: 'LibraryAppController',
        controllerAs: 'lib'
      })
      .when('/new', {
        templateUrl: 'views/form.html',
        controller: 'LibraryAppController',
        controllerAs: 'lib'
      })
      .when('/:id', {
        templateUrl: 'views/show.html',
        controller: 'ShowController',
        controllerAs: 'show'
      })
      .when('/:id/edit', {
        templateUrl: 'views/form.html',
        controller: 'EditController',
        controllerAs: 'lib'
      })
      .otherwise({redirectTo: '/'});
    })
    .factory('libFactory', function($http){
      function showLib(id, cb) {
      $http.get("https://librarybookapp.firebaseio.com/books/" + id + ".json")
      .success(function(data){
        cb(data);
      })
      .error(function(err){
        console.log(err);
      });
     }
     
     function getLib(id, cb) {
       var url = "https://librarybookapp.firebaseio.com/books/" + id + ".json"
       $http.get(url)
       .success(function(data){
         cb(data);
       })
       .error(function(err){
         console.log(err);
       });
     }
     return {
       showLib: showLib,
       getLib: getLib
     };
   })
  
    .controller("ShowController", function($routeParams, libFactory) {
      var vm = this;
      var id = $routeParams.id;
      libFactory.getLib(id, function(data){
          vm.book =data;
        });
    })
        
    .controller('EditController', function($http, $routeParams, $location, libFactory){
    var vm = this;
    var id = $routeParams.id;
    var url = "https://librarybookapp.firebaseio.com/books/" + id + ".json"
   
    libFactory.getLib(id, function(data){
      vm.newBook = data;
    });

    vm.addNewBook = function(){
      $http.put(url, vm.newBook)
        .success(function(data){
          $location.path('/')
        })
        .error(function(err){
          console.log(err);
        })
    };

    vm.categoryOptions ={
      fiction: 'Fiction',
      science: 'Science',
      biography: 'Biography'
    };
  })
    .controller("LibraryAppController", function($http) {
    var vm = this;
    
     $http.get("https://librarybookapp.firebaseio.com/books.json")
       .success(function(data){
          vm.books = data;
       })
       .error(function(err){
         console.log(err);
       })


    vm.addNewBook = function(){
      $http.post("https://librarybookapp.firebaseio.com/books.json", vm.newBook)
      .success(function(data){
        vm.books[data.name] = vm.newBook;
        vm.newBook = _freshBook();
      })
      .error(function(err){
        console.log(err);
      });
    };
    	
    vm.removeLib = function(libId) {
      var url = "https://librarybookapp.firebaseio.com/books/" + libId + ".json";
      $http.delete(url)
        .success(function(){
          delete vm.books[lib];
        })
        .error(function(err){
          console.log(err);
        });
    };

    vm.newBook = _freshBook();

    vm.categoryOptions = {
    	fiction: 'Fiction',
    	science: 'Science',
    	biography: 'Biography'
    };

    function _freshBook(){
    	return {
    		category: 'Fiction'
    	}
    }
	});				
})();
