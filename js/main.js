;(function(){
  'use strict';
	angular.module("libraryApp", [])
  .controller("LibraryAppController", function() {
    var vm = this;
    vm.books = [
      {
      	image: 'http://eloquentjavascript.net/img/cover.png',
      	title: 'Eloquent JavaScript',
      	author: 'Marijn Haverbeke',
      	price: '$28.03',
      	category: 'Science'
      },
      {
      	image: 'http://ecx.images-amazon.com/images/I/617LMuOkVWL._SL1000_.jpg',
      	title: 'A Smarter Way to Learn JavaScript',
      	author: 'Mark Myers',
      	price: '$19.00',
      	category: 'Science'
      },
      {
      	image: 'http://i.imgur.com/POdp47Yb.jpg',
      	title: 'The Alchemist',
      	author: 'Paulo Coelho',
      	price: '$17.31,',
      	category: 'Fiction'
      },
    ];
    vm.addNewBook = function(){
    	vm.books.push(vm.newBook);
    	vm.newTask = null;
    };
    vm.removeLib = function(lib) {
      var index =  vim.books.indexOf(lib);
      vim.books.splice(index, 1);
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
