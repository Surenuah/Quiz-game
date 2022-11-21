const data = [
    {
        id: 1,
        question: "Triss or Yennefer?",
        answers: [
            {answer: "Triss", isCorrect: false},
            {answer: "Yennefer", isCorrect: false},
            {answer: "SHani", isCorrect: true},
            {answer: "Keira Metz", isCorrect: false},
        ],
    },
    {
        id: 2,
        question: "A flutter is a group of:",
        answers: [
            {answer: "bees", isCorrect: false},
            {answer: "penguins", isCorrect: false},
            {answer: "butterflies", isCorrect: true},
            {answer: "camels", isCorrect: false},
        ],
    },
];

const gameScreen = document.querySelector(".quiz__game");
const resultScreen = document.querySelector(".quiz__result");
const question = document.querySelector(".content__question");
const answersDiv = document.querySelector(".content__answers");
const submitBtn = document.querySelector(".game__submit-result");
const play = document.querySelector(".result__play-again");

let questionIndex = 0;
let correctCounter = 0;
let wrongCounter = 0;
let score = 0;
let isSelectedAnswer;

const playAgain = () => {
    questionIndex = 0;
    correctCounter = 0;
    wrongCounter = 0;
    score = 0;
    showQuestion(questionIndex);
};

play.addEventListener("click", () => {
    resultScreen.style.display = "none";
    gameScreen.style.display = "block";
    playAgain()
});

const showResult = () => {
    resultScreen.style.display = "block";
    gameScreen.style.display = "none";

    resultScreen.querySelector(".result__correct-answer").textContent = `Correct answers: ${correctCounter}`;
    resultScreen.querySelector(".result__wrong-answer").textContent = `Wrong answers: ${wrongCounter}`;
    resultScreen.querySelector(".result__score").textContent = `Your score: ${(correctCounter - wrongCounter) * 10}`;
};

const showQuestion = (questionNumber) => {
    if (questionIndex === data.length) return showResult();
    isSelectedAnswer = null;
    question.textContent = data[questionNumber].question;
    answersDiv.innerHTML = data[questionNumber].answers.map((item, index) =>
        `<div class="answer">
                    <input name="answer" type="radio" id=${index} value=${item.isCorrect}>
                    <label for=${index}>${item.answer}</label>
         </div>`
    ).join("");

    selectAnswer();
};

const selectAnswer = () => {
    answersDiv.querySelectorAll("input").forEach(element =>
        element.addEventListener("click", (e) => {
            isSelectedAnswer = e.target.value;
        }));
};

const submitAnswer = () => {
    submitBtn.addEventListener("click", () => {
        if (isSelectedAnswer !== null) {
            isSelectedAnswer === "true" ? correctCounter++ : wrongCounter++;
            questionIndex++;
            showQuestion(questionIndex);
        } else {
            alert("You did not select any answer!!!!!");
        }
    })
};

showQuestion(questionIndex);
submitAnswer();