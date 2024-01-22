import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../atoms/CustomTextInput';
import SectionText from '../atoms/SectionText';
import {COLOR} from '../../assets';
import {selectLanguage} from '../../redux/languageSlice';
import {useSelector} from 'react-redux';

const DropDownPicker = ({
  data,
  value,
  title,
  dropDown,
  selections,
  setSelections,
  password,
}) => {
  const [isDropDown, setDropDown] = useState(false);
  const [selected, setSelected] = useState('');
  const loadLang = useSelector(selectLanguage);
  const as = loadLang === 'ar' ? 'flex-end' : 'flex-start';

  const selectionHanlder = i => {
    setSelections(i);
    setSelected(i);
    setDropDown(!isDropDown);
  };

  const dropDownHandler = () => setDropDown(!isDropDown);

  return (
    <View style={styles.main}>
      <View style={{alignSelf: as, paddingHorizontal: 8}}>
        <SectionText info={title} fz={11} />
      </View>
      <CustomTextInput
        value={value}
        selected={selected ? selected : selections}
        dropDown={dropDown}
        flipIcon={isDropDown}
        onPress={dropDownHandler}
        onChangeText={setSelections}
        password={password}
        bc="#0002"
        w="100%"
        br={10}
        loadLang={loadLang}
      />
      {isDropDown && (
        <View style={styles.dropDownContainer}>
          <ScrollView nestedScrollEnabled={true}>
            {data.map((title, index) => (
              <TouchableOpacity
                onPress={() => selectionHanlder(title)}
                key={index}
                activeOpacity={1}
                style={{
                  borderBottomWidth: index === data.length - 1 ? 0 : 1,
                  borderBottomColor: COLOR.L_grey,
                }}>
                <SectionText info={title} mv={8} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DropDownPicker;

const styles = StyleSheet.create({
  main: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 5,
    width: '100%',
  },
  dropDownContainer: {
    padding: 10,
    elevation: 4,
    width: '100%',
    maxHeight: 250,
    backgroundColor: '#fff',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
});
