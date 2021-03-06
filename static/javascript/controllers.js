'use strict';
angular.module('confusionApp')

        .controller('MenuController', ['$scope',  menuFactory', function($scope, menuFactory) {
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            
            $scope.dishes= menuFactory.getDishes();           

             $scope.select = function(setTab) {
                this.tab = setTab;
                if (setTab === 2) {
                    this.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    this.filtText = "mains";
                }
                else if (setTab === 4) {
                    this.filtText = "dessert";
                }
                else {
                    this.filtText = "";
                }
            };
            $scope.isSelected = function (checkTab) {
                return (this.tab === checkTab);
            };

            $scope.toggleDetails = function() {
              $scope.showDetails = !$scope.showDetails;
            };
            
        }])
       
         .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"email",label:"Email"}];
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            $scope.sendFeedback = function() {
               console.log($scope.feedback);
               if ($scope.feedback.agree && ($scope.feedback.mychannel == "") && !$scope.feedback.mychannel) {
                  $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
               else {
                  $scope.invalidChannelSelection = false;
                  $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                  $scope.feedback.mychannel="";
                  $scope.feedbackForm.$setPristine();
                  console.log($scope.feedback);
                }
            };
        }])

        /*.controller('DishDetailController', ['$scope','$routeParams', 'menuFactory', function($scope, $routeParams, menuFactory) {

	     var dish= menuFactory.getDish(parseInt($routeParams.id, 10));
             $scope.dish = dish;
             $scope.comment = {author: "", rating: 5, comment: "", date: new Date().toISOString()};

       }])*/
 
       .controller('DishDetailController', ['$scope','$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

	     var dish= menuFactory.getDish(parseInt($stateParams.id, 10));
             $scope.dish = dish;
             $scope.comment = {author: "", rating: 5, comment: "", date: new Date().toISOString()};

       }])

      .controller('DishCommentController', ['$scope', function($scope) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            
            $scope.submitComment = function () {
                console.log($scope.comment);

                //Step 2: This is how you record the date
                $scope.comment.date = new Date().toISOString(); //why needed?
                
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.comment);
                
                //Step 4: reset your form to pristine
                $scope.commentForm.$setPristine();
                
                //Step 5: reset your JavaScript object that holds your comment
                $scope.comment = {author: "", rating: 5, comment: "", date: new Date().toISOString()};
                console.log($scope.comment);
            };
        }])

    // TODO: Implement the IndexController and About Controller here

    .controller('IndexController', 
        [ '$scope', 'menuFactory', 'corporateFactory', 
        function ($scope, menuFactory, corporateFactory) {

          $scope.featured = menuFactory.getDish(0);     
          $scope.promotion = menuFactory.getPromotion(0);
          $scope.specialist = corporateFactory.getLeader(3);   
    }
  ])

   .controller('AboutController', 
     [ '$scope', 'corporateFactory', 
       function ($scope, corporateFactory) {

      $scope.leaders = corporateFactory.getLeaders();   
    }
  ]
);




