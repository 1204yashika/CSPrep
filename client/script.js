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

var data = {}
    // Exam Script
    
    // Fetch JSON data
    fetch("data")
    // fetch("GATE15P1.json")
      .then(response => response.json())
      .then(d => { data = d;
      dataHtml(0)})
      .catch(error => {
        console.log('Error fetching data:', error);
      });
    // access the properties of the first object
<<<<<<< HEAD
   // for (let i = 0; i < data.length; i++) {
    //    questions.push(data[i]);
     // }
    
    const firstQuestion = data[9];
    document.querySelector("#question").innerHTML = firstQuestion.Question;
    document.querySelector("#OptionA").innerHTML = firstQuestion.OptionA;
    document.querySelector("#OptionB").innerHTML = firstQuestion.OptionB;
    document.querySelector("#OptionC").innerHTML = firstQuestion.OptionC;
    document.querySelector("#OptionD").innerHTML = firstQuestion.OptionD;
    if(firstQuestion.ImageName!=""){
=======
    
  function dataHtml(i2){
    var i = parseInt(i2);
    document.querySelector("#qno").innerHTML = i+1;
    document.querySelector("#question").innerHTML = data[i].Question;
    document.querySelector("#OptionA").innerHTML = data[i].OptionA;
    document.querySelector("#OptionB").innerHTML = data[i].OptionB;
    document.querySelector("#OptionC").innerHTML = data[i].OptionC;
    document.querySelector("#OptionD").innerHTML = data[i].OptionD;
    document.querySelector("#qid").innerHTML = i;
    if(data[i].ImageName!=""){
>>>>>>> b70b116a487904e51e517d04340d32253ae034ea
        imgs.style.display = "block";
        str = "Images/"+data[i].ImageName+".png";
        document.querySelector("#imgs>img").setAttribute("src",str);
    }
<<<<<<< HEAD
  })
  
  .catch(error => {
    console.error('Error fetching data:', error);
  });


function qshtml(qid) {
  const firstQuestion = data[qid];
  document.querySelector("#question").innerHTML = firstQuestion.Question;
  document.querySelector("#OptionA").innerHTML = firstQuestion.OptionA;
  document.querySelector("#OptionB").innerHTML = firstQuestion.OptionB;
  document.querySelector("#OptionC").innerHTML = firstQuestion.OptionC;
  document.querySelector("#OptionD").innerHTML = firstQuestion.OptionD;
  if(firstQuestion.ImageName!=""){
      imgs.style.display = "block";
      str = "Images/"+firstQuestion.ImageName+".png";
      document.querySelector("#imgs>img").setAttribute("src",str);
  }
  else{
    imgs.style.display = "none";
  }  
}


    
=======
    else{
      imgs.style.display = "none";
    }
  }
  function nxtque() {
    var n = document.getElementById("qid").innerHTML;
    dataHtml(parseInt(n)+1);
  }
>>>>>>> b70b116a487904e51e517d04340d32253ae034ea
