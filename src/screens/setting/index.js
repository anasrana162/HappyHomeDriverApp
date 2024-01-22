import {ActivityIndicator, Modal, ScrollView, View} from 'react-native';
import {useEffect, useState} from 'react';
import {globals} from '../../styles/gobalStyles';
import OrderHeader from '../../components/molecules/OrderHeader';
import Box from '../../components/atoms/Box';
import BoxHeading from '../../components/atoms/BoxHeading';
import {ASSETS, COLOR, screenWidth} from '../../assets';
import DropDownPicker from '../../components/molecules/DropDownPicker';
import LongButton from '../../components/atoms/LongButton';
import {useDispatch, useSelector} from 'react-redux';
import {addSetting, selectSetting} from '../../redux/settingSlice';
import {driverProfile, updateProfile} from '../../api/APIs';
import CustomImagePicker from '../../components/organisms/CustomImagePicker';
import PickerBox from '../../components/organisms/PickerBox';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import UserBar from '../../components/molecules/UserBar';
import {selectUser} from '../../redux/authSlice';
import Loader from '../../components/atoms/Loader';

const dataTransMode = ['Driving', 'Walking', 'Bicycling'];
const dataNav = ['Google Map', 'Apple Map'];
const dataCountry = [
  'Arab Emarat',
  'Saudi Arabia',
  'Pakistan',
  'Canada',
  'Qatar',
];

