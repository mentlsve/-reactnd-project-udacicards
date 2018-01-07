import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AppStatusBar from './AppStatusBar';
import DefaultButton from './DefaultButton'
import styled from 'styled-components/native'

const ANSWER_YES = 'Yes'
const ANSWER_NO = 'No'


const ScreenContainer = styled.View`
    justify-content: space-between;
    align-items: stretch;
    flex: 1;
`

const QuestionContainer = styled.View`
    margin-top: 120;
    justify-content: center;
    align-items: center
`

const ButtonContainer = styled.View`
    margin-bottom: 120;
`

const QuestionText = styled.Text`
    font-size: 30;
    font-weight: bold;
    text-align: center
`

class QuizView extends Component {

    state = {
        question: '',
        answer: '',
        questionIndex: 0,
        correctAnswersCount: 0,
        wrongAnswersCount: 0,
        quizFinished: false,
        viewAnswer: false
    }

    handleResponse = (answer) => {

        console.log(this.state)

        let newCorrectAnswersCount = this.state.correctAnswersCount
        let newWrongAnswersCount = this.state.wrongAnswersCount

        if (this.state.answer === answer)
            newCorrectAnswersCount = this.state.correctAnswersCount + 1
        else
            newWrongAnswersCount = this.state.wrongAnswersCount + 1

        const newQuizFinishedValue = this.state.questionIndex === this.state.questionsCount - 1

        this.setState({
            correctAnswersCount: newCorrectAnswersCount,
            wrongAnswersCount: newWrongAnswersCount,
            quizFinished: newQuizFinishedValue,
            questionIndex: this.state.questionIndex + 1,
            question: newQuizFinishedValue ? '' : this.state.deck.questions[this.state.questionIndex + 1].question,
            answer: newQuizFinishedValue ? '' : this.state.deck.questions[this.state.questionIndex + 1].answer
        })
    }

    componentDidMount() {
        const { deck } = this.props.navigation.state.params

        this.setState({
            deck: deck,
            questionsCount: deck.questions.length,
            questionIndex: 0,
            question: deck.questions[0].question,
            answer: deck.questions[0].answer,
        })

        console.log('componentDidMount ', this.state)
    }

    toggleViewAnswer = () => {
        this.setState({
            viewAnswer: !this.state.viewAnswer
        })

        console.log('toggleViewAnswer',this.state)
    }


    render() {
        console.log(this.props.navigation.state)
        const { deck } = this.props.navigation.state.params

        return (
            <ScreenContainer>
                <AppStatusBar />
                {!this.state.quizFinished && !this.state.viewAnswer &&
                    <ScreenContainer>
                        <QuestionContainer>
                            <QuestionText>{this.state.question}</QuestionText>
                            <TouchableOpacity onPress={this.toggleViewAnswer}>
                                <Text>
                                    View Answer
                                </Text>
                            </TouchableOpacity>
                        </QuestionContainer>
                        <ButtonContainer>
                            <DefaultButton backgroundColor='green' color='white' onPress={() => this.handleResponse(ANSWER_YES)}>
                                Correct
                    </DefaultButton>
                            <DefaultButton backgroundColor='red' color='white' onPress={() => this.handleResponse(ANSWER_NO)}>
                                Incorrect
                    </DefaultButton>
                        </ButtonContainer>
                    </ScreenContainer>
                }
                {!this.state.quizFinished && this.state.viewAnswer &&
                    <ScreenContainer>
                        <QuestionContainer>
                            <QuestionText>{this.state.answer}!</QuestionText>
                            <TouchableOpacity onPress={this.toggleViewAnswer}>
                                <Text>
                                    View Question
                                </Text>
                            </TouchableOpacity>
                        </QuestionContainer>
                        <ButtonContainer>
                            <DefaultButton backgroundColor='green' color='white' onPress={() => this.handleResponse(ANSWER_YES)}>
                                Correct
                    </DefaultButton>
                            <DefaultButton backgroundColor='red' color='white' onPress={() => this.handleResponse(ANSWER_NO)}>
                                Incorrect
                    </DefaultButton>
                        </ButtonContainer>
                    </ScreenContainer>
                }
                {this.state.quizFinished &&
                    <ScreenContainer>
                        <QuestionContainer>
                            <QuestionText>
                                {this.state.correctAnswersCount} out of {this.state.wrongAnswersCount + this.state.correctAnswersCount} correct
                        </QuestionText>
                        </QuestionContainer>
                    </ScreenContainer>
                }
            </ScreenContainer>
        )
    }
}

export default QuizView