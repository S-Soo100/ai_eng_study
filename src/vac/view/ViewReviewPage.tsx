"use client";
import React from "react";
import styled from "@emotion/styled";
import QuestionDisplay from "./(quiz)/QuestionDisplay";
import OptionDisplay from "./(quiz)/OptionDisplay";
import FeedbackDisplay from "./(quiz)/FeedbackDisplay";
import { Question } from "@/type/Question";
import Loader from "./Loader";
import { useParams, useRouter } from "next/navigation";
import ChoiceModal from "./(quiz)/ChoiceModal";

const QuestionContainer = styled.div`
  // background-color: rgba(0, 0, 0, 0.02);
  display: flex;
  // flex-direction: row;
  justify-content: center;
  max-width: 1400px;
  min-height: 100vh;

  margin-left: auto;
  margin-right: auto;
`;

const MainContent = styled.div`
  flex-grow: 1;
  // width: 70vw;
  padding: 24px;
  background-color: #ffffff;
`;

const ResetButton = styled.button`
  padding: 8px 20px 8px 20px;
  margin: 8px;
  color: #63519f;
  font-weight: bold;
  border-radius: 30px;
  background-color: #ecdafc;
`;

type Props = {
  isLoading: boolean;
  isSelected: boolean;
  selectedAnswer: number;
  selectedContent: string;
  isCorrect: boolean | null;
  question: Question | null;
  choiceAnswer: (content: string, index: number) => void;
  recommendedQuestions: Question[] | null;
  // resetChoice: () => void;
  isModalOpen: boolean;
  handleYes: () => void;
  closeModal: () => void;
};

export default function ViewReviewPage({
  isLoading,
  isSelected,
  selectedAnswer,
  selectedContent,
  isCorrect,
  question,
  choiceAnswer,
  recommendedQuestions,
  isModalOpen,
  handleYes,
  closeModal,
}: Props) {
  const params: { type: string } = useParams();
  const router = useRouter();

  const getAnswerOptions = (data: string) => {
    return data.split("\n");
  };

  const getKeywords = (data: string) => {
    return data.split("|");
  };

  const onRecommendedClick = (id: number) => {
    //! 여기에 추천된 문제로 이동하는 페이지 이동 추가
    router.push(`/recommend/${params!.type}/${id}`);
  };

  const goToNextQuiz = () => {
    switch (params!.type) {
      case "1":
        router.push("/quiz/2");
        return;
      case "2":
        router.push("/quiz/3");
        return;
      case "3":
        router.push("/quiz/4");
        return;
      case "4":
        router.push("/result");
        return;
      default:
        router.push("/result");
        return;
    }
  };

  //데이터가 없을 때
  if (question === null || question === undefined || !question.options) {
    return (
      <>
        <SkeletonComponent />
      </>
    );
  }
  return (
    <>
      <div id="main_quiz">
        {/* <FloatAnswer
          style={{
            color: isCorrect ? "chartreuse" : "red",
          }}
        >
          {isSelected ? (isCorrect ? "정답" : "오답") : ""}
        </FloatAnswer> */}
        <QuestionContainer>
          <MainContent>
            <button
              onClick={() => {
                router.back();
              }}
              className="my-4 p-2 bg-gray-800 text-white flex max-w-[100px] justify-center text-center rounded-xl"
            >
              {"뒤로가기"}
            </button>
            <QuestionDisplay
              question={question.question}
              article={question.article}
            />
            <OptionDisplay
              options={getAnswerOptions(question.options)}
              selectedChoice={selectedAnswer ?? 6}
              isSelected={isSelected}
              handleClick={choiceAnswer}
              handleNextQuestion={goToNextQuiz}
            />
            <FeedbackDisplay
              answer={question.answer}
              isCorrect={isCorrect}
              explanation={question.solution}
              keywords={getKeywords(question.keyWords)}
            />
            {/* <ResetButton onClick={resetChoice}>reset</ResetButton> */}
          </MainContent>
          {/* <RecommendationSidebar
            isRecommended={isSelected}
            recommendations={recommendedQuestions ?? []}
            onClick={(number) => {
              onRecommendedClick(number);
            }}
          /> */}
        </QuestionContainer>
      </div>
      <ChoiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={selectedContent}
        index={selectedAnswer}
        handleYes={handleYes}
        handleCancel={closeModal}
      ></ChoiceModal>
      {isLoading ? <Loader loading={isLoading} size="60" /> : <div></div>}
    </>
  );
}

//! 로딩중일 때 표기
const SkeletonComponent = () => {
  return (
    <>
      <div id="loading skeletons">
        {/* <FloatAnswer
          style={{
            color: "chartreuse",
          }}
        >
          {"정답"}
        </FloatAnswer> */}
        <QuestionContainer>
          <MainContent>
            <div className=""></div>
            <QuestionDisplay
              question={"loading..."}
              article={"loading...\n\n\n\n\n\n\n\n\n\n\n"}
            />
            <div id="loading_choiceDisplay">
              <OptionDisplay
                options={[
                  "loading...",
                  "loading...",
                  "loading...",
                  "loading...",
                  "loading...",
                ]}
                isSelected={false}
                selectedChoice={6}
                handleClick={() => {}}
                handleNextQuestion={() => {}}
              />
            </div>
          </MainContent>
          {/* <RecommendationSidebar
            isRecommended={false}
            recommendations={[]}
            onClick={(number) => {
              alert(number + "onclick");
            }}
          /> */}
        </QuestionContainer>
      </div>
      <Loader loading={true} size="60" />
    </>
  );
};
