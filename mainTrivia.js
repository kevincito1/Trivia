const API = "https://opentdb.com/api.php?amount=10"

let Questions =[];
let correctAnswer ="";
let score = 0;
let position = 0;

function createApiUrl() {
    let difficulty = document.getElementById('difficulty').value;
    let amount = document.getElementById('amount').value;
    let type = document.getElementById('type').value;
    let category = document.getElementById('category').value;
    const API = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    fetchDataAPI(API);
}

const fetchDataAPI = async (url) => {
    try {
        const APITrivia = await fetch(url);
        const result = await APITrivia.json();
        generateQuestions(result.results)
    } catch (err) {
        console.log(err);
    }

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateQuestions(question) {
    Questions = question;
    showQuestion();  
}

function showQuestion () {
    document.getElementById('question').innerHTML = "";
    document.getElementById('question').innerHTML = document.getElementById('question').innerHTML + "<hr> Pregunta #"+ (position+1)  + "<br>"  + Questions[position].question + "<br>";            
    
        let answerArray= [];
        answerArray = Questions[position].incorrect_answers;
        answerArray.push(Questions[position].correct_answer);
        correctAnswer = Questions[position].correct_answer;
        shuffleArray(answerArray); 
        let openUl = "<ul>";
        let li = "";
        for (let i = 0; i < answerArray.length; i++) {
            li = li + "<li> <input type=\"checkbox\" class=\"answers\" onchange=\"cbChange(this)\" value=\""+ answerArray[i] +"\">"+ answerArray[i] + "</li>";          
        }
        let closeUl = "</ul>";

        let totalList = openUl + li + closeUl;
        document.getElementById('question').innerHTML = document.getElementById('question').innerHTML + totalList;
    document.getElementById('question').innerHTML = document.getElementById('question').innerHTML + "<br>" + "<input type = \"button\" value= \"Siguiente pregunta\" class=\"btn-nextQ\" onClick=\"handleCheckAnswer()\">";

}
 
function cbChange(obj) {
    let cbs = document.getElementsByClassName("answers");
    for (let i = 0; i < cbs.length; i++) {
        cbs[i].checked = false;
    }
    obj.checked = true;
}

const handleCheckAnswer = () => {
    let checked = findChecked();
    if (checked.value === correctAnswer) {
      score++;
      alert("Correcto");
    } else {
      alert("Incorrecto");
    }          
    if (Questions.length - 1 !== position) {
      position++;
      showQuestion();
    } else {
      alert(`Juego terminado. Esta es tu puntuación: ${score}`);
    }
  };

  function findChecked () {
    let cbs = document.getElementsByClassName("answers");
    for (let i = 0; i < cbs.length; i++) {
        if(cbs[i].checked === true){
            return cbs[i];
        }
    }
    alert("Selecciona una opción")
}
