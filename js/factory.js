;(function(){
  'use strict';
  angular.module('libraryApp')
  .factory('libFactory', function($http, $location){
  
     function getLib(id, cb) {
       var url = "https://librarybookapp.firebaseio.com/books/" + id + ".json";
       $http.get(url)
       .success(function(data){
         cb(data);
       })
       .error(function(err){
         console.log(err);
       });
     }
     function editLib(id, lib){
      var url = "https://librarybookapp.firebaseio.com/books/" + id + ".json";
       $http.put(url, lib)
       .success(function(data){
        $location.path('/');
      })
      .error(function(err){
        console.log(err);
      });
     }
     function getAllLib(cb){
       $http.get("https://librarybookapp.firebaseio.com/books.json")
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
     }
     function createLib(book, cb){
      $http.get("https://librarybookapp.firebaseio.com/books.json")
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
     }
     function deleteLib(libId, cb){
       var url = "https://librarybookapp.firebaseio.com/books/" + libId + ".json";    
        $http.delete(url)
        .success(function(){
          cb();
        })
        .error(function(err){
          console.log(err);
        });
     }
      var categoryOptions = {
      fiction: 'Fiction',
      science: 'Science',
      biography: 'Biography'
     };

     return {
       getLib: getLib,
       editLib: editLib,
       getAllLib: getAllLib,
       createLib: createLib,
       deleteLib: deleteLib,
       categoryOptions: categoryOptions
     };
   })
})();