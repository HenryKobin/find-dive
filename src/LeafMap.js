import {  MapContainer as LeafletMap, Marker, Popup, TileLayer, AttributionControl } from "react-leaflet";
import { Image, Card } from 'semantic-ui-react'
import L from 'leaflet'
import WaveSVG from './assets/wave.svg'
import ScubaDiverSVG from './assets/scuba-diving.svg'
import ScubaSVG from './assets/Scuba.svg'
import HomeSVG from './assets/home.svg'
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
 var mapBounds = []

 props.diveSites.map((site)=> (
  mapBounds.push([site.lat,site.lng])
    )
  )
  if (mapBounds.length < 1){
    mapBounds.push(props.diverLocationJSON)
  }

  return(
    <>
    {props.diverLocationLoaded && (
      <LeafletMap id="worldmap" bounds={mapBounds} zoom={10.5}>
        <TileLayer
         url= {props.url}
         attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
        <Marker position={props.diverLocationJSON} icon={homeIcon}>
        </Marker>
        {props.diveSites.map((site)=> (
          <Marker
          position={[site.lat,site.lng]}
          >
          <Popup>
          <Card.Header><strong>{site.name}</strong></Card.Header>
          <Card.Meta>{site.distance} miles away</Card.Meta>
          <Card.Description>
          <a target="_blank"
           href={`https://www.google.com/search?q=${site.name}+near+${props.diverLocation}+dive+site`}>Find on Google</a>
          </Card.Description>
          </Popup>
          </Marker>
        ))}
      <AttributionControl position="bottomleft" />
      </LeafletMap>

    )}
    {!props.diverLocationLoaded && (
      <>
      <div id="noMap">
          <Image src={ScubaSVG} id="waveSVG"/>
      </div>

      </>
    )}

  </>
  )
  }

export default LeafMap
