var animatePoints = function() {
                    
    var pointNodes = document.getElementsByClassName("point");
    
    for (var i = 0; i < pointNodes.length; i++) {
        
        console.log("hi "+i);
        setTimeout(revealPoint(i), 250*i);
    }
    
    function revealPoint() {
        pointNodes[i].style.opacity = 1;
        pointNodes[i].style.transform = "scaleX(1) translateY(0)";
        pointNodes[i].style.msTransform = "scaleX(1) translateY(0)";
        pointNodes[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    }

};

animatePoints();
