import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setFocusedSite,
        getFocusedSite,
        setDiveSiteVis,
        getSiteDetailVis
 } from './DiverReducer'
import {  MapContainer as LeafletMap, Marker, Popup, TileLayer, AttributionControl } from "react-leaflet";
import { Form, Button, Comment, Rating, Statistic, Header, Image, Card, Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'
import L from 'leaflet'
import WaveSVG from './assets/wave.svg'
import ScubaDiverSVG from './assets/scuba-diving.svg'
import ScubaSVG from './assets/Scuba.svg'
import HomeSVG from './assets/home.svg'
import DiveFlagIcon from './assets/dive-flag-icon.png'
import DiverAvatar from './assets/diver-avatar.png'
const homeIcon = L.icon({
    iconUrl: HomeSVG,
    iconSize: [64,64],
    iconAnchor: [32, 64],
    popupAnchor: [-22, -64],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
    });

const LeafMap = (props) => {
const [rating, setRating] = useState(0);
  const diveDispatch = useDispatch()
  const focusedSite = useSelector(getFocusedSite)
  const site = useSelector(getFocusedSite);
  const locationDetailVisible = useSelector(getSiteDetailVis)

  var mapBounds = [];

  function viewSite(site){
    diveDispatch(setFocusedSite(site));
    diveDispatch(setDiveSiteVis(true));
  }

  props.diveSites.map((site) => mapBounds.push([site.lat, site.lng]));
  if (mapBounds.length < 1) {
    mapBounds.push(props.diverLocationJSON);
  }

  return (
    <>
      {props.diverLocationLoaded && (
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            onHide={() => diveDispatch(setDiveSiteVis(false))}
            vertical
            visible={locationDetailVisible}
            width="very wide"
          >
            <Menu.Item>
              <Image centered src={DiveFlagIcon} />
              <Header
                as="h1"
                content={site ? site.name : null}
                subheader={site ? `${site.distance} miles away` : null}
              />
              <Rating maxRating={5} defaultRating={0} icon="star" />
            </Menu.Item>
            <Menu.Item>
              <Statistic.Group widths="3" size="tiny">
                <Statistic>
                  <Statistic.Value>0</Statistic.Value>
                  <Statistic.Label>Faves</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>0</Statistic.Value>
                  <Statistic.Label>Dives</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>0</Statistic.Value>
                  <Statistic.Label>Views</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Menu.Item>
            <Menu.Item>
              <Header as="h3" dividing>
                Recent Reviews
              </Header>
              <Comment.Group size="large" id="locationComments"></Comment.Group>
            </Menu.Item>
            <Menu.Item>
              <Form reply>
                <Header as="h3" dividing>
                  Leave a Review
                </Header>
                <Form.TextArea disabled/>
                <Button
                  content="Add Review"
                  labelPosition="left"
                  icon="edit"
                  primary
                />
              </Form>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={locationDetailVisible}>
            <LeafletMap id="worldmap" bounds={mapBounds} zoom={10.5}>
              <TileLayer
                url={props.url}
                attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={props.diverLocationJSON}
                icon={homeIcon}
              ></Marker>
              {props.diveSites.map((site) => (
                <Marker
                  position={[site.lat, site.lng]}
                  eventHandlers={{
                    click: (e) => {viewSite(site)},
                  }}
                >
                  <Popup >
                    <Card.Header>
                      <strong>{site.name}</strong>
                    </Card.Header>
                    <Card.Meta>{site.distance} miles away</Card.Meta>
                    <Card.Description>
                      <a
                        target="_blank"
                        href={`https://www.google.com/search?q=${site.name}+near+${props.diverLocation}+dive+site`}
                      >
                        Find on Google
                      </a>
                    </Card.Description>
                  </Popup>
                </Marker>
              ))}
              <AttributionControl position="bottomleft" />
            </LeafletMap>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      )}
      {!props.diverLocationLoaded && (
        <>
          <div id="noMap">
            <Image src={ScubaSVG} id="waveSVG" />
          </div>
        </>
      )}
    </>
  );
};

export default LeafMap;
