angular.module('cityVitalityAngularApp')


.controller('orgProfileCtrl', function (my_profileService, $location, signinService, $scope,$rootScope,localStorageService,$window,$timeout, _) {
  $rootScope.user_name = localStorageService.get('user-name');
  $rootScope.e_mail = localStorageService.get('email');
  var token = localStorageService.get('auth-token');
  var vm = this;

  if (localStorageService.get('auth-token') === null){
    if ($location.$$path === '/describe' || $location.$$path === '/my_profile'|| $location.$$path === '/dashboard_new' || $location.$$path === '/structure_contributor' || $location.$$path === '/contributor_describe' || $location.$$path === '/needs_contributor' || $location.$$path === '/structure' || $location.$$path === '/myPledges') {
      $location.path('/land');
    }
  }
  $rootScope.noCurrentProjects = false;
  $rootScope.current_projects =[];

$(document).ready(function()
{
    $(".picture").error(function(){
        $(this).attr('src', 'images/image_placeholder_gray.png');
    });
});

  vm.password = localStorageService.get('password');
  $rootScope.userId = localStorageService.get('user_id');
  vm.emailErrorFlag = false;
  vm.usernameErrorFlag = false;
  vm.interestsArray = [];
  vm.follow_count_user = 0;
  vm.following = 0;
  vm.profileSubmitted = false;
  vm.emailInvalidFlag = false;
  vm.flashmsg = false;
  $rootScope.userinterst = [];
  $rootScope.aboutuser = [];
  $rootScope.userwebsites = [];
  $rootScope.userName=localStorageService.get('user-name');
  var token = localStorageService.get('auth-token');

  vm.org_id = localStorageService.get('user_originator_id')
  vm.user_id = localStorageService.get('user_id');
  var token = localStorageService.get('auth-token');
  var params = {
    id: $rootScope.orgFinal || vm.user_id
  }

  my_profileService.profileData(params, token).then(function(response) {
    $rootScope.suggestionTaskCount = response.data
    $rootScope.follow_count_user = response.data.follow_count_user;
    $rootScope.follow_user = response.follow_user;
    $rootScope.following = response.data.following;
    $rootScope.following = response.following;
  });

  my_profileService.publishedData(params, token).then(function(response) {
    $rootScope.published_count = response.data;
    $rootScope.current_projects = response.project_title;
  });

  my_profileService.pledgeData(params, token).then(function(response) {
    $rootScope.pledgesCount = response.data;
  });

  var params = {
    id: $rootScope.orgFinal || localStorageService.get('orgFin')

  }

  my_profileService.getData(params, token).then(function(response) {
   vm.org_user_id = response.data.id;
   vm.follow_count_user = response.follow_user;
   vm.following = response.following;
   vm.profileData = response.data;
   vm.interestsArray = response.data.interests;
   $rootScope.userinterst = response.data.interests;
   $rootScope.aboutuser = response.data.about_me;
   $rootScope.userwebsites = response.data.websites;
   $rootScope.userprofilename = response.data.user_name;
   $rootScope.userlocation = response.data.location;
   $rootScope.imagep = response.data.file.url;
   vm.filterArr();
 });

  vm.filterArr =function () {
    _.each(vm.interestsArray, function(obj) {
      $scope.interests = _.without($scope.interests, obj);
    });
  }


  vm.follow_user = function(follow_bool) {
    vm.follow = follow_bool ? true : false
    var params = {
      user_id: vm.org_user_id,
      follow: follow_bool
    }
    my_profileService.followUsers(params).then(function(response) {
      if (response.status === 200) {
        vm.follow_count_user = response.data.follow_count_user
        vm.following = response.data.following
      }
    });
  }

  vm.logout = function(){
    localStorageService.clearAll();
    $location.path('/land')
  }

  vm.conDescribe = function(proId){
    localStorageService.set('user-name', proId)
    $location.path('/contributor_describe');
  }

  vm.conDescribe = function(proId){
    localStorageService.set('describe_id', proId)
    $location.path('/contributor_describe');
  }

});