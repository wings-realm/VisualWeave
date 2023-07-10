var number = document.getElementById("number");
var speed = document.getElementById("speed");
var dispnum = document.getElementById("dispnum");
var dispspeed = document.getElementById("dispspeed");
dispnum.innerHTML = number.value; // Display the default slider value
dispspeed.innerHTML = speed.value;

let audioCtx = null;
let isFirstImage = true;

function playNote(freq){
  if(!isFirstImage){
    freq = 0;
  }
  if(audioCtx==null){
    audioCtx=new(
      AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext
    )();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioCtx.currentTime+dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.04;
  osc.connect(node);
  node.connect(audioCtx.destination);
}

function mute(){

  if (isFirstImage) {
   document.getElementById("volumeimage").src = "../static/images/mute.png";
 } else {
   document.getElementById("volumeimage").src = "../static/images/medium-volume.png";
 }
 isFirstImage = !isFirstImage;

}

number.oninput = function() {
  dispnum.innerHTML = this.value;
  arrnew();
}
speed.oninput = function() {
  dispspeed.innerHTML = this.value;
}

arrnew();

function genBars(len) {
    arr = [];
    for (var i = 0; i < len; i++) {
        var n = Math.floor(Math.random() * 200) + 1;
        arr.push(n);
    }
    var bars = document.querySelector("#bars");
    var ba = document.querySelectorAll(".bar");
    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${arr[i] * 2}px`;
        bar.classList.add("bar");
        bar.style.width = eval(1300 / len) + "px";
        bar.classList.add("flex-item");
        bars.appendChild(bar);
        // ba.style.width = eval(1004/len)+"px";
    }
}


function arrnew() {
    document.getElementById("gokut").style.opacity = 0;
    var l = number.value;

    var bars = document.getElementById("barContainer");
    bars.innerHTML = "";
    // if(bars.firstElementChild) bars.removeChild(bars.firstElementChild);
    var bb = document.createElement("div");
    bb.setAttribute("id", "bars");
    bars.appendChild(bb);
    // console.log(document.getElementById("bars"))/
    genBars(l);
}


async function insertionSort() {
  document.getElementById("gokut").style.opacity = 0;
    close_buttons();
    let bars = document.querySelectorAll(".bar");
    var len = bars.length;
    for (let i = 0; i < len; i += 1) {
        let j = i;
        while (
            j > 0 &&
            parseInt(bars[j].style.height) < parseInt(bars[j - 1].style.height)
        ) {
            var temp = bars[j].style.height;
            bars[j].style.height = bars[j - 1].style.height;
            bars[j - 1].style.height = temp;
            bars[j].style.background = "red";
            bars[j - 1].style.background = "red";
            playNote(200+parseInt(bars[j-1].style.height));
            playNote(200+parseInt(bars[j].style.height));
            await time_break();
            bars[j].style.background = "cyan";
            bars[j - 1].style.background = "cyan";
            j--;
        }
    }
    document.getElementById("gokut").style.opacity = 1;
    for (var i = 0; i < bars.length; i++) {
      playNote(200+parseInt(bars[i].style.height));
        bars[i].style.background = "green";
        await time_break();
    }
    open_buttons();
}

function time_break() {
    var millisec = 100-speed.value;
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve("");
        }, millisec);
    });
}

async function bubbleSort() {
  document.getElementById("gokut").style.opacity = 0;
    close_buttons();
    var bars = document.querySelectorAll(".bar");
    for (var i = 0; i < bars.length; i++) {
        for (var j = 0; j < bars.length - i - 1; j++) {
            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";
            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                var temp = bars[j].style.height;
                bars[j].style.height = bars[j + 1].style.height;
                bars[j + 1].style.height = temp;
                playNote(200+parseInt(bars[j+1].style.height));
                playNote(200+parseInt(bars[j].style.height));
            }
            await time_break();
            bars[j].style.background = "cyan";
            bars[j + 1].style.background = "cyan";
        }
        bars[bars.length - i - 1].style.background = "blue";
    }
        document.getElementById("gokut").style.opacity = 1;
    for (var i = 0; i < bars.length; i++) {
      playNote(200+parseInt(bars[i].style.height));
        bars[i].style.background = "green";
        await time_break();
    }
    open_buttons();
}

async function selectionSort() {
  document.getElementById("gokut").style.opacity = 0;
    close_buttons();
    var bars = document.querySelectorAll(".bar");
    for (var i = 0; i < bars.length; i++) {
        var mi = parseInt(bars[i].style.height),
            ind = i;
        bars[i].style.background = "orange";
        for (var j = i + 1; j < bars.length; j++) {
            bars[j].style.background = "cyan";
        }
        for (var j = i + 1; j < bars.length; j++) {
          playNote(200+parseInt(bars[j].style.height));
            bars[j].style.background = "red";
            await time_break();
            if (mi > parseInt(bars[j].style.height)) {
                mi = parseInt(bars[j].style.height);
                bars[ind].style.background = "cyan";
                bars[j].style.background = "orange";

                ind = j;
            } else {
                bars[j].style.background = "cyan";
            }
        }
        var temp = bars[ind].style.height;
        bars[ind].style.height = bars[i].style.height;
        bars[i].style.height = temp;
        bars[i].style.background = "blue";
    }
        document.getElementById("gokut").style.opacity = 1;
    for (var i = 0; i < bars.length; i++) {
      playNote(200+parseInt(bars[i].style.height));
        bars[i].style.background = "green";
        await time_break();
    }
    open_buttons();
}

async function MergeSorted(a, s, e) {
    var mid = Math.floor((s + e) / 2);
    var i = s;
    var j = mid + 1;
    var ans = [];
    while (i <= mid && j <= e) {
      playNote(200+parseInt(a[j].style.height));
                playNote(200+parseInt(a[i].style.height));
        if (parseInt(a[i].style.height) < parseInt(a[j].style.height)) {
            a[i].style.background = "yellow";
            ans.push(a[i++].style.height);
        } else {
            a[j].style.background = "orange";
            ans.push(a[j++].style.height);
        }
        await time_break();
    }
    while (i <= mid) {
      playNote(200+parseInt(a[i].style.height));
        await time_break();
        a[i].style.background = "yellow";
        ans.push(a[i++].style.height);
    }
    while (j <= e) {
      playNote(200+parseInt(a[j].style.height));
        await time_break();
        a[j].style.background = "orange";
        ans.push(a[j++].style.height);
    }

    // copying
    await time_break();
    var index = s;
    for (var p = 0; p < ans.length; ++p) {
        //console.log(ans[p]);
        playNote(200+parseInt(a[index].style.height));
        a[index].style.background = "blue";
        a[index++].style.height = ans[p];
        await time_break();
    }
}

async function mergeSort(a, s, e) {
    // base case
    if (s >= e) return;

    // recusive case
    var mid = Math.floor((s + e) / 2);
    await mergeSort(a, s, mid);
    await mergeSort(a, mid + 1, e);

    await MergeSorted(a, s, e);
}

async function MergeSort() {
  document.getElementById("gokut").style.opacity = 0;
    var bars = document.querySelectorAll(".bar");
    close_buttons();
    await mergeSort(bars, 0, bars.length - 1);
    document.getElementById("gokut").style.opacity = 1;
    for (var i = 0; i < bars.length; i++) {
      playNote(200+parseInt(bars[i].style.height));
        bars[i].style.background = "green";
        await time_break();
    }
    open_buttons();
}

// A utility function to swap two elements
async function swap(arr, i, j) {
    //console.log(arr[i], ",", arr[j]);
    arr[i].style.background = "red";
    arr[j].style.background = "red";
    playNote(200+parseInt(arr[i].style.height));
    playNote(200+parseInt(arr[j].style.height));
    await time_break();
    let temp = arr[i].style.height;
    arr[i].style.height = arr[j].style.height;
    arr[j].style.height = temp;
    arr[i].style.background = "cyan";
    arr[j].style.background = "cyan";
    await time_break();
}

async function QuickSort(arr, s, e) {
    // base case
    if (s >= e) return;

    // rec case
    var index = Math.floor(Math.random() * (e - s + 1)) + s;
    var pivot = parseInt(arr[index].style.height);
    arr[index].style.background = "blue";
    await time_break();
    swap(arr, index, e);
    var k = s - 1;
    for (var i = s; i < e; ++i) {
        await time_break();
        if (parseInt(arr[i].style.height) < pivot) {
            swap(arr, i, ++k);
        }
    }
    swap(arr, ++k, e);
    await time_break();
    arr[index].style.background = "cyan";
    //console.log(pivot,",",k,",",s,"-",e);
    //console.log(arr);
    await time_break();
    await QuickSort(arr, s, k - 1);
    await QuickSort(arr, k + 1, e);
}

async function quicks() {
  document.getElementById("gokut").style.opacity = 0;
    var bars = document.querySelectorAll(".bar");
    close_buttons();
    await QuickSort(bars, 0, bars.length - 1);
        document.getElementById("gokut").style.opacity = 1;
    for (var i = 0; i < bars.length; i++) {
      playNote(200+parseInt(bars[i].style.height));
        bars[i].style.background = "green";
        await time_break();
    }
    open_buttons();
}

var bars = document.querySelectorAll(".bar");

function close_buttons() {
    var btns = document.querySelectorAll("button");
    for(var i = 0; i < btns.length; i++) {

        btns[i].disabled = true;
        btns[i].style.opacity = 0.5;
    }
    document.querySelectorAll(".volumebtn")[0].disabled=false;
    document.querySelectorAll(".volumebtn")[0].style.opacity = 1;
    number.disabled = true;
    number.style.opacity = 0.5;

}

function open_buttons() {
    var btns = document.querySelectorAll("button");
    for(var i = 0; i < btns.length; i++) {

        btns[i].disabled = false;
        btns[i].style.opacity = 1;

    }
    number.disabled = false;
    number.style.opacity = 1;
}
