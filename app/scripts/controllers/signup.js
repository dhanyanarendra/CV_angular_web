'use strict';

/**
 * @ngdoc function
 * @name startApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the startApp
 */
 angular.module('cityVitalityAngularApp')
 .controller('signupCtrl', function (signupService, $scope, $rootScope, $location, $window,localStorageService, $timeout) {

  var vm = this;
  $rootScope.image = null;
  vm.signupForm = {};
  vm.currentUser = localStorageService.get('user-name');
  $scope.inputType = 'password';
  $rootScope.userName= localStorageService.get('user-name');
  $rootScope.profileImage=localStorageService.get('imagep');

  vm.togglePwd = function () {
    if ($scope.inputType == 'password')
      $scope.inputType = 'text';
    else
      $scope.inputType = 'password';
  }

  $('.signupspace').keydown(function(e) {
    if (e.keyCode == 32) {
      return false;
    }
  });

  $(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
      var d = event.srcElement || event.target;
      if ((d.tagName.toUpperCase() === 'INPUT' &&
       (
         d.type.toUpperCase() === 'TEXT' ||
         d.type.toUpperCase() === 'PASSWORD' ||
         d.type.toUpperCase() === 'NUMBER'
         )
       ) ||
       d.tagName.toUpperCase() === 'TEXTAREA') {
        doPrevent = d.readOnly || d.disabled;
    }
    else {
      doPrevent = true;
    }
  }
});

  vm.cleardata = function() {
    vm.errorMsgFlagUserName = false;
    vm.errorMsgFlagEmail = false;
    vm.signupForm = {};
    vm.signupForm.email = null;
    vm.signupForm.password = null;
    vm.submitted = false;
  }
  vm.close = function() {

    angular.element("#myModal_Signup").modal("hide");
    angular.element("#myModal_Signin").modal("show");
  }
  vm.remove= function() {
    vm.errorMsgFlagUserName =false;
  }

  vm.keyPresssignup = function(e) {
    if (e.keyCode == 13) {
      angular.element('#signup-btn').focus();
      vm.register(); vm.submitted = true
    }
  }


  vm.removeEmail= function() {
    vm.errorMsgFlagEmail =false;
  }

  vm.register = function() {
    var params = {
      user_name: vm.signupForm.username,
      email: vm.signupForm.email,
      password: vm.signupForm.password
    }
    signupService.getData(params).then(function(response) {
      if(response.status === 200) {
        localStorageService.set('user-name', response.data.user_name);
        localStorageService.set('user_id', response.data.id);
        localStorageService.set('auth-token', response.data.auth_token);
        localStorageService.set('user-signed-in', true);
        localStorageService.set('email', response.data.email);
        angular.element("#myModal_Signup").modal("hide");
        if($rootScope.SignupButton == "SignupOnly" ) {
          $location.path('/')
          $window.location.reload();
        }
        else if($rootScope.createSignup == "createSignup") {
          $location.path('/describe')
          $window.location.reload();
        }
        else if($rootScope.ContributorSignup == "ContributorSignup") {
          $location.path('/')
        }
         else if (localStorageService.get('loginpath') == "loginlink") {
          var loginpath = '/describe';
        } else {
          var loginpath = '/discover';
        }
        $location.path(loginpath);
        $window.location.reload();
        vm.signupForm = {};
      }
      else {
        if(response.errors.user_name) {
          if(response.errors.user_name[0] === "has already been taken") {
            vm.errorMsgFlagUserName = true;
          }
        }
        if(response.errors.email) {
          if(response.errors.email[0] === "has already been taken") {
            vm.errorMsgFlagEmail = true;
          }
        }
      }
    });


  };
});