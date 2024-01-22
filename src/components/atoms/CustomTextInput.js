import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {ASSETS, COLOR} from '../../assets';
import {useState} from 'react';
import IconButton from './IconButton';
import SectionText from './SectionText';
import {globals} from '../../styles/gobalStyles';

const CustomTextInput = ({
  value,
  flipIcon,
  placeholder,
  onChangeText,
  password,
  dropDown,
  selected,
  onPress,
  w,
  br,
  bc,
  loadLang,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const ta = loadLang === 'ar' ? 'right' : 'left';
  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View
      style={[
        styles.main,
        {
          width: w || '80%',
          borderRadius: br || 30,
          borderColor: bc || COLOR.L_grey,
        },
      ]}>
      {!dropDown && (
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          selectionColor={COLOR.primary}
          placeholderTextColor={COLOR.darkGrey}
          secureTextEntry={password && showPassword}
          editable={dropDown ? false : true}
          style={[styles.textInput, globals.fontReg, {textAlign: ta}]}
        />
      )}

      {dropDown && (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={1}
          style={styles.selection}>
          <SectionText info={selected} />
          <Image
            source={flipIcon ? ASSETS.up : ASSETS.down}
            style={{width: 20, height: 20, tintColor: COLOR.primary}}
          />
        </TouchableOpacity>
      )}
      {password && (
        <TouchableOpacity onPress={passwordHandler} activeOpacity={1}>
          <Image
            source={showPassword ? ASSETS.hide : ASSETS.show}
            style={{
              width: 25,
              height: 25,
              tintColor: COLOR.primary,
              marginRight: 15,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  main: {
    height: 50,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
  },
  selection: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
