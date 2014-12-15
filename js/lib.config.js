;(function(){
  'use strict';
  angular.module('libraryApp')
  .config(function($routeProvider){
      $routeProvider
      .when('/books', {
        templateUrl: 'views/table.html',
        controller: 'LibraryAppController',
        controllerAs: 'lib',
        private: true
      })
      .when('/books/new', {
        templateUrl: 'views/form.html',
        controller: 'LibraryAppController',
        controllerAs: 'lib',
        private: true
      })
      .when('/books/:id', {
        templateUrl: 'views/show.html',
        controller: 'ShowController',
        controllerAs: 'show',
        private: true
      })
      .when('/books/:id/edit', {
        templateUrl: 'views/form.html',
        controller: 'EditController',
        controllerAs: 'lib',
        private: true
      })
     })
}());