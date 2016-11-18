'use strict';

/**
 * @ngdoc function
 * @name startApp.Service:Getapiservice
 * @description
 * # Getapi
 * Controller of the startApp
 */

 angular.module('cityVitalityAngularApp')
 .factory('needsService', function ($http, ENV, Need, localStorageService) {
  var obj = {
    postData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Need.save(params).$promise.then(success, failure);

    },

    getData: function(params) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path + "api/v1/describes/"+params.describe_id+"/goals/"+params.goal_id+"/tasks/"+params.task_id+"/needs", {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

      //return Need.gettasks(params).$promise.then(success, failure);

    },

    getNeeds: function(params) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path + "api/v1/"+params.id+"/fetch_project_details", {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

      //return Need.gettasks(params).$promise.then(success, failure);

    },

    getNeedsList: function(params) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path + "api/v1/describe/"+params.id+"/project_needs", {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

      //return Need.gettasks(params).$promise.then(success, failure);
      // api/v1/describe/43/project_needs

    },

    updateNeeds: function(params) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path + "api/v1/"+params.id+"/fetch_project_details", {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

      //return Need.gettasks(params).$promise.then(success, failure);

    },





    postSuggestionNeed: function(sug_id, params) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.post(ENV.api_path + "api/v1/suggestion_need/"+sug_id, params, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

    getSuggestionNeeds: function(sug_id) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.get(ENV.api_path + "api/v1/"+ sug_id +"/suggestion_needs", {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

    deleteSuggestionNeed: function(sug_id, params, id) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response.data;
      }
      return $http.delete(ENV.api_path + "api/v1/"+ sug_id +"/suggestion_needs/" + id, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

    deleteNeed: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Need.delete_need(params).$promise.then(success, failure);

    },


    pledgeNeed: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.post(ENV.api_path + "api/v1/tasks/"+params.task_id+"/needs/"+params.need_id+"/pledge", params, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

    pledgedUserList: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Need.pledgedUsers(params).$promise.then(success, failure);

    },

    updateNeed_details: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Need.update_need(params).$promise.then(success, failure);

    },
    
    needComments: function(obj,token){
     function success (response) {
      return response;
    }
    function failure (response) {
      return response;
    }
    return $http.get(ENV.api_path +"api/v1/needs/"+obj+"/need_comments", {headers: {'Authorization': localStorageService.get('auth-token')}}).then(success, failure);
  },

  deleteNeedComment: function(obj,token){
    function success (response) {
      return response;
    }
    function failure (response) {
      return response;
    }
    var user_id = localStorageService.get('user_id')
    return $http.delete(ENV.api_path +"api/v1/users/"+user_id+"/needs/"+obj.need_id+"/need_comment/"+obj.id+"", {headers: {'Authorization': localStorageService.get('auth-token')}}).then(success, failure);
  },


  postComment: function(params,data,obj,token){
    function success (response) {
      return response;
    }
    function failure (response) {
      return response;
    }
    var user_id = localStorageService.get('user_id')
    return $http.post(ENV.api_path +"api/v1/users/"+user_id+"/need/"+obj.id+"", {body_description: data.description}, {headers: {'Authorization': localStorageService.get('auth-token')}}).then(success, failure);
  }
};

return obj;
});

