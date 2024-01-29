import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import axios from 'axios';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { ASSETS, COLOR, windowWidth } from '../../assets';
import Box from '../../components/atoms/Box';
import SectionText from '../../components/atoms/SectionText';
import { selectLastLocation, setLocation } from '../../redux/lastLocSlice';
import { getCurrentLocation, locationPermission } from '../../utils/handlers';
import { selectSetting } from '../../redux/settingSlice';
import CircleButton from '../../components/atoms/CircleButton';
import Geocoder from 'react-native-geocoding';

const { width, height } = Dimensions.get('window');

const Map = ({ route, navigation }) => {
  const aspectRatio = width / height;
  const latitudeDelta = 0.015;
  const longitudeDelta = latitudeDelta * aspectRatio;
  const lastLoc = useSelector(selectLastLocation);
  const [setting] = useSelector(selectSetting);
  const dispatch = useDispatch();

  const mapRef = useRef();
  const markerRef = useRef();

  const initialRegion = {
    latitude: lastLoc?.lat,
    longitude: lastLoc?.long,
    latitudeDelta,
    longitudeDelta,
  };

  // Live Coordinates
  const [curCords, setCurCords] = useState({ latitude: 0, longitude: 0 });
  const [visible, setVisible] = useState(true);
  const [state, setState] = useState({
    currentLoc: initialRegion,
    shippingLoc: {
      latitude: 0,
      longitude: 0,
      latitudeDelta,
      longitudeDelta,
    },
    coordinate: new AnimatedRegion(initialRegion),
    heading: 0,
    distance: 0,
    time: 0,
  });

  const { currentLoc, shippingLoc, coordinate, distance, time, heading } = state;
  const updateState = data => setState(state => ({ ...state, ...data }));

  // Live Location of Driver
  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const { latitude, longitude, heading } = await getCurrentLocation();
      try {
        animate(latitude, longitude);
        setCurCords({ latitude, longitude });
        updateState({
          heading: heading,
          currentLoc: { latitude, longitude },
          coordinate: new AnimatedRegion({ latitude, longitude }),
        });
      } catch (error) {
        console.log('Error Live Location: ', error);
      }
    }
  };

  // Rider Icon Animation
  const animate = (latitude, longitude) => {
    const newCoordinates = { latitude, longitude };
    if (Platform.OS === 'android') {
      if (mapRef?.current) {
        markerRef?.current?.animateMarkerToCoordinate(newCoordinates, 7000);
      } else {
        coordinate.timing(newCoordinates).start();
      }
    }
  };

  // Time & Distance from Driver to shipping location
  const fetchTimeAndDist = (distance, time) => {
    setState(state => ({ ...state, distance, time }));
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: currentLoc.latitude,
      longitude: currentLoc.longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    });
  };

  const onReady = result => {
    fetchTimeAndDist(result.distance, result.duration);
    mapRef.current.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 20,
        bottom: height / 20,
        left: width / 20,
        top: height / 20,
      },
    });
  };

  const hideContent = () => setVisible(!visible);

  useEffect(() => {
    getLiveLocation();
    handleGeocode();
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Save Current Coordinates if Screen Unfocus
  useEffect(() => {
    return () => {
      if (curCords?.latitude > 0) {
        dispatch(
          setLocation({
            lat: curCords.latitude,
            long: curCords.longitude,
          }),
        );
      }
    };
  }, [curCords?.latitude > 0]);

  // console.log('========LIVE LOCATION=======');
  // console.log(setting?.driver_travel_mode.toUpperCase());
  // console.log('============================');

  const geocodingService = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode',
  });
  geocodingService.interceptors.request.use(config => {
    config.params = {
      key: GOOGLE_MAPS_APIKEY,
      ...config.params,
    };
    return config;
  });

  const geocodeAddress = async address => {
    try {
      const response = await geocodingService.get('/json', {
        params: {
          address,
        },
      });

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      } else {
        throw new Error('Address not found');
      }
    } catch (error) {
      alert("Address not found!")
      throw new Error('Error geocoding address: ' + error.message);
    }
  };

  const handleGeocode = async () => {
    try {
      console.log('result map useffect :>> ', route?.params?.address);
      // console.log("GOOGLE_MAPS_APIKEY",GOOGLE_MAPS_APIKEY);
       const result = await geocodeAddress(route?.params?.address);
      // Geocoder.init("AIzaSyDN1lfhrd5OmoiYyrHrYH6cS58FBdJzBZ0");
      // const result = await Geocoder.from(route?.params?.address)
      //   .then(json => {
      //     var location = json.results[0].geometry.location;
      //     console.log(location);
      //   })
      //   .catch(error => console.warn(error));
      //   console.log("Result geocoding", result);
      updateState({
        shippingLoc: {
          latitude: result?.latitude,
          longitude: result?.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        },
      });
      console.log(
        result,
        '============coordinates=============',
        route?.params?.address,
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        onPress={hideContent}
        ref={mapRef}
        style={styles.map}
        initialRegion={currentLoc}>
        {currentLoc.latitude > 0 && shippingLoc.latitude > 0 && (
          <>
            {/* Current Location Marker */}
            <Marker.Animated
              ref={markerRef}
              coordinate={coordinate}
              // title="Mansoor Akhter"
              image={ASSETS.navigation}
              style={{ transform: [{ rotate: `${heading}deg` }] }}
            />

            {/* Custom Marker */}
            {/* <View
                style={{
                  // height: 50,
                  // width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <Image
                  source={ASSETS.navigation}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    transform: [{rotate: `${heading}deg`}],
                  }}
                />
              </View>
            </Marker.Animated> */}

            <Marker coordinate={shippingLoc} image={ASSETS.location} />

            {/* Route Direction from driver to shipping location*/}
            <MapViewDirections
              mode={setting?.driver_travel_mode.toUpperCase()}
              origin={currentLoc}
              destination={shippingLoc}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeColor={'#0009'}
              optimizeWaypoints={true}
              onReady={onReady}
              strokeWidth={5}
            />
          </>
        )}
      </MapView>

      {/* Distance & Time Bar*/}
      {visible && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            columnGap: 20,
            paddingRight: 15,
          }}>
          <Box fd={'row'} elv={5} w={windowWidth() / 1.5} pv={5} br={10}>
            {/* {distance !== 0 && time !== 0 && ( */}
            <View style={styles.timeDist}>
              <Image source={ASSETS.navigate} style={styles.navIcon} />
              <SectionText fz={20} title={`${distance?.toFixed(1)} / km`} />
            </View>
            <View style={[styles.timeDist, { justifyContent: 'flex-end' }]}>
              <Image source={ASSETS.clock} style={styles.clockIcon} />
              <SectionText fz={20} title={`${time?.toFixed(0)} min`} />
            </View>
          </Box>
          <CircleButton
            pd={9}
            wh={37}
            icon={ASSETS.arrow}
            onPress={() => navigation.goBack()}
          />
        </View>
      )}

      {/* Move to Center Button */}
      {visible && (
        <CircleButton
          onPress={onCenter}
          icon={ASSETS.gps}
          pd={8}
          wh={47}
          p="absolute"
          r={15}
          b={65}
        />
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    paddingTop: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  timeDist: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 5,
    alignItems: 'center',
  },

  navIcon: { width: 20, height: 20 },
  clockIcon: { width: 19, height: 19 },
});
