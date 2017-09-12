
angular.module('app.controllers', ['ionic-material', 'ionic','ngStorage', 'ionic.closePopup', 'ab-base64', 'ngCordovaOauth', 'ngCordova','angular-carousel','ngTouch','ngOpenFB','ngMaterial'])


.controller('aboutCtrl', function($scope,$rootScope) {
    $rootScope.extras=true;

    })


.controller('shopCtrl', function($scope,$rootScope,$ionicSideMenuDelegate,fireBaseData,$state,
                                      $ionicHistory,$firebaseArray,sharedCartService,sharedUtils,$ionicSlideBoxDelegate,$timeout) {

      //Check if user already logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $scope.user_info=user; //Saves data to user_info
        }else {
          $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
          $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

          $ionicHistory.nextViewOptions({
            historyRoot: true
          });
          $rootScope.extras = false;
          sharedUtils.hideLoading();
          $state.go('login', {}, {location: "replace"});

        }
      });
      $rootScope.$on('$cordovaNetwork:offline', function() {
          $ionicLoading.hide();
          $rootScope.offlineMod.show();
      });
      // On Loggin in to menu page, the sideMenu drag state is set to true
      $ionicSideMenuDelegate.canDragContent(true);
      $rootScope.extras=true;

      // When user visits A-> B -> C -> A and clicks back, he will close the app instead of back linking
      $scope.$on('$ionicView.enter', function(ev) {
        if(ev.targetScope !== $scope){
          $ionicHistory.clearHistory();
          $ionicHistory.clearCache();
        }
      });

       $timeout(function(){
              var refSlider = new Firebase("https://ofwremit.firebaseio.com/slider")
        $scope.slideList = $firebaseArray(refSlider);

            $ionicSlideBoxDelegate.$getByHandle('image-viewer').update();
        },5)
        $rootScope.extras=true;
        sharedUtils.showLoading();


        //Check if user already logged in
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            fireBaseData.refCategory()
              .once('value', function (snapshot) {
                $scope.cats = snapshot.val();
                $scope.$apply();
              });

              sharedUtils.hideLoading();

          }
        });

    })

.controller('slidebox1Ctrl', function($scope,$rootScope) {
    $rootScope.extras=false;

    $scope.options = {
   loop: false,
   effect: 'fade',
   speed: 500,
 }

 $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
   // data.slider is the instance of Swiper
   $scope.slider = data.slider;
 });

 $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
   console.log('Slide change is beginning');
 });

 $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
   // note: the indexes are 0-based
   $scope.activeIndex = data.slider.activeIndex;
   $scope.previousIndex = data.slider.previousIndex;
 });

  })

  .controller('slidebox2Ctrl', function($scope,$rootScope) {
      $rootScope.extras=false;

      $scope.options = {
     loop: false,
     effect: 'fade',
     speed: 500,
   }

   $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
     // data.slider is the instance of Swiper
     $scope.slider = data.slider;
   });

   $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
     console.log('Slide change is beginning');
   });

   $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
     // note: the indexes are 0-based
     $scope.activeIndex = data.slider.activeIndex;
     $scope.previousIndex = data.slider.previousIndex;

   });

    })

.controller('thphCtrl', function($scope,$rootScope) {
        $rootScope.extras=true;


        })


.controller('twphCtrl', function($scope,$rootScope) {
        $rootScope.extras=true;


        })


.controller('hkphCtrl', function($scope,$rootScope) {
        $rootScope.extras=true;


        })


.controller('jpphCtrl', function($scope,$rootScope) {
         $rootScope.extras=true;


        })


.controller('sgphCtrl', function($scope,$rootScope) {
         $rootScope.extras=true;

        })


.controller('myphCtrl', function($scope,$rootScope) {
        $rootScope.extras=true;


        })


.controller('vnphCtrl', function($scope,$rootScope) {
        $rootScope.extras=true;



        })

.controller('krphCtrl', function($scope,$rootScope) {
          $rootScope.extras=true;

        })


.controller('ukphCtrl', function($scope,$rootScope) {
   $rootScope.extras=true;


        })


