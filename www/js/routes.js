angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  .state('login', {
      url: '/page1',
      templateUrl: 'templates/login/login.html',
      controller: 'loginCtrl'
    })

  .state('signup', {
    url: '/page2',
    templateUrl: 'templates/login/signup.html',
    controller: 'signupCtrl'
  })


  .state('menu', {
      url: '/page3',
      templateUrl: 'templates/tabs/menu.html',
      controller: 'menuCtrl'
    })

.state('list', {
      url: '/page4/:id',
      templateUrl: 'templates/shop/product_list.html',
      controller: 'productCtrl'
    })

  .state('categories', {
    url: '/page5/:id',
    templateUrl: 'templates/shop/categories.html',
    controller: 'categoriesCtrl'
  })

  .state('myCart', {
    url: '/page6',
    templateUrl: 'templates/shop/myCart.html',
    controller: 'myCartCtrl'
  })

  .state('lastOrders', {
    url: '/page7',
    templateUrl: 'templates/shop/lastOrders.html',
    controller: 'lastOrdersCtrl'
  })


  .state('settings', {
    url: '/page8',
    templateUrl: 'templates/tabs/settings.html',
    controller: 'settingsCtrl'
  })

  .state('recipeView', {
    url: '/page9/:pid',
    templateUrl: 'templates/shop/recipeView.html',
    controller: 'recipeViewCtrl'
  })

  .state('checkout', {
    url: '/page10',
    templateUrl: 'templates/shop/checkout.html',
    controller: 'checkoutCtrl'
  })

  .state('about', {
    url: '/page11',
    templateUrl: 'templates/about.html',
    controller: 'aboutCtrl'
  })

  .state('sendMoney', {
    url: '/page12',
    templateUrl: 'templates/menu/remit/sendMoney.html',
    controller: 'sendMoneyCtrl'
  })

  .state('billPay', {
    url: '/page13',
    templateUrl: 'templates/menu/bills/billPay.html',
    controller: 'billPayCtrl'
  })


  //pending pincodeCtrl

  //pending popover
  .state('popover', {
    url: '/page14',
    templateUrl: 'templates/popover.html',
    controller: 'popoverCtrl'
  })

//start with the send money routes
  .state('thph', {
    url: '/page15',
    templateUrl: 'templates/Send/thph.html',
    controller: 'thphCtrl'
  })

  .state('twph', {
    url: '/page16',
    templateUrl: 'templates/Send/twph.html',
    controller: 'twphCtrl'
  })

  .state('hkph', {
    url: '/page17',
    templateUrl: 'templates/Send/hkph.html',
    controller: 'hkphCtrl'
  })

  .state('jpph', {
    url: '/page18',
    templateUrl: 'templates/Send/jpph.html',
    controller: 'jpphCtrl'
  })

  .state('sgph', {
    url: '/page19',
    templateUrl: 'templates/Send/sgph.html',
    controller: 'sgphCtrl'
  })

  .state('myph', {
    url: '/page20',
    templateUrl: 'templates/Send/myph.html',
    controller: 'myphCtrl'
  })

  .state('vnph', {
    url: '/page21',
    templateUrl: 'templates/Send/vnph.html',
    controller: 'vnphCtrl'
  })

  .state('krph', {
    url: '/page22',
    templateUrl: 'templates/Send/krph.html',
    controller: 'krphCtrl'
  })

  .state('ukph', {
    url: '/page23',
    templateUrl: 'templates/Send/ukph.html',
    controller: 'ukphCtrl'
  })

  .state('idph', {
    url: '/page24',
    templateUrl: 'templates/Send/idph.html',
    controller: 'idphCtrl'
  })


  .state('euph', {
    url: '/page25',
    templateUrl: 'templates/Send/euph.html',
    controller: 'euphCtrl'
  })

  .state('slidebox1', {
    url: '/page26',
    templateUrl: 'templates/slidebox/slidebox1.html',
    controller: 'slidebox1Ctrl'
  })

  .state('shop', {
    url: '/page27',
    templateUrl: 'templates/tabs/shop.html',
    controller: 'shopCtrl'
  })

  .state('exchange', {
    url: '/page28',
    templateUrl: 'templates/menu/exchange/exchange.html',
    controller: 'exchangeCtrl'
  })

  .state('calc', {
    url: '/page29',
    templateUrl: 'templates/calc.html',
    controller: 'calcCtrl'
  })

  .state('pincode', {
    url: '/page30',
    templateUrl: 'templates/pincode.html',
    controller: 'pincodeCtrl'
  })

  .state('slidebox2', {
    url: '/page32',
    templateUrl: 'templates/slidebox/slidebox2.html',
    controller: 'slidebox2Ctrl'
  })

// TOPUP Routes
  .state('credit', {
    url: '/page33',
    templateUrl: 'templates/topup/credit.html',
    controller: 'creditCtrl'
  })

  .state('phOutlet', {
    url: '/page34',
    templateUrl: 'templates/topup/phOutlet.html',
    controller: 'phOutletCtrl'
  })

  .state('oOutlet', {
    url: '/page35',
    templateUrl: 'templates/topup/oOutlet.html',
    controller: 'oOutletCtrl'
  })

  .state('sendtoWallet', {
    url: '/page36',
    templateUrl: 'templates/topup/sendtoWallet.html',
    controller: 'sendtoWalletCtrl'
  })

  // instant Points Routes
    .state('convertPoints', {
      url: '/page37',
      templateUrl: 'templates/points/convertPoints.html',
      controller: 'convertPointsCtrl'
    })

    .state('redeemCode', {
      url: '/page38',
      templateUrl: 'templates/points/redeemCode.html',
      controller: 'redeemCodeCtrl'
    })

    .state('buyPoints', {
      url: '/page39',
      templateUrl: 'templates/points/buyPoints.html',
      controller: 'buyPointsCtrl'
    })

    .state('sendPoints', {
      url: '/page40',
      templateUrl: 'templates/points/sendPoints.html',
      controller: 'sendPointsCtrl'
    })


$urlRouterProvider.otherwise('/page1')



});
