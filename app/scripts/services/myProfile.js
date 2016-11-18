'use strict';

/**
 * @ngdoc function
 * @name startApp.Service:Getapiservice
 * @description
 * # Getapi
 * Controller of the startApp
 */

 angular.module('cityVitalityAngularApp')
 .factory('my_profileService', function ($http, ENV, Project, my_profile,localStorageService) {
  var obj = {
    profileData: function(params, token) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return my_profile.authToken(token).getProfileData(params).$promise.then(success, failure);
    },



    followUsers: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }

      return $http.post(ENV.api_path + "api/v1/"+params.user_id +"/user/follow_user", {'follow' : params.follow}, {headers: {'Authorization': localStorageService.get('auth-token')}}).then(success, failure);

    },




    pledgeData: function(params, token) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return my_profile.authToken(token).getPledgeData(params).$promise.then(success, failure);
    },

    publishedData: function(params, token) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return my_profile.authToken(token).getPublishedeData(params).$promise.then(success, failure);
    },

    postData: function(params, token) {
     function success (response) {
      return response;
    }
    function failure (response) {
      return response;
    }
    return my_profile.authToken(token).save(params).$promise.then(success, failure);
  },


  putData: function(params, token) {
    function success (response) {
      return response;
    }
    function failure (response) {
      return response;
    }
    return my_profile.authToken(token).putData(params).$promise.then(success, failure);
  },

  getData: function(params, token) {
    function success (response) {
      return response;
    }
    function failure (response) {
      return response;
    }
    return my_profile.authToken(token).getData(params).$promise.then(success, failure);
  },

  deleteImageData: function(params, token) {
    function success (response) {
      return response;
    }
    function failure (response) {
      return response;
    }
    return my_profile.authToken(token).deleteImageData(params).$promise.then(success, failure);
  }

};
return obj;
});