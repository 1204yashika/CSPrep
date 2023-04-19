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
    fetch("GATE15P1.json")
      .then(response => response.json())
      .then(d => { data = d;
      dataHtml(0)})
      .catch(error => {
        console.log('Error fetching data:', error);
      });
    // access the properties of the first object
    
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
        imgs.style.display = "block";
        str = "Images/"+data[i].ImageName+".png";
        document.querySelector("#imgs>img").setAttribute("src",str);
    }
    else{
      imgs.style.display = "none";
    }
  }
  function nxtque() {
    var n = document.getElementById("qid").innerHTML;
    dataHtml(parseInt(n)+1);
  }
  

  

    