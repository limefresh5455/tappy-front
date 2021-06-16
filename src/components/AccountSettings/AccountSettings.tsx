import "./AccountSettings.scss";
import React from "react";
import { Button, Form } from "react-bootstrap";

interface Props {

}

export const AccountSettings: React.FC<Props> = (props) => {

  return (
    <div className="account-settings">
      <span 
      className="account-settings__header">
        Settings</span>
      <div className="account-settings__user-info">
        <div className="account-settings__user-info__title">
          <span>*username*</span>
          <span>tappy.tech/username</span>
        </div>
        <div className="account-settings__user-info__btn">
          <Button>Change username</Button>
        </div>
      </div>
      <Form 
        className="account-settings__account-form">
        <Form.Label
          className="account-settings__account-form__label"
        >Email</Form.Label>
        <Form.Control type="text" />
        <Form.Label
          className="account-settings__account-form__label"
        >Phone number</Form.Label>
        <Form.Control type="text" />
        <Button>Save changes</Button>
      </Form>
      <Form className="account-settings__password-form">
        <span>Password</span>
        <Button>Change password</Button>
      </Form>
    </div>
  )
}
