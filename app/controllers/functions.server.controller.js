
// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
exports.getScore=function(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


exports.getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].
                        message;
        }
    }
    return message;
};

exports.printError= function(err){
    console.log("************************************");
    console.log("************************************");
    console.log("ERROR");
    console.log(err);
    console.log("************************************");
    console.log("************************************");
};

exports.returnHighlightedScoreText=function(array,lowScore){
    for (var k=0; k<array.length; k++){
        if (((array[k].rangeBottom<=lowScore) && (lowScore<=array[k].rangeTop))==true){
            return array[k].text;
        }
    };
};
