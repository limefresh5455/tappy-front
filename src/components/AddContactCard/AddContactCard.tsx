import "./AddContactCard.scss";
import React, { useState } from "react";
import {
  Form,
  Button,
  Modal
} from "react-bootstrap";
import axios from "axios";
import { ContactCardEntry } from "../ContactCardEntry/ContactCardEntry";

interface ContactCard {
  id: number;
  profile_id: number;
  first_name: string;
  last_name: string;
  company: string;
  phone_number: string;
  email: string;
  website: string;
  address: string;
  birthday: string;
  notes: string;
  pin_active: boolean;
}

interface Pivot {
  profile_id: number,
  social_id: number;
  username: string;
}

interface Social {
  id: number;
  name: string;
  pivot: Pivot;
}

interface Profile {
  id: number;
  user_id: number;
  name: string;
  bio: string;
  photo: string;
  created_at: string;
  updated_at: string;
  socials: Social[] | null;
  contactCard: ContactCard;
}

interface State {
  session: number;
  userData: {};
  selectedProfile: Profile | null;
}

interface Props {
  toggleModal: boolean;
  onHideAddContactCard: () => void;
  downloadvCard: () => void;
  state: State;
  setState: React.Dispatch<React.SetStateAction<any>>;
}


export const AddContactCard: React.FC<Props> = (props) => {
  const proxy = process.env.REACT_APP_PROXY_DEVELOPMENT;

  const profile = props.state.selectedProfile;

  const [contactCardCode, setContactCardCode] = useState("");

  const handleAddContact = async () => {
    const data = {
      security_pin: contactCardCode
    }
    if (props.state.selectedProfile){
      const response = await axios.post(`${proxy}/api/user/${props.state.selectedProfile.user_id}/profile/${props.state.selectedProfile.id}/contact/verify`, data);
      
      if (response.data.pin_verified === "true") {
        props.onHideAddContactCard();
        props.downloadvCard();

      }
    }
  }

  return (

  <Modal 
    show={props.toggleModal} 
    onHide={() => props.onHideAddContactCard()}
    className="add-contact-card-modal">
    <Modal.Header closeButton>
    </Modal.Header>
    <div className="add-contact-card__modal">
      <Form className="add-contact-card__modal__form">
        <Form.Label
        className="contact-card-secure-header">
          {props.state.selectedProfile ? props.state.selectedProfile.name : null}'s contact card is secured</Form.Label>
        <span className="contact-card-digit-prompt">enter the 4 digit password to add this contact:</span>
        <Form.Control 
          type="email" 
          value={contactCardCode}
          onChange={(event) => {
            setContactCardCode(event.target.value);
          }}/>
        <Button
          onClick={(event) => {
            event.preventDefault();
            handleAddContact();
          }}
        >Enter</Button>
      </Form>
    </div>
  </Modal>
  );
}