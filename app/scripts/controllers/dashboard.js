'use strict';

angular.module('cityVitalityAngularApp')
.controller('dashboardCtrl', function ($timeout,$state,dashboardService, describeService,$rootScope, $scope, $route,localStorageService,$location, $window) {
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

  vm.listProjects = {};
  vm.projects_count = 0;
  vm.unpublishedpro = [];
  vm.unpubl = {};
  vm.publishedPro = [];
  vm.unpublishclick = false;
  vm.unpublishclick1 = false;
  $rootScope.published = false;
  $rootScope.unpublished = false;
  vm.needsPageShow =false;
  vm.NeedsList = [];
  vm.flashmsg = false;

  $rootScope.userName=localStorageService.get('user-name');
  vm.currentUserId = localStorageService.get('user_id');
  var token = localStorageService.get('auth-token');

  var params = {
    id:  vm.currentUserId
  }

  dashboardService.getDashboardProject(params, token).then(function(response) {
    $rootScope.listProjects = response.data;
  });

  vm.describe_id = localStorageService.get('describe_id');
  var params = {
    id: vm.describe_id
  }

  var params = {
    id:  vm.currentUserId
  }
  dashboardService.dashboardProjectsList(params, token).then(function(response){

    vm.dashboardDetails = {}, vm.dashboardArr = [];

    for(var i=0; i< response.data.length; i++){
      if(response.data[i].goals){
        vm.goalArr = [];
        vm.testArr =[];
        vm.dashboardPledgesArr =[];
        vm.pledgeDetails = {};
        vm.totalpledgeslist = [];
        for(var j=0; j< response.data[i].goals.length; j++){
          if(response.data[i].goals[j].tasks){
            for(var k=0; k< response.data[i].goals[j].tasks.length; k++){
              vm.goalArr.push(response.data[i].goals[j].tasks[k].needs)
              vm.testArr = [].concat.apply([], vm.goalArr);
              if(response.data[i].goals[j].tasks[k].needs){

                for(var a =0; a < response.data[i].goals[j].tasks[k].needs.length; a++ ){
                  vm.total = 0;
                  if(response.data[i].goals[j].tasks[k].needs[a].pledges){
                    for(var b= 0; b < response.data[i].goals[j].tasks[k].needs[a].pledges.length; b++){
                      vm.total +=  parseInt(response.data[i].goals[j].tasks[k].needs[a].pledges[b].quantity)
                      vm.totalPledges = parseInt(vm.total)
                    }
                    vm.pledgeDetails = {"needName" : response.data[i].goals[j].tasks[k].needs[a].need_name,
                    "needName" : response.data[i].goals[j].tasks[k].needs[a].need_name,
                    "needPriority" : response.data[i].goals[j].tasks[k].needs[a].priority,
                    "needType" : response.data[i].goals[j].tasks[k].needs[a].need_type,
                    "quantity" : response.data[i].goals[j].tasks[k].needs[a].quantity,
                    "tPledges" : vm.total}

                    vm.dashboardPledgesArr.push(vm.pledgeDetails)
                  }

                }
              }
            }
          }
        }
      }
      vm.dashboardDetails = {"name" : response.data[i].title, "needs" : vm.dashboardPledgesArr}
      vm.dashboardArr.push(vm.dashboardDetails)
    }
  });


  vm.all = function(){
    vm.list();
    vm.unpublished();
  }

  vm.logo = function(){
    $location.path('/');
  }

  vm.logout = function(){
    localStorageService.clearAll();
    $location.path('/land')
  }

  vm.list =function (){
    vm.unpublishclick = false;
    vm.unpublishclick1 = false;
    dashboardService.getDashboardProject(params,token).then(function(response) {
      $rootScope.listProjects = response.data;
    });

  }
  $rootScope.listProjectsView = 'All Projects';

  $rootScope.set = function(val){
    $rootScope.listProjectsView = val
  }

  vm.listdelete = function(project_id) {
    dashboardService.deleteDashboardProject(project_id, token).then(function(response) {
      vm.list();

      if (response.status == 200) {
          vm.flashmsg = true;
          $timeout (function() {
            vm.flashmsg = false;
          }, 5000)
        }

    });
  }
  vm.conDescribe = function(proId){
    localStorageService.set('describe_id', proId)
    $location.path('/contributor_describe');
  }

  vm.editProject = function(pid, published) {
    localStorageService.set('describe_id', pid);
    $rootScope.publishedStatus = published;
    console.log($rootScope.publishedStatus)
    var desc_id = localStorageService.get('describe_id');
    vm.currentUserId = localStorageService.get('user_id');
    vm.describe_id = localStorageService.get('describe_id');
    $location.path('/describe_edit/'+pid);
    $state.go('editdescribe', { id: pid });
}
$(document).ready(function()
{
    $(".picture").error(function(){
        $(this).attr('src', 'images/image_placeholder_gray.png');
    });
});


vm.getPage = function() {
  $window.location.reload();
  $location.path('/dashboard_new');
}

vm.listNeeds = function(){
  vm.needsPageShow =true;
}

vm.myPledges = function(){
  $location.path('/myPledges');
}

});