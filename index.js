var playing=false;
var score;
var action;
var timeRemaining;
var correctAnswer;
function stopCountdown(){
    clearInterval(action);
    
}
// hide an element
function hide(id){
    document.getElementById(id).style.display="none";
}
// show an element
function show(id){
    document.getElementById(id).style.display="block";
}

// generate question and its answers
function generateQA(){
          var x=Math.round(Math.random()*9)+1;
          var y=Math.round(Math.random()*9)+1;
          correctAnswer=x*y;
          document.getElementById("question").innerHTML=`${x} x ${y}`;
          // randomly filling boxes with correct answer
          var correctPosition=1+Math.round(3*Math.random());
          document.getElementById(`box${correctPosition}`).innerHTML=correctAnswer;
          // fill other boxes with wrong answer

          var answers=[correctAnswer];
          for(var i=1;i<5;i++){
              if(i!=correctPosition){
                  var wrongAnswer;
                  do{
                    wrongAnswer=(Math.round(Math.random()*9)+1)*(Math.round(Math.random()*9)+1);
                  }while(answers.indexOf(wrongAnswer)>-1);
                  document.getElementById(`box${i}`).innerHTML=wrongAnswer;
                  answers.push(wrongAnswer);
              }
          }
}
for(var i=1;i<5;i++){
    document.getElementById("box"+i).onclick=function(){
        if(playing ==true){
            if(correctAnswer==this.innerHTML){
                // correct answer
                score+=1;
                document.getElementById("scoreValue").innerHTML=score;
                // hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                      hide("correct");
                },1000);
                // generate new Q&A
                generateQA();
            }
            else{
                // wrong answer
                show("wrong")
                hide("correct");
                setTimeout(function(){
                    hide("wrong");
              },1000);
            }
        }
    }
}

function startCountdown(){
    action=setInterval(function(){
            timeRemaining-=1;
            document.getElementById("timeValue").innerHTML=timeRemaining;
            if(timeRemaining==0){//Game over
                    stopCountdown();
                    /*document.getElementById("gameover").style.display="block";*/
                    show("gameover");
                    
                    document.getElementById("gameover").innerHTML=`<p>Game Over!</p><p>Your Score is ${score}`;
                   /* document.getElementById("time").style.display="none";*/
                    hide("time");
                    document.getElementById("box1").innerHTML=" ";
                    document.getElementById("box2").innerHTML=" ";
                    document.getElementById("box3").innerHTML=" ";
                    document.getElementById("box4").innerHTML=" ";
                    document.getElementById("startreset").innerHTML="Start Game;"
                    playing=false;
            }   
    },1000);
}

document.getElementById("startreset").onclick=function(){
     if(playing==true){
            location.reload();//reloading the page
     }
     else{
            playing=true;
            score=0;
            document.getElementById("scoreValue").innerHTML=score;
           /* document.getElementById("time").style.display="block";*/
           show("time");
            timeRemaining=60;
            document.getElementById("timeValue").innerHTML="60";
            hide("gameover")
            document.getElementById("startreset").innerHTML="Reset Game";
            startCountdown();
            
            // generate a new Q&A
            generateQA();
       
     }
}
