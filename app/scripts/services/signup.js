'use strict';

/**
 * @ngdoc function
 * @name startApp.Service:Getapiservice
 * @description
 * # Getapi
 * Controller of the startApp
 */

 angular.module('cityVitalityAngularApp')
 .factory('signupService', function ($http, ENV, User) {
  var obj = {
    getData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;  
      }
      return User.save(params).$promise.then(success, failure);
    }
  };
  return obj;
});

