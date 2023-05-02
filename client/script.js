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
    })

    // JSON Fetching Error

    .catch((error) => {
      console.log("Error fetching data:", error);
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
<<<<<<< HEAD
  var qid = document.querySelector(".question").getAttribute('id');
  var sel;
  console.log(qid);
=======
  var Qid = document.querySelector(".question").getAttribute("id");
  console.log(Qid);
>>>>>>> 36f98e1d328d7be672f81cd90adf90d28ef9e0ec
  var opc = document.getElementsByClassName("form-check");
  for (i of opc) {
    i.style.backgroundColor = "#DAF5FF";
  }
  var op = document.getElementsByName("Options");
  for (let i of op) {
    if (i.checked == true) {
<<<<<<< HEAD
      sel = i.getAttribute('value');
      console.log(i.getAttribute('value'));
=======
      console.log(i.getAttribute("value"));
>>>>>>> 36f98e1d328d7be672f81cd90adf90d28ef9e0ec
    }
  }
  document.location.href='submitQuestion?qid='+qid+'&sel='+sel;
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

  // Testimonials carousel
   // Smooth scroll to testimonial section when clicking on "Read More" button in hero section
document.querySelector('.hero-section button').addEventListener('click', function() {
  document.querySelector('.testimonial-section').scrollIntoView({ behavior: 'smooth' });
});

    
})(jQuery);

// FAQ Section

const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
  const title = faq.querySelector('.faq-title');
  const content = faq.querySelector('.faq-content');

  title.addEventListener('click', () => {
    faq.classList.toggle('active');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

const form = document.querySelector('#new-question-form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const title = form.querySelector('input').value;
  const content = form.querySelector('textarea').value;

  const faq = document.createElement('div');
  faq.className = 'faq';

  const faqTitle = document.createElement('h2');
  faqTitle.className = 'faq-title';
  faqTitle.innerText = title;

  const faqContent = document.createElement('p');
  faqContent.className = 'faq-content';
  faqContent.innerText = content;

  faq.appendChild(faqTitle);
  faq.appendChild(faqContent);

  form.parentNode.insertBefore(faq, form);

  form.querySelector('input').value = '';
  form.querySelector('textarea').value = '';
});
