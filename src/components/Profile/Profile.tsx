import "./Profile.scss";
import React, { SetStateAction, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {
  Container, Form, Button
} from "react-bootstrap";
import { ProfileSocial } from "../ProfileSocial/ProfileSocial";
import { AddContactCard } from "../AddContactCard/AddContactCard";
import axios from "axios";

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
  security_pin_exists: boolean;
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
  pin_active: boolean;
  contactCard: ContactCard;
}

interface State {
  session: number;
  userData: {};
  selectedProfile: Profile | null;
}


interface Props {
  state: State;
  setState: React.Dispatch<React.SetStateAction<any>>;
}


export const Profile: React.FC<Props> = (props) => {
  const params: any = useParams();

  useEffect(() => {
    if (params.username != "profile" && props.state.session > -1){
      loadUserProfile();
    }
  }, [params.username])
  
  const proxy = process.env.REACT_APP_PROXY_DEVELOPMENT;


  const loadUserProfile = async () => {
    try {
      const response = await axios.get(`${proxy}/api/profile/${params.username}`);
      
      const profileId = response.data.id;
      const userId = response.data.user_id;

      const profileSocials = await axios.get(`${proxy}/api/user/${userId}/profile/${profileId}/socials`);
      const profile = {...response.data};
      profile.socials = profileSocials.data;

       props.setState(() => ({
        ...props.state,
        selectedProfile: profile
      }))
      console.log(profile)
    } catch (error) {
      console.log(error);
    }
  }


  const [toggleAddContactCard, setToggleAddContactCard] = useState(false);

  const onHideAddContactCard = () => {
    setToggleAddContactCard(false);
  }


  const downloadvCard = async () => {
    if (props.state.selectedProfile) {
      const profileContactCard = await axios.get(`${proxy}/api/user/${props.state.selectedProfile.user_id}/profile/${props.state.selectedProfile.id}/contact`);
      const contactData = profileContactCard.data;
      let selectedProfile = {...props.state.selectedProfile};
      selectedProfile.contactCard = contactData;
  
      props.setState(() => ({
        ...props.state,
        selectedProfile: selectedProfile
      }))
      
      // Populates the data onto a vCard (VCF file)
      var vCardsJS = require('vcards-js');
      //create a new vCard
      var vCard = vCardsJS();
      console.log(contactData)
      //set properties
      vCard.firstName = contactData.first_name;
      vCard.lastName = contactData.last_name;
      vCard.organization = contactData.company;

      // Todo: attach the AWS profile photo
      vCard.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 
    'JPEG');
      vCard.workPhone = contactData.phone_number;
      vCard.birthday = new Date(contactData.birthday);
      vCard.url = contactData.website;
      vCard.note = contactData.notes;
      
      // Save the file as a VCF
      const FileSaver = require('file-saver');
      const blob = new Blob([ vCard.getFormattedString() ], {type: "text/vcard;charset=utf-8"});
      FileSaver.saveAs(blob, "contact.vcf");

    }
  }

  const handleShowContactCard = () => {
    if (props.state.selectedProfile && props.state.selectedProfile.pin_active) {
      setToggleAddContactCard(true);
    } else {
      downloadvCard();
    }
  }

  const socialItems =
  props.state.selectedProfile &&
  props.state.selectedProfile.socials ? props.state.selectedProfile.socials.map((socialItem, id) => {

    if (socialItem.name){
      return (      
        <div className="edit-social-media-profiles">
          <ProfileSocial 
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          username={socialItem.pivot.username}
          key={id}
          socialLink="google.ca"
          />
        </div>
      )
    }

  }) : null;

  return (
    <div className="edit-profile-page">
      <Container>
        <div className="edit-base-profile">
          <div className="edit-profile__img__wrapper">
            <img className="edit-profile__img" src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"/> 
          </div>
          <div className="profile-basic-info">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{props.state.selectedProfile ? props.state.selectedProfile.name : null}</Form.Label>
            
              <Button 
              className="edit-profile-upload-photo__btn"
              onClick={(event) => {
                event.preventDefault();
                handleShowContactCard();
              }}
              >Add to contacts</Button>
            </Form.Group>
          </div>
          
        </div>
        <Form.Group controlId="formBasicEmail">
          <span>{props.state.selectedProfile ? props.state.selectedProfile.bio : null}</span>
        </Form.Group>
      
      </Container>
      <div className="social-items__container">
          {socialItems}
      </div>
      <AddContactCard 
      onHideAddContactCard={onHideAddContactCard}
      downloadvCard={downloadvCard}
      toggleModal={toggleAddContactCard}
      state={props.state}
      setState={props.setState}
      />

    </div>
  );
}