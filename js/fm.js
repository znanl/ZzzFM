//lack error handling

oAudio = document.getElementById('player');
btn = $("#m_play");
album = $("#album");

$('.control .home').click(function(){
    window.open('https://github.com/MinonHeart/ZzzFM'); //Homepage
});
$('.control .next').click(function(){
    oAudio.pause();
    next_music();
});
$('.container .center').click(function(){
    m_play();
});
$("#player").bind("ended", function () {
    next_music();
});

function update_progress() {
    $('.progress .current').css({'width': oAudio.currentTime / oAudio.duration * 100 + '%'}) + ($('.album').css('opacity') != 1 ? $('.album').css({'opacity': 1}) : '');
}

function m_play() {
    if (oAudio.paused) {
        oAudio.play();
        btn.attr("class", "fa fa-pause");
        album.addClass("playing");
        album.removeClass("paused");
    }
    else {
        oAudio.pause();
        btn.attr("class", "fa fa-play");
        album.addClass("paused");
    }
}

function next_music() {
    album.removeClass("paused");
    album.removeClass("playing");
    load_music();
    btn.attr("class", "fa fa-pause");
    album.addClass("playing");
}

function load_music() {
    $.get("player.php?_=" + (new Date()).getTime(), function (data) {
        music_info = JSON.parse(data);
        $("#player").attr("src", music_info.mp3);
        $('#album img').attr({'src': music_info.cover + "?param=250y250", 'data-src': music_info.cover}); // $("#album").css("background-image", "url('" + music_info.cover + "')");
        $('.title h1').html(music_info.title);
        $('.title h2').html(music_info.artist);
        oAudio.addEventListener('timeupdate', update_progress, false);
        oAudio.play();
    });
}

window.onload = next_music;