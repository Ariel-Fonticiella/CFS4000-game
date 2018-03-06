let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height= window.innerHeight;

const quotes = [
  "Millennial Quote: 'If you don't have anything nice to say, say something clever but devastating.'",
  "*Developer visibly offended you skipped his intro*",
  "Millennial Quote: 'It's easy to sit there and say you'd like to have more money. And I guess that's what I like about it.'",
  "Millennial Quote: 'It takes a big man to cry, but it takes a bigger man to laugh at that man.'",
  "Millennial Quote: 'How come the dove gets to be the peace symbol? How about the pillow? It has more feathers than the dove, and it doesn't have that dangerous beak'",
  "Millennial Quote: 'I hope life isn't a big joke, because I don't get it.''" ,
  "Millennial Quote: 'Broken promises don't upset me. I just think, why did they believe me?'",
  "Millennial Quote: 'I wish a robot would get elected president. That way, when he came to town, we could all take a shot at him and not feel too bad.'"
];

$("#firstFade").append(function random(){
  let max = quotes.length;
  let result = Math.floor(Math.random() * max);
  let list = quotes.map((quote) => {
  return quote;
  });
  return list[result];
}());
$("#firstFade").show(0).delay(4500).hide(5);
