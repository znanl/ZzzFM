/**
 * rev-1.1
 * require jQuery.
 * Created by Administrator on 2015/4/9.
 */

$(document).ready(function(){
    var mAlbum = $("#album"),
        mCover = $("#cover"),
        mButton = $("#m_play"),
        mSource = $("#player");

    $(".control .home").click(function(){
        window.open("https://github.com/MinonHeart/ZzzFM"); //HOMEPAGE
    });
    $(".control .next").click(function(){
        mSource[0].pause();
        next_music();
    });
    $(".container .center").click(function(){
        m_play();
    });
    mSource.bind("ended", function(){
        next_music();
    });

    //listen keyboard
    $(document).keyup(function(e){
        switch (e.keyCode){
            case 32: m_play();
                break; //keyboard space
            case 39: mSource[0].pause(); next_music();
                break; //keyboard right
        }
    });

    function update_progress(){
        $(".progress .current").css({"width": mSource[0].currentTime/mSource[0].duration*100 + "%"});
    }

    function m_play(){
        if (mSource[0].paused){
            mSource[0].play();
            mButton.attr("class", "fa fa-pause");
            mAlbum.addClass("playing");
            mAlbum.removeClass("paused");
        } else{
            mSource[0].pause();
            mButton.attr("class", "fa fa-play");
            mAlbum.addClass("paused");
        }
    }

    function next_music(){
        if (mSource[0].paused){
            load_music();
        } else{
            mAlbum.removeClass("paused playing");
            load_music();
            mButton.attr("class", "fa fa-pause");
            mAlbum.addClass("playing");
        }
    }

    function load_music(){
        $.get("player.php?_=" + (new Date()).getTime(), function (data){
            var music_info = JSON.parse(data);
            mSource.attr({"src": music_info.mp3});
            mCover.attr({"src": music_info.cover + "?param=350y350", "data-src": music_info.cover});
            $(".title h1").html(music_info.title);
            $(".title h2").html(music_info.artist);
            mSource[0].addEventListener("timeupdate", update_progress, false);
            mSource[0].play();

            //fix class for iOS and Android 4.4 or above
            if (mSource[0].paused){
                mButton.attr("class", "fa fa-play");
                mAlbum.addClass("paused");
            } else{
                mButton.attr("class", "fa fa-pause");
                mAlbum.addClass("playing");
                mAlbum.removeClass("paused");
            }
        });
        mSource[0].volume = 0.6; //set default volume
    }

    window.onload = load_music;
});