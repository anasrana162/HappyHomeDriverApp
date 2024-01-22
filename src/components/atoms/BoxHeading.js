import {Image, StyleSheet, Text, View} from 'react-native';
import {COLOR} from '../../assets';
import {useTranslation} from 'react-i18next';
import {globals} from '../../styles/gobalStyles';
import {useSelector} from 'react-redux';
import {selectLanguage} from '../../redux/languageSlice';

const BoxHeading = ({heading, icon, rate, bbw, mb, iSize}) => {
  const {t} = useTranslation();
  const loadLang = useSelector(selectLanguage);

  return (
    <View
      style={[
        styles.headingWrpr,
        {
          flexDirection: loadLang === 'ar' ? 'row-reverse' : 'row',
          borderBottomColor: COLOR.darkGrey,
          borderBottomWidth: bbw ? 1 : !icon ? 0 : 1,
          paddingBottom: !icon ? 8 : 5,
          marginBottom: mb || 0,
        },
      ]}>
      <View
        style={{
          flexDirection: loadLang === 'ar' ? 'row-reverse' : 'row',
          alignItems: 'center',
        }}>
        {icon && (
          <Image
            source={icon}
            style={{
              width: iSize || 21,
              height: iSize || 21,
              marginHorizontal: 8,
            }}
          />
        )}
        <Text style={[globals.fontBold, {fontSize: !icon ? 14 : 14}]}>
          {t(heading)}
        </Text>
      </View>
      {rate && <Text style={globals.fontReg}>{rate}</Text>}
    </View>
  );
};

export default BoxHeading;

const styles = StyleSheet.create({
  headingWrpr: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
