/**
 * rev-1.2
 * require jQuery.
 * Created by Administrator on 2015/4/9.
 */

$(document).ready(function(){

    //Variable Area
    var mAlbum = $("#album"),
        mCover = $("#cover"),
        mButton = $("#m_play"),
        mSource = $("#player");



    //Functions
    function loadMusic(){
        $.get("player.php?_=" + (new Date()).getTime(), function (data){
            var music_info = JSON.parse(data);
            mSource.attr({"src": music_info.mp3});
            mCover.attr({"src": music_info.cover + "?param=350y350", "data-src": music_info.cover});
            $(".title h1").html(music_info.title);
            $(".title h2").html(music_info.artist);
            mSource[0].play();
        });
        mSource[0].volume = 0.5; //set default volume; no effect on mobilephone
    }

    function mediaButton(){
        if (mSource[0].paused){
            mSource[0].play();
        } else{
            mSource[0].pause();
        }
    }

    function playingFallback(){
        mButton.attr("class", "fa fa-pause");
        mAlbum.addClass("playing").removeClass("paused");
    }

    function pausedFallback(){
        mButton.attr("class", "fa fa-play");
        mAlbum.addClass("paused"); //Don't remove class "playing"
    }

    function updateProgress(){
        $(".progress .current").css({"width": mSource[0].currentTime/mSource[0].duration*100 + "%"});
    }



    //Body
    $(".control .home").click(function(){
        window.open("https://github.com/MinonHeart/ZzzFM"); //HOMEPAGE
    });
    $(".control .next").click(function(){
        mSource[0].pause();
        loadMusic();
    });
    $(".container .center").click(function(){
        mediaButton();
    });

    //listen keyboard
    $(document).keyup(function(e){
        switch (e.keyCode){
            case 32: //keyboard space
                mediaButton();
                break;
            case 39: //keyboard right
                mSource[0].pause();
                loadMusic();
                break;
            default:
                break;
        }
    });

    mSource[0].addEventListener('playing', playingFallback, false);
    mSource[0].addEventListener('pause', pausedFallback, false);
    mSource[0].addEventListener('ended', loadMusic, false);
    mSource[0].addEventListener('timeupdate', updateProgress, false);

    window.onload = loadMusic;

});
