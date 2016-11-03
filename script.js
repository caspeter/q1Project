'use strict';
$(document).ready(function() {
    //hide the emotions-results on load
    // $('#emotion-results').toggle();
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

    function createCallout(x_pos, y_pos,data,index) {
      var buildCalloutDiv = $('<div class="callout"><div class="row" id="emotion-results"><span class="col s6">Happiness</span><div id="happiness"></div><p>Sadness</p><div id="sadness"></div><p>Surprise</p><div id="surprise"></div><p>Neutral</p><div id="neutral"></div><p>Fear</p><div id="fear"></div><p>Disgust</p><div id="disgust"></div><p>Anger</p><div id="anger"></div><p>Contempt</p><div id="contempt"></div></div></div>');
      $('#emotion-img').append(buildCalloutDiv);
      var theCallout = $('.callout');
      theCallout.css({"left": x_pos, "top": y_pos});

      $('#happiness').progressbar({
          value: Math.round(data[index].scores.happiness * 100),
      });
      $('#happiness > div').css({'background': '#ff6562'});
      //SADNESS BAR
      $('#sadness').progressbar({
          value: Math.round(data[index].scores.sadness * 100)
      });
      $('#sadness > div').css({'background': '#6c9cf8'});
      //SURPRISE BAR
      $('#surprise').progressbar({
          value: Math.round(data[index].scores.surprise * 100)
      });
      $('#surprise > div').css({'background': '#ffcd10'});
      //NEUTRAL BAR
      $('#neutral').progressbar({
          value: Math.round(data[index].scores.neutral * 100)
      });
      $('#neutral > div').css({'background': '#grey'});
      //FEAR BAR
      $('#fear').progressbar({
          value: Math.round(data[index].scores.fear * 100)
      });
      $('#fear > div').css({'background': 'black'});
      //DISGUST BAR
      $('#disgust').progressbar({
          value: Math.round(data[index].scores.disgust * 100)
      });
      $('#disgust > div').css({'background': '#50b94f'});
      //ANGER BAR
      $('#anger').progressbar({
          value: Math.round(data[index].scores.anger * 100)
      });
      $('#anger > div').css({'background': '#b53200'});
      //CONTEMPT BAR
      $('#contempt').progressbar({
          value: Math.round(data[index].scores.contempt * 100)
      });
      $('#contempt > div').css({'background': '#ff6d00'});
    };

    //to iterate over the boxes data
    function displayBoxes(data) {
        //for each object in the array, each person
        for (var i = 0; i < data.length; i++) {
            canvases.push([i]);
            //get the dimentions of the faceRectangle
            var faceRectangleDim = data[i].faceRectangle;

            // MAKE BOXES ON jCANVAS
            myCanvas.drawRect({
                layer: true,
                strokeStyle: '#333167',
                name: 'layer' + i,
                strokeWidth: 2,
                x: faceRectangleDim.left,
                y: faceRectangleDim.top,
                fromCenter: false,
                width: faceRectangleDim.width,
                height: faceRectangleDim.height,
                cornerRadius: 1,
                intangible: false,
                mouseover: function(layer) {
                    var index = layer.name.replace('layer', '');
                    //TO CREATE THE CARD
                    // console.log("x: ", (layer.eventX + layer.event.currentTarget.offsetLeft) , " y: ", layer.eventY);
                    var cardX = data[index].faceRectangle.left + layer.event.currentTarget.offsetLeft + ((data[index].faceRectangle.width)*.6);
                    var cardY = data[index].faceRectangle.top +
                    layer.event.currentTarget.offsetTop;// + ((data[index].faceRectangle.height)*.5);
                    createCallout(cardX, cardY, data, index);

                    // console.log('layerName: ', layer.name, " and happiness ", Math.round(data[index].scores.happiness * 100))
                    // SHOW THE EMOTIONS-RESULTS WHEN THE MOUSE GOES OVER THE FIRST ONE
                    // $('#emotion-results').show();
                    // HAPPINESS BAR
                    // $('#happiness').progressbar({
                        // value: Math.round(data[index].scores.happiness * 100),
                    // });
                    // $('#happiness > div').css({'background': '#ff6562'});
                    // //SADNESS BAR
                    // $('#sadness').progressbar({
                    //     value: Math.round(data[index].scores.sadness * 100)
                    // });
                    // $('#sadness > div').css({'background': '#6c9cf8'});
                    // //SURPRISE BAR
                    // $('#surprise').progressbar({
                    //     value: Math.round(data[index].scores.surprise * 100)
                    // });
                    // $('#surprise > div').css({'background': '#ffcd10'});
                    // //NEUTRAL BAR
                    // $('#neutral').progressbar({
                    //     value: Math.round(data[index].scores.neutral * 100)
                    // });
                    // $('#neutral > div').css({'background': '#grey'});
                    // //FEAR BAR
                    // $('#fear').progressbar({
                    //     value: Math.round(data[index].scores.fear * 100)
                    // });
                    // $('#fear > div').css({'background': 'black'});
                    // //DISGUST BAR
                    // $('#disgust').progressbar({
                    //     value: Math.round(data[index].scores.disgust * 100)
                    // });
                    // $('#disgust > div').css({'background': '#50b94f'});
                    // //ANGER BAR
                    // $('#anger').progressbar({
                    //     value: Math.round(data[index].scores.anger * 100)
                    // });
                    // $('#anger > div').css({'background': '#b53200'});
                    // //CONTEMPT BAR
                    // $('#contempt').progressbar({
                    //     value: Math.round(data[index].scores.contempt * 100)
                    // });
                    // $('#contempt > div').css({'background': '#ff6d00'});

                    // console.log('x:', data[index].faceRectangle.left, 'y:', data[index].faceRectangle.top);

                    //location for the div with progrees bars to start
                    // console.log('x with 80% width:', data[index].faceRectangle.left + ((data[index].faceRectangle.width)*.8), 'y with 80% height:', data[index].faceRectangle.top + ((data[index].faceRectangle.height)*.8));
                },
                mouseout: function () {
                  $('div.callout').remove();
                }
            });
        };
    };

    function clearCanvases() {
        for (var i = 0; i < canvases.length; i++) {
            myCanvas.removeLayer('layer' + i).drawLayers();
        }
        canvases = [];
    }


    function urlSubmitClick() {
        clearCanvases();
        // $('#emotion-results').hide();
        //grab the value from the input area
        var inputVal = $('input').val();
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
            myCanvas.attr('height', this.height);
            myCanvas.attr('width', this.width);
        };

        //clear the input value so it can accept a new one
        $('input').val('');

        //XMLHttp Request
        var $xhr = $.post('https://g-mscog.herokuapp.com/emotion/v1.0/recognize?',
            body);
        //once the post is finished, do this with the data
        $xhr.done(function(data) {
            if ($xhr.status !== 200) {
              //make sure the body is parsed for next entery
                body = JSON.parse(body);
                return;
            }
            //add the src to the img tag, the src being the input value
            $(addImg).attr("src", inputVal);
            console.log(data); //log the data into the console
            //parse the body back into an object for the next input
            body = JSON.parse(body);

            displayBoxes(data);
        });
        $xhr.fail(function(data) {
            if ($xhr.status === 400) {
              //make sure the body is parsed for next entery
                body = JSON.parse(body);
                Materialize.toast('Please enter a valid URL', 4000, 'orange accent-4');
                return
            }
        })
    };

    //EVENT LISTENER FOR THE GET EMOTIONS BUTTON
    $('#urlSubmit').on('click', urlSubmitClick);

});
