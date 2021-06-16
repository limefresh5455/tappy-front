import "./EditContactCard.scss";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ContactCardInformationField } from "../ContactCardInformationField/ContactCardInformationField";
import { AddInformationField } from "../AddInformationField/AddInformationField";
import axios from "axios";
import { Error } from "../Error/Error";

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
  security_pin: number;
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
  showing: boolean;
}

interface Card {
  id: number;
  profile_id: number;
  enabled: boolean;
  serial_id: number;
  nickname: string;
  created_at: string;
  updated_at: string;
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
  cards: Card[] | null;
  contactCard: ContactCard;
}

interface State {
  session: number;
  userData:{};
  profiles: Profile[] | null;
  socials: any;
  selectedProfile: Profile | null;
}

interface Props {
  showModal: boolean;
  onHideModal: () => void;
  state: State;
}


export const EditContactCard: React.FC<Props> = (props) => {

  //Contact Card Variables
  const [firstName, setFirstName] = useState(props.state.selectedProfile ? props.state.selectedProfile.contactCard.first_name : "");
  const [showFirstName, setShowFirstName] = useState(props.state.selectedProfile && props.state.selectedProfile.contactCard.first_name ? true : false );

  const [lastName, setLastName] = useState(props.state.selectedProfile ? props.state.selectedProfile.contactCard.last_name : "");
  const [showLastName, setShowLastName] = useState(props.state.selectedProfile && props.state.selectedProfile.contactCard.last_name ? true : false);

  const [company, setCompany] = useState(props.state.selectedProfile ? props.state.selectedProfile.contactCard.company : "");
  const [showCompany, setShowCompany] = useState(props.state.selectedProfile && props.state.selectedProfile.contactCard.company ? true : false);

  const [phoneNumber, setPhoneNumber] = useState(props.state.selectedProfile ? props.state.selectedProfile.contactCard.phone_number : "");
  const [showPhoneNumber, setShowPhoneNumber] = useState(props.state.selectedProfile && props.state.selectedProfile.contactCard.phone_number ? true : false);

  const [email, setEmail] = useState(props.state.selectedProfile ? props.state.selectedProfile.contactCard.email : "");
  const [showEmail, setShowEmail] = useState(props.state.selectedProfile && props.state.selectedProfile.contactCard.email ? true : false);

  const [website, setWebsite] = useState(props.state.selectedProfile ? props.state.selectedProfile.contactCard.website : "");
  const [showWebsite, setShowWebsite] = useState(props.state.selectedProfile && props.state.selectedProfile.contactCard.website ? true : false);

  const [address, setAddress] = useState(props.state.selectedProfile ? props.state.selectedProfile.contactCard.address : "");
  const [showAddress, setShowAddress] = useState(props.state.selectedProfile && props.state.selectedProfile.contactCard.address ? true : false);

  const [birthday, setBirthday] = useState(props.state.selectedProfile ? props.state.selectedProfile.contactCard.birthday : "");
  const [showBirthday, setShowBirthday] = useState(props.state.selectedProfile && props.state.selectedProfile.contactCard.birthday ? true : false);

  const [notes, setNotes] = useState(props.state.selectedProfile ? props.state.selectedProfile.contactCard.notes : "");
  const [showNotes, setShowNotes] = useState(props.state.selectedProfile && props.state.selectedProfile.contactCard.notes ? true : false);

  const [securityPin, setSecurityPin] = useState(props.state.selectedProfile ? props.state.selectedProfile.contactCard.security_pin : "");
  const [pinActive, setPinActive] = useState(props.state.selectedProfile ? props.state.selectedProfile.contactCard.pin_active : false);

  const [toggleInformationFieldModal, setToggleInformationFieldModal] = useState(false);

  const [error, setError] = useState({
    active: false,
    message: ""
  })

  const proxy = process.env.REACT_APP_PROXY_DEVELOPMENT;

  const handleSaveContactCard = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && props.state.selectedProfile) {
      const data = {
        first_name: firstName,
        last_name: lastName,
        company,
        phone_number: phoneNumber,
        email,
        website,
        address,
        birthday,
        notes,
        security_pin: securityPin ? securityPin : null,
        pin_active: pinActive
      }
      console.log(securityPin)
      const response = await axios.post(`${proxy}/api/user/${props.state.session}/profile/${props.state.selectedProfile.id}/contact`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.error) {
        setError({
          active: true,
          message: response.data.error
        })
      } else {
        props.onHideModal();
      }
     
    }
  }

  return (
    <Modal 
    onHide={() => props.onHideModal()}
    show={props.showModal}
    className="edit-contact-card">
      <Modal.Header closeButton>
      </Modal.Header>
      <div className="edit-contact-card-content">
        <Form className="edit-contact-card__form">
          <span>Edit your tappy contact card</span>
          {error.active && (
            <Error error={error} />
          )}
          <Button 
            className="add-information-field__btn"
            onClick={(event) => {
              event.preventDefault();
              setToggleInformationFieldModal(true);
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0.875C6.75195 0.875 0.875 6.75195 0.875 14C0.875 21.248 6.75195 27.125 14 27.125C21.248 27.125 27.125 21.248 27.125 14C27.125 6.75195 21.248 0.875 14 0.875ZM19.625 14.7031C19.625 14.832 19.5195 14.9375 19.3906 14.9375H14.9375V19.3906C14.9375 19.5195 14.832 19.625 14.7031 19.625H13.2969C13.168 19.625 13.0625 19.5195 13.0625 19.3906V14.9375H8.60938C8.48047 14.9375 8.375 14.832 8.375 14.7031V13.2969C8.375 13.168 8.48047 13.0625 8.60938 13.0625H13.0625V8.60938C13.0625 8.48047 13.168 8.375 13.2969 8.375H14.7031C14.832 8.375 14.9375 8.48047 14.9375 8.60938V13.0625H19.3906C19.5195 13.0625 19.625 13.168 19.625 13.2969V14.7031Z" fill="white"/>
            </svg>
            Add Information Field</Button>
          
          <ContactCardInformationField 
            label="First name:"
            value={firstName}
            show={showFirstName}
            onChange={setFirstName}
            onHide={() => {
              setShowFirstName(false)
              setFirstName("");
            }}
          />
          <ContactCardInformationField 
            label="Last name:"
            value={lastName}
            show={showLastName}
            onChange={setLastName}
            onHide={() => {
              setShowLastName(false)
              setLastName("");
            }}
          />
          <ContactCardInformationField 
            label="Phone number:"
            value={phoneNumber}
            show={showPhoneNumber}
            onChange={setPhoneNumber}
            onHide={() => {
              setShowPhoneNumber(false)
              setPhoneNumber("");
            }}
          />
          <ContactCardInformationField 
            label="Email:"
            value={email}
            show={showEmail}
            onChange={setEmail}
            onHide={() => {
              setShowEmail(false)
              setEmail("");
            }}
          />
          <ContactCardInformationField 
            label="Company:"
            value={company}
            show={showCompany}
            onChange={setCompany}
            onHide={() => {
              setShowCompany(false)
              setCompany("");
            }}
          />
          <ContactCardInformationField 
            label="Website:"
            value={website}
            show={showWebsite}
            onChange={setWebsite}
            onHide={() => {
              setShowWebsite(false)
              setWebsite("");
            }}
          />
          <ContactCardInformationField 
            label="Address:"
            value={address}
            show={showAddress}
            onChange={setAddress}
            onHide={() => {
              setShowAddress(false)
              setAddress("");
            }}
          />
          <ContactCardInformationField 
            label="Birthday:"
            value={birthday}
            show={showBirthday}
            onChange={setBirthday}
            onHide={() => {
              setShowBirthday(false)
              setBirthday("");
            }}
          />
          <ContactCardInformationField 
            label="Notes:"
            value={notes}
            show={showNotes}
            onChange={setNotes}
            onHide={() => {
              setShowNotes(false)
              setNotes("");
            }}
          />
          <Form.Group className="edit-contact-card-security">
            <Form.Label>Security <span className="security-optional">Optional</span></Form.Label>
            <span className="secure-contact-card">Secure your contact card with a 4-6 digit pin</span>
            <div className="optional-security-input">
              <Form.Control type="number" 
                value={securityPin}
                onInput = {(event:React.ChangeEvent<any>) =>{
                  event.target.value = Math.max(0, parseInt(event.target.value) ).toString().slice(0,3)
                }}
                onChange={(event) => {
                  setSecurityPin(event.target.value);
                }}
              />
              <div className="toggle-container">
                <span className={pinActive ? "active" : ""}>{pinActive ? "A" : "Ina"}ctive</span>
                <div className="toggle">
                  <input type="checkbox" id="toggle" className="checkbox" defaultChecked={pinActive}
                   onClick={() => {
                    setPinActive(!pinActive);
                  }} 
                  />  
                  <label htmlFor="toggle" className="switch"></label>
                </div>

              </div>
            </div>
          </Form.Group>
        </Form>
      </div>
      <div className="edit-contact-card-btn__wrapper">
        <Button
        onClick={(event) => {
          event.preventDefault();
          handleSaveContactCard();
        }}
        >Save contact card</Button>
        <Button>Cancel</Button>
      </div>
    <AddInformationField
      showModal={toggleInformationFieldModal}
      onHideModal={() => {
        setToggleInformationFieldModal(false)
      }}
      toggleFirstName={() => {
        setShowFirstName(true)
        setToggleInformationFieldModal(false)
      }}
      toggleLastName={() => {
        setShowLastName(true)
        setToggleInformationFieldModal(false)
      }}
      toggleCompany={() => {
        setShowCompany(true)
        setToggleInformationFieldModal(false)
      }}
      togglePhoneNumber={() => {
        setShowPhoneNumber(true)
        setToggleInformationFieldModal(false)
      }}
      toggleEmail={() => {
        setShowEmail(true)
        setToggleInformationFieldModal(false)
      }}
      toggleWebsite={() => {
        setShowWebsite(true)
        setToggleInformationFieldModal(false)
      }}
      toggleAddress={() => {
        setShowAddress(true)
        setToggleInformationFieldModal(false)
      }}
      toggleBirthday={() => {
        setShowBirthday(true)
        setToggleInformationFieldModal(false)
      }}
      toggleNotes={() => {
        setShowNotes(true)
        setToggleInformationFieldModal(false)
      }}
    />
    </Modal>
  );
}
