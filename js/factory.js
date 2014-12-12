;(function(){
  'use strict';
  angular.module('libraryApp')
  .factory('libFactory', function(FIREBASE_URL, $http, $location){
     
      function _libsUrl(id){
        if(id){
          return FIREBASE_URL + "/books" + id + ".json";
        }else{
          return FIREBASE_URL + "/books.json";
        }
      }

     function getLib(id, cb) {
       $http.get(_libsUrl(id))
       .success(function(data){
         cb(data);
       })
       .error(function(err){
         console.log(err);
       });
     }
     function editLib(id, lib){
       $http.put(_libsUrl(id), lib)
       .success(function(data){
        $location.path('/');
      })
      .error(function(err){
        console.log(err);
      });
     }
     function getAllLib(cb){
       $http.get(_libsUrl())
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
     }
     function createLib(book, cb){
      $http.post(_libsUrl(), book)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log(err);
        });
     }
     function deleteLib(libId, cb){
        $http.delete(_libsUrl(libId))
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