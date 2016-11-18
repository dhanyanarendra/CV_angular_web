'use strict' ;


angular.module('cityVitalityAngularApp')
.factory('dashboardService', function ($http, ENV, DashboardProject,localStorageService) {

	var obj = {
		getDashboardProject: function(params,token) {

			function success (response) {
				return response;
			}
			function failure (response) {
				return response;
			}
      return DashboardProject.authToken(token).listProjects(params).$promise.then(success, failure);

		},

		deleteDashboardProject: function(id, token) {
			function success (response) {
				return response;
			}
			function failure (response) {
				return response;
			}
			return DashboardProject.authToken(token).deleteProjects(id).$promise.then(success, failure);

		},

    dashboardProjectsList: function(params, token) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return DashboardProject.authToken(token).projectNeeds(params).$promise.then(success, failure);

    },

     myPledgesList: function(params, token) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return DashboardProject.authToken(token).pledgeList(params).$promise.then(success, failure);

    }

	}
	  return obj;
});

