import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLOR, FONT} from '../../assets';
import {Direction} from '../../utils/handlers';
import {useTranslation} from 'react-i18next';
const {width} = Dimensions.get('screen');

const UserBar = ({title, onPress, status}) => {
  const {t} = useTranslation();
  return (
    <View
      style={[
        styles.wrpr,
        {
          flexDirection: Direction(),
          backgroundColor: COLOR.white,
        },
      ]}>
      <View>
        {/* Status Indicator */}
        {/* {status && <View
          style={[
            styles.status,
            { backgroundColor: status ? '#019C1A' : 'red' },
          ]} />} */}

        {/* Profile Image button */}
        <TouchableOpacity onPress={onPress} style={styles.profileIcon}>
          <Image
            source={require('../../assets/images/placehoder_person.jpeg')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{t(title)}</Text>
    </View>
  );
};

export default UserBar;

const styles = StyleSheet.create({
  wrpr: {
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontFamily: FONT.fontBold,
    fontWeight: '600',
    fontSize: 18,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {width: '100%', height: '100%', resizeMode: 'contain'},
  status: {
    width: 10,
    height: 10,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    right: 2,
    bottom: 0,
    borderRadius: 20,
    zIndex: 10,
  },
});
