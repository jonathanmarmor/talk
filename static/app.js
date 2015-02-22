var items = [
    {'duration': 1, 'title': 'Sharp is Brave'},
    {'duration': 5, 'title': '"Jonathan Marmor"'},
    {'duration': 3, 'title': "Lucky Mosko's 20th Century Music History Class"},
    {'duration': 5, 'title': 'An Unrhymed Chord and 02-03-04'},
    {'duration': 3, 'title': 'Dissonant Counterpoint'},
    {'duration': 1, 'title': 'Quentin Tolimieri'},
    {'duration': 2, 'title': 'Stop Motion Audio'},
    {'duration': 2, 'title': 'Fantastic Discharge'},
    {'duration': 2, 'title': 'Chords'},
    {'duration': 2, 'title': 'Self-reinforcing scales'},
    {'duration': 5, 'title': 'Collaboration'},
    {'duration': 5, 'title': 'how I got interested in Indian music'},
    {'duration': 2, 'title': '"A Singular Christmas"'},
    {'duration': 1, 'title': 'listening exercise'},
    {'duration': 5, 'title': 'The Echo Nest'},
    {'duration': 2, 'title': 'Randomness in a familiar musical context'},
    {'duration': 2, 'title': 'A Nonsense Lyrics Generator'},
    {'duration': 5, 'title': 'Hackathons for artists'},
    {'duration': 2,
    'title': 'Arbitrary harmonic sequences and melodic ornaments'},
    {'duration': 1,
    'title': "If someone enjoys a type of music and you don't, you are the one who is missing out."},
    {'duration': 2, 'title': 'NWC Studies'},
    {'duration': 5, 'title': 'my questions for them'},
    {'duration': 10, 'title': 'their questions for me'},
]


$(document).ready(function(){
    var html = _.template($('#items-template').text(), {items: items});
    $('#target').html(html);
    $('.start').click(start);
});


function secondsToTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = seconds % 60;
    if(seconds < 10){
        seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
}


function start() {
    var button = $(this);
    var id = button.data('id');
    var duration = button.data('duration');
    var box = $('.timer-box[data-id="' + id + '"]');

    if(button.data('running') === false){
        // Start the timer
        var intervalID = countdown(duration * 60, id);

        button.text('stop');
        button.data('intervalid', intervalID);
        button.data('running', true);
        box.addClass('active-box');

    } else {
        // Stop and reset the timer
        var intervalID = button.data('intervalid');
        clearInterval(intervalID);
        intervalID = null;

        var timer = $('#timer-'+id);
        timer.html(secondsToTime(duration * 60));
        button.text('start');
        button.data('running', false);
        box.removeClass('active-box');
    }
}


function countdown(seconds, id) {
    var remaining = seconds;
    var timer = $('#timer-'+id);
    console.log(remaining);

    var intervalID = setInterval(tick, 1000);

    function tick() {
        remaining -= 1;
        console.log(remaining);

        timer.html(secondsToTime(remaining));

        if(remaining === 0){
            $('.start[data-id="' + id + '"]').click();
            if(id < items.length - 1){
                var nextID = id + 1;
                $('.start[data-id="' + nextID + '"]').click();
            }
        }
    }

    return intervalID;
}
