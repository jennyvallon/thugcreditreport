 $(document).ready(function(){
    var questions;
    function getQuestions(){
        $.ajax({
            type: "GET",   
            url: "../getQuestions",   
            async: true,
            success : function(text){
                questions=JSON.stringify(text);
            }
        });
    }
    
    getQuestions();
    
    $("input#createAccount").click(function(){
    
        function goToQuestionsPage (){
            window.location.replace("/questions");
        }


        var firstName=$("input#firstName").val();
        var lastName=$("input#lastName").val();
        var email=$("input#email").val();
        var userName=$("input#userName").val();
        var password=$("input#password").val();

        var userInfo={"firstName":firstName,"lastName":lastName,"email":email,"userName":userName,"password":password,"selfReportingForm":questions};

        var success= goToQuestionsPage();

        $.ajax({
            type: "POST",
            url: "/users",
            data: userInfo,
            success: success,
            dataType: 'json'
        });
    });
});

 

 
 

