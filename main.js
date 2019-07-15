'use strict';
// ------- store data
const STORE = {
  currQ: 0,
  questions: [
    {
      question: 'What is 1 + 1',
      currectA: 'answer2',
      answers: [22, 42, 2, 29]
    },
    {
      question: 'What is 2 x 2',
      currectA: 'answer3',
      answers: [1, 44, 78, 4]
    },
  ],
  score: 0,
};
// ------- handle quiz
const startQuiz = () => {
  STORE.score = 0;
  STORE.currQ = 0 ;
  handleDisplayStart();
};

const nextQuestion = () => {
  if ( STORE.currQ === STORE.questions.length) {
    handleDisplayFinish();
  } else {handleDisplayQuestion(STORE.questions[STORE.currQ]);
}
  
};



const handleFeedBack = (ans) => {
  // console.log(STORE.questions[STORE.currQ].currectA);
  if (ans === STORE.questions[STORE.currQ].currectA) {
    STORE.score++;
    handleDisplayFeedback(true);
    
  } else { handleDisplayFeedback(false)};
  
  

};

// ------- display handlers 
const handleDisplayStart = () => {
  $('main').html(`<section class="container generic-box">
  <p>Welcome to the math quiz</p>
    <p> Please press start begin</p>
    <button class="js-start-btn">Start</button>
</section >`);
  $('.js-question-number').text(`${STORE.currQ }/${STORE.questions.length}`);
  $('.js-score').text(`${STORE.score}`);
};

const handleDisplayQuestion = (q) => {
  let questionHtml = `<form class="container quiz-box">
      <h2 id="question">${q.question}</h2>`;

  for (const index in q.answers) {
    //console.log(typeof index, index);
    questionHtml += `<div>
        <input type="radio" name="answer" value="answer${index}" id="answer${index}" required>
        <label for="answer${index}">${q.answers[index]}</label>
      </div>`;
  }
  questionHtml += '<button type="submit" class="submit-button js-submit">Submit</button></form>';

  $('main').html(questionHtml);
  $('.js-question-number').text(`${STORE.currQ +1 }/${STORE.questions.length}`);
 
};

const handleDisplayFeedback = (ansBool) => {
  // console.log()
  $('main').html(`<section class=" js-feedback container generic-box ">
    <p>${ ansBool ? 'Your answer is correct' : 'You\'re wrong' } </p>
    <button class= 'js-nextbtn'>Next</button>
  </section>`)

  // console.log(STORE.score);
  $('.js-score').text(`${STORE.score}`);
};

const handleDisplayFinish = () => {
  $('main').html(`<section class=" js-finish container generic-box ">
      <p>${STORE.score} / ${STORE.questions.length } </p>

      <button class= 'js-restart-btn'>Restart</button>
    </section>`)
};

// ------- event handlers
const handleClickStart = () => {
  $('main').on('click', '.js-start-btn', () => {
    // console.log('click');
    nextQuestion();
  });
};

const handleClickSubmitQuestion = () => {
  $('main').on('submit', (e) => {
    e.preventDefault();
    //console.log($(e.target.answer));
    //console.log($('input[name="answer":checked').val());
    console.log($('input[name=answer]:checked', '.quiz-box').val());
    const ans = $('input[name=answer]:checked', '.quiz-box').val()
    handleFeedBack(ans);
  });
};

const handleClickNext = () => {
  $('main').on('click', '.js-nextbtn', () => {
    
    STORE.currQ++;
    nextQuestion();
    
  })
};



const handleClickRestart = () => {
  $('main').on('click', '.js-restart-btn', () => {

    startQuiz();

  })
};

// ------- main function and run
const main = () => {
  startQuiz();
  handleClickStart();
  handleClickSubmitQuestion();
  handleClickNext();
  handleClickRestart();
};

$(main());
