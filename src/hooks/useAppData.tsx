import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";



export function useAppData() {


  const [state, setState] = useState({
    userData: {},
    session: -1,
    selectedProfile: null,
    profiles: [],
    socials: []
  });
  
  const proxy = process.env.REACT_APP_PROXY_DEVELOPMENT;

  const history = useHistory();

  useEffect(() => {
    checkUserSession();
  }, [])

  useEffect(() => {
    getSessionData();
  }, [state.session])

  const handleHistory = (url: string) => {
    history.push(url);
  }

  const checkUserSession = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const response = await axios.get(`${proxy}/api/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.data) {
          setState(() => ({
            ...state,
            userData: response.data,
            session: response.data.id
          }))
          // handleHistory('/profile');
        } else {
          handleHistory('/login');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function getSessionData() {
    if (state.session > -1){
    //Use axios to get session data
      try {
        const response = await axios.get(`${proxy}/api/user/${state.session}/profile`);
        const socialsResponse = await axios.get(`${proxy}/api/socials`);

        const userProfiles = response.data.profiles;

        for (let i=0; i < userProfiles.length; i++){
          const userProfile = userProfiles[i];
          const profileSocials = await axios.get(`${proxy}/api/user/${state.session}/profile/${userProfile.id}/socials`);
          const profileCards = await axios.get(`${proxy}/api/user/${state.session}/profile/${userProfile.id}/card`);
          const profileContactCard = await axios.get(`${proxy}/api/user/${state.session}/profile/${userProfile.id}/contact`);

          userProfiles[i].socials = profileSocials.data;
          userProfiles[i].cards = profileCards.data.cards;
          userProfiles[i].contactCard = profileContactCard.data;
        }


        if (response.data.profiles.length){
          setState((prevState) => ({
            ...prevState,
            selectedProfile: userProfiles[0],
            profiles: response.data.profiles,
            socials: socialsResponse.data
          }))
        }

      } catch (error) {
        console.log(error);
      }
    }

  }
  
  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const response = await axios.get(`${proxy}/api/user/logout`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        handleHistory("/login");
        setState((prevState) => ({
          ...prevState,
          userData: {},
          session: -1
        }))
        
      } catch (error) {
        console.log(error);
      }
    }
  }


  return {
    state,
    setState,
    checkUserSession,
    handleLogout,
    history,
    handleHistory,
    getSessionData
  };
}

