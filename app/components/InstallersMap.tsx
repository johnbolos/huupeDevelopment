import GoogleMap from 'google-maps-react-markers';
import {useRef, useState, useEffect} from 'react';
import {getDistance} from 'geolib';

import {installers} from '~/data/installers';
import {stateCoordinates} from '~/data/stateCoordinates';

import MarkerIcon from './MarkerIcon';

export default function InstallersMap({
  state,
  selectedMarker,
  setSelectedMarker,
  setInstallers,
}: {
  state?: keyof typeof stateCoordinates | null;
  selectedMarker: number | undefined;
  setSelectedMarker: (arg1: number | undefined) => void;
  setInstallers: (arg1: Installer[]) => void;
}) {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  const onGoogleApiLoaded = ({map, maps}) => {
    mapRef.current = map;
    setMapReady(true);
  };

  const onMarkerClick = (markerId: number, lat: number, lng: number) => {
    // set the seleced marker
    setSelectedMarker(markerId);
    // set map based on marker location
    mapRef?.current?.setCenter({lat, lng});
    mapRef?.current?.setZoom(8);
    // get the map bounds and create an array with all markers inside and put the selected marker first in hte array
    const bounds = mapRef?.current?.getBounds();
    const installerList: Installer[] = [];
    installers.forEach((installer) => {
      if (bounds.contains({lat: installer.lat, lng: installer.lng})) {
        if (installer.id === markerId) {
          installerList.unshift(installer);
        } else {
          installerList.push(installer);
        }
      }

      // sort array by markers installers clostest to the selected marker
      installerList.sort((a, b) => {
        if (
          getDistance(
            {latitude: lat, longitude: lng},
            {latitude: a.lat, longitude: a.lng},
          ) >
          getDistance(
            {latitude: lat, longitude: lng},
            {latitude: b.lat, longitude: b.lng},
          )
        ) {
          return 1;
        } else if (
          getDistance(
            {latitude: lat, longitude: lng},
            {latitude: a.lat, longitude: a.lng},
          ) <
          getDistance(
            {latitude: lat, longitude: lng},
            {latitude: b.lat, longitude: b.lng},
          )
        ) {
          return -1;
        } else {
          return 0;
        }
      });

      // reduce the array to only installers with a unique name
      const uniqueInstallers = [
        ...new Map(installerList.map((m) => [m.name, m])).values(),
      ];

      setInstallers(uniqueInstallers);
    });
  };

  const defaultProps = {
    center: {
      lat: 39.8097343,
      lng: -98.5556199,
    },
    zoom: 4.25,
  };

  const mapOptions = {
    mapTypeControl: true,
    fullscreenControl: false,
    maxZoom: 20,
    minZoom: 3,
    rotateControl: false,
    scaleControl: false,
    streetViewControl: false,
    mapTypeId: 'roadmap',
    zoomControl: true,
  };

  useEffect(() => {
    if (state) {
      // clear map of marker
      setSelectedMarker(undefined);
      // get the location by zipcode
      const {lat, lng}: LatLng = stateCoordinates[state];
      //set the map based on the location
      mapRef?.current?.setCenter({lat, lng});
      mapRef?.current?.setZoom(8);
      // get the map bounds and create an array of markers inside the bounds
      const bounds = mapRef?.current?.getBounds();
      const installerList: Installer[] = [];
      installers.forEach((installer) => {
        if (bounds.contains({lat: installer.lat, lng: installer.lng})) {
          if ((installer.state as keyof typeof stateCoordinates) === state) {
            installerList.unshift(installer);
          } else {
            installerList.push(installer);
          }
        }

        // remove duplicate installers by name
        const uniqueInstallers: Installer[] = [];

        installerList.forEach((installer) => {
          if (
            !uniqueInstallers.find((unique) => unique.name === installer.name)
          ) {
            uniqueInstallers.push(installer);
          }
        });

        // sort array by installers closer to the state
        uniqueInstallers.sort((a, b) => {
          if (
            getDistance(
              {latitude: lat, longitude: lng},
              {latitude: a.lat, longitude: a.lng},
            ) >
            getDistance(
              {latitude: lat, longitude: lng},
              {latitude: b.lat, longitude: b.lng},
            )
          ) {
            return 1;
          } else if (
            getDistance(
              {latitude: lat, longitude: lng},
              {latitude: a.lat, longitude: a.lng},
            ) <
            getDistance(
              {latitude: lat, longitude: lng},
              {latitude: b.lat, longitude: b.lng},
            )
          ) {
            return -1;
          } else {
            return 0;
          }
        });
        // set marker by first value in state
        if (uniqueInstallers.length > 0) {
          setSelectedMarker(uniqueInstallers[0].id);
        }
        setInstallers(uniqueInstallers);
      });
    }
  }, [setInstallers, setSelectedMarker, state]);

  return (
    <div className="h-[75vh] lg:h-[85vh] w-full">
      {/* {mapReady && ( */}
      <GoogleMap
        apiKey=""
        defaultCenter={{
          lat: defaultProps.center.lat,
          lng: defaultProps.center.lng,
        }}
        libraries={['places']}
        defaultZoom={defaultProps.zoom}
        options={mapOptions}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
      >
        {installers.map((installer, index) => (
          <div
            key={installer.id}
            lat={installer.lat}
            lng={installer.lng}
            className="[&:has(div)]:w-full"
          >
            <div className="absolute bottom-0 w-full">
              <div
                className="flex flex-col justify-end items-center relative -left-1/2"
                onClick={() =>
                  onMarkerClick(installer.id, installer.lat, installer.lng)
                }
              >
                {index === selectedMarker && (
                  <p className="bg-orange-500 text-white py-4 px-6 rounded-[10px] !mb-0.5 z-[10000]">
                    {installer.name}
                  </p>
                )}
                <MarkerIcon
                  fill={index === selectedMarker ? '#F16500' : '#000000'}
                />
              </div>
            </div>
          </div>
        ))}
      </GoogleMap>
      {/* )} */}
    </div>
  );
}
