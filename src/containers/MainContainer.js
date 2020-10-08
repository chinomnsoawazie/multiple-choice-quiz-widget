import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Summary from '../components/Summary';
import WelcomeScreen from '../components/WelcomeScreen';

const MainContainer = (props) => {
  return (
    <Switch>
      <Route exact path='/' render = {() => <WelcomeScreen push={props.history.push}/>} />
      <Route exact path='/question-card' render = {() => <QuestionCard push={props.history.push} />} />
      <Route exact path='/summary' render = {() => <Summary push={props.history.push}/>} />
    </Switch>
  );
};

export default withRouter(MainContainer);
