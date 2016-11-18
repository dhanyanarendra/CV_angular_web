angular.module('cityVitalityAngularApp')
 .factory('taskService', function ($http, ENV, Task, localStorageService) {
  var obj = {

    showtaskdetails: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Task.showtaskdetails(params).$promise.then(success, failure);
    },

    createNewTask: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Task.save(params).$promise.then(success, failure);
    },


    reorderTasks: function(id, params) {
      function success (response) {
        return response.data;
      }
      function failure (response) {
        return response.data;
      }
      return $http.put(ENV.api_path + "api/v1/reorder_tasks/"+id, {order : params}, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },


     deleteTask: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Task.delete_task(params).$promise.then(success, failure);
    },

    taskDetails: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Task.task_details(params).$promise.then(success, failure);
    },

    getTasks: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return Task.gettasks(params).$promise.then(success, failure);
    }

  };

  return obj;
});

