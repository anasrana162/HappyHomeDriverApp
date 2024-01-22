import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {ASSETS, COLOR, screenWidth, windowHeight} from '../../assets';
import EffectButton from '../../components/atoms/EffectButton';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import {useDispatch} from 'react-redux';
import {login} from '../../api/APIs';
import {failedToast} from '../../utils/handlers';
import {globals} from '../../styles/gobalStyles';
import {loginUser} from '../../redux/authSlice';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const loginHandler = async () => {
    if (email && password) {
      setLoader(true);
      const res = await login(email, password, dispatch);

      if (res) {
        setLoader(false);
        dispatch(loginUser(res));
      } else if (!res) {
        setLoader(false);
        failedToast('Email or password is not valid!');
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
            placeholder="Email"
            onChangeText={setEmail}
            br={10}
          />
          <CustomTextInput
            placeholder="Password"
            onChangeText={setPassword}
            password={true}
            br={10}
          />
          <EffectButton
            title="Login"
            width={150}
            fontSize={16}
            onPress={loginHandler}
            loader={loader}
          />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{color: COLOR.darkGrey, fontSize: 12, marginTop: 15}}>
              Forgote password?
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
