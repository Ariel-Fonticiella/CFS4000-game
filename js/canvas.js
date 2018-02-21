let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height= window.innerHeight;


const quotes = [
  "'If you don't have anything nice to say, say something clever but devastating.'",
  "*Developer visibly offended you skipped his intro*",
  "'It's easy to sit there and say you'd like to have more money. And I guess that's what I like about it.'",
  "'It takes a big man to cry, but it takes a bigger man to laugh at that man.'",
  "'How come the dove gets to be the peace symbol? How about the pillow? It has more feathers than the dove, and it doesn't have that dangerous beak'"
];

$("#firstFade").append(function random(){
  let max = quotes.length;
  let result = Math.floor(Math.random() * max);
  let list = quotes.map((quote) => {
  return quote;
  });
  return list[result];
}());
$("#firstFade").show(0).delay(4400).hide(5);



// var img = new Image();
//
// img.onload = function(){
//   canvas.width = img.naturalWidth;
//   canvas.height = img.naturalHeight;
//   ctx.drawImage(img, 0, 0);
// };
// // img.src = './images/Wasteland.jpg';
