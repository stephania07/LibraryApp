;(function(){
  'use strict';
  angular.module('libraryApp')
  .config(function($routeProvider){
      $routeProvider
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
      .when('/logout',{
        template: '',
        controller: 'LogoutController'
      })
      .when('/changepassword', {
        templateUrl: 'views/changepassword.html',
        controller: 'ChangePasswordController',
        controllerAs: 'changepw',
        private: true
      })   
    }) 
  .run(function($rootScope, authFactory){
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, priorRoute){
      if (nextRoute.$$route && nextRoute.$$route.private){
        authFactory.requireLogin();
      }    
    })
  })
}());