.controller('idphCtrl', function($scope,$rootScope) {
    $rootScope.extras=true;


        })


.controller('euphCtrl', function($scope,$rootScope) {
    $rootScope.extras=true;


        })

.controller('pincodeCtrl', function($scope,$rootScope) {
        $rootScope.extras=false;

    })



.controller('productListCtrl', function($scope,$rootScope) {
        $rootScope.extras=true;


    })


.controller('sendMoneyCtrl', function($scope,$rootScope) {
          $rootScope.extras=true;


  })


.controller('billPayCtrl', function($scope,$rootScope) {
          $rootScope.extras=true;


  })

.controller('exchangeCtrl', function($scope,$rootScope) {
            $rootScope.extras=true;


  })

.controller('loginCtrl', function($scope,$rootScope,$ionicHistory,fireBaseData,sharedUtils,$state,$ionicModal,$timeout,ngFB,$ionicSideMenuDelegate,$ionicLoading, $localStorage, $http, $state, base64) {
    $rootScope.extras = false;  // For hiding the side bar and nav icon

    // When the user logs out and reaches login page,
    // we clear all the history and cache to prevent back link
    $scope.$on('$ionicView.enter', function(ev) {
      if(ev.targetScope !== $scope){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
      }
    });


    firebase.auth().onAuthStateChanged(function (_currentUser) {

        console.log("onAuthStateChanged user: ", _currentUser);

        if (_currentUser) {
            $state.go('menu', {}, {location: "replace"});
        } else {
            //window.event.preventDefault()
            $state.go('login', {}, {location: "replace"});
        }
    })


    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
        $rootScope.extras = true;
        sharedUtils.hideLoading();
        $state.go('menu', {}, {location: "replace"});

      }
    });



    $scope.loginEmail = function(formName,cred) {


      if(formName.$valid) {  // Check if the form data is valid or not

          sharedUtils.showLoading();

          //Email
          firebase.auth().signInWithEmailAndPassword(cred.email,cred.password).then(function(result) {

                // You dont need to save the users session as firebase handles it
                // You only need to :
                // 1. clear the login page history from the history stack so that you cant come back
                // 2. Set rootScope.extra;
                // 3. Turn off the loading
                // 4. Got to menu page

              $ionicHistory.nextViewOptions({
                historyRoot: true
              });
              $rootScope.extras = true;
              sharedUtils.hideLoading();
              $state.go('menu', {}, {location: "replace"});

            },
            function(error) {
              sharedUtils.hideLoading();
              sharedUtils.showAlert("Please note","Authentication Error");
            }
        );

      }else{
        sharedUtils.showAlert("Please note","Entered data is not valid");
      }

    };


    $scope.fbLogin = function () {
      ngFB.login({scope: 'email,user_friends,public_profile'}).then(

        function (response) {
      if (response.status === 'connected') {
          console.log('Facebook login succeeded', response);


          var credential = firebase.auth.FacebookAuthProvider.credential(
              response.authResponse.accessToken);
              firebase.auth().signInWithCredential(credential);
              firebase.auth().getRedirectResult().then(function(result) {
                result.updateProfile({
                  displayName: cred.name,
                  photoURL: cred.photoURL
                }).then(function() {}, function(error) {});

                //Add phone number to the user table
                fireBaseData.refUser().child(result.uid).set({
                    telephone: cred.phone,
                    name: cred.name,
                    email: cred.email
                });
            if (result.credential) {
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              var token = result.credential.accessToken;
              setTimeout(function(token) {
              document.getElementById('text').innerHTML = (data && data.error) || 'Redirecting...';
              }, 1000000);
              // ...
            }

            // The signed-in user info.
            var user = result.user;
          })

          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
          //
      } else {
          alert('Facebook login failed');
      }

        });
       };
       ngFB.api({
       path: '/me',
       params: {fields: 'id,name'}
       }).then(
       function (user) {
       $scope.user = user;
       },
       );
       ngFB.api({
       path: '/me/friends',
       });

 $scope.share = function () {
             ngFB.api({
               method: 'POST',
               path: '/me/feed',
               params: {message: 'play.google.com/store/apps/details?id=com.ofw.remit.ph' + 'The smartest way to remit money - OFW Remit is now SMART Remit. AMLC,BSP and MAS Licensed'}
           }).then(
               function () {
                   alert('Successfully shared on Facebook');
               },
               function () {
                   alert('An error occurred while sharing this on Facebook');
               });
       };



       		if(window.plugins){
       			var notificationOpenedCallback = function(data){
       				if(ionic.Platform.isAndroid()) var additionalData = JSON.parse(data.notification.payload.additionalData);
       				else var additionalData = data.notification.payload.additionalData;
       				if(angular.isDefined(additionalData)){
       					if(angular.isDefined(additionalData.posts)){
       						var posts = Number(additionalData.posts);
       						$state.go("",{id:posts});
       					}
       					else if(angular.isDefined(additionalData.category)){
       						var category = Number(additionalData.category);
       						$state.go("",{id:category});
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


})


.controller('signupCtrl', function($scope,$rootScope,sharedUtils,$ionicSideMenuDelegate,
                                   $state,fireBaseData,$ionicHistory) {
    $rootScope.extras = false; // For hiding the side bar and nav icon

    $scope.signupEmail = function (formName, cred) {

      if (formName.$valid) {  // Check if the form data is valid or not

        sharedUtils.showLoading();

        //Main Firebase Authentication part
        firebase.auth().createUserWithEmailAndPassword(cred.email, cred.password).then(function (result) {

            //Add name and default dp to the Autherisation table
            result.updateProfile({
              displayName: cred.name,
              photoURL: cred.photoURL
            }).then(function() {}, function(error) {});

            //Add phone number to the user table
            fireBaseData.refUser().child(result.uid).set({
                telephone: cred.phone,
                name: cred.name,
                email: cred.email
            });


            //Registered OK
            $ionicHistory.nextViewOptions({
              historyRoot: true
            });
            $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
            $rootScope.extras = true;
            sharedUtils.hideLoading();
            $state.go('menu', {}, {location: "replace"});

        }, function (error) {
            sharedUtils.hideLoading();
            sharedUtils.showAlert("Please note","Sign up Error");
        });

      }else{
        sharedUtils.showAlert("Please note","Entered data is not valid");
      }

    }

  })



.controller('menuCtrl', function($scope,$rootScope,$ionicPopup,$ionicSideMenuDelegate,$mdDialog,fireBaseData,$state,
                                  $ionicHistory,$firebaseArray,$window,$firebaseObject,sharedCartService,sharedUtils,$ionicModal,ngFB,$ionicSlideBoxDelegate,$timeout) {



  //Check if user already logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.user_info=user; //Saves data to user_info
    }else {

      $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
      $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $rootScope.extras = false;
      sharedUtils.hideLoading();
      $state.go('slidebox2', {}, {location: "replace"});

    }
  });
  $rootScope.$on('$cordovaNetwork:offline', function() {
      $ionicLoading.hide();
      $rootScope.offlineMod.show();
  });
  // On Loggin in to menu page, the sideMenu drag state is set to true
  $ionicSideMenuDelegate.canDragContent(true);
  $rootScope.extras=true;

  // When user visits A-> B -> C -> A and clicks back, he will close the app instead of back linking
  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope){
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();
    }
  });

   $timeout(function(){
          var refSlider = new Firebase("https://ofwremit.firebaseio.com/slider")
    $scope.slideList = $firebaseArray(refSlider);

        $ionicSlideBoxDelegate.$getByHandle('image-viewer').update();
    },2)
    $rootScope.extras=true;
    sharedUtils.showLoading();



    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        fireBaseData.refCategory()
          .once('value', function (snapshot) {
            $scope.cats = snapshot.val();
            $scope.$apply();
          });

          sharedUtils.hideLoading();

      }
    });
    //Shows loading bar
    sharedUtils.showLoading();

    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        //Accessing an array of objects using firebaseObject, does not give you the $id , so use firebase array to get $id
        $scope.addresses= $firebaseArray(fireBaseData.refUser().child(user.uid).child("address"));

        // firebaseObject is good for accessing single objects for eg:- telephone. Don't use it for array of objects
        $scope.user_extras= $firebaseObject(fireBaseData.refUser().child(user.uid));

        $scope.user_info=user; //Saves data to user_info
        //NOTE: $scope.user_info is not writable ie you can't use it inside ng-model of <input>

        //You have to create a local variable for storing emails
        $scope.data_editable={};
        $scope.data_editable.email=$scope.user_info.email;  // For editing store it in local variable
        $scope.data_editable.password="";

        $scope.$apply();

        sharedUtils.hideLoading();

      }

    });




    $scope.addManipulation = function(edit_val) {  // Takes care of address add and edit ie Address Manipulator


      if(edit_val!=null) {
        $scope.data = edit_val; // For editing address
        var title="Edit Address";
        var sub_title="Edit your address";
      }
      else {
        $scope.data = {};    // For adding new address
        var title="Add Address";
        var sub_title="Add your Recipient's Address";
      }
      // An elaborate, custom popup
      var addressPopup = $ionicPopup.show({
        template: '<input type="text"   placeholder="First, Complete Middle, Last Name"  ng-model="data.nickname"> <br/> ' +
                  '<input type="text"   placeholder="Address" ng-model="data.address"> <br/> ' +
                  '<input type="text"   placeholder="Email" ng-model="data.pin"> <br/> ' +
                  '<input type="number" placeholder="Phone" ng-model="data.phone">',
        title: title,
        subTitle: sub_title,
        scope: $scope,
        buttons: [
          { text: 'Close' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.nickname || !$scope.data.address || !$scope.data.pin || !$scope.data.phone ) {
                e.preventDefault(); //don't allow the user to close unless he enters full details
              } else {
                return $scope.data;
              }
            }
          }
      ]
    });



    addressPopup.then(function(res) {

      if(edit_val!=null) {
        //Update  address
        if(res!=null){ // res ==null  => close
          fireBaseData.refUser().child($scope.user_info.uid).child("address").child(edit_val.$id).update({    // set
            nickname: res.nickname,
            address: res.address,
            pin: res.pin,
            phone: res.phone
          });
        }
      }else{
        //Add new address
        fireBaseData.refUser().child($scope.user_info.uid).child("address").push({    // set
          nickname: res.nickname,
          address: res.address,
          pin: res.pin,
          phone: res.phone
        });
      }

    });

  };

  // A confirm dialog for deleting address
  $scope.deleteAddress = function(del_id) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Address',
      template: 'Are you sure you want to delete this address',
      buttons: [
        { text: 'No' , type: 'button-stable' },
        { text: 'Yes', type: 'button-assertive' , onTap: function(){return del_id;} }
      ]
    });

    confirmPopup.then(function(res) {
      if(res) {
        fireBaseData.refUser().child($scope.user_info.uid).child("address").child(res).remove();
      }
    });
  };

  $scope.save= function (extras,editable) {
    //1. Edit Telephone doesnt show popup 2. Using extras and editable  // Bugs
    if(extras.telephone!="" && extras.telephone!=null ){
      //Update  Telephone
      fireBaseData.refUser().child($scope.user_info.uid).update({    // set
        telephone: extras.telephone
      });
    }

    //Edit Password
    if(editable.password!="" && editable.password!=null  ){
      //Update Password in UserAuthentication Table
      firebase.auth().currentUser.updatePassword(editable.password).then(function(ok) {}, function(error) {});
      sharedUtils.showAlert("Account","Password Updated");
    }

    //Edit Email
    if(editable.email!="" && editable.email!=null  && editable.email!=$scope.user_info.email){

      //Update Email/Username in UserAuthentication Table
      firebase.auth().currentUser.updateEmail(editable.email).then(function(ok) {
        $window.location.reload(true);
        //sharedUtils.showAlert("Account","Email Updated");
      }, function(error) {
        sharedUtils.showAlert("ERROR",error);
      });
    }

  };

  $scope.cancel=function(){
    // Simple Reload
    $window.location.reload(true);
    console.log("CANCEL");
  }



  // ngFB
  ngFB.api({
  path: '/me',
  params: {fields: 'id,name'}
  }).then(
  function (user) {
  $scope.user = user;
  },
);
  ngFB.api(
    "/{friend-list-id}",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
ngFB.api(
    "...?fields={fieldname_of_type_ProfilePictureSource}",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);

})



