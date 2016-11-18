'use strict';

/**
 * @ngdoc function
 * @name startApp.Service:Getapiservice
 * @description
 * # Getapi
 * Controller of the startApp
 */

 angular.module('cityVitalityAngularApp')
 .factory('myPledgeService', function ($http, ENV,localStorageService) {
  var obj = {

      checkedneeds: function(params, token) {
      function success (response) {

        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.post(ENV.api_path + "api/v1/checked_needs/"+params.id, params, {headers: {'Authorization': localStorageService.get('auth-token')}}).then(success, failure);

    },
  };

  return obj;
});