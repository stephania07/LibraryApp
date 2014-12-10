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
        date:  '2/2/2014',
      	category: 'Science'
      },
      {
      	image: 'http://ecx.images-amazon.com/images/I/617LMuOkVWL._SL1000_.jpg',
      	title: 'A Smarter Way to Learn JavaScript',
      	author: 'Mark Myers',
      	price: '$19.00',
        date:   '2/3/2014',
      	category: 'Science'
      },
      {
      	image: 'http://i.imgur.com/POdp47Yb.jpg',
      	title: 'The Alchemist',
      	author: 'Paulo Coelho',
      	price: '$17.31,',
        date:  '1/1/2014',
      	category: 'Fiction'
      },
    ];
    vm.addNewBook = function(){
    	vm.books.push(vm.newBook);
    	vm.newTask = null;
    };
    vm.removeLib = function(lib) {
      var index =  vm.books.indexOf(lib);
      vm.books.splice(index, 1);
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
