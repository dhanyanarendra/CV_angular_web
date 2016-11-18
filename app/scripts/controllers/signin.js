'use strict';

/**
 * @ngdoc function
 * @name startApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the startApp
 */
 angular.module('cityVitalityAngularApp')
 .controller('signinCtrl', function (signinService, $scope, $window, $location, localStorageService, $timeout, $rootScope) {

  var vm = this;
  vm.signinForm = {};
  vm.resetpwdForm = {};
  vm.myForm = {};
  vm.password_reset_token = {};
  vm.errorMsgFlag = false;
  vm.done = false;
  vm.err = false;
  vm.submitform = false;
  vm.spaceErr = false;
  vm.submitvalid = false;
  vm.charErr = false;
  $rootScope.image = null;
  $rootScope.userName = localStorageService.get('user-name');
  // $rootScope.profileImage=localStorageService.get('imagep');

  vm.togglePwd = function () {
    if (!vm.showpassword)
      vm.showpassword = true;
    else
      vm.showpassword = false;
  }

  $('.loginspace').keydown(function(e) {
    if (e.keyCode == 32) {
      return false;
    }
  });

  $(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
      var d = event.srcElement || event.target;
      if ((d.tagName.toUpperCase() === 'INPUT' &&
       (
         d.type.toUpperCase() === 'TEXT' ||
         d.type.toUpperCase() === 'PASSWORD' ||
         d.type.toUpperCase() === 'NUMBER'
         )
       ) ||
       d.tagName.toUpperCase() === 'TEXTAREA') {
        doPrevent = d.readOnly || d.disabled;
    }
    else {
      doPrevent = true;
    }
  }
});


  vm.flush = function() {
    vm.signinForm = {}
    vm.errorMsgFlag=false;
    vm.submitted = false;
  }

  vm.login = function() {

    vm.submitted = true;
    if (vm.signinForm.userid.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)) {
      vm.signinForm.email = vm.signinForm.userid
      vm.signinForm.user_name = null
      var params = {
        email: vm.signinForm.email,
        user_name: null,
        password: vm.signinForm.password
      }
    }
    else {
      vm.signinForm.user_name = vm.signinForm.userid;
      vm.signinForm.email = null
      var params = {
        email: null,
        user_name: vm.signinForm.user_name,
        password: vm.signinForm.password
      }
    }

    signinService.getData(params).then(function(response) {
      $rootScope.userDetails = response.data;
      if(response.status === 200) {
        localStorageService.set('user-name', response.data.user_name);
        localStorageService.set('user_id', response.data.id);
        localStorageService.set('auth-token', response.data.auth_token);
        localStorageService.set('user-signed-in', true);
        localStorageService.set('email', response.data.email);
        localStorageService.set('imagep', response.data.file.url);
        $rootScope.loginUserName = localStorageService.get('user-name')
        angular.element("#myModal_Signin").modal("hide");
        if($rootScope.create == "createProject" ) {
          $location.path('/describe')
          $window.location.reload();
        }
        else if($rootScope.Login == "LoginOnly") {
          $location.path('/')
          $window.location.reload();
        }
        else if (localStorageService.get('loginpath') == "loginlink") {
          var loginpath = '/describe';
        }
        else {
          var loginpath = '/contributor_describe';
        }
        $timeout (function () {$location.path(loginpath);}, 200);
        vm.flush();
        vm.signupForm = {} ;
      }


      else {
        vm.errorMsgFlag = true;
      }

    });

  }

  vm.display =function() {
    localStorageService.set('loginpath', 'tile');
    angular.element("#myModal_Signup").modal("show");
    angular.element("#myModal_Signin").modal("hide");
  }

  vm.emailpage = function() {
   angular.element("#myModal_Signin").modal("hide");
   $timeout (function () {$window.open('http://uat.peershape.qwinixtech.com/#/forgot_password');}, 200)
 }

 vm.pwdreset = function() {
  vm.emailErr = false;
  vm.submitform = true;
  var params = {
    email : vm.resetpwdForm.email
  }
  if(params.email !== undefined) {
   signinService.postData(params).then(function(response) {
    vm.password_reset_token = response.password_reset_token;
    localStorageService.set('password_reset_token', response.password_reset_token);
    $location.path('/land')
    vm.err = true;
    vm.alertmsg = true;
    vm.resetpwdForm = {};
    vm.submitform = false;
    localStorageService.set('alertmsg', vm.alertmsg);

  });
 }
}
vm.keyPresslogin = function(e) {
  if (e.keyCode == 13){
    angular.element('#sign-btn').focus();
    vm.login();
    vm.submitted = true;
  }
}

vm.clearfrm = function() {
  vm.done = false;
  vm.submitform = false;
  vm.emptyform =false;
  vm.spaceErr = false;
  vm.IsMatch=false;
}

vm.submit = function() {
  vm.done = true;
  vm.IsMatch=false;
  vm.success = false;
  vm.resetpwd = localStorageService.get('password_reset_token');

  var params = {
    password_reset_token : vm.resetpwd,
    password : vm.myForm.password,
    password_confirmation : vm.myForm.password_confirmation

  }
  if (params !== undefined) {
    signinService.putData(params).then(function(response) {
      vm.IsMatch=false;
      vm.pwd1 = params.password;
      vm.pwd2 = params.password_confirmation;
      if (vm.pwd1 != vm.pwd2) {
        vm.IsMatch=true;
        return false;
      }
      if(response.success === true) {
        localStorageService.remove('password_reset_token');
        vm.success = response.success;
        localStorageService.set('updatepwd', vm.success);
        $timeout (function () {$location.path('/land');}, 2000);
      }

      if(response.data.error) {
        if(response.data.error.password) {
          if(response.data.error.password[0] === "Your password can't contain spaces") {
            vm.spaceErr = true;
            vm.charErr = false;
          }
          else if(response.data.error.password[0] === "is too short (minimum is 8 characters)") {
            vm.charErr = true;
            vm.spaceErr = false;
          }
          else {
            vm.spaceErr = false;
            vm.charErr = false;
          }
        }
      }
    });
  }
}
});
