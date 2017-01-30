
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
            
            if(currentSoundFile.isPaused()) {
                 currentSoundFile.play();
                songItem.html(pauseButtonTemplate);
            } else {
                currentSoundFile.pause();
                songItem.html(playButtonTemplate);
            }
            
            songItem.html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
        } else if (currentlyPlayingSongNumber !== songItem.attr('data-song-number')) {
            getSongNumberCell(currentlyPlayingSongNumber).html(currentlyPlayingSongNumber);
            songItem.html(pauseButtonTemplate);
            setSong(songItem.attr('data-song-number'));
            currentSoundFile.play();
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

 var updatePlayerBarSong = function() {
    $(".song-name").html(currentSongFromAlbum.title);
    $(".artist-song-mobile").html(currentAlbum.artist + " - " + currentSongFromAlbum.title);
    $(".artist-name").html(currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
        
}

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    
    if (currentSongFromAlbum == null) {
        currentSongFromAlbum = currentAlbum.songs[currentAlbum.songs.length-1];
    }
    
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    getSongNumberCell(currentIndex+1).html(currentIndex+1);
    

    currentIndex++;
    
    if ((currentIndex+1) > currentAlbum.songs.length) { //Add one to the current index to make it consistent with the current album length, and then add one to go to the next song. 
        currentIndex = 0; //reset index to the first song.
    }
   
    setSong(currentIndex+1);
    currentSoundFile.play();
    updatePlayerBarSong();
    getSongNumberCell(currentIndex+1).html(pauseButtonTemplate);
    
};

var prevSong = function() {
    
    if (currentSongFromAlbum == null) {
        currentSongFromAlbum = currentAlbum.songs[0];
    }
    
    var currentIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    getSongNumberCell(currentIndex+1).html(currentIndex+1);

    if (currentIndex == 0) { //Add one to the current index to make it consistent with the current album length, and then add one to go to the next song. 
        currentIndex = currentAlbum.songs.length; //reset index to the first song.
    }
    
    currentIndex--;
    
    setSong(currentIndex+1);
    currentSoundFile.play();
    updatePlayerBarSong();
    getSongNumberCell(currentIndex+1).html(pauseButtonTemplate);
};

var setSong = function(songNumber) {
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber-1];
    
    if (currentSoundFile) {
         currentSoundFile.stop();
     }
    
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         formats: [ 'mp3' ],
         preload: true
     });
    
    setVolume(currentVolume);
   
};
    

var setVolume = function(volume) {
    if(currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
}

var togglePlayFromPlayerBar = function() {
    if (currentSoundFile) {
        
        var songElement = getSongNumberCell(currentlyPlayingSongNumber);
        
        if(currentSoundFile.isPaused()) {
            currentSoundFile.play();
            playPauseButton.html(playerBarPauseButton);
            songElement.html(pauseButtonTemplate);
        } else {
            currentSoundFile.pause();
            playPauseButton.html(playerBarPlayButton);
            songElement.html(playButtonTemplate);
        }
    }
}

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
var currentSoundFile = null;
var currentVolume = 80;

var playPauseButton = $('.main-controls .play-pause');

$(function() {
    
   
    setCurrentAlbum(albumPicasso);
    
    $(".next").click(function() {
        nextSong(); 
    });
    
    $(".previous").click(function() {
        prevSong(); 
    });
    
    playPauseButton.click(function() {
        togglePlayFromPlayerBar();
    });
    
});