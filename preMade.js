'use strict'
window.onload=async()=>{

let quizname=localStorage.getItem("quizname");
let questionNumber=localStorage.getItem("questionNumber");
let difficulty=localStorage.getItem("difficulty");
let category=localStorage.getItem("category");

let data=await fetch(`https://opentdb.com/api.php?amount=${questionNumber}&difficulty=${difficulty}`)
}