.controller('categoriesCtrl', function($scope,$rootScope,$stateParams,$http,$firebaseArray,fireBaseData,sharedUtils,recipeService,sharedCartService) {
$scope.loadoo = function() {
    $scope.recipes = recipeService.all;
    console.log(recipeService.all);
    sharedUtils.showLoading();
    $scope.menu=$firebaseArray(fireBaseData.refMenu().orderByChild('category')
          .startAt($stateParams.id).endAt($stateParams.id)


                              );
     $scope.addToCart=function(item){

    sharedCartService.add(item);

  };

    sharedUtils.hideLoading();
  }


    $rootScope.extras=true;
})

.controller('indexCtrl', function($scope,$rootScope,$cordovaNetwork,sharedUtils,$ionicHistory,$state,$ionicSideMenuDelegate,sharedCartService) {

  document.addEventListener("deviceready", function () {

          $scope.network = $cordovaNetwork.getNetwork();
          $scope.isOnline = $cordovaNetwork.isOnline();
          $scope.$apply();

          // listen for Online event
          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
              $scope.isOnline = true;
              $scope.network = $cordovaNetwork.getNetwork();

              $scope.$apply();
          })

          // listen for Offline event
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
              console.log("got offline");
              $scope.isOnline = false;
              $scope.network = $cordovaNetwork.getNetwork();

              $scope.$apply();
          })

    }, false);

    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.user_info=user; //Saves data to user_info

        //Only when the user is logged in, the cart qty is shown
        //Else it will show unwanted console error till we get the user object
        $scope.get_total= function() {
          var total_qty=0;
          for (var i = 0; i < sharedCartService.cart_items.length; i++) {
            total_qty += sharedCartService.cart_items[i].item_qty;
          }
          return total_qty;
        };

      }else {

        $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
        $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('slidebox2', {}, {location: "replace"});

      }
    });

    $scope.logout=function(){

      sharedUtils.showLoading();

      // Main Firebase logout
      firebase.auth().signOut().then(function() {


        $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
        $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });

        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('slidebox2', {}, {location: "replace"});

      }, function(error) {
         sharedUtils.showAlert("Error","Logout Failed")
      });

    }

  })


  .controller('myCartCtrl', function($scope,$rootScope,$state,sharedCartService) {

      $rootScope.extras=true;

      //Check if user already logged in
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

          $scope.cart=sharedCartService.cart_items;  // Loads users cart

          $scope.get_qty = function() {
            $scope.total_qty=0;
            $scope.total_amount=0;

            for (var i = 0; i < sharedCartService.cart_items.length; i++) {
              $scope.total_qty += sharedCartService.cart_items[i].item_qty;
              $scope.total_amount += (sharedCartService.cart_items[i].item_qty * sharedCartService.cart_items[i].item_price);
            }
            return $scope.total_qty;
          };
        }
        //We dont need the else part because indexCtrl takes care of it
      });

      $scope.removeFromCart=function(c_id){
        sharedCartService.drop(c_id);
      };

      $scope.inc=function(c_id){
        sharedCartService.increment(c_id);
      };

      $scope.dec=function(c_id){
        sharedCartService.decrement(c_id);
      };

      $scope.checkout=function(){
        $state.go('checkout', {}, {location: "replace"});
      };

  })


