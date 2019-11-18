const scale = 1; //To make it pretty
let mirrors;

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

  mirrors = [
    [
      [(width-length)/2, (thickness)/2],
      [(width+length)/2, (thickness)/2]
    ],
    [
      [(width-length)/2, (-thickness)/2],
      [(width+length)/2, (-thickness)/2]
    ]
  ]
  console.log("mirrors: ", mirrors);

  ctx.clearRect(0,0, width, height);
  mirrors.forEach(drawLine);

}

function convert (x,y) {
  let a = x*scale;
  let b = (-y+(height/2))*scale
  console.log("x: ", x, "y: ", y, '\n', "a: ", a, "b: ", b);
  return [a, b];
}

function drawLine (line) {
  let l1 = convert(line[0][0], line[0][1]);
  let l2 = convert(line[1][0], line[1][1]);
  console.log("l1: ", l1, "l2: ", l2);
  ctx.strokeStyle = '#9a63b0';
  ctx.beginPath();
  ctx.moveTo(l1[0], l1[1]);
  ctx.lineTo(l2[0], l2[1]);
  ctx.stroke();

}
