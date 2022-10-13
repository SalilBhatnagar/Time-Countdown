// let time = new Date();
// let tomorrow = new Date();
// tomorrow.setDate(time.getDate() + 1);
// console.log(tomorrow);
// function updateTimer() {
//   let future = tomorrow;
//   let now = new Date();
//   let diff = future - now;
//   let days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   let hours = Math.floor(diff / (1000 * 60 * 60));
//   let mins = Math.floor(diff / (1000 * 60));
//   let secs = Math.floor(diff / 1000);
//   let d = days;
//   let h = hours - days * 24;
//   let m = mins - hours * 60;
//   let s = secs - mins * 60;
//   document.getElementById("timer").innerHTML =
//     "<div>" +
//     d +
//     "<span>Days</span></div>" +
//     "<div>" +
//     h +
//     "<span>Hours</span></div>" +
//     "<div>" +
//     m +
//     "<span>Minutes</span></div>" +
//     "<div>" +
//     s +
//     "<span>Seconds</span></div>";
// }
// setInterval("updateTimer()", 1000);