.controller('lastOrdersCtrl', function($scope,$rootScope,fireBaseData,sharedUtils) {


    $rootScope.extras = true;
    sharedUtils.showLoading();

    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        $scope.user_info = user;
 $scope.doRefresh = function() {
    fireBaseData.refOrder()
          .orderByChild('user_id')
          .startAt($scope.user_info.uid).endAt($scope.user_info.uid)
          .once('value', function (snapshot) {
            $scope.orders = snapshot.val();
            $scope.$apply();
          });

   $scope.$broadcast('scroll.refreshComplete');
   $scope.$apply()
};
        fireBaseData.refOrder()
          .orderByChild('user_id')
          .startAt($scope.user_info.uid).endAt($scope.user_info.uid)
          .once('value', function (snapshot) {
            $scope.orders = snapshot.val();
            $scope.$apply();
          });
          sharedUtils.hideLoading();
      }
    });



})

.run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
])


.controller('settingsCtrl', function($scope,$rootScope,fireBaseData,$firebaseObject,
                                     $ionicPopup,$state,$window,$firebaseArray,$ionicModal,ngFB,$timeout,sharedUtils) {
    //Bugs are most prevailing here
    $rootScope.extras=true;

    //Shows loading bar
    sharedUtils.showLoading();

    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        //Accessing an array of objects using firebaseObject, does not give you the $id , so use firebase array to get $id
        $scope.addresses= $firebaseArray(fireBaseData.refUser().child(user.uid).child("address"));

        // firebaseObject is good for accessing single objects for eg:- telephone. Don't use it for array of objects
        $scope.user_extras= $firebaseObject(fireBaseData.refUser().child(user.uid));

        $scope.user_info=user; //Saves data to user_info
        //NOTE: $scope.user_info is not writable ie you can't use it inside ng-model of <input>

        //You have to create a local variable for storing emails
        $scope.data_editable={};
        $scope.data_editable.email=$scope.user_info.email;  // For editing store it in local variable
        $scope.data_editable.password="";

        $scope.$apply();

        sharedUtils.hideLoading();


      }

    });



    $scope.addManipulation = function(edit_val) {  // Takes care of address add and edit ie Address Manipulator


      if(edit_val!=null) {
        $scope.data = edit_val; // For editing address
        var title="Edit Address";
        var sub_title="Edit your address";
      }
      else {
        $scope.data = {};    // For adding new address
        var title="Add Address";
        var sub_title="Add your Recipient's Address";
      }
      // An elaborate, custom popup
      var addressPopup = $ionicPopup.show({
        template: '<input type="text"   placeholder="First, Complete Middle, Last Name"  ng-model="data.nickname"> <br/> ' +
                  '<input type="text"   placeholder="Address" ng-model="data.address"> <br/> ' +
                  '<input type="text"   placeholder="Email" ng-model="data.pin"> <br/> ' +
                  '<input type="number" placeholder="Phone" ng-model="data.phone">',
        title: title,
        subTitle: sub_title,
        scope: $scope,
        buttons: [
          { text: 'Close' },
          {

            text: '<b>Save</b>',
            type: 'button-positive waves-effect',
            onTap: function(e) {
              if (!$scope.data.nickname || !$scope.data.address || !$scope.data.pin || !$scope.data.phone ) {
                e.preventDefault(); //don't allow the user to close unless he enters full details
              } else {
                return $scope.data;
              }
            }
          }
        ]
      });



      addressPopup.then(function(res) {

        if(edit_val!=null) {
          //Update  address
          if(res!=null){ // res ==null  => close
            fireBaseData.refUser().child($scope.user_info.uid).child("address").child(edit_val.$id).update({    // set
              nickname: res.nickname,
              address: res.address,
              pin: res.pin,
              phone: res.phone
            });
          }
        }else{
          //Add new address
          fireBaseData.refUser().child($scope.user_info.uid).child("address").push({    // set
            nickname: res.nickname,
            address: res.address,
            pin: res.pin,
            phone: res.phone
          });
        }

      });

    };

    // A confirm dialog for deleting address
    $scope.deleteAddress = function(del_id) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Address',
        template: 'Are you sure you want to delete this address',
        buttons: [
          { text: 'No' , type: 'button-stable' },
          { text: 'Yes', type: 'button-assertive' , onTap: function(){return del_id;} }
        ]
      });

      confirmPopup.then(function(res) {
        if(res) {
          fireBaseData.refUser().child($scope.user_info.uid).child("address").child(res).remove();
        }
      });
    };

    $scope.save= function (extras,editable) {
      //1. Edit Telephone doesnt show popup 2. Using extras and editable  // Bugs
      if(extras.telephone!="" && extras.telephone!=null ){
        //Update  Telephone
        fireBaseData.refUser().child($scope.user_info.uid).update({    // set
          telephone: extras.telephone
        });
      }

      //Edit Password
      if(editable.password!="" && editable.password!=null  ){
        //Update Password in UserAuthentication Table
        firebase.auth().currentUser.updatePassword(editable.password).then(function(ok) {}, function(error) {});
        sharedUtils.showAlert("Account","Password Updated");
      }

      //Edit Email
      if(editable.email!="" && editable.email!=null  && editable.email!=$scope.user_info.email){

        //Update Email/Username in UserAuthentication Table
        firebase.auth().currentUser.updateEmail(editable.email).then(function(ok) {
          $window.location.reload(true);
          //sharedUtils.showAlert("Account","Email Updated");
        }, function(error) {
          sharedUtils.showAlert("ERROR",error);
        });
      }

    };

    $scope.cancel=function(){
      // Simple Reload
      $window.location.reload(true);
      console.log("CANCEL");
    }


  // ngFB
  ngFB.api({
  path: '/me',
  params: {fields: 'id,name'}
  }).then(
  function (user) {
  $scope.user = user;
  }
  );


  // points button
 var modal = document.getElementById('walletadModal');

 // Get the button that opens the modal
 var btn = document.getElementById("walletadBtn");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks the button, open the modal
 btn.onclick = function() {
     modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
     modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }

})

