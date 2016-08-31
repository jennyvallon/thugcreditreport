angular.module('simulator').controller('snitch', ['$scope',
    function($scope) {
        
        $scope.simulatedActionDetailArray=
        [
            //can be part of text factory
            'you are smart. It is advised that you remain such. You don\'t get points for not snitching. You get to keep your life.',
            'you shouldn\'t be looking at this because they are coming after you.',
            'and you are of sound mind to still check your score, then, you must be crazy. You get a little bump.',
            'for the sake of the community Thug Report has alerted local bosses to "take care" of you.'
        ];
        $scope.score= $('thug-score').text();
        
        $(document).ready(function(){
            $scope.newScore=$scope.score;
        
            $scope.simulatedActionNumber=0;
            $scope.change=function(){
                $scope.simulatedActionNumber=$('input[name="snitch"]').val();
                $scope.simulatedActionDetail=$scope.simulatedActionDetailArray[$scope.simulatedActionNumber];
                $scope.newScore=null;
                if($scope.simulatedActionNumber==0){
                    $scope.newScore=$scope.score;
                }
                else if($scope.simulatedActionNumber==1){
                    $scope.newScore=parseInt($scope.score)*.8;
                    //can become factory
                    if($scope.newScore<300){
                        $scope.newScore=300;
                    }else if($scope.newScore>800){
                        $scope.newScore=800;
                    }
                }
                else if($scope.simulatedActionNumber==2){
                    $scope.newScore=parseInt($scope.score)*.5;
                }
                else if($scope.simulatedActionNumber==3){
                    $scope.newScore='(✖╭╮✖)';
                };
                $('new-score').text($scope.newScore);

            };
        });
        
    }
]);