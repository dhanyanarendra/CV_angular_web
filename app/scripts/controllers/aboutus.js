'use strict';

/**
 * @ngdoc function
 * @name startApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the startApp
 */
 angular.module('cityVitalityAngularApp')
 .controller('aboutusCtrl', function ( $scope, $rootScope, $location, $window,localStorageService) {

 	var vm = this;
 	$rootScope.profileImage=localStorageService.get('imagep');
 	if (localStorageService.get('auth-token') === null){
 		if ($location.$$path === '/describe' || $location.$$path === '/my_profile'|| $location.$$path === '/dashboard_new' || $location.$$path === '/structure_contributor' || $location.$$path === '/contributor_describe' || $location.$$path === '/needs_contributor' || $location.$$path === '/structure' || $location.$$path === '/myPledges' || $location.$$path === '/termsandconditions' || $location.$$path === '/privacypolicy' || $location.$$path === '/contact') {
 			$location.path('/land');
 		}
 	}
 	window.scrollTo(0,0)
 });