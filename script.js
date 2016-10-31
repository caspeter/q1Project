'use strict';
$(document).ready(function() {
  console.log('Document Ready Start');

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

    var canvases = [];

    ////////////////////////////////////////////////////////

    //to iterate over the boxes data
    function displayBoxes(data) {
      // var canvases = [];
      // for (var canavs in canvases) {
      //   myCanvas.clearCanvas();
      // }
        //for each object in the array, each person
        for (var i = 0; i < data.length; i++) {
          canvases.push([i]);
            // console.log('object in data: ', data[i]); // this gets the individual object (one person's data)
            //Get faceRectangle
            var faceRectangleDim = data[i].faceRectangle;
            var faceScores = data.scores;
            // console.log('creating rectangle ', data[i].faceRectangle);
            // console.log('object[i].faceRectangle: ', faceRectangleDim); //get the dimentions of the faceRectangle

            // MAKE BOXES ON jCANVAS
            myCanvas.drawRect({
                layer: true,
                strokeStyle: 'green',
                name: 'layer' + i,
                strokeWidth: 1,
                x: faceRectangleDim.left,
                y: faceRectangleDim.top,
                fromCenter: false,
                width: faceRectangleDim.width,
                height: faceRectangleDim.height,
                // click: function(layer) {
                //     console.log('faceScore: ', layer[i].faceScores.happiness)
                // }
            });
            console.log('Function drawRect - for loop');
        };
        console.log('Function drawRect - exiting');
    };

    function clearCanvases(canvases){
      for (var i = 0; i < canvases.length; i++) {
        myCanvas.removeLayer('layer' + i).drawLayers();
      }
      // for (var canvas in canvases) {
      //   myCanvas.removeLayer();
      // }
      console.log('Function Clear Canvas');
    }


    function urlSubmitClick() {
      console.log('Function urlSubmitClick enter');
      clearCanvases(canvases);
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
        // myCanvas.clearCanvas();

        var image = new Image();
        image.src = inputVal;
        image.onload = function() {
            // console.log(this.height, this.width)
            //console.log($('canvas'));
            myCanvas.attr('height', this.height);
            myCanvas.attr('width', this.width);
        };

        //add the src to the img tag, the src being the input value
        $(addImg).attr("src", inputVal);
        // console.log($('#emotion-img')); //make sure the img tag got into the div
        //clear the input value so it can accept a new one
        $('input').val('');

        //XMLHttp Request
        var $xhr = $.post('https://g-mscog.herokuapp.com/emotion/v1.0/recognize?',
            body);
        //once the post is finished, do this with the data
        $xhr.done(function(data) {
            if ($xhr.status !== 200) {
                return;
            }
            // console.log(data); //log the data into the console
            //parse the body back into an object for the next input
            body = JSON.parse(body);

            displayBoxes(data);
        });
        console.log('Function urlSubmitClick exit');

    };

    //EVENT LISTENER FOR THE GET EMOTIONS BUTTON
    $('#urlSubmit').on('click', urlSubmitClick);

});
