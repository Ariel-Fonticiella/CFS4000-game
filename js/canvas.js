let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height= window.innerHeight;


const quotes = [
  "If you don't have anything nice to say, say something clever but devastating.",
  "*Developer visibly offended you skipped his intro*"
];

$("#firstFade").append(function random(){
  let result = Math.floor(Math.random() * 3);
  let list = quotes.map((quote) => {
  return quote;
  });
  return list[result];
}());
$("#firstFade").show(0).delay(5000).hide(2);



// var img = new Image();
//
// img.onload = function(){
//   canvas.width = img.naturalWidth;
//   canvas.height = img.naturalHeight;
//   ctx.drawImage(img, 0, 0);
// };
// // img.src = './images/Wasteland.jpg';
