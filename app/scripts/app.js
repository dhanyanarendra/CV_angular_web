'use strict';

/**
* @ngdoc overview
* @name cityVitalityAngularApp
* @description
* # cityVitalityAngularApp
*
* Main module of the application.
*/
angular
.module('cityVitalityAngularApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'LocalStorageModule',
  'config',
  'underscore',
  'ui.sortable',
  'ui.bootstrap',
  'angularUtils.directives.dirPagination',
  '720kb.datepicker',
  'ui.timepicker',
  'ngDragDrop',
  'hm.readmore',
  'ui.mask'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state("land", {
    url: "/",
    views: {
      "header": {
        templateUrl: "views/partials/header.html",
        controller: 'HeaderCtrl'
      },
      "content": {
        templateUrl: "views/content/land.html",
        controller: 'landCtrl',
        controllerAs: 'land'
      },
      "signup": {
        templateUrl: "views/partials/signup.html",
        controller: 'signupCtrl',
        controllerAs: 'signup'
      },
      "signin": {
        templateUrl: "views/partials/signin.html",
        controller: 'signinCtrl',
        controllerAs: 'signin'
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }

  }).state("describe", {
    url: "/describe",
    views: {
      "content": { templateUrl: "views/content/describe.html",
      controller: 'describeCtrl',
      controllerAs: 'describe'
    },
    "footer": {
      templateUrl: "views/partials/footer.html"
    }
  }


}).state("editdescribe", {
  url: "/describe_edit/:id",
  views: {
    "content": { templateUrl: "views/content/describe_edit.html",
    controller: 'describeCtrl',
    controllerAs: 'describe'
  },
  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}


}).state("structure", {
  url: "/structure",
  views: {
    "content": {
      templateUrl: "views/content/structure.html",
      controller: 'structureCtrl',
      controllerAs: 'structure'
    },

    "footer": {
      templateUrl: "views/partials/footer.html"
    }
  }

}).state("preview", {
  url: "/preview",
  views: {
    "content": { templateUrl: "views/content/preview.html",
    controller: 'previewCtrl',
    controllerAs: 'preview'
  },
  "footer": {
    templateUrl: "views/partials/footer.html"
  },
  "header": {
    templateUrl: "views/partials/project_header.html"
  }
}

}).state("contributor_describe", {
  url: "/contributor_describe",
  views: {
    "content": { templateUrl: "views/content/contributor_describe.html",
    controller: 'contributorCtrl',
    controllerAs: 'contributor'
  },
  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}




}).state("profile", {
  url: "/profile",
  views: {
    "content": { templateUrl: "views/content/profile.html",
    controller: 'orgProfileCtrl',
    controllerAs: 'orgProfile'
  },
  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}


}).state("my_profile", {
  url: "/my_profile",
  views: {
    "content": { templateUrl: "views/content/my_profile.html",
    controller: 'my_profileCtrl',
    controllerAs: 'my_profile'
  },
  "header":{
    templateUrl: "views/partials/project_header.html"
  },
  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}

}).state("my_profile2", {
  url: "/my_profile2",
  views: {
    "content": { templateUrl: "views/content/my_profile2.html",
    controller: 'my_profileCtrl2',
    controllerAs: 'my_profile2'
  },
  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}

}).state("dashboard", {
  url: "/dashboard",
  views: {
    "content": { templateUrl: "views/content/dashboard.html",
    controller: 'dashboardCtrl',
    controllerAs: 'dashboard'
  },
  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}

}).state("page", {
  url: "/page_error",
  views: {
    "content": { templateUrl: "views/content/pagenotfound.html",
    controller: 'headerCtrl',
    controllerAs: 'header'
  },
  "header":{
    templateUrl: "views/partials/pageheader.html"
  }
}

}).state("dashboard_new", {
  url: "/dashboard_new",
  views: {
    "content": { templateUrl: "views/content/dashboard_new.html",
    controller: 'dashboardCtrl',
    controllerAs: 'dashboard'
  },
  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}

}).state("dashboard_needs", {
  url: "/dashboard_needs",
  views: {
    "content": { templateUrl: "views/content/dashboard_needs.html",
    controller: 'dashboardCtrl',
    controllerAs: 'dashboard'
  },
  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}


}).state("myPledges", {
  url: "/myPledges",
  views: {
    "content": { templateUrl: "views/content/myPledges.html",
    controller: 'myPledgesCtrl',
    controllerAs: 'myPledges'
  },
  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}


}).state("structure_contributor", {
  url: "/structure_contributor",
  views: {
    "content": { templateUrl: "views/content/structure_contributor.html",
    controller: 'structureCtrl',
    controllerAs: 'structure'
  },
  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}

}).state("needs_contributor", {
  url: "/needs_contributor",
  views: {
    "content": { templateUrl: "views/content/needs_contributor.html",
    controller: 'contributorCtrl',
    controllerAs: 'contributor'
  },
  "header":{
    templateUrl: "views/partials/project_header.html"
  },
  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}

}).state("followed_projects", {
  url: "/followed_projects",
  views: {
   "header":{
    templateUrl: "views/partials/project_header.html"
  },
  "content": {
    templateUrl: "views/content/followed_projects.html",
    controller: 'FollowProjectsCtrl',
    controllerAs: 'FollowProjects'
  },

  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}

}).state("aboutus", {
  url: "/aboutus",
  views: {
   "header":{
    templateUrl: "views/partials/header.html"
  },
  "content": {
    templateUrl: "views/content/aboutus.html",
    controller: 'aboutusCtrl',
    controllerAs: 'aboutus'
  },

  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}

}).state("contact", {
  url: "/contact",
  views: {
   "header":{
    templateUrl: "views/partials/header.html"
  },
  "content": {
    templateUrl: "views/content/contact.html",
    controller: 'contactCtrl',
    controllerAs: 'contact'
  },

  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}

}).state("termsandconditions", {
  url: "/termsandconditions",
  views: {
   "header":{
    templateUrl: "views/partials/header.html"
  },
  "content": {
    templateUrl: "views/content/termsandconditions.html",
    controller: 'termsandconditionsCtrl',
    controllerAs: 'termsandconditions'
  },

  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}

}).state("privacypolicy", {
  url: "/privacypolicy",
  views: {
   "header":{
    templateUrl: "views/partials/header.html"
  },
  "content": {
    templateUrl: "views/content/privacypolicy.html",
    controller: 'privacypolicyCtrl',
    controllerAs: 'privacypolicy'
  },

  "footer": {
    templateUrl: "views/partials/footer.html"
  }
}

// }).state("forgot_password", {
// url: "/forgot_password",
// views: {

// "content": {
// templateUrl: "views/content/forgot_password.html"
// // controller: 'structureCtrl',
// // controllerAs: 'structure'

// }
// }

}).state("pop_up", {
  url: "/pop_up",
  views: {
    "content": {
      templateUrl: "views/content/pop_up.html"
// controller: 'structureCtrl',
// controllerAs: 'structure'
}
}

}).state("forgot_password", {
  url: "/forgot_password",
  views: {
    "header": {
      templateUrl: "views/partials/header.html",
      controller: 'HeaderCtrl'
    },
    "signup": {
      templateUrl: "views/partials/signup.html",
      controller: 'signupCtrl',
      controllerAs: 'signup'
    },
    "signin": {
      templateUrl: "views/partials/signin.html",
      controller: 'signinCtrl',
      controllerAs: 'signin'
    },
    "footer": {
      templateUrl: "views/partials/footer.html"
    },
    "content": {
      templateUrl: "views/content/forgot_password.html" }
    }

  }).state("reset_password", {
    url: "/reset_password",
    views: {
      "header": {
        templateUrl: "views/partials/header.html",
        controller: 'HeaderCtrl'
      },
      "signup": {
        templateUrl: "views/partials/signup.html",
        controller: 'signupCtrl',
        controllerAs: 'signup'
      },
      "signin": {
        templateUrl: "views/partials/signin.html",
        controller: 'signinCtrl',
        controllerAs: 'signin'
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      },
      "content": {
        templateUrl: "views/content/reset_password.html" }
      }

    });


  return $urlRouterProvider.otherwise('/');


});
