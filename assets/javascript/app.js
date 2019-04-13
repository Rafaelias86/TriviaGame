$(document).ready(function(){
    
    var questionsBox;
    var questionsBox = [
        {
            question: "What Batman villain said this phrase? “Some men just want to watch the world burn.”",
            choice: ["Bane","Two-face","Joker","Scarecrow"],
            answer: 2,
            photo : "assets/images/q1r.gif"
        },
        {
            question: "Who plays the role of the Joker and who plays Batman in the Dark Knight?",
            choice: ["Heath Ledger and Adam West","Michael Keaton and Jack Nicholson","Heath Ledger and Christian Bale","Steve Carell and Johnny Depp"],
            answer: 2,
            photo : "assets/images/q2r.gif"
        },
        {
            question: "Who is considered the White Knight and who is the Dark Knight?",
            choice: ["Harvey Dent and Batman","Commissioner Gordon and Rachel Dawes","The Joker and Harvey Dent","Batman and the Joker"],
            answer: 0,
            photo : "assets/images/q3r.gif"
        },
        {
            question: "The Joker has scars on both sides of his face. How did he get them?",
            choice: ["He was bored and cut his mouth to see what it would feel like.","His father gave them to him","A murderer in his neighborhood did it to him.","His teacher did it"],
            answer: 1,
            photo : "assets/images/q4r.gif"
        },
        {
            question: "Who is Bruce Wayne’s butler?",
            choice: ["Jeeves","Francis","Giles","Alfred"],
            answer: 3,
            photo : "assets/images/q5r.gif"
        },
        {
            question: "Complete the Joker quote: 'Why so ____?'",
            choice: ["...glum","...serious","...sane","...stupid"],
            answer: 1,
            photo : "assets/images/q6r.gif"
        },
        {
            question: "What is The Dark Knight trilogy's Batmobile called?",
            choice: ["Tumbler","Roller","Toppler","Spinner"],
            answer: 0,
            photo : "assets/images/q7r.gif"
        },
        {
            question: "What is Harvey Dent’s job?",
            choice: ["Mayor","City Councilman","Alderman","District Attorney"],
            answer: 3,
            photo : "assets/images/q8r.gif"
        }];

var rightCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 15;
var intervalId;
var userGuess ="";
var running = false;
var qCount = questionsBox.length;
var pick;
var index;
var newArray = [];
var holder = [];

$("#reset").hide();
$("#main").hide();


$(document).on('click', "#start", function(){
                $("#start").hide();
                $("#main").show();
                 displayQuestion();
                 runTimer();
                 for(var i =0; i < questionsBox.length; i++){
        holder.push(questionsBox[i]);
                 }
})

// Timer start
function runTimer(){
       if (!running){
        intervalId = setInterval(decrement, 1000);
        running = true;
       }
}
// Timer countdown
function decrement() {
    $("#timeLeft").html("<h3>Time remaining: " + timer + "</h3>");
    timer--;

       // Stop timer when reach 0
       if(timer === 0){
           unanswerCount++;
           stop();
           $("#answerblock").html("<p id = 'unanswered'> Time is up! The correct answer is: " +  pick.choice[pick.answer] + "</p>");
           hidepicture();
       }
}

// Timer Stop
function stop(){
    running = false;
    clearInterval(intervalId);
}

//randomly pick question in array 
// show question and answers
function displayQuestion(){
    index = Math.floor(Math.random() * questionsBox.length);
    pick =questionsBox[index];


            $("#questionblock").html("<h2>"+ pick.question + "</h2>");
            for( var i = 0; i < pick.choice.length; i++){
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
               // assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
}

    $(".answerchoice").on("click", function(){
         // grab array position from userGuess
         userGuess = parseInt($(this).attr("data-guessvalue"));

         // correct guess or wrong guess outcomes
         if (userGuess === pick.answer){
             stop();
             rightCount++;
             userGuess= "";
             $("#answerblock").html("<p id = 'correct'> Correct! <p>");
             hidepicture();
            
         }else{
             stop();
             wrongCount++;
             userGuess="";
             $("#answerblock").html("<p id = 'wrong'> Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
             hidepicture();
         }
})
}

function hidepicture () {
    $("#answerblock").append("<img src=" + pick.photo + ">")
    newArray.push(pick);
    questionsBox.splice(index, 1);
    
    var hidpic = setTimeout(function(){
        $("#answerblock").empty();
        timer = 15;
// run the score screen if all question answered
    if((wrongCount + rightCount + unanswerCount) === qCount){
            $("#questionblock").empty();
            $("#questionblock").html("<h3> Game Over ! Let's see how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + rightCount + "</h4>");
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
            $("#reset").show();
            rightCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
    }else{
        runTimer();
        displayQuestion();
    
    }
    },5000);
}

$("#reset").on("click", function(){
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for ( var i = 0; i < holder.length; i ++){
            questionsBox.push(holder[i]);
        }
        runTimer();
        displayQuestion();
})

})