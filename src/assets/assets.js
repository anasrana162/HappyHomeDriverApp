import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default {
  map: require('./icons/map.png'),
  delivered: require('./icons/delivered.png'),
  distribution: require('./icons/distribution.png'),
  arrow: require('./icons/arrow.png'),
  hide: require('./icons/hide.png'),
  show: require('./icons/show.png'),
  courier: require('./icons/courier.png'),
  decline: require('./icons/decline.png'),
  task: require('./icons/task.png'),
  delivered2: require('./icons/delivered2.png'),
  info: require('./icons/info.png'),
  shop: require('./icons/shop.png'),
  navigate: require('./icons/navigate.png'),
  call: require('./icons/call.png'),
  whatsapp: require('./icons/whatsapp.png'),
  user: require('./icons/user.png'),
  bill: require('./icons/bill.png'),
  basket: require('./icons/basket.png'),
  discount: require('./icons/discount.png'),
  driver: require('./icons/driver.png'),
  cancelled: require('./icons/cancelled.png'),
  deliverySetting: require('./icons/deliverySetting.png'),
  settings: require('./icons/settings.png'),
  userInfo: require('./icons/userInfo.png'),
  email: require('./icons/email.png'),
  update: require('./icons/update.png'),
  down: require('./icons/down.png'),
  up: require('./icons/up.png'),
  logo: require('./icons/logo.png'),
  home: require('./icons/home.png'),
  camera: require('./icons/camera.png'),
  picture: require('./icons/picture.png'),
  powerOff: require('./icons/powerOff.png'),
  location: require('./icons/location.png'),
  direction: require('./icons/direction.png'),
  navigation: require('./icons/navigation.png'),
  gps: require('./icons/gps.png'),
  clock: require('./icons/clock.png'),

  whiteLoader: require('./images/whiteLoader.gif'),
  choco: require('./images/choco.jpeg'),
  mansoor: require('./images/mansoor.jpg'),
  placeholder: require('./images/placehoder_person.jpeg')
};

export const FONT = {
  fontBold: 'Careem Bold',
  fontReg: 'Careem Regular',
};

export const COLOR = {
  primary: '#fe8280',
  L_Purple: '#efe6fc',
  L_grey: '#eee',
  darkGrey: '#aaa',
  white: '#fff',
  black: '#000',
  green: '#019C1A97',
  blue: '#20A7DB98',
};

export const windowHeight = () => Dimensions.get('window').height;
export const windowWidth = () => Dimensions.get('window').width;
export const screenWidth = () => Dimensions.get('screen').width;
export const screenHeight = () => Dimensions.get('screen').height;

export const navigation = () => useNavigation();
