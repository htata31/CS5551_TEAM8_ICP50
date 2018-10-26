angular.module('homepage',[])
.controller('searchctrl', function($scope, $http) {
    console.log("hi");
    $scope.getSearchResult = function() {

        $http.get('http://127.0.0.1:8080/getData?searchkey='+$scope.searchitem).then(function(data)
            {

                console.log(data.data);
                $scope.searchDescription = data.data.itemListElement[0].result.detailedDescription.articleBody;
                $scope.description = "Description:";
                $scope.wiki = data.data.itemListElement[0].result.detailedDescription.url;
                $scope.wikiheading = "Explore " + $scope.searchDestination + " wiki in the following link";
                $scope.searchimage = data.data.itemListElement[0].result.image.contentUrl;
                //document.getElementById("errormsg").innerHTML ="";



            },function(err)
            {
                //console.log(err);
            }
        )
    }
})
