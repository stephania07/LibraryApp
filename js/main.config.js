;(function(){
  'use strict';
  angular.module('libraryApp')
  .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html',
      })
      .otherwise({redirectTo: '/'});
    })
}());