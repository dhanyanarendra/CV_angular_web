'use strict';

/**
 * @ngdoc function
 * @name startApp.Service:Getapiservice
 * @description
 * # Getapi
 * Controller of the startApp
 */

 angular.module('cityVitalityAngularApp')
 .factory('signinService', function ($http, ENV, Member, resetPassword) {
  var obj = {
    getData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;       
      }
      return Member.save(params).$promise.then(success, failure);
    },


    postData: function(params) {
     function success (response) {
      return response;
    }
    function failure (response) {
      return response;
    }
    return resetPassword.forgot_password(params).$promise.then(success, failure);
  },


  putData: function(params) {
    function success (response) {
      return response;
    }
    function failure (response) {
      return response;
    }
    return resetPassword.reset_password(params).$promise.then(success, failure);
  }

};

return obj;
});
 