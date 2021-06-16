import './App.scss';
import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { useAppData } from "../../hooks/useAppData";
import { Header } from "../Header/Header";
import { Default } from "../Default/Default";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { EditProfile } from "../EditProfile/EditProfile";
import { Profile } from "../Profile/Profile";
import { PasswordReset } from "../PasswordReset/PasswordReset";
import { TappyActivation } from "../TappyActivation/TappyActivation";
import { AccountSettings } from "../AccountSettings/AccountSettings";
import { NotFound } from "../NotFound/NotFound";


export const App: React.FC = () => {

  const {
    state,
    setState,
    checkUserSession,
    history,
    handleHistory,
    handleLogout
  } = useAppData();

  return (
    <div className="App">
      <Header 
      title="tappy"
      state={state}
      handleLogout={handleLogout}
      handleHistory={handleHistory}
      />
      <Route path="/" exact >
        <Default handleHistory={handleHistory} />
      </ Route>
      <Switch>
        <Route path="/login" >
          <Login
          checkUserSession={checkUserSession}
          handleHistory={handleHistory}
          />
        </ Route>
        <Route path="/register">
          <Register handleLogout={handleLogout} checkUserSession={checkUserSession} handleHistory={handleHistory} />
        </ Route>
        <Route path="/editProfile" >
          {state.session !== -1 ? <EditProfile state={state} />:<Redirect to="/login" />}
        </ Route>
        <Route path="/resetPassword" >
          <PasswordReset handleHistory={handleHistory} />
        </Route>
        <Route path="/tappyActivation">
          <TappyActivation handleHistory={handleHistory} />
        </Route>
        <Route path="/accountSettings" >
          {state.session !== -1 ? <AccountSettings /> : <Redirect to="/login" />}
        </Route>
        <Route path={["/:username", "/profile"]} >
          <Profile
          state={state}
          setState={setState}
          />
        </ Route>
        {/* 404 page - profile not found */}
        <Route path="/notFound">
          <NotFound />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
