import React from 'react'
import '../Styles/Disclaimer.css';
import { useLanguage } from '../Context/LanguageContext';

const STRINGS={
  en:{
    disclaimer:'Uhaki provides general legal information, not legal advice. Consult a lawyer for specific situations.'
  },
  sw:{
    disclaimer:'Uhaki hutoa taarifa za kisheria kwa ujumla, si ushauri wa kisheria. Tafadhali wasiliana na wakili kwa masuala yanayohusu hali yako mahususi.'
  }
}
const Disclaimer = () => {
  const { lang} = useLanguage();
  const t = STRINGS[lang];
  return (
    <div className='disclaimer'>
      <p>{t.disclaimer}</p>
    </div>
  )
}

export default Disclaimer;
