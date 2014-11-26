//缺少错误处理, 把ID搞錯的話, 就手動點擊下一首吧

oAudio = document.getElementById('player');
btn = $("#m_play");
album = $("#album");

// $(document).ready(function () {
//     $.get("player.php", function (data) {
//         mp3_info = JSON.parse(data);
//         $("#player").attr("src", mp3_info.mp3);
//         $("#album").css("background-image", "url('" + mp3_info.cover + "')");
//     });
// });

$('.control .home').click(function(){
    window.open('https://idongu.com');
})
$('.control .next').click(function(){
    oAudio.pause();
    btn.attr("class", "fa fa-play");
    album.addClass("paused");
    next_music();
})
$('.container .center').click(function(){
    m_play();
})
$("#player").bind("ended", function () {
    next_music();
});

function m_play() {
    if (oAudio.paused) {
        oAudio.play();
        btn.attr("class", "fa fa-pause");
        album.addClass("playing");
        album.removeClass("paused");
        // $('.progress').animate({opacity:"1"});
        // $('body').width() > 450 ? $('.progress .current').css({'width': audio.currentTime / audio.duration * 100 + '%'}) + ($('.album').css('opacity') != 1 ? $('.album').css({'opacity': 1}) : '') : $('.album').css({'opacity': 1.1 - audio.currentTime / audio.duration});
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
    $.get("player.php", function (data) {
        mp3_info = JSON.parse(data);
        $("#player").attr("src", mp3_info.mp3);
        $("#album").css("background-image", "url('" + mp3_info.cover + "')");
        oAudio.play();
    });
}
window.onload = next_music;
