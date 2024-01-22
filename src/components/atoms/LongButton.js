import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {COLOR} from '../../assets';
import {useTranslation} from 'react-i18next';
import {globals} from '../../styles/gobalStyles';
import {selectLanguage} from '../../redux/languageSlice';
import {useSelector} from 'react-redux';

const LongButton = ({title, icon, color, onPress, fontSize, bg, w, loader}) => {
  const {t} = useTranslation();
  const loadLang = useSelector(selectLanguage);

  return (
    <TouchableOpacity
      disabled={loader}
      onPress={onPress}
      activeOpacity={1}
      style={[
        styles.container,
        {
          width: w || '100%',
          backgroundColor: bg || COLOR.primary,
          flexDirection: loadLang === 'ar' ? 'row-reverse' : 'row',
        },
      ]}>
      {loader ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <>
          {icon && <Image source={icon} style={styles.imgIcon} />}
          <Text
            style={[
              globals.fontBold,
              styles.title,
              {color: color || COLOR.white},
            ]}>
            {t(title)}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default LongButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#fff',
    marginRight: 5,
  },
  imgIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    marginRight: 8,
  },
});
