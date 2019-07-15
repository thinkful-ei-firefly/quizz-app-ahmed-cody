'use strict';
// ------- store data
const STORE = {
  currQ: 0,
  questions: [
    {
      question: 'What is 1 + 1?',
      currectA: 2,
      answers: [22, 42, 2, 29]
    },
    {
      question: 'What is 2 x 2?',
      currectA: 3,
      answers: [1, 44, 78, 4]
    },
    {
      question: 'What is the square root of 36?',
      currectA: 0,
      answers: [6, 3, 20, 9]
    },
    {
      question: 'Jimmy has 5 bananas and gives Tommy 10 bananas, how many bananas does Jimmy have?',
      currectA: 3,
      answers: [5, -3, 10, -5]
    },
    {
      question: 'Let the interval (a , +infinity) be the range of function f. The range of f(x) - 4 is given by...',
      currectA: 0,
      answers: ['the interval (a - 4 , +infinity)', 'the interval (a + 4, +infinity) ',
        'the interval (a, +infinity)', 'None of the above ']
    },
  ],
  score: 0,
};
// ------- handle quiz
const startQuiz = () => {
  STORE.score = 0;
  STORE.currQ = 0;
  handleDisplayStart();
};

const nextQuestion = () => {
  if (STORE.currQ === STORE.questions.length) {
    handleDisplayFinish();
  } else {
    handleDisplayQuestion(STORE.questions[STORE.currQ]);
  }
};

const handleFeedBack = (ans) => {
  // console.log(STORE.questions[STORE.currQ].currectA);
  if (parseInt(ans) === STORE.questions[STORE.currQ].currectA) {
    STORE.score++;
    // console.log('CORRECT');
    handleDisplayFeedback(true);
  } else {
    // console.log('FALSE');
    handleDisplayFeedback(false);
  }
};

// ------- event handlers
const handleClickStart = () => {
  $('main').on('click', '.js-start-btn', () => {
    // console.log('click');
    nextQuestion();
  });
};

const handleClickRadioDiv = () => {
  $('main').on('click', '.quiz-box div', (e) => {
    $(e.currentTarget.childNodes[1]).prop('checked', true);
  });
};

const handleClickSubmitQuestion = () => {
  $('main').on('submit', (e) => {
    e.preventDefault();
    // console.log($('input[name=answer]:checked', '.quiz-box').val());
    const ans = $('input[name=answer]:checked', '.quiz-box').val();
    handleFeedBack(ans);
  });
};

const handleClickNext = () => {
  $('main').on('click', '.js-next-btn', () => {
    STORE.currQ++;
    nextQuestion();

  });
};

const handleClickRestart = () => {
  $('main').on('click', '.js-restart-btn', () => {
    startQuiz();
  });
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
        <input type="radio" name="answer" value="${index}" id="answer${index}" required>
        <label for="answer${index}">${q.answers[index]}</label>
      </div>`;
  }
  questionHtml += '<button type="submit" class="submit-button js-submit">Submit</button></form>';

  $('main').html(questionHtml);
  $('.js-question-number').text(`${STORE.currQ + 1}/${STORE.questions.length}`);

};

const handleDisplayFeedback = (ansBool) => {
  const correctAIndex = STORE.questions[STORE.currQ].currectA;
  const correctA = STORE.questions[STORE.currQ].answers[correctAIndex];

  $('main').html(`<section class="js-feedback container generic-box correct-bg">
    <p>${ansBool ? 'Your answer is correct' : 'You\'re wrong, the correct answer is ' + correctA}</p>
  <button class='js-next-btn'>Next</button>
  </section > `);

  if(!ansBool){
    $('section').toggleClass('incorrect-bg');
  }

  // console.log(STORE.score);
  $('.js-score').text(`${STORE.score} `);
};

const handleDisplayFinish = () => {
  $('main').html(`<section class="js-finish container generic-box">
  <p>You got ${STORE.score} questions out of ${STORE.questions.length}!</p>
  <button class='js-restart-btn'>Restart</button>
    </section > `);
};


// ------- main function and run
const main = () => {
  startQuiz();
  handleClickStart();
  handleClickRadioDiv();
  handleClickSubmitQuestion();
  handleClickNext();
  handleClickRestart();
};

$(main());
