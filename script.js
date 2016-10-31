'use strict';
$(document).ready(function() {

  //GLOBAL VARIABLES
    //where the input url will go, stored globally
    var body = {
      url: ''
    };
    //get myCanvas id
    var myCanvas = $('#myCanvas');
    //create the image tag
    var addImg = $("<img>");
    //add the image tag into the emotion-img div
    $('#emotion-img').append(addImg);

    ////////////////////////////////////////////////////////

    //to iterate over the boxes data
    function displayBoxes(data) {

        //for each object in the array, each person
        for (var i = 0; i < data.length; i++) {
            // console.log('object in data: ', data[i]); // this gets the individual object (one person's data)
            //Get faceRectangle
            var faceRectangleDim = data[i].faceRectangle;
            // console.log('creating rectangle ', data[i].faceRectangle);
            // console.log('object[i].faceRectangle: ', faceRectangleDim); //get the dimentions of the faceRectangle
            //TRYING TO MAKE BOXES ON jCANVAS
            myCanvas.drawRect({
                // fillStyle: 'none',
                strokeStyle: 'blue',
                strokeWidth: 1,
                x: faceRectangleDim.left,
                y: faceRectangleDim.top,
                fromCenter: false,
                width: faceRectangleDim.width,
                height: faceRectangleDim.height
            })
        };
    };



    function urlSubmitClick() {
        // console.log(body, 'first body'); //shows the what was in the url value when we start
        //grab the value from the input area
        var inputVal = $('input').val();
        // console.log('inputVal: ' + inputVal); //shows what was inputed
        //set the object body key url to the input value
        body.url = inputVal;
        // console.log(body); //this shows that the url has changed
        //change the body object into something JSON can read
        body = JSON.stringify(body);
        //clear canvas so that the old boxes go away
        myCanvas.clearCanvas();

        var image = new Image();
        image.src = inputVal;
        image.onload = function() {
          console.log(this.height, this.width)
          console.log($('canvas'));
          myCanvas.attr('height', this.height);
          myCanvas.attr('width', this.width);
        };

        //add the src to the img tag, the src being the input value
        $(addImg).attr("src", inputVal);
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
            //parse the body back into an object for the next input
            body = JSON.parse(body);

            displayBoxes(data);
        });
    };

    //EVENT LISTENER FOR THE GET EMOTIONS BUTTON
    $('#urlSubmit').on('click', urlSubmitClick);

});
