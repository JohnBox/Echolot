//Init Foundation 6
$(document).foundation();

//Progressbar loop
function inc_progress(inc) {
    with (progress_meter) {
        var cur = parseInt(css('width'));
        var left = parseInt(css('left'));
        if (left + cur < 470) {
            css('width', cur + inc + 'px');
        } else if (cur > 0) {
            css('width', cur - inc + 'px');
            css('left', left + inc + 'px');
        } else {
            css('left', '0px');
            css('width', '0px');
        }
    }
}

//Send request to server for play the song
function play_song(e) {


}

//Create playlist from the answer of server
function success_ajax(playlist) {
    progress_container.css('display', 'none');
    clearInterval(interval);
    playlist = $.parseJSON(playlist);
    var playlist_ul = $('#playlist');
    for (var i = 0, l = playlist.length; i < l; ++i) {
        var m_li = $('#m'+i);
        var m = playlist[i];
        m_li.find('a').text(m.title);
        m_li.find('a').click(function (e) {
             $.ajax({
                 url: "http://localhost:8000/play/",
                 method: 'post',
                 data: {'url': m.url},
                 success: function (a) {
                    alert(a.play);
                 }
             });
        });
        m_li.find('div').text(m.url);
    }
}

function form_submit(e) {
    progress_container.css('display','block');
    interval = setInterval(function() { inc_progress(1); }, 1);
    var q = $('#q').val();
    $.ajax({
        url: "http://localhost:8000/",
        method: 'post',
        data: {'q': q},
        success: success_ajax
    });
    e.preventDefault();
}

$(function () {
    progress_container = $('#progress-container');
    progress_meter = $('#progress-meter');
    search_form = $('#search-form');

    search_form.keypress(function (e) {
        if (e.which == 13) {
            search_form.submit();
            return false;
        }
    });
    search_form.submit(form_submit);

});