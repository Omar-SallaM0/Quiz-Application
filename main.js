let countspan = document.querySelector(".quiz-info .count .cot")
let BulletsSpansContainer = document.querySelector(".bullets .spans");
let BulletsContainer = document.querySelector(".bullets");
let quizarea = document.querySelector(".quiz-app .quiz-area");
let quiz_headline = document.querySelector(".quiz-app .quiz-area h2");
let answersArea = document.querySelector(".answers-area")
let submitBtn = document.querySelector(".submit-button");
let resultsContainer =document.querySelector(".results")
let counter = document.querySelector(".bullets .countdown");

let currentIndex =0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions(){
    let myRequest = new XMLHttpRequest()

    myRequest.onreadystatechange = function(){

        if(this.readyState === 4 && this.status ===200){
            let QuesionswithAnswers = JSON.parse(this.responseText);
            let qCount = QuesionswithAnswers.length;

            createBullets(qCount)

            AddQuestionData(QuesionswithAnswers[currentIndex],qCount);

            countdown(5,qCount);

            submitBtn.onclick= function(){
                let theRightAns = QuesionswithAnswers[currentIndex].right_answer;
                currentIndex++;
                checkAnswer(theRightAns,qCount);
                quiz_headline.innerHTML='';
                answersArea.innerHTML='';
                AddQuestionData(QuesionswithAnswers[currentIndex],qCount);

                HandleBullets();
                
                clearInterval(countdownInterval);
                
                countdown(5,qCount);
                
                ShowResult(qCount);

            }
        }
    }
    myRequest.open("GET","html_questions.json",true);
    myRequest.send();
}
getQuestions();

function createBullets(num){
    countspan.innerHTML=num;

    for(let i=0; i<num;i++){
        let spanBullet = document.createElement("span");

        if(i===0){
            spanBullet.className='on';
        }

        BulletsSpansContainer.appendChild(spanBullet);
    }
}
function AddQuestionData(obj,cot){
    if(currentIndex < cot){
        let questionTitle = document.createElement("h2");
        questionTitle.appendChild(document.createTextNode(obj['title']));
        quiz_headline.appendChild(questionTitle);

        for (let i = 1; i <= 4; i++) {
            let mainDiv = document.createElement("div");
            mainDiv.className='answer';
            
            let radioinput =document.createElement("input");

            radioinput.name = 'question';
            radioinput.type ='radio';
            radioinput.id = `answer_${i}`;
            radioinput.dataset.answer = obj[`answer_${i}`];

            if(i===1){
                radioinput.checked=true;
            }

            let labelbtn = document.createElement("label");

            labelbtn.htmlFor=`answer_${i}`
            let labeltext =document.createTextNode(obj[`answer_${i}`]);
            labelbtn.appendChild(labeltext);

            mainDiv.appendChild(radioinput);
            mainDiv.appendChild(labelbtn);

            answersArea.appendChild(mainDiv);
        }
    }
}
function checkAnswer(rAnswer,cot){
    let answers =document.getElementsByName("question");
    let theChoosenAnswer;

    for (let i = 0; i < answers.length; i++) {
        if(answers[i].checked){
            theChoosenAnswer = answers[i].dataset.answer;  
        }      
    }
    if(rAnswer===theChoosenAnswer){
        rightAnswers++;
    }
}
function HandleBullets(){
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span,index)=>{
        if(currentIndex === index){
            span.className='on';
        }
    })
}
function ShowResult(cot){
    let TheResults;
    if (currentIndex===cot){
        quizarea.remove();
        answersArea.remove();
        submitBtn.remove();
        BulletsContainer.remove();

        if(rightAnswers > (cot/2) && rightAnswers < cot){
            TheResults=`<span class="good">Good</span>, ${rightAnswers} From ${cot}`;
        }else if(rightAnswers===cot){
            TheResults=`<span class="perfect">Perfect</span>, ${rightAnswers} From ${cot}`;
        }else{
            TheResults=`<span class="bad">Bad</span>, ${rightAnswers} From ${cot}`;
        }
        resultsContainer.innerHTML=TheResults;

        resultsContainer.style.padding = '10px';
        resultsContainer.style.marginTop = '10px';
        resultsContainer.style.backgroundColor = 'white';
    }
}
function countdown(duration,count){
    if(currentIndex<count){
        let minutes,seconds;
        countdownInterval=setInterval(function(){
            minutes=parseInt(duration/60);
            seconds = parseInt(duration%60);

            minutes = minutes<10 ? `0${minutes}` : minutes;
            seconds = seconds<10 ? `0${seconds}` : seconds;

            counter.innerHTML = `${minutes} : ${seconds}`;
            if(--duration<0){
                clearInterval(countdownInterval);
                submitBtn.click();
                
            }

        },1000)
    }
}