.controller('recipeViewCtrl', function($scope, recipeService, $stateParams, $state,sharedCartService) {

 console.log(recipeService.get($stateParams.pid));

 $scope.singleRecipe = recipeService.get($stateParams.pid);



     $scope.addToCart=function(item){
    sharedCartService.add(item);

  };
})



.controller('forgotPasswordCtrl', function($scope,$rootScope) {
    $rootScope.extras=false;
  })
.controller('MyCtrl', function($scope) {
  // don't be scared by the image value, its just datauri

  $scope.items = [
    { id: 1, album: 'Gotta Be Somebody', artist: 'Nickelback', image: 'http://www.jazzybonez.com/images/meals.jpg' },
    { id: 2, album: 'Dark Horse', artist: 'Nickelback', image: 'http://feel-good-food.com/wp-content/uploads/2013/12/logo.png' },
    { id: 3, album: 'Someday', artist: 'Nickelback', image: 'http://www.shadowtour.com/Assets/subway+3+200+x+50.gif' }
  ];

})

.controller('checkoutCtrl', function($scope,$rootScope,sharedUtils,$state,$firebaseArray,$firebaseObject,
                                     $ionicHistory,fireBaseData, $ionicPopup,sharedCartService) {

    $rootScope.extras=true;

    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.addresses= $firebaseArray( fireBaseData.refUser().child(user.uid).child("address") );
        $scope.user_info=user;


      }
    });

    $scope.payments = [
      {id: 'wallet', name: 'Deduct from my Wallet'}
    ];

    $scope.pay=function(address,payment){

      if(address==null || payment==null){
        //Check if the checkboxes are selected ?
        sharedUtils.showAlert("Error","Please choose from the Address and Payment Modes.")
      }
      else {

        // Loop throw all the cart item
        for (var i = 0; i < sharedCartService.cart_items.length; i++) {
          //Add cart item to order table
          fireBaseData.refOrder().push({

            //Product data is hardcoded for simplicity
            product_name: sharedCartService.cart_items[i].item_name,
            product_price: sharedCartService.cart_items[i].item_price,
            product_image: sharedCartService.cart_items[i].item_image,
            product_id: sharedCartService.cart_items[i].$id,
            //item data
            item_qty: sharedCartService.cart_items[i].item_qty,

            //Order data
            user_id: $scope.user_info.uid,
            user_name:$scope.user_info.displayName,
            address_id: address,

            time: Date.now(),

            payment_id: payment,


            status: "Queued"
          });

        }

        //Remove users cart
        fireBaseData.refCart().child($scope.user_info.uid).remove();

        sharedUtils.showAlert("Info", "Order Successfull");

        // Go to past order page
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $state.go('lastOrders', {}, {location: "replace", reload: true});
      }
    }



    $scope.addManipulation = function(edit_val) {  // Takes care of address add and edit ie Address Manipulator


      if(edit_val!=null) {
        $scope.data = edit_val; // For editing address
        var title="Edit Address";
        var sub_title="Edit your address";
      }
      else {
        $scope.data = {};    // For adding new address
        var title="Add Address";
        var sub_title="Add your Recipient's Address";
      }
      // An elaborate, custom popup
      var addressPopup = $ionicPopup.show({
        template: '<input type="text"   placeholder="First, Complete Middle, Last Name"  ng-model="data.nickname"> <br/> ' +
                  '<input type="text"   placeholder="Address" ng-model="data.address"> <br/> ' +
                  '<input type="text"   placeholder="Email" ng-model="data.pin"> <br/> ' +
                  '<input type="number" placeholder="Phone" ng-model="data.phone">',


        title: title,
        subTitle: sub_title,
        scope: $scope,
        buttons: [
          { text: 'Close' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.nickname || !$scope.data.address || !$scope.data.pin || !$scope.data.phone ) {
                e.preventDefault(); //don't allow the user to close unless he enters full details
              } else {
                return $scope.data;
              }
            }
          }
        ]
      });

      addressPopup.then(function(res) {

        if(edit_val!=null) {
          //Update  address
          fireBaseData.refUser().child($scope.user_info.uid).child("address").child(edit_val.$id).update({    // set
            nickname: res.nickname,
            address: res.address,
            pin: res.pin,
            phone: res.phone
          });
        }else{
          //Add new address
          fireBaseData.refUser().child($scope.user_info.uid).child("address").push({    // set
            nickname: res.nickname,
            address: res.address,
            pin: res.pin,
            phone: res.phone
          });
        }

      });

    };


  })



  .controller('MyCtrl', function($scope, $ionicPush) {

    $scope.$on('cloud:push:notification', function(event, data) {
      var msg = data.message;
      alert(msg.title + ': ' + msg.text);
    });

  })



  .controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {


// An alert dialog
   $scope.showAlert = function() {
       $scope.data = {};
     var alertPopup =
     $ionicPopup.alert({
       title: 'Instant TopUp',
       template:
               '  <ion-item ui-sref="credit">          '+
               '  Credit/Debit Card   '+
               '  </ion-item>         '+
               '  <ion-item ui-sref="phOutlet">          '+
               '  Philippine Outlets  '+
               '  </ion-item>         '+
               '  <ion-item ui-sref="oOutlet">          '+
               '    Overseas Outlets  '+
               '  </ion-item>         '+
               '  <ion-item ui-sref="sendtoWallet">          '+
               '   Send to other Wallet  '+
               '  </ion-item>         ',

      buttons: [
       { text: 'Cancel' },
     ]
   });


     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };

   // An alert dialog
     $scope.showAlert2 = function() {
         $scope.data = {};
       var alertPopup =
       $ionicPopup.alert({
         title: 'Instant Points',
         template:

                 '  <ion-item ui-sref="convertPoints">          '+
                 '  Convert/Add to Wallet  '+
                 '  </ion-item>         '+
                 '  <ion-item ui-sref="redeemCode">          '+
                 '   Redeem Code  '+
                 '  </ion-item>         '+
                 '  <ion-item ui-sref="buyPoints">          '+
                 '   Buy Points         '+
                 '  </ion-item>         '+
                 '  <ion-item ui-sref="sendPoints">          '+
                 '   Send Points  '+
                 '  </ion-item>         ',

        buttons: [
         { text: 'Cancel' },
       ]
     });

       alertPopup.then(function(res) {
         console.log('Thank you for not eating my delicious ice cream cone');
       });
     };

  });
