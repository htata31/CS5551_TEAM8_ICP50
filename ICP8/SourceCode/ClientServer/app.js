angular.module('homepage',[])
.controller('searchctrl', function($scope, $http) {
    console.log("hi");
    var sampletext="";
    $scope.getSearchResult = function() {
        $http.get("https://kgsearch.googleapis.com/v1/entities:search?query="+$scope.searchitem+"&key=AIzaSyCZbMz2VUDfsNIawl7W9W64FpZp8gsoh10&limit=1&indent=True").success(function(data)
        {
            try {
                console.log(data);

                $scope.searchDescription = data.itemListElement[0].result.detailedDescription.articleBody;
                $scope.description = "Description:";
                $scope.wiki = data.itemListElement[0].result.detailedDescription.url;
                $scope.wikiheading = "Explore " + $scope.searchDestination + " wiki in the following link";
                $scope.searchimage = data.itemListElement[0].result.image.contentUrl;
                document.getElementById("errormsg").innerHTML ="";
            }
            catch(err){
                document.getElementById("errormsg").innerHTML = "Please Correct your search item";
            }
        })

    }
})
