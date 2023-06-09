// This is for the teams menu enter animation

var t1 = new TimelineMax({ paused: true });

t1.to(".nav-container", 1, {
  left: 0,
  ease: Expo.easeInOut,
});

t1.staggerFrom(
  ".team > div",
  0.8,
  { y: 100, opacity: 0, ease: Expo.easeOut },
  "0.1",
  "-=0.4"
);

t1.reverse();
$(document).on("click", ".team-open", function () {
  t1.reversed(!t1.reversed());
});
$(document).on("click", ".team-close", function () {
  t1.reversed(!t1.reversed());
});

// This is for the city effect
$(document).on("click", ".team-open", function () {
  var Boid = function (x, y, angle) {
    this.x = x;
    this.y = y;

    this.angle = Math.pow(Math.random(), 10) + angle;
    this.dx = Math.cos(this.angle);
    this.dy = Math.sin(this.angle);

    this.life = Math.random() * 100 + 100;
    this.dead = false;

    this.update = function () {
      context.strokeStyle = "#ff791a";
      context.beginPath();
      context.moveTo(this.x, this.y);

      this.x += this.dx * 2;
      this.y += this.dy * 2;
      this.life -= 1;

      context.lineTo(this.x, this.y);
      context.stroke();

      var index = (Math.floor(this.x) + width * Math.floor(this.y)) * 4;

      if (this.life <= 0) this.kill();
      if (data[index + 3] > 0) this.kill();

      if (this.x < 0 || this.x > width) this.kill();
      if (this.y < 0 || this.y > height) this.kill();
    };

    this.kill = function () {
      boids.splice(boids.indexOf(this), 1);
      this.dead = true;
    };
  };

  var width = window.innerWidth;
  var height = window.innerHeight;

  var canvas = document.getElementById("world");
  canvas.width = width;
  canvas.height = height;

  var context = canvas.getContext("2d");
  var image, data;

  var boids = [];
  boids.push(
    new Boid(width / 2, height / 2, (Math.random() * 180 * Math.PI) / 180)
  );

  setInterval(function () {
    image = context.getImageData(0, 0, width, height);
    data = image.data;

    for (var i = 0; i < boids.length; i++) {
      var boid = boids[i];
      boid.update();

      if (!boid.dead && Math.random() > 0.5 && boids.length < 500) {
        boids.push(
          new Boid(
            boid.x,
            boid.y,
            ((Math.random() > 0.5 ? 90 : -90) * Math.PI) / 180 + boid.angle
          )
        );
      }
    }
  }, 1000 / 60);
});
