var pointNodes = document.getElementsByClassName("point");
var sellingPoints = document.getElementsByClassName('selling-points')[0];
var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

var animatePoints = function(pointNodes) {
    
    var revealPoint = function(i) {
        pointNodes[i].style.opacity = 1;
        pointNodes[i].style.transform = "scaleX(1) translateY(0)";
        pointNodes[i].style.msTransform = "scaleX(1) translateY(0)";
        pointNodes[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    }
    
    for (var i = 0; i < pointNodes.length; i++) {
        
        //console.log("hi "+i);
        setTimeout(revealPoint(i), 250*i);
    }
    
    

};

window.onload = function() {
    
    if(window.innerHeight > 950) {
         animatePoints(pointNodes);
    }

    window.addEventListener('scroll', function(event) {
        if(document.documentElement.scrollTop || document.body.scrollTop > scrollDistance) {
             animatePoints(pointNodes);
        }
    });
    
    
}


