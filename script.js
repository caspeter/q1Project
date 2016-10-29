'use strict';
$(document).ready(function() {

    //where the input url will go, stored globally
    var body = {
        url: ''
    };


    //EVENT LISTENER FOR THE GET EMOTIONS BUTTON
    $('#submitButton').on('click', buttonClick)

    function buttonClick() {
        // console.log(body, 'first body'); //shows the what was in the url value when we start
        //grab the value from the input area
        var inputVal = $('input').val();
        // console.log('inputVal: ' + inputVal); //shows what was inputed
        //set the object body key url to the input value
        body.url = inputVal;
        // console.log(body); //this shows that the url has changed
        //change the body object into something JSON can read
        body = JSON.stringify(body);
        //create the image tag
        var addImg = $("<img>");
        //add the src to the img tag, the src being the input value
        $(addImg).attr("src", inputVal);
        //add the image tag into the emotion-img div
        $('#emotion-img').append(addImg);
        // console.log($('#emotion-img')); //make sure the img tag got into the div
        //XMLHttp Request
        var $xhr = $.post('https://g-mscog.herokuapp.com/emotion/v1.0/recognize?',
            body);
        //once the post is finished, do this with the data
        $xhr.done(function(data) {
            if ($xhr.status !== 200) {
                return;
            }
            console.log(data); //log the data into the console
            //parse the body back into an object
            body = JSON.parse(body);
        });
    };


});
