'use strict';

/**
 * @ngdoc function
 * @name startApp.Service:Getapiservice
 * @description
 * # Getapi
 * Controller of the startApp
 */

 angular.module('cityVitalityAngularApp')
 .factory('landservice', function ($http, ENV, Project) {
  var obj = {
    postData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Project.save(params).$promise.then(success, failure);

    },

      getProjectBy: function(params, token) {
      function success (response) {

        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.get(ENV.api_path + "api/v1/describes/"+params.id, {headers: {'Authorization': localStorageService.get('auth-token')}}).then(success, failure);

    },


    getData: function(token) {
      var failure, success;
      success = function(response) {
        return response.data;
      };
      failure = function(response) {
        return response.data;
      };
      return Project.authToken(token).get_projects().$promise.then(success, failure);
    }
  };

  return obj;
});


