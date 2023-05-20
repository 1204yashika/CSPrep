//Login/Signup Form

function register(e) {
  var j = $("#register").serialize();
  $.ajax({
    url: "/register",
    data: j,
    method: "post",
    success: function (data) {
      alert("You are registered. Please login...");
      document.location.href = "/";
    },
    error: function (x, y) {
      alert(x.responseText);
    },
  });
}
function login(e) {
  var j = $("#login").serialize();
  $.ajax({
    url: "/login",
    data: j,
    method: "post",
    success: function (data) {
      document.location.href = "Home";
    },
    error: function (x, y) {
      alert(x.responseText);
    },
  });
}


//QueCategory Section 

// Get the modal element
const modal = document.getElementById('modal');

// Get the button that opens the modal
const openModalBtn = document.getElementById('openModalBtn');

// Get the close button
const closeBtn = document.getElementsByClassName('close')[0];

// Get the result div
const resultDiv = document.getElementById('result');
let selectedQuestions = 0;

// When the user clicks the button, open the modal
openModalBtn.onclick = function () {
  modal.style.display = 'block';
};

// When the user clicks on close button, close the modal
closeBtn.onclick = function () {
  modal.style.display = 'none';
  resetForm();
};

// When the user clicks outside the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    resetForm();
  }
};

// Handle form submission
const questionsForm = document.getElementById('questionsForm');
questionsForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Get the values of selected options for each subject
  const compilerQuestions = parseInt(
    document.querySelector('select[name="CD"]').value
  );
  const theoryQuestions = parseInt(
    document.querySelector('select[name="TOC"]').value
  );
  const dbmsQuestions = parseInt(
    document.querySelector('select[name="DBMS"]').value
  );
  const networksQuestions = parseInt(
    document.querySelector('select[name="CN"]').value
  );

  // Calculate the total number of questions
  const totalQuestions = compilerQuestions + theoryQuestions + dbmsQuestions + networksQuestions;
});

// Reset the form and result
function resetForm() {
  questionsForm.reset();
  selectedQuestions = 0;
  updateResult();
}

// Update the result count display
function updateResult() {
  resultDiv.innerText = `No. of Questions Selected: ${selectedQuestions}`;

  // Show warning message if the maximum limit is reached
  const maxLimitMessage = document.getElementById('maxLimitMessage');
  if (selectedQuestions >= 65) {
    maxLimitMessage.innerText = 'Perfect!';
    maxLimitMessage.style.display = 'block';
  } else {
    maxLimitMessage.innerText = '';
    maxLimitMessage.style.display = 'none';
  }
}

// Update the selected questions count and display the result in real-time
const questionDropdowns = document.querySelectorAll('.question-dropdown');
questionDropdowns.forEach(function (dropdown) {
  dropdown.addEventListener('change', function () {
    const selectedOptionValue = parseInt(this.value);
    const previousSelectedQuestions = selectedQuestions;
    selectedQuestions += selectedOptionValue;

    // Display a warning message if the total exceeds the maximum limit
    const totalMessage = document.getElementById('totalMessage');
    if (selectedQuestions > 65) {
      totalMessage.innerText = 'Please select only 65 questions.';
      totalMessage.style.display = 'block';
      selectedQuestions = previousSelectedQuestions; // Revert the selection if the limit is exceeded
    } else if (selectedQuestions < 65) {
      totalMessage.innerText = 'Please select atleast 65 questions.';
      totalMessage.style.display = 'block';
    } else {
      totalMessage.innerText = '';
      totalMessage.style.display = 'none';
    }

    updateResult();
  });
});


// Exam Script

