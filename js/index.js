// forked from https://codepen.io/easymac/pen/EJHDj


var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var stars = {};
var adjustmentPoint = [0, 2];
var overshoot = 500;
var mousecoords = [];

$(window).bind('resize', function(e) {
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function() {
    this.location.reload(false); /* false to get page from cache */
  }, 100);
});

var DENSITY = 5; // "per square inch" or something maybe
makeStars(DENSITY);



function getCoords(event) {
  mousecoords = [event.clientX, event.clientY];
  adjustmentPoint = [
    (mousecoords[0] - canvas.width / 2) / 100,
    (mousecoords[1] - canvas.height / 2) / 100
  ];
}


requestAnimationFrame(drawStars);


function makeStars(DENSITY) {
  var totalStars =
    Math.floor((canvas.width + overshoot) / 72) * Math.floor((canvas.height + overshoot) / 72) * DENSITY;

  var randomX, randomY, randomZ;
  var sortable = [];
  for (var i = 0; i < totalStars; i++) {
    randomX = Math.random() * (canvas.width - 1 + overshoot) + 1 - overshoot / 2;
    randomY = Math.random() * (canvas.height - 1 + overshoot) + 1 - overshoot / 2;
    randomZ = Math.random() * 7;
    color = randColor();
    stars[i] = [randomX, randomY, randomZ, color, randomX, randomY];
    sortable.push(randomZ);
  }
  sortable.sort();

  for (var i in stars) {
    stars[i][2] = sortable[i];
  }
}


function drawStars() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  //context.fillStyle = "rgba(255, 255, 255, 0.5)"
  for (var i in stars) {
    context.fillStyle = stars[i][3];
    context.fillRect(stars[i][0], stars[i][1], stars[i][2], stars[i][2]);
    //context.fill();
  }
  updateStars();
  requestAnimationFrame(drawStars);
}

function updateStars() {
  for (var i in stars) {

    stars[i][0] = stars[i][4] + adjustmentPoint[0] * (stars[i][2] * 2);
    stars[i][1] = stars[i][5] + adjustmentPoint[1] * (stars[i][2] * 2);

    //stars[i][4] += adjustmentPoint[0] * stars[i][2] / 50;
    stars[i][5] += 2 * stars[i][2] / 50;

    //console.log()

    if (stars[i][4] >= canvas.width + overshoot / 2) {
      stars[i][4] = -15;
    }
    if (stars[i][5] >= canvas.height + overshoot / 2) {
      stars[i][5] = -15;
    }
    if (stars[i][4] < -overshoot / 2) {
      stars[i][4] = canvas.width + 10;
    }
    if (stars[i][5] < -overshoot / 2) {
      stars[i][5] = canvas.height + 10;
    }

  }
}

function randColor() {
  //return "#FDB813";
  var colors = ["#FF0021", "#FF7630", "#FFFA51", "#00B951", "#0075F7"];
  var i = Math.floor(Math.random() * 5);
  return colors[i];
}
