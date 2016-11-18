'use strict';

angular.module('cityVitalityAngularApp')
.controller('FollowProjectsCtrl', ['$location', '$routeParams', '$window','localStorageService','$rootScope','$scope','FollowProjectsService', function($location,$window,$routeParams, localStorageService,$rootScope,$scope,FollowProjectsService) {

  var vm = this;
  vm.pageno = 1; // initialize page no to 1
  vm.Msg = false;
  vm.showNoResultsPanel = false;
  vm.noFollowedProjects = false;


  $rootScope.profileImage=localStorageService.get('imagep');

  if (localStorageService.get('title') === null){
    if ($location.$$path === '/structure') {
      $location.path('/page_error');
    }
  }
  vm.getProjectsList = function(page){
    FollowProjectsService.getProjectsList().then(function(response) {
        vm.total_count = response.total_count; // total data count.
        $scope.followedtiles = response.data;
        if ($scope.followedtiles == '') {
          vm.noFollowedProjects = true;
          vm.showNoResultsPanel = false;
        }
      });
  };

  vm.getProjectsList(vm.pageno);

  $scope.displayCategory = 'All Categories'
  $scope.categories = [
  'All Categories',
  'Animals',
  'Art,Design & Culture',
  'Business',
  'Community',
  'Disaster Relief',
  'Education',
  'Environment',
  'Faith',
  'Food & Shelter',
  'Health & Medicine',
  'Politics',
  'Social Justice',
  'Sports',
  'Technology',
  'Others'
  ];
  $scope.selectDate = "All Dates"



  $scope.setOrderByValue = function(val){
    $scope.selectDate = val

    if($scope.selectDate == 'Latest First'){
      $scope.orderByVar = '-created_at'
    }
    else if($scope.selectDate == 'Oldest First'){
      $scope.orderByVar = 'created_at'
    }
    else{
      $scope.orderByVar = 'title'
    }
  }

  vm.showNoResults = function () {
    !_.some($scope.tiles, function(tile) {
      return tile.category == $scope.displayCategory;
    });
  }

  $scope.canBeDisplayed = function (catagory) {
    if($scope.displayCategory == 'All Categories'){
      vm.showNoResultsPanel = false;
      return true
    }
    else {
      var display = $scope.displayCategory == catagory
      vm.showNoResultsPanel = !display;
      return display;
    }
  }

  $scope.setDisplayCategory = function (catagory) {
    $scope.displayCategory = catagory;
    vm.showNoResults();
  }

  vm.errMsg = function(){
    vm.Msg = true;
  }

  vm.gotoContributor = function (tile) {
    localStorageService.set('loginpath', 'tile');

    vm.auth_token = localStorageService.get('auth-token')

    if (vm.auth_token){
      localStorageService.set('describe_id', tile.id);
      $location.path('contributor_describe');
    } else {
      localStorageService.set('describe_id', tile.id);
      angular.element("#myModal_Signin").modal("show");
    }

  }

}]);
