'use strict';

/**
* @ngdoc function
* @name cityVitalityAngularApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the cityVitalityAngularApp
*/
angular.module('cityVitalityAngularApp')


.controller('my_profileCtrl', function (my_profileService, $location, signinService, $scope,$rootScope,localStorageService,$window,$timeout, _) {

  $rootScope.user_name = localStorageService.get('user-name');
  $rootScope.e_mail = localStorageService.get('email');
  var token = localStorageService.get('auth-token');
  var vm = this;
  vm.fieldEdited = false;
  vm.viewProfile = false;



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

  $(document).ready(function()
  {
    $(".picture").error(function(){
      $(this).attr('src', 'images/image_placeholder_gray.png');
    });
  });


  $rootScope.noCurrentProjects = false;
  $rootScope.current_projects =[];

  $rootScope.user_id = localStorageService.get('user_id');
  $rootScope.userOriginatorId= localStorageService.get('user_originator_id');
  $rootScope.originator_id = localStorageService.get('user_originator_id');
  vm.password = localStorageService.get('password');
  $rootScope.userId = localStorageService.get('user_id');
  vm.emailErrorFlag = false;
  vm.usernameErrorFlag = false;
  vm.interestsArray = [];
  vm.follow_count_user = 0;
  vm.profileSubmitted = false;
  vm.emailInvalidFlag = false;
  vm.flashmsg = false;
  $rootScope.userinterst = [];
  $rootScope.aboutuser = [];
  $rootScope.userwebsites = [];
  $rootScope.userName=localStorageService.get('user-name');
  var token = localStorageService.get('auth-token');



  vm.user_id = localStorageService.get('user_id');
  var token = localStorageService.get('auth-token');
  var params = {
    id: vm.user_id
  }

  my_profileService.profileData(params, token).then(function(response) {
    $rootScope.suggestionTaskCount = response.data
    $rootScope.follow_user = response.follow_user;
    $rootScope.follow_count_user = response.data.follow_count_user;
    $rootScope.follow_user = response.follow_user;

  });

  my_profileService.publishedData(params, token).then(function(response) {
    $rootScope.published_count = response.data;
    $rootScope.current_projects = response.project_title;

  });

  my_profileService.pledgeData(params, token).then(function(response) {
    $rootScope.pledgesCount = response.data;
  });




  var params = {
    id: $rootScope.userId
  }
  my_profileService.getData(params, token).then(function(response) {
    $rootScope.follow_user_show = response.follow_user;
    vm.profileData = response.data;
    vm.interestsArray = response.data.interests;
    $rootScope.userinterst = response.data.interests;
    $rootScope.aboutuser = response.data.about_me;
    $rootScope.userwebsites = response.data.websites;
    $rootScope.userprofilename = response.data.user_name;
    $rootScope.userlocation = response.data.location;
    $rootScope.imagep = response.data.file.url;
    localStorageService.set('imagep', response.data.file.url);
    vm.filterArr();
  });

  $rootScope.userorgname = localStorageService.get('originator_name');
  $rootScope.userOriginatorLocation= localStorageService.get('originator_location');

  vm.imagedata1 = null;
  vm.imageFormat1 = false;
  $scope.file = {
    type : null
  }

  $scope.getFile = function () {
    var reader = new FileReader();
    reader.readAsDataURL($scope.file);
    reader.onload = function(e) {
      $rootScope.image1 = $scope.file.name;
      $rootScope.imagedata1 = reader.result;
      $rootScope.imagedata1 = $rootScope.imagedata1.split("base64,")[1];
      $scope.$apply();
      vm.save();
    }
  };

  vm.triggerUpload = function () {
    var fileuploader = angular.element("#imageField");
    fileuploader.trigger('click');
  }


  vm.flush= function(){
    vm.imageFormat1= false;
  }




  vm.follow_user = function(follow_bool,id) {
    vm.follow = follow_bool ? true : false
    var params = {
      user_id: localStorageService.get('user_id'),
      follow: vm.follow
    }
    my_profileService.followUsers(params).then(function(response) {
      if (response.status === 200) {
        vm.follow_count_user = response.data.follow_count_user
      }

    });
    my_profileService.getData(params, token).then(function(response) {
      $rootScope.follow_user_show = response.follow_user;
    });
  }

  vm.addWebsite = function(website){
    if(vm.profileData){
      if(vm.websites.length){
        vm.profileData.websites.push(website)
        vm.websites = ''
      }
    }
  }


  vm.removeWebsite = function(website){
    if(vm.profileData){
      var index = vm.profileData.websites.indexOf(website);
      vm.profileData.websites.splice(index, 1);
    }
  }

  vm.addInterest = function(interest){
    if(vm.profileData){
      vm.interestsArray.push(interest)
      var intindex = $scope.interests.indexOf(interest);
      $scope.interests.splice(intindex, 1);
    }
  }

  vm.removeInterest = function(interest){
    if(vm.profileData){
      var delindex = vm.interestsArray.indexOf(interest);
      vm.interestsArray.splice(delindex, 1);
      $scope.interests.push(interest);
    }
  }

  $scope.interests = [
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
  'others',
  ];

  vm.filterArr =function () {
    _.each(vm.interestsArray, function(obj) {
      $scope.interests = _.without($scope.interests, obj);
    });
  }

  vm.save = function(){
    vm.fieldEdited = false;
    vm.viewProfile = false;
    vm.user_id = localStorageService.get('user_id');
    var params = {
      id: vm.user_id || $rootScope.userId,
      first_name : vm.profileData.first_name || "",
      last_name : vm.profileData.last_name || "",
      user_name : vm.profileData.user_name || "",
      email: vm.profileData.email || "",
      phone_number : vm.profileData.phone_number || "",
      company : vm.profileData.company || "",
      location : vm.profileData.location || "",
      timezone : vm.profileData.timezone || "",
      websites:  vm.profileData.websites || [],
      about_me: vm.profileData.about_me || "" ,
      interests: vm.interestsArray,
      file: {
        data: $rootScope.imagedata1,
        type: $scope.file.type
      },
      name : $rootScope.image1
    }
    my_profileService.putData(params, token).then(function(response) {
      vm.profileSubmitted = true;

      var image = new RegExp(".(jpg|png|gif|bmp|tiff|jpeg)$");
      if(params.name)
      {
        if (image.test(params.name))
        {
          vm.imageFormat1 = false;
        }
        else
        {
          vm.imageFormat1 = true;
        }
      }

      if(response.status == 200)
      {
        vm.flashmsg = true;
        $timeout (function() {
          vm.flashmsg = false;
        },8000)
        window.scrollTo(0,0)
        $window.location.reload();
      }
      else{
        window.scrollTo(90,90)
      }

      if(response.data.error) {
        if(response.data.error.user_name){
          if(response.data.error.user_name[0] === "has already been taken") {
            vm.usernameErrorFlag = true;
            window.scrollTo(120,120);
          }
        }
        if(response.data.error.email){
          if(response.data.error.email[0] === "has already been taken") {
            vm.emailErrorFlag = true;
            window.scrollTo(120,120);
          }
          else if (response.data.error.email[0] === "Not a valid email Address"){
            vm.emailInvalidFlag = true;
          }

        }
      }
      else{
        localStorageService.set('user-name', response.data.user_name)
        $rootScope.userName = response.data.user_name
      }


    });

  }

  vm.edit = function() {
    vm.fieldEdited = true;
  }

  vm.clearUsernameFlag = function()
  {
    vm.usernameErrorFlag = false;
  }

  vm.clearEmailFlag = function()
  {
    vm.emailErrorFlag = false;
    vm.profileSubmitted = false;
    vm.emailInvalidFlag = false;
  }

  vm.logout = function(){
    localStorageService.clearAll();
    $location.path('/land')
  }

  vm.logo = function(){
    $location.path('/');
  }

  vm.clearViewProfile = function() {
    vm.viewProfile = false;
  }

  vm.redirect = function(id){
    if (vm.fieldEdited) {
      vm.viewProfile = true;
      window.scrollTo(0,0);
      // alert("please save the changes before viewing the profile ")
    }
    else {
      $location.path('/profile')
    }
    $rootScope.orgFinal = id;
    localStorageService.set('orgFinal', id);
    vm.user_id = localStorageService.get('user_id');
    var token = localStorageService.get('auth-token');
    var params = {
      id: id
    }

    my_profileService.profileData(params, token).then(function(response) {
      $rootScope.suggestionTaskCount = response.data;
    });


    my_profileService.profileData(params, token).then(function(response) {
      $rootScope.suggestionTaskCount = response.data;
    });

    my_profileService.publishedData(params, token).then(function(response) {
      $rootScope.published_count = response.data;
      $rootScope.current_projects = response.project_title;
    });

    my_profileService.pledgeData(params, token).then(function(response) {
      $rootScope.pledgesCount = response.data;
    });
  }

  vm.conDescribe = function(proId){
    localStorageService.set('user-name', proId)
    $location.path('/contributor_describe');
  }

  vm.conDescribe = function(proId){
    localStorageService.set('describe_id', proId)
    $location.path('/contributor_describe');
  }


  $(document).ready(function()
  {
    $(".picture").error(function(){
      $(this).attr('src', 'images/image_placeholder_gray.png');
    });
  });



  vm.removeImage = function(){
    vm.imageFormat1 = false;
    var params = {
      id: vm.user_id || $rootScope.userId,
      file: {
        data: "",
        type:""
      },
      name : ""
    }
    my_profileService.deleteImageData(params, token).then(function(response) {
    });
    my_profileService.getData(params, token).then(function(response) {
      $rootScope.imagep = ''
    })
  }
});