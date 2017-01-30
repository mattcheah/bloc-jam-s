
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
            songItem.html(playButtonTemplate);
            setSong(null);
            $('.main-controls .play-pause').html(playerBarPlayButton);
        } else if (currentlyPlayingSongNumber !== songItem.attr('data-song-number')) {
            getSongNumberCell(currentlyPlayingSongNumber).html(currentlyPlayingSongNumber);
            songItem.html(pauseButtonTemplate);
            
            setSong(songItem.attr('data-song-number'));
            updatePlayerBarSong();
        }
        
    };
    
    var onHover = function(event) {
        
        var songItem = $(this).find('.song-item-number');
        if(parseInt(songItem.attr("data-song-number")) !== currentlyPlayingSongNumber) {
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

var changeSong = function(next){
    if (next) {
        if (currentSongFromAlbum == null) {
            currentSongFromAlbum = currentAlbum.songs[currentAlbum.songs.length-1]; 
        }
        
        var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
        getSongNumberCell(currentIndex+1).html(currentIndex+1);
        
        if ((currentIndex+2) > currentAlbum.songs.length) {
            currentIndex = -1;
        } 
        
        currentIndex++;
    } else {
        if (currentSongFromAlbum == null) {
            currentSongFromAlbum = currentAlbum.songs[0];
        }
        
        var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
        getSongNumberCell(currentIndex+1).html(currentIndex+1);
        
        if (currentIndex == 0) { 
            currentIndex = currentAlbum.songs.length; 
        }
        
        currentIndex--;
    }
    
    setSong(currentIndex+1);
    
    $(".song-name").html(currentSongFromAlbum.title);
    $(".artist-song-mobile").html(currentAlbum.artist + " - " + currentSongFromAlbum.title);
    $(".artist-name").html(currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    getSongNumberCell(currentIndex+1).html(pauseButtonTemplate);
}

var setSong = function(songNumber) {
    if(songNumber == null) {
        currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;
    } else {
        currentlyPlayingSongNumber = parseInt(songNumber);
        currentSongFromAlbum = currentAlbum.songs[songNumber-1];
     }
   
};
    
var getSongNumberCell = function(number) {
    return $("[data-song-number*='"+number+"']");
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
        changeSong(true); 
    });
    
    $(".previous").click(function() {
        changeSong(false); 
    });
    
});