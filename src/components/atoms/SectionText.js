import { Text } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { globals } from '../../styles/gobalStyles';
import { selectLanguage } from '../../redux/languageSlice';
import { useSelector } from 'react-redux';

const SectionText = ({ title, info, fz, mv, coln }) => {
  const { t } = useTranslation();
  const loadLang = useSelector(selectLanguage);
  return (
    <Text
      style={[
        globals.fontReg,
        {
          fontSize: fz || 14,
          marginVertical: mv,
          textAlign: loadLang === 'ar' ? 'right' : 'left',
        },
      ]}>
      <Text style={globals.fontBold}>{t(title)}</Text>
      {coln ? ' : ' : null}
      {t(info)}
    </Text>
  );
};

export default SectionText;
