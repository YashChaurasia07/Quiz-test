const startbtn = document.querySelector(".startbtn button");
const infobox = document.querySelector(".infobox");
const exitbtn = infobox.querySelector(".quit");
const continuebtn = infobox.querySelector(".restart");
const quizbox = document.querySelector(".quizbox");
const optionlist = document.querySelector(".optionlist");
const timecount = quizbox.querySelector(".timer .timersec");
const timeline = quizbox.querySelector("header .timeline");
const timeoff = quizbox.querySelector("header .timetext");



// if start button clicked
startbtn.onclick = () => {
    infobox.classList.add("activeinfo");
}

// if end button clicked
exitbtn.onclick = () => {
    infobox.classList.remove("activeinfo");
}

// if continue button clicked
continuebtn.onclick = () => {
    infobox.classList.remove("activeinfo");
    quizbox.classList.add("activequiz");
    showquestions(0);
    quecounter(1);
    starttimer(15);
    starttimerline(0);

}

let quecount = 0;
let quenumb = 1;
let counter;
let counterline;
let timevalue = 15;
let widthvalue = 0;
let userscore = 0;

const nextbtn = quizbox.querySelector(".nextbtn");
const resultbox = document.querySelector(".resultbox");
const restartquiz = resultbox.querySelector(".buttons .restart");
const quitquiz = resultbox.querySelector(".buttons .quit");

restartquiz.onclick = () => {
    quizbox.classList.add("activequiz");
    resultbox.classList.remove("activeresult");
    let quecount = 0;
    let quenumb = 1;
    let timevalue = 15;
    let widthvalue = 0;
    let userscore = 0;
    showquestions(quecount);
        quecounter(quenumb);
        clearInterval(counter);
        starttimer(timevalue);
        clearInterval(counterline);
        starttimerline(widthvalue);
        nextbtn.style.display = "none";
        timeoff.textContent = "Time Left";
    
}
quitquiz.onclick = () => {
    window.location.reload();
}


nextbtn.onclick = () => {
    if (quecount < questions.length - 1) {
        quecount++;
        quenumb++;
        showquestions(quecount);
        quecounter(quenumb);
        clearInterval(counter);
        starttimer(timevalue);
        clearInterval(counterline);
        starttimerline(widthvalue);
        nextbtn.style.display = "none";
        timeoff.textContent = "Time Left";
    } else {
        clearInterval(counter);
        clearInterval(counterline);
        console.log("questions completed");
        showresultbox();
    }
}

function showresultbox() {
    infobox.classList.remove("activeinfo");
    quizbox.classList.remove("activequiz"); 
    resultbox.classList.add("activeresult");
    const scoretext = resultbox.querySelector(".scoretext");
    if (userscore > 3) {
        let scoretag = '<span>and Congratulations,You got only <p>' + userscore + '</p> out of<p>5</p></span>';
        scoretext.innerHTML = scoretag;
    } else if (userscore > 1) {
        let scoretag = '<span>and nice,You got only <p>' + userscore + '</p> out of<p>5</p></span>';
        scoretext.innerHTML = scoretag;
    } else {
        let scoretag = '<span>and sorry,You got only <p>' + userscore + '</p> out of<p>5</p></span>';
        scoretext.innerHTML = scoretag;
    }
}

// getting quetions from array 
function showquestions(index) {
    const quetext = document.querySelector(".quetext");
    let quetag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let optiontag = '<div class="option">' + questions[index].options[0] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[1] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[2] + '<span></span></div>' +
        '<div class="option">' + questions[index].options[3] + '<span></span></div>'
    quetext.innerHTML = quetag;
    optionlist.innerHTML = optiontag;
    const option = optionlist.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickicon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossicon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterline);

    let userans = answer.textContent;
    let correctans = questions[quecount].answer;
    let alloptions = optionlist.children.length;
    
    if (userans == correctans) {
        userscore += 1;
        answer.classList.add("correct");
        console.log("correct");
        answer.insertAdjacentHTML("beforeend", tickicon);
    } else {
        answer.classList.add("incorrect");
        console.log("nhi hai");
        answer.insertAdjacentHTML("beforeend", crossicon);
        // if ans is in correct then automatically selected the correct ans 
        for (let i = 0; i < alloptions; i++) {
            if (optionlist.children[i].textContent == correctans) {
                optionlist.children[i].setAttribute("class", "option correct");
                optionlist.children[i].insertAdjacentHTML("beforeend", tickicon);
            }
        }
    }
    // once user selected disabled all options 
    for (let i = 0; i < alloptions; i++) {
        optionlist.children[i].classList.add("disabled");
    }
    nextbtn.style.display = "block";
}

function starttimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timecount.textContent = time;
        time--;
        if (time < 9) {
            let addzero = timecount.textContent;
            timecount.textContent = "0" + addzero;
        }
        if (time < 0) {
            clearInterval(counter);
            timecount.textContent = "00";
            timeoff.textContent = "Time Off";   
            let correctans = questions[quecount].answer;
            let alloptions = optionlist.children.length;

            for (let i = 0; i < alloptions; i++) {
                if (optionlist.children[i].textContent == correctans) {
                    optionlist.children[i].setAttribute("class", "option correct");
                    optionlist.children[i].insertAdjacentHTML("beforeend", tickicon);
                }
            }
            for (let i = 0; i < alloptions; i++) {
                optionlist.children[i].classList.add("disabled");
            }
            nextbtn.style.display = "block";
        }
    }
}

function starttimerline(time) {
    counterline = setInterval(timer, 29);

    function timer() {
        time += 1;
        timeline.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterline);
            // timecount.textContent = "00";

        }
    }
}


function quecounter(index) {
    const bottomquecount = quizbox.querySelector(".totalque");
    let totalquecounttag = '<span><p>' + index + '</p>of<p>5</p>questions</span>';
    bottomquecount.innerHTML = totalquecounttag;
}