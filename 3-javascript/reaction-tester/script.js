var timer = new Date(); //Set the timer
var totalClicks = 0; //The amount of times the shape is clicked
var totalTime = 0; //All times added up
var quickestTime = Number.MAX_SAFE_INTEGER; //Quickest Click Time

var started = false; //Keep track if wether or not the game has started

//Function to generate a random hex color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}


function respawnShape () { 

    //Get the playing fields height and width
    var containerHeight = document.getElementById("shapeContainer").offsetHeight;
    var containerWidth = document.getElementById("shapeContainer").offsetWidth;

    var size;
    //if height is greater than width than use width for size
    if (containerHeight > containerWidth) {
        //Make the size 1/4 to 1/2 the playing fields width
        size = Math.floor((Math.random()*containerWidth/4)+containerWidth/4);

    //Otherwise use height for sizing
    } else {
        //Make the size 1/4 to 1/2 the playing fields height
        size = Math.floor((Math.random()*containerHeight/4)+containerHeight/4);
    }

    //Set the height and width of the shape
    document.getElementById("shape").style.width = size + "px";
    document.getElementById("shape").style.height = size + "px";

    //Get a random left position for the shape
    var left = Math.random() * containerWidth;
    //if the shape will overflow off the playing field then scoot the shape over enough to fit
    if (left > containerWidth-size) {
        left -= size;
    }
    //Set the left position
    document.getElementById("shape").style.left = left + "px";

    //Get a random top position for the shape
    var top = Math.random() * containerHeight;
     //if the shape will overflow off the playing field then scoot the shape over enough to fit
    if (top > containerHeight-size) {
        top -= size;
    }
    //Set the top position
    document.getElementById("shape").style.top = top + "px";

    //Randomly decide between 0(false) or 1(true) whether to make the shape square or circle
    if (Math.floor(Math.random() * 2)) {
        document.getElementById("shape").style.borderRadius = "100%"
    } else {
        document.getElementById("shape").style.borderRadius = "0%"
    }

    //Get a random color
    document.getElementById("shape").style.backgroundColor = getRandomColor();

    //Display Shape again
    document.getElementById("shape").style.display = "block";

    //Get the new time
    timer = new Date();

}


//Funciton for when shape is clicked
document.getElementById("shape").onclick = function () {

    //Hide the shape
    document.getElementById("shape").style.display = "none";

    //Check if the game has started
    if(started) {
        //Get the current time
        var timeClicked = new Date();
        //Get how much time has passed since the shape has been clicked
        var timeElapsed =  (timeClicked - timer) / 1000;

        //Display the time elapsed
        document.getElementById("currentTime").innerHTML = timeElapsed;

        //Get the average time elapsed
        totalTime += timeElapsed;
        totalClicks ++;
        document.getElementById("averageTime").innerHTML = (totalTime/totalClicks).toFixed(3);

        //Get the fastest time
        if (quickestTime > timeElapsed) {
            quickestTime = timeElapsed;
        }
        document.getElementById("fastestTime").innerHTML = quickestTime;
    } else {
        started = true;
        document.getElementById("shape").innerHTML = "";
        document.getElementById("shape").style.margin = "0";
        document.getElementById("shape").style.padding = "0";
    }

    //Start to respawn the shape
    setTimeout(respawnShape, Math.floor(Math.random()*1500));


}