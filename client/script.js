// Modal For DropDown

// Get the modal
var modal3 = document.getElementById("myModal3");

// Get the button that opens the modal
var btn4 = document.getElementById("start-test");

// When the user clicks on the button, open the modal
function dropdown() {
  btn4.onclick = function () {
    modal3.style.display = "block";
  };

  window.onclick = function (event) {
    if (event.target == modal3) {
      modal3.style.display = "none";
    }
  };
}

var data = {};
// Exam Script

// Fetch JSON data
function fatchdata() {
  // fetch("data")
  fetch("GATE15P1.json")
    .then((response) => response.json())
    .then((d) => {
      data = d;
      dataHtml(0);
      document.querySelector("#total").innerHTML = data.length;
      // var l = data.length;

      // Timer
      let totalQue = data.length;
      let secondsLeft = totalQue * 60;

      function updateTime() {
        let timerDisplay = document.getElementById("timer");
        let minutes = Math.floor(secondsLeft / 60);
        let seconds = secondsLeft % 60;
        timerDisplay.innerHTML = `${minutes}:${
          seconds < 65 ? "0" : ""
        }${seconds}`;
        secondsLeft--;
        if (secondsLeft < 0) {
          alert("Time Out");
          clearInterval(timerInterval);
        }
      }
      let timerInterval = setInterval(updateTime, 1000);
      var l = 65;
      for (let i = 0; i < l; i++) {
        var s = `<div class="badge-item" id="badge-item">
        <span class="badge text-bg-warning" id=b-${i + 1}>${i + 1}</span>
      </div>`;
        document.querySelector("#con-Badge").innerHTML += s;
      }
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });
}

// access the properties of the first object

function dataHtml(i2) {
  var i = parseInt(i2);
  document.querySelector("#qno").innerHTML = i + 1;
  document.querySelector(".question").innerHTML = data[i].Question;
  document.querySelector(".question").setAttribute('id',data[i].Qid);
  document.querySelector("#OptionA").innerHTML = data[i].OptionA;
  document.querySelector("#OptionB").innerHTML = data[i].OptionB;
  document.querySelector("#OptionC").innerHTML = data[i].OptionC;
  document.querySelector("#OptionD").innerHTML = data[i].OptionD;
  document.querySelector("#qid").innerHTML = i;
  var op = document.getElementsByClassName("form-check-input");
  for(let i of op){
  i.checked = false;
  }
  const option = document.getElementById("opt");
  if (data[i].ImageName != "") {
    imgs.style.display = "block";
    str = "Images/" + data[i].ImageName + ".png";
    document.querySelector("#imgs>img").setAttribute("src", str);
    option.style.marginBottom = "20px";
  } else {
    imgs.style.display = "none";
    option.style.marginBottom = "180px";
  }
}
function nxtque() {
  var Qid = document.querySelector(".question").getAttribute('id');
  console.log(Qid);
  var opc = document.getElementsByClassName("form-check");
  for(i of opc){
    i.style.backgroundColor = "#DAF5FF";
  }
  var op = document.getElementsByName("Options");
  for (let i of op) {
    if (i.checked == true) {
      console.log(i.getAttribute('value'));
    }
  }
  // document.location.href='takeexam?eid=GATE15P1&randomstring='
  var n = document.getElementById("qid").innerHTML;
  var n2 = parseInt(n) + 1;

  document.querySelector("#b-" + n2 + "").classList.remove("text-bg-warning");
  document.querySelector("#b-" + n2 + "").classList.add("text-bg-success");
  dataHtml(n2);
}

function checkOption(e){
  var t = e.parentElement.children;
  for(i of t){
    i.style.backgroundColor = "#DAF5FF";
  }
  e.children[0].checked = true;
  e.style.backgroundColor = "#05BFDB";
}
