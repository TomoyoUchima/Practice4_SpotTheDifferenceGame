(function() {
'use strict';

var stage = document.getElementById('stage');
var ctx; 
var count = 0;
// var dim = 5  //最初の分割数
var dim;
var size;
var answer = [];
var isPlaying = true;


function init() {
  dim = Math.floor(count / 3) + 2;
  size = Math.floor(stage.width/dim); //stageのwidthをdimで割る。(dimが5だと50)
  answer = [
    Math.floor(Math.random() * dim), //0〜(dim-1)の間の乱数(0, 1, 2, 3, 4)
    Math.floor(Math.random() * dim),
  ];
}

 function draw() {
   var x;
   var y;
   var offset = 2;

  //countに応じて、パネルの色をよりわかりにくくさせる。(まずパネルの色をランダムに決めて、正解のパネルをちょっとだけ明るくする、という処理を書く。)
   var baseColor;
   var answerColor;
   var hue;
   var lightness;
   hue = Math.random() * 360;
   baseColor = 'hsl(' + hue + ', 80%, 50%)'; //色相(Hue),彩度(Satuation),明度(Luminance)
   lightness = Math.max(75 - count, 53); //baseColorの l が50%のため、50%に近くとわかり難くなる。countが大きくなりすぎると、50% より小さくなってしまうので、小さくても 53% くらいまでになるようにする。
   answerColor = 'hsl(' + hue + ', 80%, ' + lightness + '%)';

  ctx.clearRect(0, 0, stage.width, stage.height);
   for(x = 0; x < dim; x++) {
     for(y = 0; y < dim; y++) {
       if (answer[0] === x && answer[1] === y) {
         ctx.fillStyle = answerColor;
       } else {
         ctx.fillStyle = baseColor;
       }
       //↑のif文を設定したので下記は不要
      //  ctx.fillStyle = 'rgba(255, 0, 0, ' + Math.random() + ')'; //透明度をランダムに変える
       ctx.fillRect(
         //0, 50, 100
         size * x + offset,
         size * y + offset,
         size - offset * 2,
         size - offset * 2
        // size * x ,
        // size * y ,
        // size,
        // size 
       );

      //  ctx.fillStyle = '#000';
      //  ctx.textBaseline = 'top'; //フォントが表示される際の整列位置を決める基準線
      //  ctx.fillText(x + ', ' + y, size * x, size * y); //fillText(text, x, y [, maxWidth])
     }
   }
 }

if(typeof stage.getContext === 'undefined') {
  return;
}

ctx = stage.getContext('2d');
// console.log(answer);


//正解をクリックした時の処理
stage.addEventListener('click', function(e) { //e → クリックした位置をイベントオブジェクトから取得
  var rect;
  var x;
  var y;
  var replay = document.getElementById('replay');
  if (isPlaying === false) { //間違えたときに処理を止める(この処理を書かなければそのままゲームが続けられる。)
    returm;
  }
  // console.log(e);
  // console.log(e.pageX);
  // console.log(e.pageY);
  //pageXは、windowの左上が原点になってしまうので、panelを原点に位置を取得するようにする
  rect = e.target.getBoundingClientRect(); //クリックされた stage の領域を代入。
  //getBoundingClientRect();は画面のスクロール量も加算されるため、その分も引いておく。
  // console.log(e.pageX - rect.left - window.scrollX);
  // console.log(e.pageY - rect.top - window.scrollY);
  x = e.pageX - rect.left - window.scrollX;
  y = e.pageY - rect.top - window.scrollY;
  // console.log(Math.floor(x / size)); //例: x = 60, size = 50 → 60/50=1.2 → 1
  // console.log(Math.floor(y / size));

  if (
    answer[0] === Math.floor(x / size) && 
    answer[1] === Math.floor(y / size)
  ) {
    // console.log('Hit!');
    count++;
    init(); // count に応じて dim と answer を再計算する。
    draw(); // 再計算されたのが表示される
  } else {
    alert('Your score: ' + count);
    isPlaying = false;
    
    // replay.classList.remove('hidden');
    replay.classList.remove('hidden');
    replay.className = '';
  }

});

init();
draw();




})();