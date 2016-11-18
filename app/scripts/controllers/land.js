'use strict';

angular.module('cityVitalityAngularApp')
.controller('landCtrl', ['landservice', 'describeService', '$scope', '_', 'localStorageService', '$timeout', '$http','$location','ENV', '$rootScope', '$filter',function (landservice, describeService, $scope,_ , localStorageService, $timeout,$http, $location, ENV,$rootScope,$filter) {
  var vm = this;
  vm.Projects = {};
  vm.showNoResultsPanel = false;
  vm.alertMsg = false;
  vm.updateMsg = false;
  vm.Msg = false;
  vm.pageno = 1; // initialize page no to 1
  vm.total_count = 0;
  vm.count = 0;
  vm.follow_count = 0;
  $rootScope.status;
  vm.searchResult = false;
  vm.catagorySearchResult = false;

  // vm.itemsPerPage = 9;

  var token = localStorageService.get('auth-token');
  $rootScope.profileImage=localStorageService.get('imagep');

  var params = {
    id: localStorageService.get('describe_id')
  }


  if(localStorageService.get('alertmsg')){
    vm.alertMsg = true;
    $timeout (function () {localStorageService.remove('alertmsg');
      vm.alertMsg = false; }, 7000);

  }

  vm.getData = function(){
    landservice.getData(token).then(function(response) {
      $scope.tiles = response;
      $scope.items = $filter('filter')($scope.tiles, $scope.displayCategory);
    });
  };

  $scope.likeProject = function(like_bool,id) {
    $scope.like = like_bool ? true : false
    var params = {
      describe_id: id,
      like: like_bool
    }
    describeService.likeProjects(params).then(function(response) {
      if (response.status === 200) {
        vm.getData();
      }
      else if (localStorageService.get('auth-token') === null){
        angular.element("#myModal_Signin").modal("show");
      }
    });
  }

  $scope.followProject = function(follow_bool,id) {
    $scope.follow = follow_bool ? true : false
    var params = {
      describe_id: id,
      follow: follow_bool
    }
    describeService.followProjects(params).then(function(response) {
      if (response.status === 200) {
        vm.getData();
      }
      else if (localStorageService.get('auth-token') === null){
        angular.element("#myModal_Signin").modal("show");
      }
    });
  }

  vm.getData();

  $scope.gotoContributor = function (tile) {
    localStorageService.set('loginpath', 'tile');
    if (token){
      localStorageService.set('describe_id', tile.id);
      $location.path('contributor_describe');
    } else {
      localStorageService.set('describe_id', tile.id);
      angular.element("#myModal_Signin").modal("show");
    }

  }

  if(localStorageService.get('updatepwd')){
    vm.updateMsg = true;
    $timeout (function () {localStorageService.remove('updatepwd');
      vm.updateMsg = false; }, 5000);
  }


  vm.errMsg = function(){
    vm.Msg = true;
  }

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
    vm.showNoResultsPanel = !_.some($scope.tiles, function(tile) {
      vm.showNoResultsPanel = true;
      return tile.category == $scope.displayCategory;
    });

  }


  $scope.canBeDisplayed = function (catagory) {
    if($scope.displayCategory == 'All Categories'){
      vm.showNoResultsPanel = false;
      return true
    }
    else {
     return $scope.displayCategory == catagory
   }
 }

 $scope.setDisplayCategory = function (catagory) {
  $scope.displayCategory = catagory;
  $scope.items = $filter('filter')($scope.tiles, catagory);
  if ($scope.items.length == 0){
    vm.catagorySearchResult = true;
  }
  else{
     vm.catagorySearchResult = false;
  }
  vm.showNoResults();
}

vm.redirect = function() {
  $rootScope.SignupButton = '';
  $rootScope.create = "createProject";
  $rootScope.createSignup = "createSignup";
  if (localStorageService.get('auth-token') == null) {
    localStorageService.set("loginpath","loginlink");
    angular.element("#myModal_Signin").modal("show");
  }
  else {
    $location.path('/describe');
    localStorageService.remove('describe_id');
    localStorageService.remove('title');
  }
}


  $(document).ready(function()
{
    $(".picture").error(function(){
        $(this).attr('src', 'images/image_placeholder_gray.png');
    });
});


vm.search =function(title){
  var params = {
      title: title,
      category: $scope.displayCategory
    }
 describeService.searchProjects(params).then(function(response) {
  if (response.status === 200) {
   $scope.tiles= response.data.data;
   $scope.items= response.data.data;
   vm.searchResult = true;
 }
 else{
  vm.getData();
  $scope.items = $filter('filter')($scope.tiles, $scope.displayCategory);
  vm.searchResult = false;
}
});
}
}]);
