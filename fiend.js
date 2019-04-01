
// this is where i created a function to load my images
var Image; 

onload = function createImage() {
    // load images into this div and cycle thru 90 times
    for (var i = 1; i < 90; i++) {
    //    creating image in the div and loading url into it
        Image = $("<img>");
        url =  "Golden_Tix_Idea/Falling_Tickets/Falling_Tickets_" + i + ".png";
        Image.attr("src", url);
        Image.attr("class", "animated");
        $("#animation").append(Image);
//    starting the animation function
    } 
    startAnimation();
};


// this function cycles thru the animation and getting the children and loading it into the variable
function startAnimation() {
    var frames = document.getElementById("animation").children;
    var frameCount = frames.length;
    var i = 0;
    // this function is taking the frames and setting each one to display at the current time in the background image of the body
    window.animate = setInterval(function () {
        // created a mod to start over each time it reaches the number of frames we loaded in
        frames[i % frameCount].style.display = "none";
        frames[++i % frameCount].style.display = "none";
        var bgimage = frames[i % frameCount].src;
        var UR = "url(" + bgimage + ")";
        $('#bdy').css("background", UR); 
        
    }, 33.33333333333333);
}
