// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services','app.directives','firebase', 'ngCordova','ngOpenFB','ngStorage', 'ionic.closePopup', 'ab-base64', 'ngCordovaOauth'])
.config(function($ionicConfigProvider,$mdIconProvider) {
    //Added config
    //$ionicConfigProvider.views.maxCache(5);
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $ionicConfigProvider.tabs.position('bottom'); // other values: top

})

.run(function($ionicPlatform,$cordovaNetwork,$rootScope,$ionicLoading, $localStorage, $timeout, $http, $state, base64, ngFB) {

    $rootScope.extras = false;

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    document.addEventListener("resume", function () {
    Firebase.goOnline();
      },false);

    document.addEventListener("pause", function () {
    Firebase.goOffline();
      },false);

      if (window.cordova && window.cordova.plugins.Keyboard) {
  		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  		  cordova.plugins.Keyboard.disableScroll(true);
  		}
  		if (window.StatusBar) {
  		  StatusBar.styleDefault();
  		}
  		setTimeout(function(){
  			if(navigator.splashscreen) navigator.splashscreen.hide();
  		}, 100);
  		if(window.plugins){
  			var notificationOpenedCallback = function(data){
  				if(ionic.Platform.isAndroid()) var additionalData = JSON.parse(data.notification.payload.additionalData);
  				else var additionalData = data.notification.payload.additionalData;
  				if(angular.isDefined(additionalData)){
  					if(angular.isDefined(additionalData.posts)){
  						var posts = Number(additionalData.posts);
  						$state.go("app.news",{id:posts});
  					}
  					else if(angular.isDefined(additionalData.category)){
  						var category = Number(additionalData.category);
  						$state.go("app.category",{id:category});
  					}
  				}
  			};
  			window.plugins.OneSignal
  			.startInit(onesignal_app_id, onesignal_project_number)
  			.handleNotificationOpened(notificationOpenedCallback)
  			.inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
  			.endInit();
  		}
  		document.addEventListener("offline", onOffline, false);
  		function onOffline(){
  			$rootScope.isOffline = true;
  			$rootScope.$apply();
  		}
  		document.addEventListener("online", onOnline, false);
  		function onOnline(){
  			$rootScope.isOffline = false;
  			$rootScope.$apply();
  		}
  	});
    	$rootScope.showLoading = function(template) {
  		$ionicLoading.show({
  		  template: template
  		});
  		$timeout(function(){
  			$rootScope.hideLoading();
  			document.addEventListener("offline", function(){
  				window.plugins.toast.showShortCenter("Network disconnected");
  			}, false);
  		}, 5000);
  		$rootScope.hideLoading = function(){
  			$ionicLoading.hide();
  		};
  	};
  	$rootScope.checkToken = function(){
  		if(angular.isDefined($localStorage.login)){
  			var check = $http({
  				method: 'POST',
  				url: wordpress_url+'/wp-json/jwt-auth/v1/token/validate',
  				cache: false,
  				headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Authorization': 'Bearer '+$localStorage.login.token},
  				withCredentials: true,
  				transformRequest: function(obj) {
  						var str = [];
  						for(var p in obj)
  						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  						return str.join("&");
  				}
  			});
  			return check;
  		}
  	};
  	$rootScope.autoLogin = function(){
  		if(angular.isDefined($localStorage.login)){
  			var user = base64.decode($localStorage.login.base.one);
  			var pass = base64.decode($localStorage.login.base.two);
  			$state.go('login', {user:user,pass:pass});
  		}
  	}

    ngFB.init({appId: '1599354483448950', tokenStore: window.localStorage});

});


  // this is the complete list of currently supported params you can pass to the plugin (all optional)
  var options = {
    message: 'share this', // not supported on some apps (Facebook, Instagram)
    subject: 'the subject', // fi. for email
    files: ['', ''], // an array of filenames either locally or remotely
    url: 'https://www.website.com/foo/#bar?a=b',
    chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
  }

  var onSuccess = function(result) {
    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  }

  var onError = function(msg) {
    console.log("Sharing failed with message: " + msg);
  }

  window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

angular.module('app', ['ionic', 'ngAnimate', 'ngCordovaOauth', 'firebase'])

.run(['$ionicPlatform',
      '$rootScope',
      '$firebaseAuth',
      '$window',
      'srvAuth',
      function($ionicPlatform,$scope,$rootScope,$window) {

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

}])
