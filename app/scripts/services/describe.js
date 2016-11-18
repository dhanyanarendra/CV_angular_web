'use strict';

/**
 * @ngdoc function
 * @name startApp.Service:Getapiservice
 * @description
 * # Getapi
 * Controller of the startApp
 */

 angular.module('cityVitalityAngularApp')
 .factory('describeService', function ($http, ENV, Project,localStorageService) {
  var obj = {
    postData: function(params, token) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Project.authToken(token).save(params).$promise.then(success, failure);

    },
    getProjectById: function(params, token) {
      function success (response) {

        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.get(ENV.api_path + "api/v1/describes/"+params.id, {headers: {'Authorization': localStorageService.get('auth-token')}}).then(success, failure);

    },

    likeProjects: function(params, token) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Project.authToken(token).likeProjects(params).$promise.then(success, failure);

    },

    followProjects: function(params, token) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Project.authToken(token).followProjects(params).$promise.then(success, failure);

    },

    postComment: function(params,data,token){

      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      var user_id = localStorageService.get('user_id')
      return $http.post(ENV.api_path +"api/v1/"+user_id+"/describe/"+params.id+"", {comment_body: data.description}, {headers: {'Authorization': localStorageService.get('auth-token')}}).then(success, failure);
    },

    getComment: function(){
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      var describe_id = localStorageService.get('describe_id')
      return $http.get(ENV.api_path +"api/v1/describe/"+describe_id+"/comments", {headers: {'Authorization': localStorageService.get('auth-token')}}).then(success, failure);

    },
      deleteComment: function(params){
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      var user_id = localStorageService.get('user_id')
      var describe_id = localStorageService.get('describe_id')
      return $http.delete(ENV.api_path +"api/v1/users/"+user_id+"/describe/"+describe_id+"/comment/"+params.id+"", {headers: {'Authorization': localStorageService.get('auth-token')}}).then(success, failure);

    },
     searchProjects: function(params){
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.post(ENV.api_path +"api/v1/search", {query: params}, {headers: {'Authorization': localStorageService.get('auth-token')}}).then(success, failure);
    },

    updateProject: function(projectParams, token) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Project.authToken(token).updateDetails(projectParams).$promise.then(success, failure);

    }
  };
  return obj;
});