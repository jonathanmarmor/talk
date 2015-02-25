var items = [
    {'duration': 60, 'title': 'Section 1'},
    {'duration': 5, 'title': 'Rest'},
    {'duration': 60, 'title': 'Section 2'},
]


$(document).ready(function(){
    var html = _.template($('#unrhymed-template').text(), {items: items});
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
        var intervalID = countdown(duration, id);

        button.text('stop');
        button.data('intervalid', intervalID);
        button.data('running', true);
        box.addClass('active-box');

    } else {
        // Stop and reset the timer
        var intervalID = button.data('intervalid');
        clearInterval(intervalID);
        intervalID = null;

        // var timer = $('#timer-'+id);
        // timer.html(secondsToTime(duration));
        // button.text('start');
        // button.data('running', false);
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
