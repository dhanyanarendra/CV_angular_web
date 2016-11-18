'use strict' ;


angular.module('cityVitalityAngularApp')
.factory('FollowProjectsService', function ($http, ENV,localStorageService,FollowedProjects) {

  var obj = {
    getProjectsList: function() {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return FollowedProjects.showList().$promise.then(success, failure);

    }
  };
  return obj;

});

