$(document).ready(function(){
    var selfReportingForm; //users session form
    var success=function(){window.location='/dashboard';};
    
    //take data-x attribute and move values into data object
    $('li > input').each(function(){
       var dataQuestionAttr=$(this).attr('data-question');
       var dataAnswerAttr=$(this).attr('data-answer');
       $(this).data('question',dataQuestionAttr);
       $(this).data('answer',dataAnswerAttr);
       $(this).removeAttr('data-question').removeAttr('data-answer');
    }); 
    
    //get selfReportingForm from users session and populate var
        //will be updated as questions are answerd
        // and sent back to server as req body
        //will then populate users session
    $.ajax({
        type: "GET",   
        url: "./userQuestions",   
        success : function(response){
            selfReportingForm=JSON.parse(response);
            console.log(selfReportingForm);
        }
    });
    
    //update selfReportingForm
    //don't forget it will be used as req.body
    $('li > input').click(function(){
        var i=$(this).data('question');
        var j=$(this).data('answer');
        
        //since radio can only be selected once
        //set all answers to false
        if(selfReportingForm[i].inputType==="radio"){
            selfReportingForm[i].answers.forEach(function(answerArray){
                answerArray.chosen=false;  
            });
        }
        
        selfReportingForm[i].answers[j].chosen=true;
        console.log(selfReportingForm[i].answers[j]);
    });
    
    //on submit click
    //submit selfReportingForm as req.body
    //make sure it is in corrent format
    
    $("#submit").click(function(){
        var data={"selfReportingForm":JSON.stringify(selfReportingForm)};
        
        $.ajax({
            type: "POST",
            url: "/userQuestions",
            data: data,
            success: success(),
            dataType: 'json'
        }); 
    });
    
    //server side
    //update req.session.user.selfReportingForm obj
    //then update users info in db
    
    
    //gulp (run)to start app
    //gulp clean(remove all sessions, delete all users in db)
    //home page
    //general user function routes for users with account (log out, update questions, update account info, login, delete account)
    //db-crud
    //
    
    //begin thinking about restful api architecture
    //routes right now are pretty arbitrary and don't make much sense
    //set base route functions??? architechture must be organized first
    
    //NEXT BIGGIE, DEVELOP HOW SCORE IS CALCULATED 
    //this will require new routes file dedicated to score calucation
    
    //Dashboard
    //integrating Angular 2. jump back into book at this point and get book on angular 2
    
});





