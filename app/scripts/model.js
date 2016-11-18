angular.module('cityVitalityAngularApp')

.factory('User', function ($resource, ENV, localStorageService) {
  return $resource(ENV.api_path + "api/v1/user/",

  {
    format: 'json'
  },
  {
    save: {
      method: "Post",
      url: ENV.api_path + "api/v1/users"
    }


  });
});

angular.module('cityVitalityAngularApp')

.factory('Member', function ($resource, ENV, localStorageService) {
  return $resource(ENV.api_path + "api/v1/authenticate/",

  {
    format: 'json'
  },
  {
    save: {
      method: "Post",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/authenticate"
    }
  });
});


angular.module('cityVitalityAngularApp')

.factory('resetPassword', function ($resource, ENV,localStorageService) {
  return $resource(ENV.api_path + "api/v1/forgot_password/",

  {
    format: 'json'
  },
  {
    forgot_password: {
      method: "Post",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/forgot_password"
    },
    reset_password: {
      method: "Put",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/reset_password"
    }
  });
});


angular.module('cityVitalityAngularApp')

.factory('Project', function ($resource, ENV, localStorageService) {
  return {
    authToken: function (token) {
      return $resource(ENV.api_path + "api/v1/describes/",
      {
        format: 'json',
        id: '@describe_id'
      },
      {
        save: {
          method: "Post",
          headers: { 'Authorization': localStorageService.get('auth-token') },
          url: ENV.api_path + "api/v1/describes"
        },
        get_projects: {
          method: "Get",
          headers: { 'Authorization': token },
          url: ENV.api_path + "api/v1/describes"

        },
        // get_projectById: {
        //   method: "Get",
        //   headers: { 'Authorization': localStorageService.get('auth-token') },
        //   url: ENV.api_path + "api/v1/describes/:id"

        // },
        likeProjects: {
          method: "Post",
          headers: { 'Authorization': localStorageService.get('auth-token') },
          url: ENV.api_path + "api/v1/:id/describe/like"
        },
        followProjects: {
          method: "Post",
          headers: { 'Authorization': localStorageService.get('auth-token') },
          url: ENV.api_path + "api/v1/:id/describe/follow"
        },
        updateDetails: {
          method: "Put",
          headers: { 'Authorization': localStorageService.get('auth-token') },
          url: ENV.api_path + "api/v1/describes/:id"
        }

      });
    }
  };
});

angular.module('cityVitalityAngularApp')

.factory('Structure', function ($resource, ENV, localStorageService) {
  return $resource(ENV.api_path + "api/v1/describes/:describe_id/goals",

  {
    describe_id: '@describe_id',
    id: '@id',
    format: 'json'
  },
  {
    save: {
      method: "Post",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/describes/:describe_id/goals",

    },
    publish: {
      method: "put",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/describes/publish",

    },
    getgoals: {
      method: "get",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/describes/:describe_id/goals"
    },
    deleteGoals: {
     method: "delete",
     headers: { 'Authorization': localStorageService.get('auth-token') },
     url: ENV.api_path + "api/v1/describes/:describe_id/goals/:id"
   },

   updateGoal: {
     method: "put",
     headers: { 'Authorization': localStorageService.get('auth-token') },
     url: ENV.api_path + "api/v1/describes/:describe_id/goals/:id"
   }

 });
});

angular.module('cityVitalityAngularApp')

.factory('Task', function ($resource, ENV, localStorageService) {
  return $resource(ENV.api_path + "api/v1/describes/:describe_id/goals/:goal_id/tasks",

  {
    describe_id: '@describe_id',
    goal_id: '@goal_id',
    id: '@task_id'
    // id: '@need_id'

  },
  {
    save: {
      method: "Post",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/describes/:describe_id/goals/:goal_id/tasks"
    },
    gettasks: {
      method: "get",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/describes/:describe_id/goals/:goal_id/tasks"
    },
    delete_task: {
      method: "delete",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/describes/:describe_id/goals/:goal_id/tasks/:id"
    },
    task_details: {
      method: "put",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/describes/:describe_id/goals/:goal_id/tasks/:id"
    },
    showtaskdetails: {
      method: "get",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/describes/:describe_id/goals/:goal_id/tasks/:id"
    }

  });
});

angular.module('cityVitalityAngularApp')