const Settings = ({route, navigation}) => {
  const dispatch = useDispatch();
  const getSettings = useSelector(selectSetting);
  const [user] = useSelector(selectUser);
  const [data] = getSettings;

  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [setting, setSetting] = useState();
  const [selections, setSelections] = useState({
    country: '',
    first_name: '',
    last_name: '',
    company: '',
    address_1: '',
    address_2: '',
    city: '',
    postcode: '',
    state: '',
    phone: '',
    driver_vehicle: '',
    driver_travel_mode: '',
    driver_availability: '',
    driver_licence_plate: '',
    // navigation: '',
    // email: '',
    // password: '',
  });

  const handleSelections = (key, value) => {
    setSetting(prevState => ({
      ...prevState,
      [key]: value,
    }));
    setSelections(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const checkSelections = obj => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== '') {
        return true;
      }
    }
    return false;
  };

  const handleSettings = async () => {
    setLoader(true);

    const res = await updateProfile(selections, user?.token);
    if (res?.status === 200) {
      setLoader(false);
      dispatch(addSetting(setting));
    } else {
      setLoader(false);
    }
    console.log(res, '========updateProfile==SUCCES');
  };

  const handleCameraLaunch = async () => {
    setIsVisible(!isVisible);
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      includeBase64: false,
    };
    try {
      const response = await launchCamera(options);

      if (response.didCancel) {
        console.log('User cancelled image capture');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setSelectedImage(response.assets[0]);
        console.log('ImagePicker Select: ');
      }

      console.log(response, '==========response');
    } catch (error) {
      console.log('Error Camera: ', error);
    }
  };

  const handleGalleryLaunch = async () => {
    setIsVisible(!isVisible);
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      includeBase64: false,
    };

    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const getProfile = async () => {
    const res = await driverProfile(user?.token);
    if (res?.success) {
      setSetting(res?.driver_profile);
      setLoading(false);
      // dispatch(addSetting(res?.driver_profile));
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  console.log(setting, '==========setting');

  return (
    <>
      <Loader visible={loading} />

      {/* Settings Inputs  */}
      <View style={globals.mainWrpr}>
        <UserBar title="Settings" onPress={() => navigation.openDrawer()} />
        {/* <OrderHeader title="Settings" /> */}
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={{paddingBottom: 20, width: screenWidth()}}>
          {/* Contact Info */}
          <Box bg="#fff">
            <BoxHeading
              heading="Contact Info"
              icon={ASSETS.userInfo}
              iSize={25}
              mb={35}
            />

            <CustomImagePicker
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />

            <DropDownPicker
              title="First name"
              value={
                setting?.first_name
                  ? setting?.first_name
                  : selections?.first_name
              }
              setSelections={i => handleSelections('first_name', i)}
            />
            <DropDownPicker
              title="Last name"
              value={
                setting?.last_name ? setting?.last_name : selections?.last_name
              }
              setSelections={i => handleSelections('last_name', i)}
            />
            <DropDownPicker
              title="Company"
              value={setting?.company ? setting?.company : selections?.company}
              setSelections={i => handleSelections('company', i)}
            />
            <DropDownPicker
              title="Address 1"
              value={
                setting?.address_1 ? setting?.address_1 : selections?.address_1
              }
              setSelections={i => handleSelections('address_1', i)}
            />
            <DropDownPicker
              title="Address 2"
              value={
                setting?.address_2 ? setting?.address_2 : selections?.address_2
              }
              setSelections={i => handleSelections('address_2', i)}
            />
            <DropDownPicker
              title="City"
              value={setting?.city ? setting?.city : selections?.city}
              setSelections={i => handleSelections('city', i)}
            />
            <DropDownPicker
              title="Postcode / ZIP"
              value={
                setting?.postcode ? setting?.postcode : selections?.postcode
              }
              setSelections={i => handleSelections('postcode', i)}
            />
            <DropDownPicker
              title="Country / Region"
              selections={setting?.country}
              setSelections={i => handleSelections('country', i)}
              dropDown={true}
              data={dataCountry}
            />
            <DropDownPicker
              title="State / County"
              value={setting?.state ? setting?.state : selections?.state}
              setSelections={i => handleSelections('state', i)}
            />
            <DropDownPicker
              title="Phone number"
              value={setting?.phone ? setting?.phone : selections?.phone}
              setSelections={i => handleSelections('phone', i)}
            />
          </Box>

          {/* Delivery Setting */}
          <Box bg="#fff">
            <BoxHeading
              heading="Delivery Setting"
              icon={ASSETS.deliverySetting}
              iSize={25}
              mb={15}
            />
            <DropDownPicker
              title="Transportation Mode"
              selections={setting?.driver_travel_mode}
              setSelections={i => handleSelections('driver_travel_mode', i)}
              data={dataTransMode}
              dropDown={true}
            />
            {/* <DropDownPicker
            title="Navigation APP"
            selections={setting?.navigation}
            setSelections={i => handleSelections('navigation', i)}
            data={dataNav}
            dropDown={true}
          /> */}
            <DropDownPicker
              title="Vehicle type"
              value={
                setting?.driver_vehicle
                  ? setting?.driver_vehicle
                  : selections?.driver_licence_plate
              }
              setSelections={i => handleSelections('driver_vehicle', i)}
            />
            <DropDownPicker
              title="License Plate"
              value={
                setting?.driver_licence_plate
                  ? setting?.driver_licence_plate
                  : selections?.driver_licence_plate
              }
              setSelections={i => handleSelections('driver_licence_plate', i)}
            />
          </Box>

          {/* Account */}
          <Box bg="#fff">
            <BoxHeading
              heading="Account"
              icon={ASSETS.email}
              iSize={23}
              mb={15}
            />

            <DropDownPicker
              title="Email address"
              value={setting?.email ? setting?.email : selections?.email}
              setSelections={i => handleSelections('email', i)}
            />
            <DropDownPicker
              title="Password"
              value={
                setting?.password ? setting?.password : selections?.password
              }
              setSelections={i => handleSelections('password', i)}
              password={true}
            />
          </Box>
        </ScrollView>

        {isVisible && (
          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 0,
            }}>
            <PickerBox
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              onPress1={handleCameraLaunch}
              onPress2={handleGalleryLaunch}
            />
          </View>
        )}

        {/* Update Settings */}
        {checkSelections(selections) ? (
          <View style={globals.footerBTNcontainer}>
            <LongButton
              w="93%"
              title="Update"
              icon={ASSETS.update}
              onPress={handleSettings}
              loader={loader}
            />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default Settings;
