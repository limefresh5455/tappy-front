import "./AddNewTappy.scss";
import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { useAppData } from "../../hooks/useAppData";
import { Error } from "../Error/Error";

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
}

interface State {
  session: number;
  userData:{};
  selectedProfile: Profile | null;
  socials: any;
}

interface Props {
  showModal: boolean;
  onHideModal: () => void;
  state: State;
}

const proxy = process.env.REACT_APP_PROXY_DEVELOPMENT;

export const AddNewTappy: React.FC<Props> = (props) => {


  const [tappyNickname, setTappyNickname] = useState("");
  const [tappySerialNumber, setTappySerialNumber] = useState("");

  const [toggleRemoveTappy, setRemoveToggleTappy] = useState(false);
  const [tappyToBeRemoved, setTappyToBeRemoved] = useState("");

  const [error, setError] = useState({
    active: false,
    message: ""
  })

  const handleAddNewTappy = async () => {

    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken && props.state.selectedProfile) {
      const data = {
        nickname: tappyNickname,
        serial_id: tappySerialNumber,
        enabled: true
      }

      const response = await axios.post(`${proxy}/api/user/${props.state.session}/profile/${props.state.selectedProfile.id}/card`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.error) {
        console.log(response);
        setError({
          active: true,
          message: response.data.error
        })
      }
    }
  }

  const handleRemoveTappy = async () => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken && props.state.selectedProfile) {
      const response = await axios.delete(`${proxy}/api/user/${props.state.session}/profile/${props.state.selectedProfile.id}/card/${tappyToBeRemoved}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.error) {
        console.log(response);
        setError({
          active: true,
          message: response.data.error
        })
      }
    }
  }

  const tappyCards =
  props.state.selectedProfile &&
  props.state.selectedProfile.cards ? props.state.selectedProfile.cards.map((cardItem, id) => {

    if (cardItem.nickname){
      return (      
        <div className="edit-social-media-profiles">
          <div className="tappy-card-entry">
            <span>{cardItem.nickname} - #{cardItem.serial_id}</span>
            <span onClick={() => {
              setRemoveToggleTappy(!toggleRemoveTappy);
              //Set tappy to be removed to the id of the tappy card
              setTappyToBeRemoved(`${cardItem.id}`);
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 2.625C13.5 2.85706 13.3946 3.07962 13.2071 3.24372C13.0196 3.40781 12.7652 3.5 12.5 3.5H12V11.375C12 11.8391 11.7893 12.2842 11.4142 12.6124C11.0391 12.9406 10.5304 13.125 10 13.125H4C3.46957 13.125 2.96086 12.9406 2.58579 12.6124C2.21071 12.2842 2 11.8391 2 11.375V3.5H1.5C1.23478 3.5 0.98043 3.40781 0.792893 3.24372C0.605357 3.07962 0.5 2.85706 0.5 2.625V1.75C0.5 1.51794 0.605357 1.29538 0.792893 1.13128C0.98043 0.967187 1.23478 0.875 1.5 0.875H5C5 0.642936 5.10536 0.420376 5.29289 0.256282C5.48043 0.0921872 5.73478 0 6 0L8 0C8.26522 0 8.51957 0.0921872 8.70711 0.256282C8.89464 0.420376 9 0.642936 9 0.875H12.5C12.7652 0.875 13.0196 0.967187 13.2071 1.13128C13.3946 1.29538 13.5 1.51794 13.5 1.75V2.625ZM3.118 3.5L3 3.55163V11.375C3 11.6071 3.10536 11.8296 3.29289 11.9937C3.48043 12.1578 3.73478 12.25 4 12.25H10C10.2652 12.25 10.5196 12.1578 10.7071 11.9937C10.8946 11.8296 11 11.6071 11 11.375V3.55163L10.882 3.5H3.118ZM1.5 2.625V1.75H12.5V2.625H1.5Z" fill="white"/>
              </svg>
            </span>
          </div>
        </div>
      )
    }

  }) : null;

  return (
    <Modal
    show={props.showModal}
    onHide={() => props.onHideModal()}
    className="add-new-tappy__modal"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <div className="add-new-tappy-content">
        <Form className="add-new-tappy__form">
          <span className="add-new-tappy__header">Add a new Tappy</span>
          <Error error={error} />
          <Form.Group>
            <Form.Label>Tappy Nickname</Form.Label>
            <Form.Control 
            type="text"
            value={tappyNickname}
            onChange={(event) => {
              setTappyNickname(event.target.value);
            }} />
            <div className="add-new-tappy-serial-number">
              <Form.Group>
                <Form.Label>Serial number</Form.Label>
                <Form.Control 
                type="text"
                value={tappySerialNumber}
                onChange={(event) => {
                  setTappySerialNumber(event.target.value);
                }} />
              </Form.Group>
              <Button
              onClick={(event) => {
                event.preventDefault();
                handleAddNewTappy();
              }}
              >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 0.875C6.75195 0.875 0.875 6.75195 0.875 14C0.875 21.248 6.75195 27.125 14 27.125C21.248 27.125 27.125 21.248 27.125 14C27.125 6.75195 21.248 0.875 14 0.875ZM19.625 14.7031C19.625 14.832 19.5195 14.9375 19.3906 14.9375H14.9375V19.3906C14.9375 19.5195 14.832 19.625 14.7031 19.625H13.2969C13.168 19.625 13.0625 19.5195 13.0625 19.3906V14.9375H8.60938C8.48047 14.9375 8.375 14.832 8.375 14.7031V13.2969C8.375 13.168 8.48047 13.0625 8.60938 13.0625H13.0625V8.60938C13.0625 8.48047 13.168 8.375 13.2969 8.375H14.7031C14.832 8.375 14.9375 8.48047 14.9375 8.60938V13.0625H19.3906C19.5195 13.0625 19.625 13.168 19.625 13.2969V14.7031Z" fill="white"/>
              </svg>
                Add Tappy</Button>
            </div>
          </Form.Group>
        </Form>
        {props.state.selectedProfile && props.state.selectedProfile.cards && props.state.selectedProfile.cards.length > 0 && (
        <div className="your-tappys">
          <span className="your-tappys__header">Your tappy's:</span>
          {tappyCards}

          {toggleRemoveTappy ? (
            <div className="remove-tappy__wrapper">
              <span>Are you sure you want to remove this tappy?</span>
              <div className="remove-tappy-button__wrapper">
                <Button 
                className="remove-tappy-btn"
                onClick={(event) => {
                  event.preventDefault();
                  handleRemoveTappy();
                }}>Remove</Button>
                <Button 
                className="cancel-tappy-btn"
                onClick={(event) => {
                  event.preventDefault();
                  setRemoveToggleTappy(false);
                }}>Cancel</Button>
              </div>
            </div>
          ):(
            <span className="purchase-tappy text-muted text-center"><small><a href="https://tappycard.com">Want to purchase a new tappy? Click here to shop</a></small></span>
          )}
        </div>
        )}
      </div>
    </ Modal>
  );
}