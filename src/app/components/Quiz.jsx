"use client";

import { useState, useContext } from "react";
import { UserAuth } from "../context/AuthContext"; // Firebase Auth context
import { BackgroundGradient } from "../components/ui/Card";

const Quiz = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
    {
      id: 3,
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "Jane Austen"],
      correctAnswer: "Harper Lee",
    },
  ];

  const { user } = UserAuth(); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleOptionChange = (selectedOption) => {
    const questionId = quizQuestions[currentQuestionIndex].id;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    
    if (currentQuestionIndex === quizQuestions.length - 1) {
      handleSubmit();
    } else {
     
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    quizQuestions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);

    
    const res = await fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebaseUid: user?.uid, 
        email: user?.email,
        score: calculatedScore,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  if (score !== null) {
    return (
      <div className="h-[50rem] w-full dark:bg-black bg-white flex items-center justify-center">
        <h2 className="text-2xl font-bold">
          Your Score: {score}/{quizQuestions.length}
        </h2>
      </div>
    );
  }

  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <div>
          <h3 className="font-bold mb-4">
            {quizQuestions[currentQuestionIndex].question}
          </h3>
          {quizQuestions[currentQuestionIndex].options.map((option) => (
            <label key={option} className="block">
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                onChange={() => handleOptionChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>

        <button
          onClick={handleNextQuestion}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {currentQuestionIndex === quizQuestions.length - 1
            ? "Submit"
            : "Next"}
        </button>
      </BackgroundGradient>
    </div>
  );
};

export default Quiz;
