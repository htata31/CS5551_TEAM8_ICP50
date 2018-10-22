function closepopup()
{
    document.getElementById('modal-wrapper').style.display='none';
}

/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('mongoSample',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('mongoController',function($scope,$http){
    $scope.insertData = function(){
        console.log($scope.classid);
        console.log($scope.name);
        console.log($scope.course);
        console.log($scope.major);

        var dataParams = {
            'classid' : $scope.classid,
            'name' : $scope.name,
            'course' : $scope.course,
            'major' : $scope.major,
            'minor' : $scope.minor
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('http://127.0.0.1:8081/register',dataParams);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
        closepopup();
    };

    $scope.Search = function () {
        console.log($scope.serachMajor);
        var readVal="";

        $http.get('http://127.0.0.1:8081/getData?searchkey='+$scope.serachMajor).then(function(data)
            {
                var outputdata=data.data;
                $scope.details =[];

                console.log("the length of the data is  :"+outputdata.length);
                console.log("the values :-"+JSON.stringify(outputdata) );
                $scope.list="Details from the database of "+$scope.serachMajor+" Major";
                for(var x=0;x<outputdata.length;x++)
                {


                    var val= (outputdata[x].name+' , '+outputdata[x].classid+' , '+outputdata[x].course+' , '+outputdata[x].major+" , "+outputdata[x].minor);
                    readVal=readVal+" "+JSON.stringify(outputdata[x]);
                    $scope.details.push(val);
                }

            },function(err)
            {
                console.log(err);
            }
        )
    }
});

