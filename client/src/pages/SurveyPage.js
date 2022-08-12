import React, { useState } from "react";
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

import Auth from "../utils/auth";

const SurveyPage = () => {
  const [surveyAnswers, setSurveyAnswers] = useState({
    Q1: "",
    Q2: "",
    Q3: "",
  });
  const [survey, setSurvey] = useState([
    //questions
    {
      question: "What role do you see yourself as?",
      choices: [
        "Leader",
        "Creative Director",
        "Facilitor",
        "Coach",
        "Supporter",
      ],
    },
    {
      question: "Do you prefer...",
      choices: ["Task Roles", "Procedural", "Social"],
    },
    {
      question: "Favorite TA",
      choices: ["Ben", "Probably Ben", "Definitely Ben"],
    },
  ]);

  // create function to handle saving a survey to our database
  const handleSaveSurvey = async (e) => {
    e.preventDefault();
    console.log("Handle form submit.");

    const userProfile = Auth.getProfile();
    // grab ID/name for mutation

    const { target } = e;
    const inputName = target.name;
    const inputValue = target.value;
    console.log(inputName, inputValue);
    // add mutation for (surveyAnswers)
    // pass to graphql controller mutation to update the user with their survey data
    // then, clear input data set survey inputs to clear after they receive data
    // setSurveyAnswers("");
  };

  //can we turn these to "for each"?
  function update(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setSurveyAnswers({ ...surveyAnswers, [name]: value });
    /**
     * {
     *  "surveyInput-0" : "test",
     *  "surveyInput-1": "second",
     * }
     */
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
                  <Form as="select" size="lg">
                    <Options
                      name={questions.name}
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
