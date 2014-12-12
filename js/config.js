;(function(){
  'use strict';
  angular.module('libraryApp')
  .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html',
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .when('/logout',{
        template: '',
        controller: 'LogoutController'
      })
      .when('/books', {
        templateUrl: 'views/table.html',
        controller: 'LibraryAppController',
        controllerAs: 'lib'
      })
      .when('/books/new', {
        templateUrl: 'views/form.html',
        controller: 'LibraryAppController',
        controllerAs: 'lib'
      })
      .when('/books/:id', {
        templateUrl: 'views/show.html',
        controller: 'ShowController',
        controllerAs: 'show'
      })
      .when('/books/:id/edit', {
        templateUrl: 'views/form.html',
        controller: 'EditController',
        controllerAs: 'lib'
      })
      .otherwise({redirectTo: '/'});
    })
})();