'use strict';

angular.module('cityVitalityAngularApp')
.controller('contributorCtrl', ['my_profileService', 'describeService', '$location', '$routeParams', '$window','localStorageService','$rootScope','needsService', function(my_profileService,describeService, $location,$window,$routeParams, localStorageService,$rootScope,needsService) {

  var vm = this;
  vm.pledgedList =false;
  vm.pledged = '';



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

  vm.count = 0;
  vm.follow_count = 0;
  vm.project_name = "";
  $rootScope.current_projects  = [];
  window.scrollTo(0,0)
  $rootScope.userName= localStorageService.get('user-name');
  var token = localStorageService.get('auth-token');
  vm.need_count = false;
  vm.highlightIndex = 0;
  vm.clicked = false;
  vm.showDiv = true;
  vm.commentedList = true;


  var params = {
    id: localStorageService.get('describe_id')
  }

  vm.describe_id = localStorageService.get('describe_id');
  var params = {
    id: vm.describe_id
  }

  // needsService.getNeeds(params, token).then(function(response){
  //   vm.needsDetails = {}, vm.needsArr = [];
  //   vm.projectData = [response.data]

  //   for(var i=0; i< vm.projectData.length; i++){

  //     if(response.data.goals){
  //       vm.goalArr = [];
  //       vm.testArr =[];
  //       vm.needsPledgesArr =[];
  //       vm.pledgeDetails = {};
  //       vm.totalpledgeslist = [];

  //       for(var j=0; j< response.data.goals.length; j++){

  //         if(response.data.goals[j].tasks){

  //           for(var k=0; k< response.data.goals[j].tasks.length; k++){

  //             vm.goalArr.push(response.data.goals[j].tasks[k].needs)
  //             vm.testArr = [].concat.apply([], vm.goalArr);

  //             if(response.data.goals[j].tasks[k].needs.length){
  //               vm.need_count =true;
  //             }

  //             if(response.data.goals[j].tasks[k].needs){
  //               for(var a =0; a < response.data.goals[j].tasks[k].needs.length; a++ ){
  //                 vm.total = 0;
  //                 if(response.data.goals[j].tasks[k].needs[a].pledges){
  //                   for(var b= 0; b < response.data.goals[j].tasks[k].needs[a].pledges.length; b++){
  //                     var user_id = localStorageService.get('user_id')
  //                    if((response.data.goals[j].tasks[k].needs[a].pledges[b].user_contributor_id == user_id) && (response.data.goals[j].tasks[k].needs[a].pledges[b].pledged == true)){
  //                       vm.pledged = true;
  //                    }
  //                    else{
  //                     vm.pledged=false;
  //                    }
  //                     vm.total +=  parseInt(response.data.goals[j].tasks[k].needs[a].pledges[b].quantity)

  //                     vm.totalPledges = parseInt(vm.total)
  //                   }

  //                   vm.pledgeDetails = {
  //                     "needName" : response.data.goals[j].tasks[k].needs[a].need_name,
  //                     "needName" : response.data.goals[j].tasks[k].needs[a].need_name,
  //                     "needPriority" : response.data.goals[j].tasks[k].needs[a].priority,
  //                     "needType" : response.data.goals[j].tasks[k].needs[a].need_type,
  //                     "quantity" : response.data.goals[j].tasks[k].needs[a].quantity,
  //                     "tPledges" : vm.total,
  //                     "id": response.data.goals[j].tasks[k].needs[a].id,
  //                     "task_id": response.data.goals[j].tasks[k].id,
  //                     "pledge": response.data.goals[j].tasks[k].needs[a].pledges
  //                   }

  //                   vm.needsPledgesArr.push(vm.pledgeDetails)
  //                   vm.pledgedUser(vm.needsPledgesArr[0].id,0);
  //                 }

  //               } //end of a
  //             }
  //           } //end of k
  //         }
  //       } //end of for j

  //     } // end of if.
  //     vm.needsDetails = {"name" : response.data.title, "needs" : vm.needsPledgesArr}
  //     vm.needsArr.push(vm.needsDetails)
  //     vm.needsArr[0].needs = _.sortBy( vm.needsArr[0].needs, 'created_at')
  //     vm.needDetails(vm.needsArr[0].needs[0])

  //   } //end of for 'i'.
  // });


needsService.getNeedsList(params, token).then(function(response){
  vm.needList = response.data
  vm.needDetails(vm.needList[0])
  vm.pledgedUser(vm.needList[0].id,0)
  vm.needList = _.sortBy(vm.needList, 'created_at')
});

  vm.pledgedUser = function (id,index){
    vm.highlightIndex = index;
    var params = {
      need_id: id
    }
    localStorageService.set('need_id',params.need_id)
    localStorageService.set('need_index',index)
    needsService.pledgedUserList(params).then(function(response){
      vm.pledgesUserList = response.data;
      if(vm.pledgesUserList.length){
        vm.pledgedList =true;
      }else{
        vm.pledgedList =false;
      }

      if (localStorageService.get('user-name')) {
        var i ;
        for (i=0;i<response.data.length;i++) {
          if (localStorageService.get('user-name') == response.data[i].pledgeed_name) {
            vm.pledged = true;
          }
          else
          {
            vm.pledged = false;
          }
        }
      }
      else {
        // do nothing
      }

    });

  }

  describeService.getProjectById(params, token).then(function(response) {

    localStorageService.set('user_originator_id', response.data.data.user_originator_id);
    localStorageService.set('originator_name', response.data.originator_name);
    localStorageService.set('originator_location', response.data.originator_location);

    $rootScope.userOriginatorLocation= localStorageService.get('originator_location');
    $rootScope.userOriginatorName= localStorageService.get('originator_name');
    $rootScope.userOriginatorId= localStorageService.get('user_originator_id');
    vm.getComment();
  });

  vm.describepage = function(project_name,category){
    vm.getProject();
    localStorageService.set('project_name', project_name);
    localStorageService.set('category', category);
    $location.path("contributor_describe")
  }

  vm.structurepage = function(project_name,category){
    vm.getProject();
    localStorageService.set('project_name', project_name);
    localStorageService.set('category', category);
    $location.path("structure_contributor")
  }
  vm.needspage = function(project_name,category){
    vm.getProject();
    localStorageService.set('project_name', project_name);
    localStorageService.set('category', category);
    $location.path("needs_contributor")
  }

  vm.addComment = function(data){
    describeService.postComment(params,data).then(function(response){
      data.description = '';
      vm.getComment();
    })
  }

  vm.getComment = function(){
    describeService.getComment().then(function(response){
     vm.comment_body = response.data.data;
   })
  }

  vm.deleteComment = function(comment){
    vm.project_id = localStorageService.get('describe_id');
    var params = {
      describe_id: vm.project_id ,
      id: comment.id
    }
    describeService.deleteComment(params).then(function(response){
      vm.getComment();
    })
  }

  vm.getProject = function () {
    describeService.getProjectById(params).then(function(response) {
      vm.project_name = response.data.data.title;
      vm.background = response.data.data.background;
      vm.impact = response.data.data.impact;
      vm.risk = response.data.data.risks;
      vm.need = response.data.data.need;
      vm.short_description = response.data.data.short_description;
      vm.others = response.data.data.others;
      vm.category = response.data.data.category;
      vm.follow_count = response.data.follow_count;
      vm.like = response.data.like;
      vm.follow = response.data.follow;
      vm.count = response.data.count;
      vm.image = response.data.data.file.url;
      vm.goals = response.data.data.goals;
    });

  }

  vm.getProject();

  vm.like_project = function(like_bool) {
    vm.like = like_bool ? true : false
    var params = {
      describe_id: localStorageService.get('describe_id'),
      like: like_bool
    }
    describeService.likeProjects(params).then(function(response) {
      if (response.status === 200) {
        vm.count = response.count
      }

    });
  }


  vm.follow_project = function(follow_bool) {
    vm.follow = follow_bool ? true : false
    var params = {
      describe_id: localStorageService.get('describe_id'),
      follow: follow_bool
    }
    describeService.followProjects(params).then(function(response) {
      if (response.status === 200) {
        vm.follow_count = response.follow_count
      }

    });
  }



  vm.userprofile = function(userOriginatorId){
    localStorageService.set('orgFin', userOriginatorId);
    $rootScope.orgFinal = userOriginatorId;
    vm.user_id = userOriginatorId;

    var params = {
      id:  $rootScope.orgFinal
    }

    my_profileService.publishedData(params, token).then(function(response) {
      $rootScope.published_count = response.data;
      $rootScope.current_projects = response.project_title;
    });

    my_profileService.profileData(params, token).then(function(response) {
      $rootScope.suggestionTaskCount = response.data;
    });

    my_profileService.publishedData(params, token).then(function(response) {
      $rootScope.published_count = response.data;
    });

    my_profileService.pledgeData(params, token).then(function(response) {
      $rootScope.pledgesCount = response.data;
    });

    $location.path('/profile');

  }


  vm.addNeedComment = function(data){
    needsService.postComment(params,data,vm.particularNeedDetail).then(function(response){
     data.description = '';
     vm.getNeedComments();
   });
  }


  vm.getNeedComments = function(){
    needsService.needComments(vm.particularNeedDetail.id).then(function(response){
      vm.needcomments = response.data.data;
      if(vm.needcomments.length){
        vm.commentedList = true;
      }else{
        vm.commentedList = false;
      }

    });
  }


  vm.needDetails =function(data){
    $(".comment").attr('disabled', 'disabled');
    vm.clicked = true;
    vm.particularNeedDetail = data;
      if(vm.particularNeedDetail.user_pledged == false){
        $('.comment').removeAttr("disabled")
      }
    needsService.needComments(vm.particularNeedDetail.id).then(function(response){
      vm.needcomments = response.data.data;
      if(vm.needcomments.length){
        vm.commentedList = true;
      }else{
        vm.commentedList = false;
      }
    });
    vm.userIcon();
  };



  vm.deleteNeedComment =function(comment){
    var params = {
      need_id: vm.particularNeedDetail.id ,
      id: comment.id
    }
    needsService.deleteNeedComment(params).then(function(response){
      vm.getNeedComments();
    })
  };


  vm.userIcon=function(){
    vm.showDiv = true;

  }


  vm.commentIcon =function(){
    vm.getNeedComments();
    vm.showDiv = false;
  }

  vm.reload =function(){
   var need_id = localStorageService.get('need_id')
   var index = localStorageService.get('need_index')
   vm.pledgedUser(need_id,index)
 }

}]);