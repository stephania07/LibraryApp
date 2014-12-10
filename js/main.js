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
      .otherwise({redirectTo: '/'});
    })
    .controller("ShowController", function($http, $routeParams) {
    var vm = this;
    var id = $routeParams.id;
     $http.get("https://librarybookapp.firebaseio.com/books/" + id + ".json")
       .success(function(data){
          vm.books = data;
       })
       .error(function(err){
         console.log(err);
     })
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
