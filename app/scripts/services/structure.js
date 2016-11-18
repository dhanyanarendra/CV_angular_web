'use strict';

/**
 * @ngdoc function
 * @name startApp.Service:Getapiservice
 * @description
 * # Getapi
 * Controller of the startApp
 */

 angular.module('cityVitalityAngularApp')
 .factory('Structureservice', function ($http, ENV, Structure, localStorageService) {
  var obj = {
    deleteGoals: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Structure.deleteGoals(params).$promise.then(success, failure);
    },


    createNewGoal: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Structure.save(params).$promise.then(success, failure);
    },

    createSuggstion: function(des_id, params) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.post(ENV.api_path + "api/v1/"+des_id+"/suggestion_tasks", params, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

    like_sugtasks: function(sug_id, params) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.post(ENV.api_path + "api/v1/"+sug_id+"/task_suggestion/like", params, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

   like_update_tasksuggestion: function(sug_id, task_id) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.put(ENV.api_path + "api/v1/"+sug_id+"/suggestion_like/"+task_id, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

    submitSuggstion: function(des_id, params) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.post(ENV.api_path + "api/v1/"+des_id+"/suggestion_tasks", params, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

    updateSuggstion: function(des_id, task_id, params) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.put(ENV.api_path + "api/v1/"+des_id+"/suggestion_tasks/"+task_id, params, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },


    updateSuggstion_status: function(id) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.put(ENV.api_path + "api/v1/suggestion_status/"+id, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

    deleteSuggestionTask: function(id) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.delete(ENV.api_path + "api/v1/suggestion_tasks/"+id, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

    getSuggstion: function(des_id) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path + "api/v1/"+des_id+"/suggestion_tasks", {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);
    },

    publish: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Structure.publish(params).$promise.then(success, failure);
    },

    reorderGoals: function(params) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.put(ENV.api_path + "api/v1/reorder_goals", {order : params}, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },



    getGoals: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Structure.getgoals(params).$promise.then(success, failure);
    },

    updateGoal: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Structure.updateGoal(params).$promise.then(success, failure);
    }

  };

  return obj;
});
