import axios from "axios";
// import axios from "../../axios/axiosQuiz";
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from "./actionTypes";

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(
        "https://react-quiz-4d12d-default-rtdb.europe-west1.firebasedatabase.app/quizes.json"
      );

      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Quiz №${index + 1}`,
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizById(questionId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      // const response = await axios.get(`/quizes/${quizId}.json`);
      const response = await axios.get(
        `https://react-quiz-4d12d-default-rtdb.europe-west1.firebasedatabase.app/quizes/${questionId}.json`
      );

      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizNextQuestion(activeQuestion) {
  return {
    type: QUIZ_NEXT_QUESTION,
    activeQuestion,
  };
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === "success") {
        return;
      }
    }

    const activeIssue = state.quiz[state.activeQuestion];
    const results = state.results;

    if (answerId === activeIssue.rightAnswerId) {
      if (!results[activeIssue.id]) {
        results[activeIssue.id] = "success";
      }

      dispatch(
        quizSetState({ [answerId]: "success", idLi: answerId }, results)
      );

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[activeIssue.id] = "error";
      dispatch(quizSetState({ [answerId]: "error", idLi: answerId }, results));
    }
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function deleteQuiz(quizId) {
  return async (dispatch) => {
    await axios.delete(
      `https://react-quiz-4d12d-default-rtdb.europe-west1.firebasedatabase.app/quizes/${quizId}.json`
    );
    dispatch(fetchQuizes());
  };
}
