import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking, Platform, PermissionsAndroid } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../../assets/i18n/i18n';
import { Toast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../redux/languageSlice';
import Geolocation from 'react-native-geolocation-service';


export const whatsappHandler = contactNo => {
  console.log("contact No", contactNo);
  if(contactNo == ""){
    return alert("Contact Number not available!")
  }
  const url = 'whatsapp://send?text=' + '' + '&phone=' + contactNo;
  Linking.openURL(url)
    .then(data => {
      console.log('WhatsApp Opened successfully ' + data);
    })
    .catch(() => {
      return alert('Make sure WhatsApp installed on your device');
      //   return Toast.show({
      //     text1: 'Make sure WhatsApp installed on your device',
      //     type: 'error',
      //     visibilityTime: 3000,
      //   });
    });
};

export const callHandler = contactNo => {
  if(contactNo == ""){
    return alert("Contact Number not available!")
  }
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${contactNo}`;
  } 
  else {
    phoneNumber = `telprompt:${contactNo}`;
  }
  Linking.openURL(phoneNumber);
};

export const loadLanguage = async i18n => {
  try {
    const savedLanguage = await AsyncStorage.getItem('appLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      // I18nManager.forceRTL(savedLanguage === 'ar');
      return savedLanguage;
    }
  } catch (error) {
    console.error('Error loading language:', error);
  }
};

export const Direction = () => {
  const lang = useSelector(selectLanguage);
  return lang === 'ar' ? 'row-reverse' : 'row';
};

export const TextAlign = () => {
  const lang = useSelector(selectLanguage);
  return lang === 'ar' ? 'right' : 'left';
};

// const loadLanguage = async () => {
//   try {
//     const savedLanguage = await AsyncStorage.getItem('appLanguage');
//     if (savedLanguage) {
//       i18n.changeLanguage(savedLanguage);
//       setLanguage(savedLanguage);
//     }
//   } catch (error) {
//     console.error('Error loading language:', error);
//   }
// };
// loadLanguage();

// const langLoad = async () => {
//   const savedLanguage = await loadLanguage(i18n);
//   setLanguage(savedLanguage);
//   console.log(savedLanguage, 'currentLang');
// };
// langLoad();

export const failedToast = title => {
  Toast.show(title, {
    type: 'custom',
    placement: 'top',
    duration: 4000,
    offset: 30,
    animationType: 'slide-in',
    style: { width: 250, borderLeftColor: '#FF0000', borderLeftWidth: 7 },
  });
};

export const successToast = title => {
  Toast.show(title, {
    type: 'custom',
    placement: 'top',
    duration: 4000,
    offset: 30,
    animationType: 'slide-in',
    textStyle: { textAlign: 'center' },
    style: {
      width: 250,
      borderLeftColor: '#66FA66',
      borderLeftWidth: 5,
    },
  });
};

export const locationPermission = () => new Promise(async (resolve, reject) => {
  if (Platform.OS === 'ios') {
    try {
      const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
      if (permissionStatus === 'granted') {
        return resolve('granted');
      }
      reject('permission not granted')
    } catch (error) {
      return reject(error)
    }
  }

  return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((granted) => {
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      resolve('granted')
    }
    return reject('Location permission denied')
  }).catch((error) => {
    console.log('Ask location permission error: ', error);
    return reject(error)
  })
});

export const getCurrentLocation = () => new Promise((resolve, reject) => {
  Geolocation.getCurrentPosition(position => {
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      heading: position.coords.heading
    }
    resolve(coords);
  },
    error => {
      console.log(error, "================GEO LOCATION ERROR")
      reject(error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
  )
})
