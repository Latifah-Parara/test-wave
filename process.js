const scale = 3;

let c;
let ctx;

let width, height;

document.addEventListener('DOMContentLoaded', function(event) {
  console.log("scale: ", scale);

  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  width = c.width / scale;
  height = c.height / scale;
  console.log("width: ", width, "height: ", height);

  update();
})

function update() {
  let angle = Number(document.getElementById("angle").value);
  let length = Number(document.getElementById("length").value);
  let thickness = Number(document.getElementById("thickness").value);
  console.log("angle: ", angle, "length: ", length, "thickness: ", thickness);

  let top = [
      [(width-length)/2, thickness/2],
      [(width+length)/2, thickness/2]
  ]
  let bottom = [
      [(width-length)/2, -thickness/2],
      [(width+length)/2, -thickness/2]
  ]

  ctx.clearRect(0,0, width*scale, height*scale);
  ctx.setLineDash([]);
  drawLine(top);
  drawLine(bottom);

  let dir = angle > 0  // if traveling towards top
  let rayOrigin = [(width-length)/2, 0];
  let raySlope = (angle/180) * Math.PI;

  let rayDest
  for (var i = 0; i < 100; i++) {
   rayDest = [rayOrigin[0] + (thickness/2) / Math.tan(raySlope), thickness*(dir?+1:-1)/2]
   console.log("rayDest: ", rayDest)
    if (rayDest[0] < (width+length)/2)
      drawLine([rayOrigin, rayDest])
    else
      break
    rayOrigin = rayDest
    dir = !dir
  }
  rayDest = [rayOrigin[0] + Math.cos(raySlope)*2*thickness, rayOrigin[1] + Math.sin(raySlope)*2*thickness*(dir?+1:-1)]
  ctx.setLineDash([5, 3])
  drawLine([rayOrigin, rayDest])
}

function convert (x,y) {
  let a = x*scale;
  let b = (-y+(height/2))*scale
  // console.log("x: ", x, "y: ", y, '\n', "a: ", a, "b: ", b);
  return [a, b];
}

function drawLine (line) {
  let l1 = convert(line[0][0], line[0][1]);
  let l2 = convert(line[1][0], line[1][1]);
  // console.log("l1: ", l1, "l2: ", l2);
  ctx.strokeStyle = '#9a63b0';
  ctx.beginPath();
  ctx.moveTo(l1[0], l1[1]);
  ctx.lineTo(l2[0], l2[1]);
  ctx.stroke();

}
