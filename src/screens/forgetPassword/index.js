import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {ASSETS, COLOR, screenWidth, windowHeight} from '../../assets';
import EffectButton from '../../components/atoms/EffectButton';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import {resetPassword} from '../../api/APIs';
import {failedToast} from '../../utils/handlers';
import IconButton from '../../components/atoms/IconButton';
import {globals} from '../../styles/gobalStyles';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  console.log(email, '  EMAIL');

  const handleForgotPassword = async () => {
    if (email) {
      setLoader(true);
      const res = await resetPassword(email);
      if (res) {
        setLoader(false);
        navigation.navigate('ResetPassword');
      } else if (!res) {
        setLoader(false);
        failedToast('Email is not valid!');
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
        <View style={{position: 'absolute', top: 10, right: 20}}>
          <IconButton icon={ASSETS.arrow} onPress={() => navigation.goBack()} />
        </View>
        <View style={[globals.authContainer, {marginTop: -50}]}>
          <Image source={ASSETS.logo} style={{height: 170, width: 200}} />
        </View>

        <View style={globals.authContainer}>
          <CustomTextInput
            placeholder="Email"
            onChangeText={setEmail}
            br={10}
          />

          <EffectButton
            title="Forgot Password"
            width={180}
            fontSize={16}
            onPress={handleForgotPassword}
            loader={loader}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
