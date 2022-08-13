import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import Options from "../components/Options";
import { SAVE_SURVEY } from "../utils/mutations";
import Auth from "../utils/auth";
import { ROLES, VALUES, IDENTITIES } from "../utils/surveyChoices"

const SurveyPage = () => {
  const [saveSurvey, { error }] = useMutation(SAVE_SURVEY);
  const [surveyAnswers, setSurveyAnswers] = useState({
    q1: "Leader",
    q2: "Fun",
    q3: "N/A",
  });

  const [survey, setSurvey] = useState([
    //questions
    {
      question: "What role do you like to play?",
      choices: ROLES,
    },
    {
      question: "What do you value in a team member?",
      choices: VALUES,
    },
    {
      question: "Do you have any social identities that you'd like to be matched by?",
      choices: IDENTITIES,
    },
  ]);

  //Kick back user if not logged in
  useEffect(() => {
    const isLoggedIn = Auth.loggedIn()

    if (!isLoggedIn) {
      window.location.assign('/');
    }
  })

  // create function to handle saving a survey to our database
  const handleSaveSurvey = async (e) => {
    e.preventDefault();
    console.log("Handle form submit.");

    const userId = Auth.getUserId();
    const { q1, q2, q3 } = surveyAnswers

    try {
      const mutationResponse = await saveSurvey({
        variables: { user: userId, q1: q1, q2: q2, q3: q3 }
      });

      alert("Your answers were successfully saved")

      window.location.assign("/home")
    } catch (err) {
      //TODO: what do I do when error
    }
  };

  function update(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setSurveyAnswers({ ...surveyAnswers, [name]: value });
  }
  return (
    <Jumbotron fluid className="text-light bg-dark">
      <Container>
        <h1>Fill Out Your Match Survey!</h1>
        <Form onSubmit={handleSaveSurvey}>
          {survey.map((questions, index) => {
            return (
              <Form.Row>
                <h5>{questions.question}</h5>
                <br />
                <Col xs={12} md={8}>
                  <Form as="select" size="lg" name={`q${index+1}`} onChange={update}>
                    <Options
                      key={questions.key}
                      value={questions.value}
                      input={questions.input}
                      choices={questions.choices}
                    ></Options>
                  </Form>
                </Col>
              </Form.Row>
            );
          })}
          <Form.Row>
            <Button type="submit" variant="success" size="lg">
              Submit
            </Button>
          </Form.Row>
        </Form>
      </Container>
    </Jumbotron>
  );
};

export default SurveyPage;