.factory('Need', function ($resource, ENV, localStorageService) {
  return $resource(ENV.api_path + "api/v1/describes/:describe_id/goals/:goal_id/tasks/:task_id/needs",

  {
    describe_id: '@describe_id',
    goal_id: '@goal_id',
    task_id: '@task_id',
    need_id: '@need_id',
    id: '@id'

  },
  {
    save: {
      method: "Post",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/describes/:describe_id/goals/:goal_id/tasks/:task_id/needs"
    },
    pledgedUsers: {
      method: "get",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/:need_id/pledged_user"
    },
    gettasks: {
      method: "get",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/describes/:describe_id/goals/:goal_id/tasks/:task_id/needs"
    },
    delete_need: {
      method: "delete",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/describes/:describe_id/goals/:goal_id/tasks/:task_id/needs/:id"
    },
    pledge: {
      method: "Post",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/tasks/:task_id/needs/:need_id/pledge"
    },
    update_need: {
      method: "put",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/describes/:describe_id/goals/:goal_id/tasks/:task_id/needs/:id"
    }

  });
});


angular.module('cityVitalityAngularApp')

.factory('DashboardProject', function ($resource, ENV, localStorageService) {
  return {
    authToken: function (token) {
      return $resource(ENV.api_path + "api/v1/describes/:id",

      {
        id: '@describe_id',
        need_id: '@need_id'
      },
      {
        listProjects: {
          method: "Get",
          headers:  {'Authorization': token },
          url: ENV.api_path + "api/v1/list_projects"
        },

        deleteProjects: {
          method: "Delete",
          headers:  {'Authorization': token },
          url: ENV.api_path + "api/v1/describes/:id"
        },

        projectNeeds: {
          method: "get",
          headers: { 'Authorization': token },
          url: ENV.api_path + "api/v1/dashboard_projects"
        },

        pledgeList: {
          method: "get",
          headers: { 'Authorization': token },
          url: ENV.api_path + "api/v1/my_pledges"
        }

      });
    }
  }
});


angular.module('cityVitalityAngularApp')

.factory('my_pledge', function ($resource, ENV, localStorageService) {
  return {
    authToken: function (token) {
      return $resource(ENV.api_path + "api/v1/need/:need_id",

      {
        id: '@need_id'
      },
      {
        checkedNeed: {
          method: "post",
          headers: { 'Authorization': token },
          url: ENV.api_path + "api/v1/:need_id/checked_projects"
        }

      });
    }
  }
});

angular.module('cityVitalityAngularApp')

.factory('my_profile', function ($resource, ENV, localStorageService) {
  return {
    authToken: function (token) {
      return $resource(ENV.api_path + "api/v1/users/:id",
      {
        format: 'json',
        id: '@id',
        user_id: 'user_id'
      },
      {
        save: {
          method: "Post",
          headers: { 'Authorization': localStorageService.get('auth-token') },
          url: ENV.api_path + "api/v1/users"
        },
        putData: {
          method: "put",
          headers: { 'Authorization': localStorageService.get('auth-token') },
          url: ENV.api_path + "api/v1/users/:id"
        },

        getData: {
          method: "get",
          headers: { 'Authorization': localStorageService.get('auth-token') },
          url: ENV.api_path + "api/v1/users/:id"
        },

        getProfileData: {
          method: "get",
          headers: { 'Authorization': localStorageService.get('auth-token') },
          url: ENV.api_path + "api/v1/:id/profile_index"
        },

        getPublishedeData: {
          method: "get",
          headers: { 'Authorization': localStorageService.get('auth-token') },
          url: ENV.api_path + "api/v1/:id/user_publish"
        },


        getPledgeData: {
          method: "get",
          headers: { 'Authorization': localStorageService.get('auth-token') },
          url: ENV.api_path + "api/v1/:id/user_contributions"
        },
        deleteImageData:{
          method: "delete",
          headers: { 'Authorization': localStorageService.get('auth-token') },
          url: ENV.api_path + "api/v1/remove_profile_image/:id"
        }


      });
    }
  }
});

angular.module('cityVitalityAngularApp')

.factory('FollowedProjects', function ($resource, ENV, localStorageService) {
  return $resource(ENV.api_path + "api/v1/show_all_followed_projects/",

  {
    format: 'json'
  },
  {
    showList: {
      method: "get",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/show_all_followed_projects"
    }
  });
});

