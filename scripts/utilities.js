function forEach(points, callback) {
    for(var i = 0; i < points.length; i++) {
        setTimeout(callback(points[i]), i*200);
    }
}