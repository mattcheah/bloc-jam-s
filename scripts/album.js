
var createSongRow = function(songNumber, song) {
    
    
    var songName = song.title;
    var songLength = song.duration;
    
    var template = 
        '<tr class="album-view-song-item">'
        +'<td class="song-item-number" data-song-number= "'+songNumber+'">'+songNumber+'</td>'
        +'<td class="song-item-title">'+songName+'</td>'
        +'<td class="song-item-duration">'+songLength+'</td>'
        +'</tr>';
    
    var row = $(template);
    
    var clickHandler = function() {

        var songItem = $(this).find(".song-item-number");
        
        
        if (currentlyPlayingSongNumber === parseInt(songItem.attr('data-song-number'))) {
            console.log("not the same!");
            songItem.html(playButtonTemplate);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
            $('.main-controls .play-pause').html(playerBarPlayButton);
        } else if (currentlyPlayingSongNumber !== songItem.attr('data-song-number')) {
            var currentlyPlayingSongElement = $('[data-song-number*="'+currentlyPlayingSongNumber+'"]');
            currentlyPlayingSongElement.html(currentlyPlayingSongElement.attr('data-song-number'));
            songItem.html(pauseButtonTemplate);
            currentlyPlayingSongNumber = parseInt(songItem.attr('data-song-number'));

            currentSongFromAlbum = song;
            updatePlayerBarSong();
        }
        
    };
    
    var onHover = function(event) {
        
        var songItem = $(this).find('.song-item-number');
        if(songItem.attr("data-song-number") !== currentlyPlayingSongNumber) {
            songItem.html(playButtonTemplate);
        }
    }
    
    var offHover = function(event) {
        var songItem = $(this).find('.song-item-number');
        var songNumber = parseInt(songItem.attr('data-song-number'));
        if( songNumber !== currentlyPlayingSongNumber) {
            songItem.html(songNumber);
        }
    }
    
    var updatePlayerBarSong = function() {
        $(".song-name").html(songName);
        $(".artist-song-mobile").html(currentAlbum.artist + " - " + songName);
        $(".artist-name").html(currentAlbum.artist);
        $('.main-controls .play-pause').html(playerBarPauseButton);
    }
    
    row.click(clickHandler);
    row.hover(onHover,offHover);
    return row;
}

var setCurrentAlbum = function(album) {
    
    currentAlbum = album;

    var albumTitle = $('.album-view-title');
    var albumArtist = $('.album-view-artist');
    var albumReleaseInfo = $('.album-view-release-info');
    var albumImage = $('.album-cover-art');
    var albumSongList = $('.album-view-song-list');
    
    albumTitle.text(album.title);
    albumArtist.text(album.artist);
    albumReleaseInfo.text(album.year + ' ' + album.label);
    albumImage.attr('src', album.albumArtUrl);
    
    albumSongList.empty();
    
    for (var i = 0; i < album.songs.length; i++) {
        
       var newRow = function() {
           return createSongRow(i + 1, album.songs[i]);
       }
        albumSongList.append(newRow);
        
    }
}

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    
    if (currentSongFromAlbum == null) {
        currentSongFromAlbum = currentAlbum.songs[currentAlbum.songs.length-1];
    }
    
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    $("[data-song-number*='"+(currentIndex+1)+"']").html(currentIndex+1);
    

    currentIndex++;
    
    if ((currentIndex+1) > currentAlbum.songs.length) { //Add one to the current index to make it consistent with the current album length, and then add one to go to the next song. 
        currentIndex = 0; //reset index to the first song.
    }
   
    
    currentSongFromAlbum = currentAlbum.songs[currentIndex];
    currentlyPlayingSongNumber = (currentIndex+1);
    
    $(".song-name").html(currentSongFromAlbum.title);
    $(".artist-song-mobile").html(currentAlbum.artist + " - " + currentSongFromAlbum.title);
    $(".artist-name").html(currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    $("[data-song-number*='"+(currentIndex+1)+"']").html(pauseButtonTemplate);
    
    
};

var prevSong = function() {
    
    if (currentSongFromAlbum == null) {
        currentSongFromAlbum = currentAlbum.songs[0];
    }
    
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    $("[data-song-number*='"+(currentIndex+1)+"']").html(currentIndex+1);

    if (currentIndex == 0) { //Add one to the current index to make it consistent with the current album length, and then add one to go to the next song. 
        currentIndex = currentAlbum.songs.length; //reset index to the first song.
    }
    
    currentIndex--;
    
    currentSongFromAlbum = currentAlbum.songs[currentIndex];
    currentlyPlayingSongNumber = (currentIndex+1);
    
    $(".song-name").html(currentSongFromAlbum.title);
    $(".artist-song-mobile").html(currentAlbum.artist + " - " + currentSongFromAlbum.title);
    $(".artist-name").html(currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    $("[data-song-number*='"+(currentIndex+1)+"']").html(pauseButtonTemplate);
    
};


var playButtonTemplate = '<a class="album-song-button"><span class="icon ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="icon ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentlyPlayingSongNumber = null;
var currentAlbum = null;
var currentSongFromAlbum = null;

$(function() {
    
   
    setCurrentAlbum(albumPicasso);
    
    $(".next").click(function() {
        nextSong(); 
    });
    
    $(".previous").click(function() {
        prevSong(); 
    });
    
});