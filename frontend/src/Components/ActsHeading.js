import React from 'react';
import '../Styles/ActsHeading.css';
import { useLanguage } from '../Context/LanguageContext';

const STRINGS = {
  en: {
    title: 'Acts Covered',
    description:
      'Uhaki draws answers from these 20 Kenyan acts and the Constitution. Browse by category to see what questions you can ask.',
  },
  sw: {
    title: 'Sheria Zilizotumiwa',
    description:
      'Uhaki hupata majibu kutoka kwa sheria hizi 20 za Kenya pamoja na Katiba. Tafuta kwa makundi ili kuona aina za maswali unayoweza kuuliza.',
  },
};

const ActsHeading = () => {
  const { lang } = useLanguage();
  const t = STRINGS[lang];

  return (
    <div className="ActsHeading">
      <h1>{t.title}</h1>
      <p>{t.description}</p>
    </div>
  );
};

export default ActsHeading;
