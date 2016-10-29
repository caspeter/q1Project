'use strict';
$(document).ready(function() {

    var body = {
        url: ''
    };


    //EVENT LISTENER FOR THE GET EMOTIONS BUTTON
    $('#submitButton').on('click', function() {
      console.log(body, 'first body');
      //
      var inputVal = $('input').val();
      console.log('inputVal: ' + inputVal);
      body.url = inputVal;
      console.log(body);
      body = JSON.stringify(body);
        var $xhr = $.post('https://g-mscog.herokuapp.com/emotion/v1.0/recognize?',
            body);

        $xhr.done(function(data) {
            if ($xhr.status !== 200) {
                return;
            }

            console.log(data);

            body = JSON.parse(body);

            var addImg = $("<img>");
            // console.log(addImg);
            // console.log(inputVal);
            $(addImg).attr("src", inputVal);
            console.log(addImg);
            $('#emotion-img').append(addImg);
            console.log($('#emotion-img'));
        });

    })
});
