import "./EditProfile.scss";
import React, { useState, useRef } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { EditSocial } from "../EditSocial/EditSocial";
import { EditContactCard } from "../EditContactCard/EditContactCard";
import { AddNewTappy } from "../AddNewTappy/AddNewTappy";
import { UploadPhoto } from "../UploadPhoto/UploadPhoto";
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
  pin_active: boolean;
  security_pin: number;
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
  state: State;
}

const proxy = process.env.REACT_APP_PROXY_DEVELOPMENT;

export const EditProfile: React.FC<Props> = (props) => {

  const [fullName, setFullName] = useState(props.state.selectedProfile ? props.state.selectedProfile.name : "");
  const [profilePhoto, setProfilePhoto] = useState(props.state.selectedProfile ? props.state.selectedProfile.photo : "");
  const [bio, setBio] = useState(props.state.selectedProfile ? props.state.selectedProfile.bio : "");
  //Edit contact card
  const [toggleEditContactCard, setToggleEditContactCard] = useState(false);
  const [toggleAddNewTappy, setToggleAddNewTappy] = useState(false);

  const [error, setError] = useState({
    active: false,
    message: ""
  })

  const [socialsState, setSocialState] = useState(props.state.socials && props.state.socials.map((social: Social, index: number) => {

    let showSocial = false;
    if (props.state.selectedProfile && props.state.selectedProfile.socials) {
      for (let i = 0; i < props.state.selectedProfile.socials.length; i++) {
        if (props.state.selectedProfile.socials[i].name === social.name) {
          showSocial = true;
        }
      }
    }

    return {
      ...social,
      showing: showSocial,
      value: ""
    }
  }));

  

  const updateSocialState = (socialName: string, value: string) => {
    let currentSocialState = JSON.parse(JSON.stringify(socialsState));
    for (let i = 0; i < currentSocialState.length; i++) {
      if (currentSocialState[i].name === socialName) {
        currentSocialState[i].value = value;
        break;
      }
    }
    setSocialState(currentSocialState);
  }

  const onToggleSocial = (socialName: string, show: boolean) => {
    let currentSocialState = JSON.parse(JSON.stringify(socialsState));

    if (currentSocialState) {
      for (let i = 0; i < currentSocialState.length; i++ ) {
        console.log(currentSocialState[i].name, socialName)
        if (currentSocialState[i].name === socialName) {
          currentSocialState[i].showing = show;
          break;
        }
      }
      setSocialState(currentSocialState);
    }
  }

  const contactCardSocials = socialsState && socialsState.map((social: Social, index: number) => {  
    if (props.state.selectedProfile && props.state.selectedProfile.socials) {
      let currentPlaceholder = "";
      
      if (props.state.selectedProfile.socials) {
        for (let i = 0; i < props.state.selectedProfile.socials.length; i++) {
          if (props.state.selectedProfile.socials[i].name === social.name) {
            currentPlaceholder = props.state.selectedProfile.socials[i].pivot.username ? props.state.selectedProfile.socials[i].pivot.username : "";
            break;
          }
        }
        
        if (social.showing) {
          return (
            <EditSocial 
              title={social.name}
              placeholder={currentPlaceholder}
              imageSrc="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              key={index}
              onHide={() => {
                onToggleSocial(social.name, false)
              }} 
              updateSocialState={updateSocialState}
              />
          );
        }
      }

    }
  })

  const updateProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (props.state.selectedProfile && accessToken) {
      const data = {
        name: fullName,
        bio: bio,
        photo: profilePhoto
      }

      const profileResponse = await axios.post(`${proxy}/api/user/${props.state.session}/profile/${props.state.selectedProfile.id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }) 
      
      if (profileResponse.data.error) {
        setError({
          active: true,
          message: profileResponse.data.error
        })
      } else {
        //Set new socials state
        //setState
      }
      console.log(profileResponse);   
    }
  }
  
  const handleSaveProfile = async () => {

    const accessToken = localStorage.getItem('accessToken');

    if (socialsState && accessToken) {

      updateProfile();

      for (let i = 0; i < socialsState.length; i++) {
        if (socialsState[i].value && props.state.selectedProfile) {
          const data = {
            username: socialsState[i].value
          }
          const response = await axios.post(`${proxy}/api/user/${props.state.session}/profile/${props.state.selectedProfile.id}/socials/${socialsState[i].id}`, data, {
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
            //Set new socials state
            //setState
        
            console.log(response.data);
          }
          
        }
      } 
    }
  }

  return (
  <div className="edit-profile-page">
    <Container>
      <Form>
        <span className="edit-profile-page-header">Profile Editor</span>
        <div className="edit-base-profile">
          <div className="edit-profile__img__wrapper">
            <img className="edit-profile__img" src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"/> 
          </div>
          <div className="photo-name-upload">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Your name</Form.Label>
              <Form.Control 
              type="email" 
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
              }}/>

              <UploadPhoto />
            </Form.Group>
          </div>
          
        </div>
        {error.active && (
          <Error error={error} />
        )}
        <Form.Group className="edit-profile-bio__wrapper" controlId="formBasicEmail">
          <Form.Label>Bio (150 characters)</Form.Label>
          <Form.Control 
            value={bio} 
            onChange={(event) => {
              setBio(event.target.value);
            }}
            as="textarea" 
            rows={3} />
        </Form.Group>
        <Form.Group className="contact-card-section">
          <Button
          className="edit-profile-edit-contact-card__btn"
          onClick={(event) => {
            event.preventDefault();
            setToggleAddNewTappy(true);
          }}
          >
            Add A New Tappy
          </Button>
        </Form.Group>
        <Form.Group className="contact-card-section" controlId="editContactCard">
          <Button 
          className="edit-profile-edit-contact-card__btn"
          onClick={(event) => {
            event.preventDefault();
            setToggleEditContactCard(true);
          }}>
          Edit Contact Card
          </Button>
          <div className="edit-contact-card__wrapper">
            <span className="enable-contact-card__btn">
              Enable Contact Card</span>
            <span>{props.state.selectedProfile && props.state.selectedProfile.contactCard.pin_active ? "Active" : "Inactive"}</span>
          </div>
        </Form.Group>
        <Form.Group>
          <span>Social Media Profiles</span>
          <div className="add-profile-prompt">
            <div className="add-profile-promp-icon">
              <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5 0.8125C9.62793 0.8125 0.8125 9.62793 0.8125 20.5C0.8125 31.3721 9.62793 40.1875 20.5 40.1875C31.3721 40.1875 40.1875 31.3721 40.1875 20.5C40.1875 9.62793 31.3721 0.8125 20.5 0.8125ZM28.9375 21.5547C28.9375 21.748 28.7793 21.9062 28.5859 21.9062H21.9062V28.5859C21.9062 28.7793 21.748 28.9375 21.5547 28.9375H19.4453C19.252 28.9375 19.0938 28.7793 19.0938 28.5859V21.9062H12.4141C12.2207 21.9062 12.0625 21.748 12.0625 21.5547V19.4453C12.0625 19.252 12.2207 19.0938 12.4141 19.0938H19.0938V12.4141C19.0938 12.2207 19.252 12.0625 19.4453 12.0625H21.5547C21.748 12.0625 21.9062 12.2207 21.9062 12.4141V19.0938H28.5859C28.7793 19.0938 28.9375 19.252 28.9375 19.4453V21.5547Z" fill="#5258EC"/>
              </svg>
            </div>
            <Form.Control 
              onChange={(event) => {
                onToggleSocial(event.target.value, true)
              }} 
              as="select" 
              className="socials-select">
              <option>click here to select the profile you'd like to add.</option>

              {
                props.state.socials && props.state.socials.map((social: Social, index: number) => {
                  return (
                    <option value={social.name}>{social.name}</option>
                  );
                })
              }

            </Form.Control>
          </div>
          <div className="edit-social-media-profiles">
              {contactCardSocials}
          </div>
        </Form.Group>

        <div className="save-profile__wrapper">
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleSaveProfile();
            }}
          >Save Profile</Button>
        </div>
      </Form>
    </Container>
    <AddNewTappy onHideModal={() => setToggleAddNewTappy(false)} showModal={toggleAddNewTappy} state={props.state} />
    <EditContactCard onHideModal={() => setToggleEditContactCard(false)} showModal={toggleEditContactCard} state={props.state} />
  </div>
  )
}