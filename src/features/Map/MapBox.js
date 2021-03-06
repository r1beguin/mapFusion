import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./MapBox.css";
import {
  Box,
  Button,
  RangeInput,
  Text,
  RadioButtonGroup,
  ResponsiveContext,
} from "grommet";
import { exportComponentAsPNG } from "react-component-export-image";
import ReactLeafletSearch from "react-leaflet-search";

const MapBox = () => {
  
  const [tile, setTile] = React.useState(3);
  const [composing, setComposing] = React.useState(50);
  const [maps] = React.useState([
    {
      name: "osm",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    {
      name: "ign",
      url:
        "https://wxs.ign.fr/pratique/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIXSET=PM&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&STYLE=normal&FORMAT=image/jpeg",
    },
    {
      name: "map",
      url:
        "https://wxs.ign.fr/pratique/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS&TILEMATRIXSET=PM&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&STYLE=normal&FORMAT=image/jpeg",
    },
  ]);
  const [pair, setPair] = React.useState([2, 1]);

  const size = React.useContext(ResponsiveContext);
  const componentRef = React.useRef();


  return (
    <>
      {size === "small" && (
        <Box
          direction="row"
          margin="small"
          gap="small"
          align="center"
          style={{ height: "40%" }}
        >
          <Box>
            <Button
              onClick={() => setTile(0)}
              label="OSM"
              color={tile === 0 && "red"}
            ></Button>
            <Button
              onClick={() => setTile(1)}
              label="Vue aérienne"
              color={tile === 1 && "red"}
            ></Button>
            <Button
              onClick={() => setTile(2)}
              label="Carte IGN"
              color={tile === 2 && "red"}
            ></Button>
            <Button
              onClick={() => setTile(3)}
              label="Mix"
              color={tile === 3 && "red"}
            ></Button>
          </Box>
          <Box>
            {tile === 3 && (
              <Box margin="small" direction="row">
                <Box margin="small" align="center">
                  <Text>Carte 1 : </Text>
                  <RadioButtonGroup
                    name="radio"
                    options={[
                      { label: "OSM", value: 0 },
                      { label: "Aéro", value: 1 },
                      { label: "IGN", value: 2 },
                    ]}
                    value={pair[0]}
                    onChange={(event) => {
                      const newArr = [...pair];
                      newArr[0] = parseInt(event.target.value);
                      setPair(newArr);
                      console.log(pair);
                    }}
                  />
                </Box>
                <Box margin="small" align="center">
                  <Text>Carte 2 : </Text>
                  <RadioButtonGroup
                    name="radio"
                    options={[
                      { label: "OSM", value: 0 },
                      { label: "Aéro", value: 1 },
                      { label: "IGN", value: 2 },
                    ]}
                    value={pair[1]}
                    onChange={(event) => {
                      const newArr = [...pair];
                      newArr[1] = parseInt(event.target.value);
                      setPair(newArr);
                    }}
                  />
                </Box>
              </Box>
            )}
            {tile === 3 && (
              <Box margin="small" gap="small" align="center">
                <Text>Opacité</Text>
                <RangeInput
                  value={composing}
                  onChange={(e) => setComposing(e.target.value)}
                />
              </Box>
            )}
            <Box margin="small" width="small" gap="small">
              <Button
                onClick={() => exportComponentAsPNG(componentRef)}
                label="Exporter l'image"
              ></Button>
            </Box>
          </Box>
        </Box>
      )}
      <Box align="center" direction="row" fill>
        {size !== "small" && (
          <Box
            margin="small"
            gap="small"
            align="center"
            style={{ width: "20%" }}
          >
            <Button
              onClick={() => setTile(0)}
              label="OSM"
              color={tile === 0 && "red"}
            ></Button>
            <Button
              onClick={() => setTile(1)}
              label="Vue aérienne"
              color={tile === 1 && "red"}
            ></Button>
            <Button
              onClick={() => setTile(2)}
              label="Carte IGN"
              color={tile === 2 && "red"}
            ></Button>
            <Button
              onClick={() => setTile(3)}
              label="Mix"
              color={tile === 3 && "red"}
            ></Button>
            {tile === 3 && (
              <Box margin="small" direction="row">
                <Box margin="small" align="center">
                  <Text>Carte 1 : </Text>
                  <RadioButtonGroup
                    name="radio"
                    options={[
                      { label: "OSM", value: 0 },
                      { label: "Aéro", value: 1 },
                      { label: "IGN", value: 2 },
                    ]}
                    value={pair[0]}
                    onChange={(event) => {
                      const newArr = [...pair];
                      newArr[0] = parseInt(event.target.value);
                      setPair(newArr);
                      console.log(pair);
                    }}
                  />
                </Box>
                <Box margin="small" align="center">
                  <Text>Carte 2 : </Text>
                  <RadioButtonGroup
                    name="radio"
                    options={[
                      { label: "OSM", value: 0 },
                      { label: "Aéro", value: 1 },
                      { label: "IGN", value: 2 },
                    ]}
                    value={pair[1]}
                    onChange={(event) => {
                      const newArr = [...pair];
                      newArr[1] = parseInt(event.target.value);
                      setPair(newArr);
                    }}
                  />
                </Box>
              </Box>
            )}
            {tile === 3 && (
              <Box margin="small" gap="small" align="center">
                <Text>Opacité</Text>
                <RangeInput
                  value={composing}
                  onChange={(e) => setComposing(e.target.value)}
                />
              </Box>
            )}
            <Box margin="small" width="small" gap="small">
              <Button
                onClick={() => exportComponentAsPNG(componentRef)}
                label="Exporter l'image"
              ></Button>
            </Box>
          </Box>
        )}

        <Box fill>
          <Map
            center={[48.847, 2.343]}
            zoom={12}
            ref={componentRef}
            zoomControl={false}
            attributionControl={false}
          >
            {tile === 3 ? (
              <>
                <TileLayer
                  url={maps[pair[0]].url}
                  opacity={composing / 100}
                  zIndex={2}
                />
                <TileLayer url={maps[pair[1]].url} zIndex={1} />
              </>
            ) : (
              <TileLayer url={maps[tile].url} />
            )}
            <ReactLeafletSearch
              position="topleft"
              inputPlaceholder="Custom placeholder"
              // search={this.state.search}
              showMarker={false}
              zoom={12}
              closeResultsOnClick={true}
              openSearchOnLoad={false}
            ></ReactLeafletSearch>

            
          </Map>
        </Box>
      </Box>
    </>
  );
};

export default MapBox;
