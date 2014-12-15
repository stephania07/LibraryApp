;(function(){
  'use strict';
  angular.module('libraryApp')
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