'use strict';

/**
 * @ngdoc function
 * @name startApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the startApp
 */
 angular.module('cityVitalityAngularApp')
 .controller('myPledgesCtrl', function (myPledgeService, dashboardService, $scope, $rootScope, $location, $window,localStorageService) {

  var vm = this;
  $rootScope.profileImage=localStorageService.get('imagep');
  if (localStorageService.get('auth-token') === null){
    if ($location.$$path === '/describe' || $location.$$path === '/my_profile'|| $location.$$path === '/dashboard_new' || $location.$$path === '/structure_contributor' || $location.$$path === '/contributor_describe' || $location.$$path === '/needs_contributor' || $location.$$path === '/structure' || $location.$$path === '/myPledges') {
      $location.path('/land');
    }
  }

  if (localStorageService.get('title') === null){
    if ($location.$$path === '/structure') {
      $location.path('/page_error');
    }
  }
  vm.errMsg = false;
  vm.NoPledge = false;
  vm.checked = false;

   $(document).ready(function()
{
    $(".picture").error(function(){
        $(this).attr('src', 'images/image_placeholder_gray.png');
    });
});


  $rootScope.userName=localStorageService.get('user-name');
  vm.currentUserId = localStorageService.get('user_id');
  var token = localStorageService.get('auth-token');
  var params = {
    id:  vm.currentUserId
  }

 dashboardService.myPledgesList(params, token).then(function(response){
  vm.myPledgesList = response.data;
 });

  vm.errMsg = function(){
    vm.errMsg = true;
  }


  vm.logo = function(){
    $location.path('/');
  }

  vm.checkedNeed= function(mypledge){
    var params = {
      id: mypledge.need_id,
      checked: mypledge.checked
    }
    myPledgeService.checkedneeds(params, token).then(function(response) {
    });
  }
});