const ball1 = document.getElementById("a");
const ball2 = document.getElementById("b");
const ball3 = document.getElementById("c");
const ball4 = document.getElementById("d");
const ball5 = document.getElementById("e");
const ball6 = document.getElementById("f");
const ball7 = document.getElementById("g");

// let number = numbers[Math.floor(Math.random() * numbers.length)];
let numbers = [];
for (var i = 1; i <= 45; i++) {
  numbers.push(i);
}
// let pickNumbers = [];
const n = 7;
const sample = numbers
  .map((x) => ({ x, r: Math.random() }))
  .sort((a, b) => a.r - b.r)
  .map((a) => a.x)
  .slice(0, 7);
// pickNumbers.push(sample);
// array 안에 또 array 들어가 있었음. 이 위에 라인 때문에.
sample.sort((a, b) => {
  return a - b;
});
console.log(sample);

ball1.innerText = sample[0];
ball2.innerText = sample[1];
ball3.innerText = sample[2];
ball4.innerText = sample[3];
ball5.innerText = sample[4];
ball6.innerText = sample[5];
ball7.innerText = sample[6];

const desc = document.querySelector(".desc");
function getdate() {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  desc.innerHTML = `<h5>${dateTime}</h5>`;
}
getdate();
