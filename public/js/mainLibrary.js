var user={
    id:""//continuously populated by the server to then be given back to it for query's
};
 
var functionLibrary={
    
    getQuestions:function getQuestions(){
        $.ajax({
            type: "GET",   
            url: "../getQuestions",   
            async: true,
            success : function(text){
                questions=JSON.stringify(text);
            }
        });
    },
    
    goToQuestionsPage: function goToQuestionsPage (){
        window.location.replace("/questions");
    }
};