// Fetch JSON data
function fatchdata() {
  $.ajax({
    url: "/data",
    method: "get",
    async: false,
    success: function (d) {
      data = d;
      console.log(d[0]);
      dataHtml(0);
      document.querySelector("#total").innerHTML = data.length;
      // var l = data.length;

      // Timer
      let duration = 3 * 60 * 60;

      function updateTime() {
        let timerDisplay = document.getElementById("timer");
        let hours = Math.floor(duration / 3600)
        let minutes = Math.floor((duration % 3600) / 60);
        let seconds = duration % 60;
        timerDisplay.innerHTML = `${hours}:${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        duration--;
        if (duration < 0) {
          alert("Time Out");
          clearInterval(timerInterval);
        }
      }
      let timerInterval = setInterval(updateTime, 1000);

      // Badge Color Changing

      var l = 65;
      for (let i = 0; i < l; i++) {
        var s = `<div class="badge-item" id="badge-item">
        <span class="badge text-bg-warning" id=b-${i + 1}>${i + 1}</span>
      </div>`;
        document.querySelector("#con-Badge").innerHTML += s;
      }
    },
    error: function (x, y) {
      alert(x.responseText);
    },
  });
}

// access the properties of the objects

function dataHtml(i2) {
  var i = parseInt(i2);
  document.querySelector("#qno").innerHTML = i + 1;
  document.querySelector(".question").innerHTML = data[i].Question;
  document.querySelector(".question").setAttribute("id", data[i].Qid);
  document.querySelector("#OptionA").innerHTML = data[i].OptionA;
  document.querySelector("#OptionB").innerHTML = data[i].OptionB;
  document.querySelector("#OptionC").innerHTML = data[i].OptionC;
  document.querySelector("#OptionD").innerHTML = data[i].OptionD;
  document.querySelector("#qid").innerHTML = i;

  // Uncheck the option value
  var op = document.getElementsByClassName("form-check-input");
  for (let i of op) {
    i.checked = false;
  }

  // Showing image on the window
  const option = document.getElementById("opt");
  if (data[i].ImageName != "") {
    imgs.style.display = "block";
    str = "Images/" + data[i].ImageName + ".png";
    document.querySelector("#imgs>img").setAttribute("src", str);
    option.style.marginBottom = "0px";
  } else {
    imgs.style.display = "none";
    option.style.marginBottom = "214px";
  }
}

// Next Button
function nxtque() {
  var qid = document.querySelector(".question").getAttribute('id');
  var sel = "";
  console.log(qid);
  var opc = document.getElementsByClassName("form-check");
  for (i of opc) {
    i.style.backgroundColor = "#DAF5FF";
  }
  var op = document.getElementsByName("Options");
  for (let i of op) {
    if (i.checked == true) {
      sel = i.getAttribute('value');
      console.log(i.getAttribute('value'));
    }
  }
  $.ajax({
    url: 'submitQuestion?qid=' + qid + '&sel=' + sel
  })
  // document.location.href='submitQuestion?qid='+qid+'&sel='+sel;
  var n = document.getElementById("qid").innerHTML;
  var n2 = parseInt(n) + 1;

  // Changing badges classes
  document.querySelector("#b-" + n2 + "").classList.remove("text-bg-warning");
  document.querySelector("#b-" + n2 + "").classList.add("text-bg-success");
  dataHtml(n2);
}

// Skip Button
function skpque() {
  var qid = document.querySelector(".question").getAttribute('id');
  var sel = "";
  console.log(qid);
  var opc = document.getElementsByClassName("form-check");
  for (i of opc) {
    i.style.backgroundColor = "#DAF5FF";
  }
  var op = document.getElementsByName("Options");
  for (let i of op) {
    if (i.checked == true) {
      sel = i.getAttribute('value');
      console.log(i.getAttribute('value'));
    }
  }
  document.location.href = 'submitQuestion?qid=' + qid + '&sel=' + sel;
  var n = document.getElementById("qid").innerHTML;
  var n2 = parseInt(n) + 1;

  // Changing badges classes
  document.querySelector("#b-" + n2 + "").classList.remove("text-bg-warning");
  document.querySelector("#b-" + n2 + "").classList.add("text-bg-success");
  dataHtml(n2);
}

// Changing color of the checked option
function checkOption(e) {
  var t = e.parentElement.children;
  for (i of t) {
    i.style.backgroundColor = "#DAF5FF";
  }
  e.children[0].checked = true;
  e.style.backgroundColor = "#05BFDB";
}


(function ($) {
  "use strict";


  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.sticky-top').css('top', '0px');
    } else {
      $('.sticky-top').css('top', '-100px');
    }
  });



})(jQuery);

var rdata = {}
function SubmitPaper() {
  $.ajax({
    url: "/submitPaper",
    method: "post",
    async: false,
    success: function (d) {
      rdata = d[0];
      console.log(d[0])
    },
    error: function (x, y) {
      alert(x.responseText);
    },
  });
  ans = rdata["answers"];
  att = ans.length;
  marks = 0;
  corr = 0;
  incorr = 0;
  natt = 0;
  time = parseInt(rdata["endtime"]) - parseInt(rdata["starttime"]);
  for (i of ans) {
    if (i['sel'] == '') {
      att--;
    }
    else {
      qid = i['qid'];
      for (q of data) {
        if (q["Qid"] == qid) {
          if (parseInt(q["Correct"]) == parseInt(i["sel"])) {
            corr++;
            marks += parseInt(q["Marks"]);
          }
          else {
            incorr++;
          }
        }
      }
    }
  }
  natt = 65 - att;
  console.log(att + " " + natt + " " + marks + " " + corr + " " + incorr);
  $.ajax({
    url: "/setResultData",
    method: "post",
    data: { att: att, natt: natt, marks: marks, corr: corr, incorr: incorr, time: time },
    async: false,
    success: function () {
      document.location.href = "Result";
    },
    error: function (x, y) {
      alert(x.responseText);
    },
  });
}


function getData() {
  $.ajax({
    url: "/getResultData",
    method: "get",
    async: false,
    success: function (d) {
      rdata = d;
      console.log(rdata);
      const marks = document.getElementById('marks');
      marks.innerHTML = rdata.marks;
      const ctx = document.getElementById('myChart').getContext("2d");
      const marksObtained = rdata.marks;
      const totalMarks = 100;
      const percentage = (marksObtained / totalMarks) * 100;
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Marks Obtained", "Remaining"],
          datasets: [
            {
              label: "Percentage",
              data: [percentage, 100 - percentage],
              backgroundColor: ["rgba(239, 255, 0, 0.8)", "rgba(255, 56, 56, 0.8)"],
              borderColor: ["rgba(239, 255, 0, 1)", "rgba(106, 255, 0, 0)"],
              borderWidth: 2,
            },
          ],
        },
      });

      // Convert time from milliseconds to hours:minutes:seconds format
      function formatTime(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        let hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        let minutes = Math.floor(seconds / 60);
        seconds %= 60;

        return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
      }
      // Pad zero if the value is less than 10
      function padZero(value) {
        return value < 10 ? `0${value}` : value;
      }
      const time = document.getElementById('time');
      const timeInMilliseconds = rdata.time;
      time.textContent = formatTime(timeInMilliseconds);

      const correct = document.getElementById('correct');
      correct.innerHTML = rdata.corr;
      const incorrect = document.getElementById('inCorrect');
      incorrect.innerHTML = rdata.incorr;
      const incorrQue = rdata.incorr;
      const corrQue = rdata.corr;
      const ctx2 = document.getElementById('myChart2').getContext("2d");
      new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Correct Questions', 'In-Correct Questions'],
            datasets: [{
                label: 'Questions',
                data: [corrQue,incorrQue],
                backgroundColor: ["rgba(16, 5, 254, 0.8)", "rgba(255, 0, 244, 0.5)"],
                borderColor: ["rgba(16, 5, 254, 1)", "rgba(106, 255, 0, 0)"],
                borderWidth: 2
            }]
        },
    });


      const total = 65;
      const attempted = document.getElementById('attempted');
      attempted.innerHTML = rdata.att;
      const attemptedQue = rdata.att;
      const ctx3 = document.getElementById('myChart3').getContext("2d");
      new Chart(ctx3, {
          type: 'pie',
          data: {
              labels: ['Attempted Questions', 'Not Attempted Questions'],
              datasets: [{
                  label: 'Questions',
                  data: [attemptedQue, 65 - attemptedQue],
                  backgroundColor: ["rgba(255, 0, 0, 0.84)", "rgba(106, 255, 0, 0.61)"],
                  borderColor: ["rgba(255, 0, 0, 1)", "rgba(106, 255, 0, 0)"],
                  borderWidth: 2
              }]
          },
      });
      const notattempted = document.getElementById('notattempted');
      notattempted.innerHTML = rdata.natt;
    },
    error: function (x, y) {
      alert(x.responseText);
    },
  });
}

function customTest(){
  // var cdata = $("#questionsForm").serializeToJSON();
  var cdata = $('#questionsForm').serializeArray();
  var Object = {};
  $.each(cdata,
      function(i, v) {
          Object[v.name] = v.value;
      });
  console.log(Object);
  document.location.href='takeexam?eid=CUSTOM&randomstring='+JSON.stringify(cdata);
}

function contactSubmit(){
  var cdata = $('#contactForm').serializeArray();
  var Object = {};
  $.each(cdata,
      function(i, v) {
          Object[v.name] = v.value;
      });
  console.log(Object);
}
