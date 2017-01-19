var revealPoint = function(pointNodes) {
                    

    for (var i = 0; i < pointNodes.length; i++) {
        
        console.log("hi "+i);
        
        setTimeout(animate(i), 250*i);
    }
    
    function animate(i) {
        pointNodes[i].style.opacity = 1;
        pointNodes[i].style.transform = "scaleX(1) translateY(0)";
        pointNodes[i].style.msTransform = "scaleX(1) translateY(0)";
        pointNodes[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    }

};

//animatePoints();
revealPoint(document.getElementsByClassName("point"));