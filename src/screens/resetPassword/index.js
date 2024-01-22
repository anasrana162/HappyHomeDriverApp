import {Image, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {ASSETS, COLOR, screenWidth, windowHeight} from '../../assets';
import EffectButton from '../../components/atoms/EffectButton';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import {createNewPassword, login, resetPassword} from '../../api/APIs';
import {failedToast} from '../../utils/handlers';
import {globals} from '../../styles/gobalStyles';

const ResetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loader, setLoader] = useState(false);

  var validPswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

  const handleResetPassword = async () => {
    if (email && code && newPassword) {
      if (newPassword.match(validPswd)) {
        setLoader(true);
        const res = await createNewPassword(email, code, newPassword);
        if (res) {
          setLoader(false);
          navigation.navigate('Login');
        } else if (!res) {
          setLoader(false);
          // failedToast(res?.message);
          // console.log('******', res);
        }
      } else {
        failedToast(
          'Password must be 8 to 15 long which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
        );
      }
    } else {
      failedToast('Required all fields');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight(),
        width: screenWidth(),
      }}>
      <View style={globals.authMain}>
        <View style={[globals.authContainer, {marginTop: -50}]}>
          <Image source={ASSETS.logo} style={{height: 170, width: 200}} />
        </View>

        <View style={globals.authContainer}>
          <CustomTextInput
            placeholder="Email address"
            onChangeText={setEmail}
            br={10}
          />

          <CustomTextInput placeholder="Code" onChangeText={setCode} br={10} />

          <CustomTextInput
            placeholder="Create new password"
            onChangeText={setNewPassword}
            password={true}
            br={10}
          />

          <EffectButton
            title="Reset Password"
            width={180}
            fontSize={16}
            onPress={handleResetPassword}
            loader={loader}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPassword;
