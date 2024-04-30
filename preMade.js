'use strict'


let quizname = localStorage.getItem("quizname");

let questionNumber = localStorage.getItem
    ("questionNumber");
let difficulty = localStorage.getItem("difficulty");
let category = localStorage.getItem("category");
let categorynumber;

if (category == "General Knowledge") {
    categorynumber = 9
} else if (category == "Books") {
    categorynumber = 10
} else if (category == "Movies") {
    categorynumber = 11
} else if (category == "Music") {
    categorynumber = 12
} else if (category == "Art") {
    categorynumber = 25
} else if (category == "Sports") {
    categorynumber = 21
} else if (category == "Geography") {
    categorynumber = 22
} else if (category == "Celebrities") {
    categorynumber = 26
} else if (category == "Vehicles") {
    categorynumber = 28
} else if (category == "Animals") {
    categorynumber = 27
}


// async function getData(){
// let data=await fetch(`https://opentdb.com/api.php?amount=${questionNumber}&category=${categorynumber}&difficulty=${difficulty}`);
// console.log(data)
// return await data.json()
// }

// getData().then(data=>{
//     console.log(data.results);
// });

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//quizname

let div = document.getElementById('container')
let h2=document.createElement('h2');
h2.textContent=quizname;

div.appendChild(h2);

async function getData() {
    let data = await fetch('object.json');
    return await data.json()
}


getData().then(questions => {


    for (let question of questions) {
        //questions
        let fieldset = document.createElement('fieldset');
        div.appendChild(fieldset);

        let legend = document.createElement('legend');
        legend.innerHTML = question.question;
    
        fieldset.appendChild(legend);

        //answers
        let arrayOfLabels = []
        //false answers
        for (let answer of question.incorrect_answers) {
            let labelIncorrectAnswer = document.createElement('label');
            labelIncorrectAnswer.innerHTML = `<input type="radio" name='answers'>${answer}`
            arrayOfLabels.push(labelIncorrectAnswer)
        }

        //correct answers
        let labelCorrectAnswer = document.createElement('label');
        labelCorrectAnswer.innerHTML = `<input type="radio" name='answers'>${question.correct_answer}`
        labelCorrectAnswer.classList = 'correct'
        arrayOfLabels.push(labelCorrectAnswer)

        shuffleArray(arrayOfLabels) //randomly ordered - to avoid correct answer always being last !!https://chat.openai.com/c/142f9656-8aba-45ce-ac73-4c154934c1c7 

        for (let label of arrayOfLabels) {
            fieldset.appendChild(label)
        }


        //delete-question button
        let deleteButton = document.createElement('img')
        deleteButton.src = 'images/trash.svg'
        deleteButton.classList = 'delete'
        fieldset.appendChild(deleteButton)

       


    }})

    //add-question button
     let addButton = document.createElement('button');
     addButton.id='addButton';
     addButton.textContent='Add a question'
     //addButton.src = 'images/add-button.svg';
     document.body.appendChild(addButton)
 

// remove a question
document.addEventListener('click', function (e) {
    e.preventDefault;
    if (e.target.classList.contains('delete')) {
     
        if (confirm('Are you sure you want to delete this question')) {
            let toDelete = e.target.parentElement;
            toDelete.remove()
        }
    //add a question
    } else if (e.target.id=='addButton') {
        let answersNumber=prompt('How many different answers has your question?')
        let fieldset = document.createElement('fieldset');
        div.appendChild(fieldset);
        fieldset

        let legend = document.createElement('legend');
        legend.classList='legend'
        legend.textContent='Type question here'
        fieldset.appendChild(legend);

        for(let i =1;i<=answersNumber;i++){
            let label = document.createElement('label');
            label.innerHTML = `<input type="radio" name='answers'>Type answers here`;
            fieldset.appendChild(label)
        }
        
    } 
})

//question edit - https://chat.openai.com/c/ce0f0ac7-8933-4e4c-836e-cba2f99ec34a

document.addEventListener('dblclick',function(e){
    e.preventDefault;
    if(e.target.classList.contains('legend')){
        e.target.innerHTML='<input type="text">'
    
    }
})

    





