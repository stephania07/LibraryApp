;(function(){
  'use strict';
  angular.module('libraryApp')
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
})();