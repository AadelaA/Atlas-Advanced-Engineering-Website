(function () {
  var COLOR   = '10,10,10';
  var RING_COLOR = '122,100,32';
  var RING_WIDTH = 2.5;
  var LINE_WIDTH = 2;
  var OPACITY = 0.8;
  var SPEED   = 0.12;
  var TILT    = 0.38;
  var POS_X   = 0.7;
  var POS_Y   = 0.65;
  var SIZE    = 0.56;

  var canvas = document.getElementById('globe');
  if (!canvas) return;
  var g = canvas.getContext('2d');
  var D = Math.PI / 180;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function draw(t) {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var pw = Math.round(w * dpr), ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) { canvas.width = pw; canvas.height = ph; }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);
    g.globalAlpha = OPACITY;
    g.lineWidth = LINE_WIDTH;

    var hw = canvas.parentElement.clientWidth, hh = canvas.parentElement.clientHeight;
    var cx = hw * POS_X, cy = hh * POS_Y, R = Math.min(hw, hh) * SIZE;
    if (hw <= 700) {
      // Phones: smaller globe tucked just under the header.
      R = hw * 0.42;
      cy = 64 + R * 1.2;
    }
    var rot = t * SPEED, ct = Math.cos(TILT), st = Math.sin(TILT);

    function proj(lat, lon) {
      var cl = Math.cos(lat);
      var x = cl * Math.sin(lon + rot), y = Math.sin(lat), z = cl * Math.cos(lon + rot);
      return [cx + x * R, cy - (y * ct - z * st) * R, y * st + z * ct];
    }

    var frontPath = new Path2D(), backPath = new Path2D();

    function seg(a, b) {
      var path = (a[2] + b[2]) / 2 > 0 ? frontPath : backPath;
      path.moveTo(a[0], a[1]); path.lineTo(b[0], b[1]);
    }

    var lat, lon, p, q;

    for (lon = 0; lon < 360; lon += 15) {
      p = proj(-90 * D, lon * D);
      for (lat = -84; lat <= 90; lat += 6) { q = proj(lat * D, lon * D); seg(p, q); p = q; }
    }

    for (lat = -75; lat <= 75; lat += 15) {
      p = proj(lat * D, 0);
      for (lon = 6; lon <= 360; lon += 6) { q = proj(lat * D, lon * D); seg(p, q); p = q; }
    }

    g.strokeStyle = 'rgba(' + COLOR + ',0.16)';
    g.stroke(backPath);
    g.strokeStyle = 'rgba(' + COLOR + ',0.6)';
    g.stroke(frontPath);

    g.strokeStyle = 'rgba(' + RING_COLOR + ',0.55)';
    g.lineWidth = RING_WIDTH;
    g.beginPath(); g.arc(cx, cy, R * 1.08, 0, Math.PI * 2); g.stroke();
    g.beginPath();
    for (var i = 0; i < 120; i++) {
      var a = i * 3 * D - t * 0.05;
      var r1 = R * 1.1;
      var r2 = R * (i % 10 === 0 ? 1.17 : i % 5 === 0 ? 1.145 : 1.125);
      g.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      g.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    }
    g.stroke();
  }

  var frame = 0;

  function tick(ms) {
    draw(ms / 1000);
    frame = requestAnimationFrame(tick);
  }

  if (still) {
    draw(0);
    window.addEventListener('resize', function () { draw(0); });
  } else {
    // Only animate while the hero is on screen.
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        if (!frame) frame = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }).observe(canvas.parentElement);
  }
})();