//Creat canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


const gap = 45; // gap between two column 


// create components(images) of the game
var sky = new Image();
var ground = new Image();
var bird = new Image();
var upcol = new Image();
var downcol = new Image();

// load images
sky.src = "images/Sky.png";
ground.src = "images/Ground.png";
bird.src = "images/Bird.png";
upcol.src = "images/UpCol.png";
downcol.src = "images/DownCol.png";

var bx = 30;
var by = 25;
var gravity = 1;
var score = 0;

// Clike so that the bird flap
function Click() {
    document.addEventListener("click", moveUp);
    function moveUp() {
        by -= 18;
    }
}

//Creat array of different colums
var col = [];
col[0] = {
    w: canvas.width,
    h: Math.random() * (canvas.height - gap - 50) + 1
}


// Build the game
function Start() {
    ctx.drawImage(sky, 0, 0, canvas.width, canvas.height / 2);
    ctx.drawImage(ground, 0, canvas.height / 2, canvas.width, canvas.height / 2);
    ctx.drawImage(bird, bx, by, 21, 14);
    requestAnimationFrame(Start);

}

// Run the game
function Update() {
 
    requestAnimationFrame(clear);

    // Draw the ground and sky
    ctx.drawImage(sky, 0, 0, canvas.width, canvas.height/2);
    ctx.drawImage(ground, 0, canvas.height / 2, canvas.width, canvas.height / 2);

    // Draw the bird and give the bird gravity
    ctx.drawImage(bird, bx, by, 21, 14);
    by += gravity;

    // Add columns with different position
    for (var i = 0; i < col.length; i++) {
        ctx.drawImage(upcol, col[i].w, 0, 50,col[i].h);
        ctx.drawImage(downcol, col[i].w, col[i].h+gap, 50, canvas.height-col[i].h);
        col[i].w--;

        // Add new columns
        if (col[i].w == 180) {
            col.push({
                w: canvas.width,
                h: Math.random() * (canvas.height - gap - 50) + 1
            });
        }

        // Remove the unused columns to save the running time
        if (col[i].w == -50) {
            col.shift();
        }

        // Game Over
        if ((bx >= col[i].w && bx + 21 <= col[i].w + 50 && (by <= col[i].h || by + 14 >= col[i].h + gap))
            || by >= canvas.height - 50) {
            alert("Game Over! You got " + score + " points. Click start to try again.");
            location.reload();
        }
        //Get score
        if (col[i].w + 50 == bx) score++;
    }

    // Score record
    ctx.fillStyle = "#ff0000";
    ctx.font = "10px Verdana";
    ctx.fillText("Score: " + score, 10, canvas.height - 20);
    requestAnimationFrame(Update); 
 
}

// Clear function which clear animation before the update
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


Start();

