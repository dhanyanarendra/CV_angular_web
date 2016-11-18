'use strict';

/**
 * @ngdoc function
 * @name startApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the startApp
 */
 angular.module('cityVitalityAngularApp')
 .controller('structureCtrl', function ($rootScope, $timeout, $element, localStorageService, Structureservice, taskService, needsService, $window, $scope,my_profileService, $location, _) {
  var vm = this;
  $rootScope.profileImage =localStorageService.get('imagep');
  vm.TaskTitle = localStorageService.get('TaskTitle');
  $rootScope.tasklength = localStorageService.get('tasklength');

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


  if (localStorageService.get('title') === null){
    if ($location.$$path === '/structure') {
      $location.path('/page_error');
    }
  }

  vm.count = '';
  vm.like_count = 0;
  vm.sugg_title = 0;
  vm.noNeeds = false;
  vm.title=localStorageService.get('title');
  vm.category=localStorageService.get('category');
  vm.pageview = true;
  vm.showcolapseicon = false;
  vm.showexpandicon = false;
  vm.pledgeicon = false;
  vm.toggle_pledged = false;
  vm.taskssuguser = true;
  vm.needssuguser = true;
  vm.icon = false;
  vm.addgoalrow = false;
  vm.addtaskrow = false;
  vm.icon = false;
  vm.taskForm = {};
  vm.tasks = {};
  vm.state = false;
  vm.done = false;
  vm.sugdone = false;
  vm.textmsg = false;
  vm.textneeduser = false;
  vm.textmsguser = false;
  vm.textarea = true;
  vm.sugtextarea = true;
  vm.NewTask =false;
  vm.suggestTaskEmpty = null;
  vm.selectedtask = null;
  vm.selectedgoal = null;
  vm.activeGoalTasks = null;
  vm.tasksShow = true;
  vm.needsShow = true;
  vm.showtt = true;
  vm.taskssugShow = true;
  vm.needssugShow = true;
  vm.taskIcon = false;
  vm.needdone = false;


  vm.needstate = false;
  vm.priority_value = false;
  vm.editpriority_value = false;
  vm.needs = null;
  vm.needadded = true;
  vm.showNeedDescription = true;
  vm.needflag = false;
  vm.showTaskFlag = false;
  vm.olditemid = null;
  vm.oldneedid = null;
  vm.clickedtsk = false;
  vm.suggestionRow = false;
  vm.showSuggestion = false;
  vm.suggestion = {};
  vm.sugNeedForm = false;
  $rootScope.flashmsg = false;
  vm.need = {};
  vm.suggestionSelected_id = null;
  vm.noEdit = false;
  $scope.selectedImage = '';
  $scope.project_name = '';
  $scope.category = '';
  $scope.project_name = localStorageService.get('project_name');
  $scope.category = localStorageService.get('category');
  $rootScope.userName= localStorageService.get('user-name');
  $scope.images = [

  {value: 'money', url: '../images/icon-moneybag.png'},
  {value: 'material', url: '../images/icon-tool.png'},
  {value: 'man', url: '../images/icon-manpower.png'},
  ];

  $scope.selectImage = null
  $scope.selectvalue = null

  // var params_viewProfile ={
  //   id: $rootScope.userId
  // }
  // my_profileService.getData(params_viewProfile).then(function(response) {
  //   debugger;
  //   $rootScope.viewProfileImage = response.data.file.url
  // });



  vm.like_sugproject = function(like_bool,id) {
    vm.like = like_bool ? true : false
    var params = {
      like: like_bool
    }
    Structureservice.like_sugtasks(id,params).then(function(response) {

      if (response.status === 200) {
        vm.count = response.count
        if(vm.count === 0){
         vm.noEdit = false;
       }
       else{
         vm.noEdit = true;
       }

     }
     vm.getSuggestion();

   });
  }

  vm.dragCallback = function(item) {
    // $scope.openItem();
    vm.openAllItems();
    vm.dragedtask = JSON.parse(item.target.attributes.taskid.textContent);
    vm.selectedTastItem = item;
  // vm.getSuggestion();
}

vm.dropCallback = function(item) {
  vm.droppedgoal = JSON.parse(item.target.attributes.goal.textContent);
  vm.dragedtask.title = vm.dragedtask.suggestion_title;
  vm[vm.droppedgoal.id].tasks.push(vm.dragedtask);
  vm.selectedTastItem.draged = true;
  vm.getSuggestion();
  vm.pageview = true;


  vm.project_id =  localStorageService.get('describe_id');
  var params = {
    describe_id: vm.project_id,
    goal_id: vm.droppedgoal.id ,
    title: vm.dragedtask.suggestion_title,
    date: vm.dragedtask.date,
    time: vm.dragedtask.time,
    description: vm.dragedtask.description,
    venue: vm.dragedtask.venue,
    timezone: vm.dragedtask.timezone,
    task_suggestion_id: vm.dragedtask.id
  }
  taskService.createNewTask(params).then(function(response) {
    vm.selectedtask = response.data.id;
    vm.suggestionSelected_id = null;
    vm.getTasks(vm.droppedgoal);

    Structureservice.updateSuggstion_status(vm.dragedtask.id).then(function (response) {
      vm.getSuggestion();
    });

    Structureservice.like_update_tasksuggestion(vm.dragedtask.id, response.data.id).then(function(response) {

    });
    var params = {
      describe_id: vm.project_id,
      title: vm.dragedtask.title,
      goal_id: vm.droppedgoal.id ,
      task_id: response.data.id ,
      date: vm.dragedtask.date,
      time: vm.dragedtask.time,
      description: vm.dragedtask.description,
      venue: vm.dragedtask.venue,
      timezone: vm.dragedtask.timezone
    }


    taskService.taskDetails(params).then(function(response) {
    });

    _.each(vm.dragedtask.needs, function(item) {

      var params = {
        describe_id: vm.project_id,
        goal_id: vm.droppedgoal.id,
        task_id: response.data.id,
        need_decription: item.need_description,
        need_type: item.need_type,
        priority: item.priority,
        need_name: item.need_name,
        quantity: item.quantity,
        unit: item.unit,
        task_suggestion_id: item.task_suggestion_id
      }

      needsService.postData(params).then(function(response) {
        vm.textMsg = false;
      });

    })

  });

}

vm.draftpage=function(){
 $location.path('/dashboard_new')
}

vm.setDragTask = function (taskitem) {
  vm.selectedTastItem = taskitem;
  vm.getSuggestion();

}

$scope.SelectType = function(image,value){
  $scope.selectImage = image
  $scope.selectvalue= value
}

  // vm.textMsg = function(){
  //   vm.textmsg = true;
  // }

  // vm.textMsg = function(){
  //   vm.textneeduser = false;

  // }

  vm.textMsguser = function(){
    vm.textmsguser = true;
  }

  vm.logout = function(){
   $rootScope.editProjectVar = false;
   $scope.userSignedIn = false;
   localStorageService.clearAll();
   $location.path('/land')
 }


 $scope.editSelectType = function(image, value, need){
  need.editselectImage = image
  need.editselectvalue= value
  need.imageVar = true;
}

vm.needcollapse = function(){
 vm.addNeedRow(false);
}

vm.editPriority = function(goal, task, need){
  vm.editpriority_value = !vm.editpriority_value;
  need.priority = !need.priority;
  vm.updateNeed(goal, task, need);
}


vm.Priority = function(){
  vm.priority_value = !vm.priority_value;
}

$window.scrollTo(0,0)

$scope.date = vm.date;

// -------------------needs details-----------------


vm.hidefields = function(){
  vm.showForm =  false;
}


vm.showNeedDeleteIcon = function(need, index){
  vm.selectedNeed = index;
  need.deleteicon = !need.deleteicon;

}

vm.highlightConNeed = function(need, index){
  vm.selectedConNeed = index;
}

vm.showarea = function(need){

  if (vm.oldneedid != need.id) {
    _.each(vm.needs, function(item) {
      item.needDescriptionArea = false
    })
    vm.oldneedid = need.id;
  }
  need.needDescriptionArea = !need.needDescriptionArea;
}

vm.needcollapse = function(){
 vm.addNeedRow(false);
}


vm.collapse = function(index,structure,goal){
 vm.addTaskRow(false);
 if($rootScope.$root.chrLength){
  $('.task_input').show();
  $('.textchange1').show();
  document.getElementById('input_id').reset();
  angular.element($('.border_goal')).removeClass('active');
  angular.element($('.addgoaltxt')).removeClass('active');
  $scope.focusIndex = localStorageService.get('tasklength');
}else{
  vm.selectedtask = index-1;
  vm.showdetailtask(structure[structure.length-1].goal_id,structure[structure.length-1].id, true);
 vm.getNeeds(goal,structure[structure.length-1]);
}
}

vm.addGoalRow = function (type, goal, index) {
 angular.element($('.border_goal')).removeClass('active');
 angular.element($('.addgoaltxt')).removeClass('active');
 vm.addgoalrow = type;
 vm.goal_name = "";
 vm.description = '';
 vm.pageview = false;
}



vm.addNeedRow = function (type, goal,task,focusIndex) {
  $scope.selectImage = "";
  $scope.selectvalue = "";
  vm.addneedrow = type;
  vm.need_name = "";
  vm.quantity = '';
  vm.need_description = '';
  vm.need_type = '';
  vm.unit = '';
  vm.priority_value = '';
  $scope.selectedImage = '';
  vm.showForm = true;
  vm.des = true
  vm.showNeedTableTitle = true;
  // vm.taskDetails(goal,task,focusIndex);
  $('.rightpanel').animate({ scrollTop: $('.rightpanel').prop("scrollHeight")}, 1000);
}


vm.addTask = function (goal, index, event) {
  vm.tasksShow = true;
  vm.needsShow = true;
  vm.taskIcon = false;
  vm.selectedgoal = index;
  vm.done = false;


  vm.project_id =  localStorageService.get('describe_id');
  var params = {
    describe_id: vm.project_id,
    goal_id: goal.id ,
    title: vm.taskForm.task_name
  }
  taskService.createNewTask(params).then(function(response) {
    if(response.data){
    localStorageService.set('TaskTitle', response.data.title);
  }
    localStorageService.set('task_id', response.data.id);
    vm.openTasks(goal, response.data, event, vm[goal.id].tasks.length, index);
    vm.addTaskRow(false);
    vm[goal.id].tasks.push(response.data);
    vm.openNeeds(goal,response.data, {}, event, vm[goal.id].tasks.length, index);
    vm.getNeeds(goal,response.data);
    vm.selectedtask = vm[goal.id].tasks.length-1;
    vm.addTaskRow(true, index);
    vm.selectedgoal = null;
    vm.collapse(index);
    vm.goalcollapse();
    vm.pageview = false;
    vm.getSuggestion();
      // vm.openNeeds(goal,response.data, {}, event, vm[goal.id].tasks.length, index);
      if(response.data === 422){
        vm.state = true;
      }
      vm.getTasks(goal, index)
      var index_task = 1
      if (localStorageService.get('tasklength') == 0){

        vm.selectedtask = localStorageService.get('tasklength');
      }
      else{
        vm.selectedtask = localStorageService.get('tasklength');
      }

      $rootScope.$root.chrLength = '';
    });
}


$rootScope.countLength = function(val){
  $rootScope.$root.chrLength = val;
}


vm.getNeeds = function (goal, task) {
  $('.task_input').show();
  $('.textchange1').show();
  vm.showNeedIcon = false;
  vm.addneedrow = true;
  vm.project_id =  localStorageService.get('describe_id');
  vm.user_id =  localStorageService.get('user_id');
  var params = {
    describe_id: vm.project_id,
    goal_id: goal.id,
    task_id: task.id

  }

  needsService.getData(params).then(function(response) {
    if(response.data.length != 0){
      vm.showtt = true;

    } else {

  vm.showtt = true;

    }

    vm[task.id] = {
      needs: response.data
    };

    vm.needs = response.data
    if(response.data[0].pledge[0].quantity){
    $rootScope.pledgeQuantity = response.data[0].pledge[0].quantity;
  }
  });
}


vm.getshowNeeds = function (goal_id, task_id) {
  vm.showNeedIcon = false;
  vm.addneedrow = true;
  vm.project_id =  localStorageService.get('describe_id');
  vm.user_id =  localStorageService.get('user_id');
  var params = {
    describe_id: vm.project_id,
    goal_id: goal_id,
    task_id: task_id

  }
  needsService.getData(params).then(function(response) {
    if(response.data.length != 0){
        } else {
    }

    vm[task.id] = {
      needs: response.data
    };

    vm.needs = response.data
    $rootScope.pledgeQuantity = response.data[0].pledge[0].quantity;

  });
}


vm.addNeed = function(goal, task, index, event, focusIndex){
 vm.needadded = true;

 vm.selectedNeed = index;
 if(vm[task.id].needs){
 vm.selectedneed = vm[task.id].needs.length;
}
 if( vm.priority_value || vm.need_name || vm.quantity || vm.need_description || vm.unit ||  $scope.images){
  vm.describe_id = localStorageService.get('describe_id');
  var params = {
    describe_id: vm.describe_id,
    goal_id: goal.id,
    task_id: task.id,
    need_decription: vm.need_description,
    need_type: $scope.selectvalue,
    priority: vm.priority_value,

    need_name: vm.need_name,
    quantity: vm.quantity,
    unit: vm.unit
  }
  if(params.priority || params.type || params.need_decription || params.need_type || params.need_name || params.quantity || params.unit ){
    needsService.postData(params).then(function(response) {
      // vm.getTasks(goal);
      vm.descriptionNeed = response.data.need_decription;
      if(params.need_decription){
        vm.showNeedDescription = true;
      }
      vm.done1 = true;
      vm.needstate = false;
      if(response.data.length != 0){
            }
      else{

      }
      vm.getTasks(goal);
      task.status = true;
      vm.needdone = true;
      // vm.openNeeds(goal, task, response.data, event, vm[task.id].needs.length, index, focusIndex);
      vm.addNeedRow(true);
      vm[task.id].needs.push(response.data);
      vm.need_item = vm[task.id].needs ;
      vm.getNeeds(goal, task);
      vm.need_name = "";
      vm.quantity = '';
      vm.need_description = '';
      vm.unit = '';
      vm.need_type = '';
    });
  }
  else {
    if(vm[task.id].needs.length != 0){
        }
    else {

   }
    // vm.getTasks(goal);
   // localStorageService.set('focustask', focusIndex);

    // debugger;
    // angular.element($('.border_goal')).removeClass('active');
    // angular.element($('.addgoaltxt')).removeClass('active');
    // angular.element($('.border_goal')[focusIndex]).addClass('active');
    // angular.element($('.border_goal')[focusIndex]).find('.addgoaltxt').addClass('active');
  }
}
}

vm.delete_need = function(goal, task, need){
 vm.project_id =  localStorageService.get('describe_id');
 var params = {
  describe_id: vm.project_id,
  goal_id: goal.id ,
  task_id: task.id ,
  id: need.id
}
needsService.deleteNeed(params).then(function(response) {
 vm.getNeeds(goal, task);
 vm.getTasks(goal);
});
}


vm.hideNeedform = function () {

}

vm.hideInputForm = function(){

}

vm.hideForm = function(need){
  need.needtextarea = true;
}

vm.hidearea = function(need){
 need.needtextarea = false;
}

vm.openNeeds = function (goal, task, need, event, index, parentindex,focusIndex) {
 localStorageService.set('task_id', task.id);
 vm.selectedtask = focusIndex;
 vm.selectedneed = index;
 vm.Details_goal = goal;
 vm.Details_goal_id = goal.id;
 vm.Details_task = task;
 vm.Details_task_id = task.id;
 vm.Details_need = need;
 vm.pageview = false;
 vm.need_name = '';
 vm.quantity = '';
 vm.need_description = '';
 vm.unit = '';
 vm.pledgeicon = false;
 vm.selectedtask = focusIndex;
   // if(need==true){
   // localStorageService.set('focustask', focusIndex);
   // if(add_need==true){
     vm.getTasks(goal);
   // }
   if($rootScope.$root.chrLength){
    angular.element($('.border_goal')).removeClass('active');
    angular.element($('.addgoaltxt')).removeClass('active');
    angular.element($('.border_goal')[focusIndex]).addClass('active');
    angular.element($('.border_goal')[focusIndex]).find('.addgoaltxt').addClass('active');
    // $scope.focusIndex = localStorageService.get('tasklength');
  }else{
   angular.element($('.border_goal')).removeClass('active');
   angular.element($('.addgoaltxt')).removeClass('active');
   angular.element($('.border_goal')[focusIndex]).addClass('active');
   angular.element($('.border_goal')[focusIndex]).find('.addgoaltxt').addClass('active');
   vm.getTasks(goal);
   // vm.addNeedRow(true, task.id);
   //  vm.openNeeds(goal, task, needitem, $event, task.id, goal.id);
 }
}

vm.openConNeeds = function (goal, task, need, event, index, parentindex,focusIndex) {
 localStorageService.set('task_id', task.id);
 vm.selectedtask = focusIndex;
 vm.selectedneed = index;
 vm.Details_goal = goal;
 vm.Details_goal_id = goal.id;
 vm.Details_task = task;
 vm.Details_task_id = task.id;
 vm.Details_need = need;
 vm.pageview = false;
 vm.need_name = '';
 vm.quantity = '';
 vm.need_description = '';
 vm.unit = '';
 vm.pledgeicon = false;
 vm.selectedtask = focusIndex;
   // if(need==true){
   // localStorageService.set('focustask', focusIndex);
   // if(add_need==true){
     vm.getTasks(goal);
   // }
   if($rootScope.$root.chrLength){
    angular.element($('.border_goal')).removeClass('active');
    angular.element($('.addgoaltxt')).removeClass('active');
    angular.element($('.border_goal')[focusIndex]).addClass('active');
    angular.element($('.border_goal')[focusIndex]).find('.addgoaltxt').addClass('active');
    // $scope.focusIndex = localStorageService.get('tasklength');
  }else{
   angular.element($('.border_goal')).removeClass('active');
   angular.element($('.addgoaltxt')).removeClass('active');
   angular.element($('.border_goal')[focusIndex]).addClass('active');
   angular.element($('.border_goal')[focusIndex]).find('.addgoaltxt').addClass('active');
   vm.getTasks(goal);
   vm.addNeedRow(true, task.id);
    // vm.openNeeds(goal, task, needitem, $event, task.id, goal.id);
 }
}

vm.updateNeed = function(goal, task, need){
 vm.project_id =  localStorageService.get('describe_id');
 var params = {
   describe_id: vm.project_id,
   goal_id: goal.id,
   task_id: task.id,
   id: need.id,
   need_decription: need.need_decription,
   need_type: need.editselectvalue,
   priority: need.priority,
   quantity: need.quantity,
   need_name: need.need_name,
   unit: need.unit
 }
 needsService.updateNeed_details(params).then(function(response){
// vm.getNeeds(goal, task);
need.needtextarea = false;
need.shows = true;
need.varname = false;

});

}

vm.editImage = function(need){
  need.imageVar = true;
}

// ---------------------end of needs------------------


vm.showTasks = function () {
  vm.tasksShow = true;
  vm.needsShow = false;

}

vm.showNeeds = function () {
  vm.tasksShow = false;
  vm.needsShow = true;
}


vm.showsugTasks = function (suggestion) {
  vm.showSuggestionDetails(suggestion);
  vm.taskssugShow = true;
  vm.needssugShow = false;
}


vm.showsuguser = function (suggestion) {
  vm.showSuggestionDetails(suggestion)
  vm.taskssuguser = true;
  vm.needssuguser = false;
}

vm.showneeduser = function (suggestion) {
  vm.showSuggestionDetails(suggestion)
  vm.taskssuguser = false;
  vm.needssuguser = true;
}


vm.showsugNeeds = function (suggestion) {
  vm.showSuggestionDetails(suggestion)
  vm.taskssugShow = false;
  vm.needssugShow = true;
}

vm.showneed = function(){
  vm.tasksShow = true;
  vm.needsShow = true;
}

vm.deleteSuggestion_need = function(id){
  needsService.deleteSuggestionNeed(vm.suggestion_id, vm.need, id).then(function(response) {
    vm.getSuggestionNeeds();
    vm.getSuggestion();


  });
}

$rootScope.nextPage = function(){
 vm.describe_id =  localStorageService.get('describe_id');
 var params = {
  id: vm.describe_id,
  published: true
}
Structureservice.publish(params).then(function(response) {
 $location.path('/newpage')
 if(response.data.published){
   $rootScope.flashmsg = true;
   $timeout (function() {
    $rootScope.flashmsg = false;
  }, 5000)
 }
});
}

vm.needpage = function(){
  vm.needpageview = true;
}

vm.taskpage = function(){
  vm.taskpageview = true;
}



vm.goalcollapse = function(){
  vm.addGoalRow(false);
  vm.pageview = false;
}

if (!localStorageService.get('title') && localStorageService.get('title') != null) {
  $location.path('/describe');
}

// Task details

vm.hideTask = function(){
  vm.pageview = true;
}

$scope.timePickerOptions = {
  step: 20,
  timeFormat: 'g:ia',
  appendTo: 'body'

};

vm.test = function(){
  vm.textarea = false;
  vm.done= false;
}

vm.sugtest = function(){
  if(vm.noEdit ==false){
    vm.sugtextarea = false;
    vm.sugdone= false;
  }
}


vm.resetTitle = function (item) {
  //item.trimedTitle = item.title;
}

vm.trancateTitle = function (title) {
  var length = 30;
  if (title.length > length) {
   title = title.substring(0, length)+'...';
 }
 return title;
}


vm.showtask = function(goal, task, needOption){
  $('.task_input').show();
  $('.textchange1').show();
  vm.showSuggestion = false;
  vm.showTaskFlag = false;
  if (needOption) {
    vm.tasksShow = true;
    vm.needsShow = true;
  }else {
    vm.tasksShow = true;
    vm.needsShow = false;
  }
  vm.project_id =  localStorageService.get('describe_id');
  var params = {
    describe_id: vm.project_id,
    goal_id: goal.id,
    id: task.id
  };
  taskService.showtaskdetails(params).then(function(response) {
    vm.showTaskFlag = true;
    $scope.focusIndex = vm.selectedtask;
    if(response.status === 200){
      vm.date = response.data.date;
      if(response.data.time){
        vm.time = new Date(response.data.time);
      }
      vm.description = response.data.description;
      vm.venue = response.data.venue;
      vm.like_count = response.like_count;
      vm.user = response.user;
      vm.timezone = response.data.timezone;
      if (vm.description != "" && vm.description != null) {
        vm.done = true;
      } else {
        vm.done = false;
      }
    }
  });
}

vm.showdetailtask = function(goal_id, task_id, needOption){

  vm.showSuggestion = false;
  vm.showTaskFlag = false;
  if (needOption) {
    vm.tasksShow = true;
    vm.needsShow = true;
  }else {
    vm.tasksShow = true;
    vm.needsShow = true;
  }
  vm.project_id =  localStorageService.get('describe_id');
  var params = {
    describe_id: vm.project_id,
    goal_id: goal_id,
    id: task_id
  };
  taskService.showtaskdetails(params).then(function(response) {
    vm.showTaskFlag = true;
    $scope.focusIndex = vm.selectedtask;
    if(response.status === 200){
      vm.date = response.data.date;
      if(response.data.time){
        vm.time = new Date(response.data.time);
      }
      vm.description = response.data.description;
      vm.venue = response.data.venue;
      vm.like_count = response.like_count;
      vm.user = response.user;
      vm.timezone = response.data.timezone;
      if (vm.description != "" && vm.description != null) {
        vm.done = true;
      } else {
        vm.done = false;
      }
    }
  });
}



vm.taskDetails = function(goal, task,focusIndex){
  vm.project_id =  localStorageService.get('describe_id');
  var params = {
   describe_id: vm.project_id,
   title: task.title,
   goal_id: goal.id ,
   task_id: task.id ,
   date: vm.date,
   time: vm.time,
   description: vm.description,
   venue: vm.venue,
   timezone: vm.timezone
 }
 if(params.title === undefined){
  vm.getTasks(goal);
}
$rootScope.$root.chrLength = '';

taskService.taskDetails(params).then(function(response) {
  task.description = response.data.description;
  task.location = response.data.location;1
  task.date = response.data.date;
  task.timezone = response.data.timezone;
  task.time = response.data.time;

  vm.done = true;
  vm.textarea = false;
  vm.description = response.data.description;
  if (vm.description != "" && vm.description != null) {
    vm.done = true;
  } else {
    vm.done = false;
  }
  vm.getTasks(goal);
  angular.element($('.border_goal')).removeClass('active');
  angular.element($('.addgoaltxt')).removeClass('active');
  // console.log($rootScope.$root.chrLength);
  // console.log($scope.chrLength);
  // console.log($scope);
  if(focusIndex==false){
    angular.element($('.border_goal.'+task.id)).addClass('active');
    angular.element($('.border_goal.'+task.id)).find('.addgoaltxt').addClass('active');
  }else{
    var task_id = localStorageService.get('task_id');
    angular.element($('.border_goal.'+task_id)).addClass('active');
    angular.element($('.border_goal.'+task_id)).find('.addgoaltxt').addClass('active');
  }
});
}

// vm.highlight = function(goal, task, goal_id, task_id) {
//   vm.addNeedRow(true, task_id);
//   vm.openNeeds(goal_id, task_id, needitem, $event, task_id, goal_id);
// }

vm.delete = function(goal, task){
  vm.project_id =  localStorageService.get('describe_id');
  vm.goal_id =  localStorageService.get('goal_id');
  var params = {
    describe_id: vm.project_id,
    goal_id: goal.id ,
    id: task.id
  }

  taskService.deleteTask(params).then(function(response) {
    if(response.status == 200){
      if(vm[goal.id].tasks.length==1){
        vm.pageview = false;
      }
      vm.getTasks(goal);
      if(vm[response.data]){
      vm[response.data.id].needs = {};
    }

    }
  });
}

vm.showAddTask = function (row) {
  return row == vm.selectedTask;
}

vm.addTaskRow = function (type, index) {
vm.showtt = true;
  angular.element($('.border_goal')).removeClass('active');
  angular.element($('.addgoaltxt')).removeClass('active');
  vm.taskIcon = false;
  vm.needsShow = true;
  vm.selectedTask = index;
  vm.addtaskrow = type;
  vm.task_name = "";
  vm.taskForm = {};
  vm.description = "";
  vm.venue = '';
  vm.date = '';
  vm.time = '';
  vm.timezone = '';
  vm.pageview = false;
}

$scope.resetForm = function() {
  // $('.task_needs').hide();
  // $('.textchange').hide();
  vm.selectedtask = null;
  vm.needs.length = '';
  vm.done = false;
  document.getElementById('input_id').reset();
};

vm.emptydetails = function(){
  $('.task_input').hide();
  $('.textchange1').hide();
  // vm.needs.length = {};
  document.getElementById('input_id').reset();
}


vm.submitask = function (goal, index, event) {
  vm.tasksShow = true;
  vm.needsShow = true;
  vm.taskIcon = false;
  vm.selectedgoal = index;
  vm.done = false;
  vm.project_id =  localStorageService.get('describe_id');
  var params = {
    describe_id: vm.project_id,
    goal_id: goal.id ,
    title: vm.taskForm.task_name
  }
  taskService.createNewTask(params).then(function(response) {
    localStorageService.set('tasklength', localStorageService.get('tasklength') + 1);
    // vm.taskName = response.data.title.length;
    // localStorageService.set('TaskTitle', response.data.title);
    vm.openTasks(goal, response.data, event, vm[goal.id].tasks.length, index);
    vm.addTaskRow(false);
    vm[goal.id].tasks.push(response.data);
    vm.openNeeds(goal,response.data, {}, event, vm[goal.id].tasks.length, index);
    vm.getNeeds(goal,response.data);
    vm.selectedtask = vm[goal.id].tasks.length-1;
    vm.addTaskRow(true, index);
    vm.selectedgoal = null;
    vm.pageview = false;
    vm.getSuggestion();
    // vm.openNeeds(goal,response.data, {}, event, vm[goal.id].tasks.length, index);


    if(response.data === 422){
      vm.state = true;
    }
    vm.getTasks(goal, index)
    var index_task = 1
    if (localStorageService.get('tasklength') == 0){

      vm.selectedtask = localStorageService.get('tasklength');
    }
    else{

      vm.selectedtask = localStorageService.get('tasklength');
    }

    $rootScope.$root.chrLength = '';
  });
}


vm.getTasks = function (goal, index) {
  vm.project_id =  localStorageService.get('describe_id');
  var params = {
    describe_id: vm.project_id,
    goal_id: goal.id
  }
  taskService.getTasks(params).then(function(response) {
    localStorageService.set('tasklength', response.data.length);

    vm[goal.id] = {
      tasks: response.data
    };
  });

  vm.selectedgoal = index;
}


vm.deleteGoal = function(goal) {
  vm.project_id =  localStorageService.get('describe_id');
  var params = {
    describe_id: vm.project_id ,
    id: goal.id
  }
  Structureservice.deleteGoals(params).then(function(response) {
   if(vm.goals.length-1==0){
     vm.pageview=true;
   }
   vm.getGoals();
   vm[response.data.id].tasks = {};
   vm.pageview = true;
 });

}

vm.saveSuggectionNeed = function () {

  vm.need.need_type = $scope.selectvalue;
  vm.need.priority = vm.priority_value;
  if( vm.need.need_type || vm.need.priority || vm.need.need_name || vm.need.quantity || vm.need.unit || vm.need.need_decription){
    needsService.postSuggestionNeed(vm.suggestion_id, vm.need).then(function(response) {
      vm.getSuggestionNeeds();
      vm.getSuggestion();
      vm.priority_value = false;
      $scope.selectImage = null;
      vm.need = {};
    });
  }
  else{


 }

 $scope.selectvalue = null;

}

vm.addSuggestionRow = function (flag) {
  vm.suggestionSelected_id = vm.suggestions.length + 1;
  vm.suggestTaskEmpty = null;
  vm.NewTask = true;
  vm.noEdit = false;
  if(vm.sugg_title == 0){
  vm.pageview = true;
  }else{
    vm.pageview =false;
  }

  vm.suggestionRow = flag;
  vm.sug_needs ="";
  document.getElementById('sugtaskreset').reset();
  vm.suggestion.description= "";
  vm.suggestion.suggestion_title = "";
  vm.suggestion.time = '';
  vm.suggestion.venue ='';
  vm.suggestion.name = '';
  vm.noNeeds = true;
  vm.suggestion.date = '';
  vm.suggestion.time = '';
  vm.suggestion.timezone = '';
  vm.suggestion.venue ='';
  vm.suggestion.name = '';
  vm.sugg_title = 1;


  // vm.showSuggestionDetails(suggestion);

  // vm.suggestion = null;

  vm.selectedConNeed = null;

  vm.suggestion.suggestion_title = "";

}

vm.likeStatus = function (suggestion) {
  var filteredGoal = _.where(suggestion.likes, {liker_id: localStorageService.get('user_id')});
  if (filteredGoal.length == 0) {
    return false;
  } else {
    return true;
  }

}

vm.addSuggestion = function () {
  vm.suggestion.time = null;
  vm.suggestion.timezone = null;
  vm.suggestion.date = null;
  vm.suggestion.description = null;
  vm.suggestion.venue = null;
  vm.sugdone = false;
  vm.selectedConNeed = null;
  var des_id = localStorageService.get('describe_id');
  Structureservice.createSuggstion(des_id, vm.suggestion).then(function(response) {
    vm.fadeOut();
    vm.suggestion.suggestion_title = "";
    vm.getSuggestion();
    vm.pageview = false;
    vm.selectedtask = null;
    vm.suggestionSelected_id = vm.suggestions.length+1;
    vm.suggestTaskEmpty = vm.suggestions.length;

    vm.showSuggestionDetails(response.data);
    vm.suggestionRow = false;
    vm.addSuggestionRow(true);

  //   vm.suggestionSelected_id = vm.suggestions.length;
});

}

vm.getSuggestion = function () {
  var des_id = localStorageService.get('describe_id');
  vm.user_id =  localStorageService.get('user_id');
  Structureservice.getSuggstion(des_id).then(function(response) {
    vm.suggestions = response.data;
  });
}

vm.deleteSuggestionTask = function (suggestion) {

  Structureservice.deleteSuggestionTask(suggestion.id).then(function(response) {
    vm.getSuggestion();
    vm.pageview = false;
    vm.suggestion.description = "";
    vm.suggestion.date = "";
    vm.sug_needs = "";
    vm.suggestionSelected_id =vm.suggestions.length+1;
    vm.suggestion.name = "";
  });
  document.getElementById('sugtaskreset').reset();

}

vm.checkUser = function() {
  if (vm.suggestion.user) {
    if (localStorageService.get('user_id') == vm.suggestion.user.id) {
      return true;
    } else {
      return false;
    }
  }
}

vm.highlightedStatus = function(suggestion,index){
   vm.suggestTaskEmpty = null;
 }

vm.showSuggestionDetails = function (suggestion) {
   vm.sugg_title = 1;
  vm.pageview = false;
  vm.taskssugShow = true;
  vm.needssugShow = true;
  vm.taskssuguser = true;
  vm.needssuguser = true;

  vm.suggestion_id = suggestion.id;
  vm.suggestion.description = suggestion.description;
  vm.suggestion.timezone = suggestion.timezone;
  vm.suggestion.date = suggestion.date;
  if (suggestion.user) {
    vm.suggestion.name = suggestion.user.user_name;
    vm.suggestion.user = suggestion.user;
  }
  vm.suggestion.needs = suggestion.needs;


  if (suggestion.time) {
    vm.suggestion.time = new Date(suggestion.time);
  } else {
    vm.suggestion.time = '';
  }
  vm.suggestion.venue = suggestion.venue;
  vm.suggestion.timezone=suggestion.timezone;

  vm.pageview = false;
  vm.tasksShow = true;
  vm.showSuggestion = true;

  vm.getSuggestionNeeds();
  // vm.getSuggestion();


  if (vm.suggestion.description != "" && vm.suggestion.description != null) {
    vm.sugdone = true;
  } else {
    vm.sugdone = false;
  }

  if(suggestion.likes.length === 0){
    vm.noEdit = false;
  }
  else{
    vm.noEdit = true;
  }

}

vm.getSuggestionNeeds = function () {
  needsService.getSuggestionNeeds(vm.suggestion_id).then(function(response) {
    vm.sug_needs = response.data;
    if (!vm.showNeedForm && vm.sug_needs.length != 0) {
      vm.showNeedTableTitle = true;
    } else if(vm.sug_needs.length === 0){
      vm.showNeedTableTitle = false;

    }

  });

}

vm.showTaskIcon = function (suggestion) {
  if (suggestion.time || suggestion.timezone || suggestion.venue || suggestion.date || suggestion.description) {
    return true;
  } else {
    return false;
  }
}


vm.showTaskIconuser = function (suggestion) {
  if (suggestion.time || suggestion.timezone || suggestion.venue || suggestion.date  || suggestion.description) {
    return true;
  } else {
    return false;
  }
}

vm.changePageView = function (type) {
  vm.pageview = type;
}

vm.updateSuggestion = function () {
  var des_id = localStorageService.get('describe_id');
  Structureservice.updateSuggstion(des_id, vm.suggestion_id, vm.suggestion).then(function(response) {
    vm.sugdone = true;
    vm.sugtextarea = false;
    if (vm.suggestion.description != "" && vm.suggestion.description != null) {
      vm.sugdone = true;
    } else {
      vm.sugdone = false;
    }
    vm.getSuggestion();
  });
}

vm.addGoal = function () {
  $('.task_input').show();
  $('.textchange1').show();
  vm.project_id =  localStorageService.get('describe_id');
  var params = {
    describe_id: vm.project_id ,
    title: vm.goal_name
  }
if(vm.goal_name.length != 0){
  Structureservice.createNewGoal(params).then(function(response) {
    localStorageService.set('goal_id', response.data.id);
    vm.addGoalRow(false);
    vm.goals.push(response.data);
    vm.getTasks(response.data);
    $scope.openItem(vm.goals.length - 1);
  });
}else{
  vm.goalcollapse();
  $('.task_input').hide();
  $('.textchange1').hide();
}
}


vm.updateGoal = function(goal){
  vm.project_id =  localStorageService.get('describe_id');
  var params = {
   describe_id: vm.project_id,
   title: goal.title,
   id: goal.id
 }
 Structureservice.updateGoal(params).then(function(response){
  localStorageService.set('goal_id', response.data.id);
  vm.addGoalRow(false);
  vm.getTasks(response.data);
  // $scope.openItem(vm.goals.length - vm.goals.length);
});

}


$scope.openItem = function(index) {
  vm.goals[index].open = true;
  vm.addTaskRow(true, index);
  vm.pageview = false;
};

vm.getGoals = function () {
  vm.project_id =  localStorageService.get('describe_id');
  var params ={
    describe_id: vm.project_id
  }
  Structureservice.getGoals(params).then(function(response) {
    vm.goals = response.data;
  });
}

vm.logout = function(){
  localStorageService.clearAll();
  $location.path('/land')
}

vm.taskSortableOptions = {

  stop: function(e, ui) {
    var order = [];
    var task = {};
    _.each(vm[vm.Details_goal.id].tasks, function(val, key){
      task = {};
      task.position = key;
      task.id = val.id;
      order.push(task);
    });
    taskService.reorderTasks(vm.Details_goal.id, order).then(function(response) {
      vm.pageview = true;
    });

   // return _.find(vm[vm.Details_goal.id].tasks, function(item, index) {
   //    if (item.title == vm.activeGoalTasks[vm.selectedtask].title) {
   //      console.log(item)
   //      vm.selectedtask = index;
   //      console.log(vm.selectedtask)
   //      vm.activeGoalTasks = vm[vm.Details_goal.id].tasks.slice(0);
   //    }
   //  });
 }
}

vm.goalSortableOptions = {
 stop: function(e, ui) {
  var order = [];
  var goal = {};
  _.each(vm.goals, function(val, key){
    goal = {};
    goal.position = key;
    goal.id = val.id;
    order.push(goal);
  });

  Structureservice.reorderGoals(order).then(function(response) {
    vm.pageview = true;
  });


  if (ui.item.sortable.model == "can't be moved") {
    ui.item.sortable.cancel();
  }
}
}

vm.openTasks = function (goal, task, event, index, parentindex) {
  angular.element($('.border_goal')).removeClass('active');
  angular.element($('.addgoaltxt')).removeClass('active');
  // vm.activeGoalTasks = _.extend(vm[goal.id].tasks,{});
  vm.selectedtask = index;
  vm.selectedgoal = parentindex;
  vm.Details_goal = goal;
  vm.Details_task = task;
  vm.suggestionSelected_id = null;
  vm.pageview = false;
  vm.date = '';
  vm.time = '';
  vm.description = '';
  vm.venue = '';
  vm.timezone = '';
}


$scope.iconClose = function() {
 vm.icon = true;
};

$scope.iconOpen = function() {
  vm.icon = true;
};



vm.openAllItems = function(){
  vm.showexpandicon = true;
  vm.showcolapseicon = false;
  vm.goals.map(function(item){
   item.open = true;

   vm.icon = true;
 });
  _.each(vm.goals, function(goal){
    vm.getTasks(goal);
  });
};

vm.closeAllItems = function(){
  vm.showcolapseicon = true;
  vm.showexpandicon = false;
  vm.pageview = true;

  vm.goals.map(function(item){
   item.open = false;
   vm.icon = true;

 });
}

vm.getGoals();

vm.preview= function(){
  $location.path('/preview')
}


vm.showtextarea = function(need){
  need.needtextarea = true;
}

vm.pledge = function(){
  vm.pledgeicon = true;
}

// vm.pledgeQuanty = function(needitem) {
//   if (needitem.total) {
//     return needitem.total;
//   } else {
//     return 0;
//   }
// }

vm.toggleRow = function (needitem) {

  if (vm.olditemid != needitem.id) {
    _.each(vm.needs, function(item) {
      item.activerow = false
    })
    vm.olditemid = needitem.id;
  }

  if (needitem.activerow === undefined) {
    needitem.active = false;
  }

  if (!needitem.activerow) {
    needitem.activerow = true;
  } else {
    needitem.activerow = false;
  }

}

// vm.getQuantity = function (needitem) {

//   if (needitem.pledge.length) {
//     return needitem.pledge[0].quantity;
//   } else {
//     return 0;
//   }

// }


vm.logo = function(){
  $location.path('/');

}

vm.hidename = function(need){
  need.varname = true;
  need.shows = false;
}


$(document).keydown(function(e) {
  var nodeName = e.target.nodeName.toLowerCase();

  if (e.which === 8) {
    if ((nodeName === 'input' && e.target.type === 'text') ||
      nodeName === 'textarea') {
            // do nothing
        } else {
          e.preventDefault();
        }
      }
    });

vm.testTitle = function(goal, task){
  var params = {
   title: task.title
 }
 if(params.title === undefined){
  vm.getTasks(goal);
}
}


vm.init = function () {
  vm.getSuggestion();
  vm.user_id = localStorageService.get('user_id');
  vm.user_originator_id = localStorageService.get('user_originator_id');
}
vm.init();

vm.fadeOut= function(){
  vm.suggestionRow =false;
  vm.suggestTaskEmpty = vm.suggestions.length;
}

vm.suggestionNeedHighlight = function(need, index){
  vm.suggestionSelected_id = index;
  vm.selectedtask = null;
  vm.selectedConNeed = null;
}

vm.getPage = function(){
  $window.location.reload();
  $location.path('/dashboard_new');
}


});