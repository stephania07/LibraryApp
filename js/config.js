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
        controllerAs: 'login',
        resolve: {
          data: function(authFactory){
            authFactory.disallowLogin();
          }
        }
      })
      .when('/changepassword', {
        templateUrl: 'views/changepassword.html',
        controller: 'ChangePasswordController',
        controllerAs: 'changepw',
        private: true
      })
      .when('/logout',{
        template: '',
        controller: 'LogoutController'
      })
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
      .otherwise({redirectTo: '/'});
    })
  .run(function($rootScope, authFactory){
    $rootScope.$on('routeChangeStart', function(event, nextRoute, priorRoute){
      if (nextRoute.$$route && nextRoute.$$route.private){
        authFactory.requireLogin();
      }    
    })
  })
}());