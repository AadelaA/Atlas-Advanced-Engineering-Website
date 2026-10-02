// Atlas globe animation. Needs <canvas id="globe"> on the page.
(function () {
  // ---- Settings you can change ----
  var COLOR   = '10,10,10';  // line colour as "r,g,b". Black here; gold is '201,162,75'
  var RING_COLOR = '122,100,32'; // outer ring colour, the site's gold #7A6420
  var RING_WIDTH = 2.5;      // outer ring line thickness in pixels
  var LINE_WIDTH = 2;        // globe grid line thickness in pixels
  var OPACITY = 0.8;         // overall strength, 0 to 1
  var SPEED   = 0.12;        // rotation speed (radians per second)
  var TILT    = 0.38;        // how far the globe leans towards you (radians)
  var POS_X   = 0.7;         // centre of the globe, as a fraction of the hero width
  var POS_Y   = 0.65;      // centre of the globe, as a fraction of the hero height
  var SIZE    = 0.56;        // radius, as a fraction of the smaller hero side
  // ---------------------------------

  var canvas = document.getElementById('globe');
  if (!canvas) return; // page has no globe, do nothing
  var g = canvas.getContext('2d');
  var D = Math.PI / 180;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function draw(t) {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;

    // Match the drawing size to the screen so lines stay sharp
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var pw = Math.round(w * dpr), ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);
    g.globalAlpha = OPACITY;
    g.lineWidth = LINE_WIDTH;

    // Place the globe by the hero's size, not the canvas's (the canvas is taller so the globe can spill below)
    var hw = canvas.parentElement.clientWidth, hh = canvas.parentElement.clientHeight;
    var cx = hw * POS_X, cy = hh * POS_Y, R = Math.min(hw, hh) * SIZE;
    var rot = t * SPEED, ct = Math.cos(TILT), st = Math.sin(TILT);

    // Turn a point on the sphere (latitude, longitude) into a point on screen.
    // The third value is depth: above 0 is the front, below 0 is the back.
    function proj(lat, lon) {
      var cl = Math.cos(lat);
      var x = cl * Math.sin(lon + rot), y = Math.sin(lat), z = cl * Math.cos(lon + rot);
      return [cx + x * R, cy - (y * ct - z * st) * R, y * st + z * ct];
    }

    // Draw one short line; the back of the globe is drawn fainter
    function seg(a, b) {
      var front = (a[2] + b[2]) / 2 > 0;
      g.strokeStyle = 'rgba(' + COLOR + ',' + (front ? 0.6 : 0.16) + ')';
      g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke();
    }

    var lat, lon, p, q;

    // Vertical lines (meridians), one every 15 degrees
    for (lon = 0; lon < 360; lon += 15) {
      p = proj(-90 * D, lon * D);
      for (lat = -84; lat <= 90; lat += 6) { q = proj(lat * D, lon * D); seg(p, q); p = q; }
    }

    // Horizontal lines (parallels), one every 15 degrees
    for (lat = -75; lat <= 75; lat += 15) {
      p = proj(lat * D, 0);
      for (lon = 6; lon <= 360; lon += 6) { q = proj(lat * D, lon * D); seg(p, q); p = q; }
    }

    // Outer ring with protractor tick marks, drifting the other way
    g.strokeStyle = 'rgba(' + RING_COLOR + ',0.55)';
    g.lineWidth = RING_WIDTH;
    g.beginPath(); g.arc(cx, cy, R * 1.08, 0, Math.PI * 2); g.stroke();
    for (var i = 0; i < 120; i++) {
      var a = i * 3 * D - t * 0.05;
      var r1 = R * 1.1;
      var r2 = R * (i % 10 === 0 ? 1.17 : i % 5 === 0 ? 1.145 : 1.125);
      g.beginPath();
      g.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      g.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      g.stroke();
    }
  }

  function tick(ms) {
    draw(ms / 1000);
    requestAnimationFrame(tick);
  }

  if (still) {
    // People who turned off motion get one still frame
    draw(0);
    window.addEventListener('resize', function () { draw(0); });
  } else {
    requestAnimationFrame(tick);
  }
})();