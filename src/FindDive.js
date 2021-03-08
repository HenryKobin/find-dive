import React, {useEffect, useState} from "react";
import { usePosition } from 'use-position';
import {
      setCurrentLocationString,
      getCurrentLocationString,
      setCurrentLocationJSON,
      getCurrentLocationJSON,
      setDiveSites,
      getDiveSites,
      setFocusedSite,
      getFocusedSite,
      setDiveSiteVis,
      getSiteDetailVis
} from './DiverReducer'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { List, Image, Grid, Card, Header, Icon, Input, Button, Modal, Menu, Sidebar, Segment, Form } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';
import LeafMap from './LeafMap'
import WaveSVG from './assets/wave.svg'
import ScubaSVG from './assets/Scuba.svg'
import LobsterSVG from './assets/Lobster.svg'

const axios = require('axios')
const POSITION_API_KEY = "pk.d9b763aa8806116fcfb34720875e940e"
const MAP_TILE_URL = 'https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=2b0938cd5adc4f70b1891708f2c31b8a';

const FindDive = (props) => {
  const [locationDetailVisible, setLocationDetailVisable] = useState(false);
  const [focusedLocation, setFocusedLocation] = useState(null);
  const diveSitesList = []
  const diveDispatch = useDispatch()
  const diverLocation = useSelector(getCurrentLocationString)
  const diveLocationJSON = useSelector(getCurrentLocationJSON)
  const diveSites = useSelector(getDiveSites)
  const [diverLocationJSON, setDiverLocationJSON] = useState(null)
  const [diverLocationLoaded, setDiverLocationLoad] = useState(null)
  const [diveSitesLoaded, setDiveSitesLoaded] = useState(false)

  const onLocationTextChange = (e) => {
    if(e.target.value.length >= 3)
    setDiverLocationLoad(false)
    diveDispatch(setCurrentLocationString(e.target.value))

  }

  function viewSite(site){
    setTimeout(function(){
      diveDispatch(setFocusedSite(site));
      diveDispatch(setDiveSiteVis(true));
    }, 500);
  }


  const onFormSubmit = (e) => {
          const url = `https://henrykobin.pythonanywhere.com/find-location/${diverLocation}`
          axios.get(url)
              .then(function(response) {
                  setDiverLocationJSON([response.data['location'][0]['lat'], response.data['location'][0]['lon']])
                  diveDispatch(setCurrentLocationJSON(response.data['location'][0]))
                  const url = `https://henrykobin.pythonanywhere.com/find-sites/${response.data['location'][0]['lat']}/${response.data['location'][0]['lon']}`
                  const options = {
                      method: 'GET'
                  }
                  fetch(url, options)
                      .then(response => response.json())
                      .then(data => {
                          console.log(data)
                          diveDispatch(setDiveSites(data.sites));
                          setDiverLocationLoad(true);
                          setDiveSitesLoaded(true);

                      })
                      .catch(function(error) {
                          console.log(error);
                      })

              }).catch(function(error) {
                  if (error.response) {
                      // Request made and server responded
                      toast.error(' Please try again momentarily.', {
                          position: "top-right",
                          autoClose: 1500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                      });
                  } else if (error.request) {
                      // The request was made but no response was received
                      console.log(error.request);
                  } else {
                      // Something happened in setting up the request that triggered an Error
                      console.log('Error', error.message);
                  }

              });

  }

  return(
    <>
    <LeafMap
    diverLocationJSON={diverLocationJSON}
    diverLocation={diverLocation}
    diverLocationLoaded={diverLocationLoaded}
    diveSites={diveSites}
    url={MAP_TILE_URL}/>

    <Menu vertical fixed={'right'} id={'searchMenu'}>

    <Header as='h2' icon textAlign='center'>
      <Image href=" "  src={WaveSVG} style={{color:"#82aa9f"}} />
      FindDive
    </Header>

    <Menu.Item>
      <Form onSubmit={onFormSubmit}>
      <Form.Group>
      <Input
      id = 'myLocation'
      label={{ icon: 'map marker alternate' }}
      labelPosition='left corner'
      size='small'
      placeholder='city, state'
      onChange={onLocationTextChange}
      />
      <Form.Button content='Go' />
      </Form.Group>
      </Form>
      </Menu.Item>
    {
      diverLocationLoaded ?
      <>
      <Menu.Item header>{diveSites.length} Dive sites within 25 miles of {diverLocation}.</Menu.Item>
      <Menu.Item id='diveSiteList'>
      <Card.Group>
        {diveSites.length > 0 ? diveSites.map((site) => (
        <Card color={'brown'} onClick={() => viewSite(site)}>
          <Card.Content>
            <Image
              floated='right'
              size='tiny'
              src={ScubaSVG}
            />
            <Card.Header>{site.name}</Card.Header>
            <Card.Meta>{site.distance} miles away</Card.Meta>
            <Card.Description>
            <a target="_blank"
             href={`https://www.google.com/search?q=${site.name}+near+${diverLocation}+dive+site`}>Find on Google</a>
            </Card.Description>
          </Card.Content>
        </Card>
      )) :<Image src={ScubaSVG}/>}

      <Header as='h5' color='grey'>
      Dive site data provided by <a target="_blank" href="http://divesites.com">DiveSites.com API </a>.
      </Header>
    </Card.Group>
    </Menu.Item>
    </>
      : <Menu.Item >
<br/><br/>
      <Image src={LobsterSVG}/>

      <Header as='h5' color='grey'>
      Dive site data provided by <a target="_blank" href="http://divesites.com">DiveSites.com API </a>.
      </Header>

      </Menu.Item>

    }
    </Menu>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    {/* Same as */}
    <ToastContainer />
  </>
)


}
export default FindDive;
