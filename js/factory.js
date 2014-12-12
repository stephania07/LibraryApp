;(function(){
  'use strict';
  angular.module('libraryApp')
  .constant('FIREBASE_URL', "https://librarybookapp.firebaseio.com" )
  .factory('libFactory', function(FIREBASE_URL, $http, $location){
  
     function getLib(id, cb) {
       var url = FIREBASE_URL + "/books/" + id + ".json";
       $http.get(url)
       .success(function(data){
         cb(data);
       })
       .error(function(err){
         console.log(err);
       });
     }
     function editLib(id, lib){
      var url = FIREBASE_URL + "/books/" + id + ".json";
       $http.put(url, lib)
       .success(function(data){
        $location.path('/');
      })
      .error(function(err){
        console.log(err);
      });
     }
     function getAllLib(cb){
       $http.get(FIREBASE_URL + "/books.json")
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
     }
     function createLib(book, cb){
      $http.get(FIREBASE_URL + "/books.json")
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
     }
     function deleteLib(libId, cb){
       var url = FIREBASE_URL +"/books/" + libId + ".json";    
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