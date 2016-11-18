'use strict';

/**
 * @ngdoc function
 * @name startApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the startApp
 */
 angular.module('cityVitalityAngularApp')
 .controller('HeaderCtrl', function ($rootScope, $scope, $location,localStorageService,$route) {
  var vm = this;
  $scope.userSignedIn = localStorageService.get('user-signed-in') || false;
  if (localStorageService.get('auth-token') === null){
    if ($location.$$path === '/describe' || $location.$$path === '/my_profile'|| $location.$$path === '/dashboard_new' || $location.$$path === '/structure_contributor' || $location.$$path === '/contributor_describe' || $location.$$path === '/needs_contributor' || $location.$$path === '/structure' || $location.$$path === '/mypledges') {
      $location.path('/land');
    }
  }
  $rootScope.profileImage=localStorageService.get('imagep');
  $rootScope.headerName = localStorageService.get('auth-token');
  $rootScope.userName = localStorageService.get('user-name');

  if (localStorageService.get('title') === null) {
    if ($location.$$path === '/structure') {
      $location.path('/page_error');
    }
  }

$(document).ready(function()
{
    $(".picture").error(function(){
        $(this).attr('src', 'images/image_placeholder_gray.png');
    });
});

  vm.setLoginPath = function(loginpath) {
    $rootScope.Login = "LoginOnly";
    $rootScope.SignupButton = "SignupOnly";
  	localStorageService.set('loginpath', loginpath);
  }

  vm.logo = function() {
    $location.path('/');
  }

  vm.signup = function () {
    $rootScope.SignupButton = "";
    $rootScope.ContributorSignup = "ContributorSignup";
    angular.element("#myModal_Signin").modal("hide");
    // vm.setLoginPath('tile');
  }

  vm.logout = function() {
    localStorageService.clearAll();
    $rootScope.editProjectVar = false;
    $scope.userSignedIn = false;
    $rootScope.create = '';
    $rootScope.Login = '';
    $rootScope.SignupButton = '';
    $rootScope.createSignup ='';
    $rootScope.ContributorSignup="";
    $location.path('/')
    $scope.reload();
  }

});