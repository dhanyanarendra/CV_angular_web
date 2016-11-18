'use strict';

/**
* @ngdoc function
* @name startApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the startApp
*/
angular.module('cityVitalityAngularApp')
.controller('describeCtrl', function (describeService, $timeout, $scope, $rootScope, $location, $route, localStorageService, $window) {
  var vm = this;
  // $('.btn-next').removeAttr("disabled")

  // vm.describeForm = {};
  vm.submitted = false;
  vm.imagedata = null;
  vm.imageFormat = false;
  vm.properResolution = true;
  $rootScope.status=false;

  $scope.file = {
    type : null
  }
  $rootScope.profileImage=localStorageService.get('imagep');
  if (localStorageService.get('auth-token') === null){
    if ($location.$$path === '/describe' || $location.$$path === '/my_profile'|| $location.$$path === '/dashboard_new' || $location.$$path === '/structure_contributor' || $location.$$path === '/contributor_describe' || $location.$$path === '/needs_contributor' || $location.$$path === '/structure' || $location.$$path === '/myPledges') {
      $location.path('/land');
    }
  }

  $(document).ready(function()
{
    $(".picture").error(function(){
        $(this).attr('src', 'images/image_placeholder_gray.png');
    });
});


vm.checkTitle = function(title){
   if(title.length != 0){
    $('.btn-next').removeAttr("disabled")
   }
}

  var token = localStorageService.get('auth-token');
  $rootScope.userName = localStorageService.get('user-name');
  vm.describe_id = localStorageService.get('describe_id');

  if($location.path().indexOf("describe_edit") == 1){
    var params = {
      id: vm.describe_id
    }

    describeService.getProjectById(params, token).then(function(response) {
      localStorageService.set('user_originator_id', response.data.user_originator_id);
      $rootScope.projects = response.data.data;
      $rootScope.image = response.data.data.name;
      vm.describeForm = response.data.data;
    });
  }

  $scope.displayCategorydefault = 'Choose Category'
  $scope.categories = [
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

  vm.remove = function(){
    vm.submitted =false;
  }

  $scope.setDisplayCategory = function (catagory) {
    $scope.displayCategory = catagory;
  }

  $scope.getFile = function () {
    var reader = new FileReader();
    reader.readAsDataURL($scope.file);
    reader.onload = function(e) {
      $rootScope.image = $scope.file.name;
      $rootScope.imagedata = reader.result;
      $rootScope.imageDimension = reader.result;
      $rootScope.imagedata = $rootScope.imagedata.split("base64,")[1];
      $scope.$apply();

      if ($rootScope.imageDimension) {

        $("body").append("<img id='hiddenImage' src='"+$rootScope.imageDimension+"' />");
        var width = $('#hiddenImage').width();
        var height = $('#hiddenImage').height();

        if (width < "360" && height < "215") {
          $('#hiddenImage').remove();
          alert("Image resolution is too less. Please upload the image with atleast 360x215 pixels resolution.");
          $(".btn-next").attr('disabled', 'disabled');
        }
        else {
          $('#hiddenImage').remove();
          $('.btn-next').removeAttr("disabled")

        }
      }
    }
  };


  vm.triggerUpload = function () {
    var fileuploader = angular.element("#imageField");
    fileuploader.trigger('click');
  }

  vm.flush= function(){
    vm.imageFormat= false;  
  }

  vm.save = function(editStatus) {
    localStorageService.add('title', vm.describeForm.title);

    var params = {
      describe: {
        title : vm.describeForm.title,
        background : vm.describeForm.background,
        category : $scope.displayCategory,
        impact : vm.describeForm.impact,
        need : vm.describeForm.need,
        others : vm.describeForm.others,
        risks : vm.describeForm.risks,
        short_description : vm.describeForm.short_description,
        file: {
          data: $rootScope.imagedata,
          type: $scope.file.type
        },
        name : $rootScope.image
      }
    }

    describeService.postData(params, token).then(function(response) {
          vm.submitted = true;
      var image = new RegExp(".(jpg|png|gif|bmp|tiff|jpeg)$");


      if(params.describe.name) {
        if (image.test(params.describe.name)) {
          vm.imageFormat = false;
        }
        else {
          vm.imageFormat = true;
        }
      }
      if(response.status === 200) {
        $rootScope.image = '';
        $rootScope.status = true;
        $rootScope.projects = response.data;
        $rootScope.project_id = response.data.id;
        localStorageService.set('describe_id', response.data.id);
         if(editStatus == 'saveNext'){
            $location.path('/structure');
          }else if(editStatus =='saveQuit'){
            $location.path('/dashboard_new');
          }

        vm.describeForm = {};
      }
      else {
        $window.scrollTo(0,0)
      }
    });
  }


  $rootScope.logout = function(){
    $rootScope.editProjectVar = false;
    localStorageService.clearAll();
    $location.path('/land')
  }

  vm.nextPage = function(){
    $location.path('/land')


  }

  $rootScope.getProject = function(){
    vm.describe_id = localStorageService.get('describe_id');
    var params = {
      id: vm.describe_id
    }

    describeService.getProjectById(params, token).then(function(response) {
    });
  }

  $scope.editProjectDetails = function(projects, editStatus){
    vm.describe_id = localStorageService.get('describe_id');

    var projectParams = {
      describe_id: vm.describe_id,
      describe: {

        title : (projects.title == undefined) ? '' : projects.title,
        background : projects.background,
        category : $scope.displayCategory,
        impact : projects.impact,
        need : projects.need,
        others : projects.others,
        risks : projects.risks,
        short_description : (projects.short_description == undefined) ? '' : projects.short_description,
        file: {
          data: $rootScope.imagedata,
          type: $scope.file.type
        },
        name : $rootScope.image
      }

    }

    describeService.updateProject(projectParams, token).then(function(response){
     vm.title=localStorageService.set('title', response.data.title);
        // $rootScope.image = null;
        if(response.status == 200){
          $rootScope.editProjectVar = false;
          $rootScope.editLeftPanel = true;
          if(editStatus == 'saveNext'){
            $location.path('/structure') 
          }else if(editStatus =='saveQuit'){
            $location.path('/dashboard_new')
          }
        }
        else{
          $window.scrollTo(0,0)
        }
      });
  }
});
