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


    // Exam Script
    
    // Fetch JSON data
    fetch("data")
    // fetch("GATE15P1.json")
      .then(response => response.json())
      .then(data => {
    // access the properties of the first object
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
        imgs.style.display = "block";
        str = "Images/"+firstQuestion.ImageName+".png";
        document.querySelector("#imgs>img").setAttribute("src",str);
    }
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


    