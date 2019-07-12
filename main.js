'use strict';
// ------- store data
const STORE = {
  currQ: 0,
  questions: [
    {
      question: 'What is 1 + 1',
      currectA: 2,
      answers: [22, 42, 2, 29]
    },
    {
      question: 'What is 2 x 2',
      currectA: 4,
      answers: [1, 44, 78, 4]
    },
  ],
  score: 0,
};
// ------- handle quiz
const startQuiz = () => {
  handleDisplayStart();
};

const nextQuestion = () => {
  handleDisplayQuestion(STORE.questions[STORE.currQ]);
};

const handleFeedBack = () => {

  handleDisplayFeedback();
};

// ------- display handlers 
const handleDisplayStart = () => {
  $('main').html(`<section class="container generic-box">
  <p>Welcome to the math quiz</p>
    <p> Please press start begin</p>
    <button class="js-start-btn">Start</button>
</section >`);
  $('.js-question-number').text(`${STORE.currQ}/${STORE.questions.length}`);
  $('.js-score').text(`${STORE.score}`);
};

const handleDisplayQuestion = (q) => {
  let questionHtml = `<form class="container quiz-box">
      <h2 id="question">${q.question}</h2>`;

  for (const index in q.answers) {
    //console.log(typeof index, index);
    questionHtml += `<div>
        <input type="radio" name="answer" value="answer${index}" id="answer${index}">
        <label for="answer${index}">${q.answers[index]}</label>
      </div>`;
  }
  questionHtml += '<button type="submit" class="submit-button js-submit">Submit</button></form>';

  $('main').html(questionHtml);

  STORE.currQ++;
};

const handleDisplayFeedback = () => {

};

const handleDisplayFinish = () => {

};

// ------- event handlers
const handleClickStart = () => {
  $('main').on('click', '.js-start-btn' , () => {
    console.log('click');
    nextQuestion();
  });
};

const handleClickSubmitQuestion = () => {
  $('main').on('submit', (e) => {
    e.preventDefault();
    console.log(e.target);
    handleFeedBack();
  });
};

const handleClickNext = () => {

};

const handleClickRestart = () => {

};

// ------- main function and run
const main = () => {
  startQuiz();
  handleClickStart();
  handleClickSubmitQuestion();

};

$(main());
