$(document).ready(function() {

//EVENT LISTENER FOR THE GET EMOTIONS BUTTON
    // $('button').on('click', getEmotions)

    var body = JSON.stringify({
      url: 'http://www.scienceofpeople.com/wp-content/uploads/2013/09/faces-small.jpg'
    });
    // function getEmotions() {

        var $xhr = $.post('https://g-mscog.herokuapp.com/emotion/v1.0/recognize?',
            body);

        $xhr.done(function(data) {
            if ($xhr.status !== 200) {
                return;
            }

            console.log(data);
        });
    // }
});
