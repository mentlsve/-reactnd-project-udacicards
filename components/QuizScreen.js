import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AppStatusBar from './AppStatusBar';
import DefaultButton from './DefaultButton'
import styled from 'styled-components/native'
import { DefaultScreenContainer, BottomButtonContainer} from './DefaultScreenContainer'
import { setLocalNotification, clearLocalNotification} from '../util'

const ANSWER_YES = 'Yes'
const ANSWER_NO = 'No'

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

const TextButton = styled.Text`
   color: blue
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
        let newCorrectAnswersCount = this.state.correctAnswersCount
        let newWrongAnswersCount = this.state.wrongAnswersCount

        if (this.state.answer === answer)
            newCorrectAnswersCount = this.state.correctAnswersCount + 1
        else
            newWrongAnswersCount = this.state.wrongAnswersCount + 1

        const newQuizFinishedValue = this.state.questionIndex === this.state.questionsCount - 1

        if(newQuizFinishedValue) {
            clearLocalNotification().then(setLocalNotification)
        }

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
    }

    toggleViewAnswer = () => {
        this.setState({
            viewAnswer: !this.state.viewAnswer
        })
    }


    render() {
        console.log(this.props.navigation.state)
        const { deck } = this.props.navigation.state.params

        return (
            <DefaultScreenContainer>
                {!this.state.quizFinished && !this.state.viewAnswer &&
                    <DefaultScreenContainer>
                        <QuestionContainer>
                            <QuestionText>{this.state.question}</QuestionText>
                            <TouchableOpacity onPress={this.toggleViewAnswer}>
                                <TextButton>
                                    View Answer
                                </TextButton>
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
                    </DefaultScreenContainer>
                }
                {!this.state.quizFinished && this.state.viewAnswer &&
                    <DefaultScreenContainer>
                        <QuestionContainer>
                            <QuestionText>{this.state.answer}!</QuestionText>
                            <TouchableOpacity onPress={this.toggleViewAnswer}>
                                <TextButton>
                                    View Question
                                </TextButton>
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
                    </DefaultScreenContainer>
                }
                {this.state.quizFinished &&
                    <DefaultScreenContainer>
                        <QuestionContainer>
                            <QuestionText>
                                {this.state.correctAnswersCount} out of {this.state.wrongAnswersCount + this.state.correctAnswersCount} correct
                        </QuestionText>
                        </QuestionContainer>
                    </DefaultScreenContainer>
                }
            </DefaultScreenContainer>
        )
    }
}

export default QuizView