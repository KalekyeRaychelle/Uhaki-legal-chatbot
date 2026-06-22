import ActsHeader from '../Components/ActsHeader';
import ActsHeading from '../Components/ActsHeading';
import SearchBar from '../Components/SearchBar';
import '../Styles/ActsCovered.css';
import React, { useState } from 'react';
import { useLanguage } from '../Context/LanguageContext';
import {IconBabyCarriage, IconGavel, IconDatabase, IconLock, IconBriefcase, IconFileSearch, IconReceiptTax, IconAlertTriangle, IconCoin, IconUsers, IconMap, IconFileText, IconFileCertificate, IconHeart, IconWheelchair, IconScale, IconClipboardList, IconReceipt2, IconFirstAidKit } from "@tabler/icons-react";
const ActsCovered = () => {
  const { lang } = useLanguage();
 

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const STRINGS = {
    en: {
      constitutionTitle: 'Constitution of Kenya, 2010',
      constitutionDesc:
        'The supreme law — covers fundamental rights, devolution, government structure, and more.',
      foundationDoc: 'Foundation document',
    },
    sw: {
      constitutionTitle: 'Katiba ya Kenya, 2010',
      constitutionDesc:
        'Sheria kuu ya nchi — inashughulikia haki za msingi, ugatuzi, muundo wa serikali na zaidi.',
      foundationDoc: 'Hati ya Msingi',
    },
  };
  const t = STRINGS[lang];
  const actsSw = [
  {
    name: "Sheria ya Watoto (2022)",
    desc: "Inalinda haki za watoto na kuweka masharti kuhusu wajibu wa wazazi, malezi, ulezi, uasili, ulinzi wa watoto na watoto walio katika mgongano na sheria.",
    tags: ["Malezi", "Uasili", "Matunzo"],
    color: "pink",
    icon: IconBabyCarriage,
    category: "family"
  },
  {
    name: "Kanuni ya Mwenendo wa Mashauri ya Jinai (Sura ya 75)",
    desc: "Taratibu za uchunguzi, kukamatwa, kusikilizwa kwa kesi na utoaji wa adhabu kwa makosa ya jinai.",
    tags: ["Kukamatwa", "Kesi", "Adhabu"],
    color: "coral",
    icon: IconGavel,
    category: "rights"
  },
  {
    name: "Sheria ya Ulinzi wa Data (2019)",
    desc: "Haki zinazohusiana na data binafsi, wajibu wa wasimamizi wa data na faragha ya taarifa.",
    tags: ["Faragha", "Haki za Data", "Wasimamizi"],
    color: "teal",
    icon: IconDatabase,
    category: "rights"
  },
  {
    name: "Sheria ya Kukamata Mali kwa Kodi ya Nyumba (Sura ya 293)",
    desc: "Sheria kuhusu wakati na namna mwenye nyumba anaweza kukamata mali kwa sababu ya kodi isiyolipwa.",
    tags: ["Madeni ya Kodi", "Ukamataji"],
    color: "coral",
    icon: IconLock,
    category: "property"
  },
  {
    name: "Sheria ya Ajira (2007)",
    desc: "Inasimamia mikataba ya ajira, kusitishwa kwa kazi, mishahara, likizo na haki za wafanyakazi.",
    tags: ["Mikataba", "Mishahara", "Likizo", "Kufutwa Kazi"],
    color: "purple",
    icon: IconBriefcase,
    category: "employment"
  },
  {
    name: "Sheria ya Ushahidi (Sura ya 80)",
    desc: "Sheria kuhusu ushahidi unaokubalika na namna unavyoweza kuwasilishwa mahakamani.",
    tags: ["Ukubalifu", "Ushahidi", "Mahakama"],
    color: "blue",
    icon: IconFileSearch,
    category: "rights"
  },
  {
    name: "Sheria ya Ushuru wa Bidhaa (2015)",
    desc: "Uwekaji na ukusanyaji wa ushuru wa bidhaa na huduma.",
    tags: ["Ushuru", "Bidhaa", "Kodi"],
    color: "amber",
    icon: IconReceiptTax,
    category: "business"
  },
  {
    name: "Sheria ya Ajali Zinazosababisha Kifo (Sura ya 32)",
    desc: "Madai ya fidia kwa wategemezi pale kifo kinaposababishwa na kitendo kisicho halali cha mtu mwingine.",
    tags: ["Fidia", "Kifo", "Wategemezi"],
    color: "coral",
    icon: IconAlertTriangle,
    category: "rights"
  },
  {
    name: "Sheria ya Kodi ya Mapato (Sura ya 470)",
    desc: "Sheria kuhusu tathmini na ulipaji wa kodi ya mapato kwa watu binafsi na biashara.",
    tags: ["Kodi", "Mapato", "Uwasilishaji"],
    color: "amber",
    icon: IconCoin,
    category: "business"
  },
  {
    name: "Sheria ya Mahusiano ya Kazi (2007)",
    desc: "Inahusu vyama vya wafanyakazi, majadiliano ya pamoja, migomo na migogoro kati ya waajiri na wafanyakazi.",
    tags: ["Vyama", "Migomo", "Migogoro"],
    color: "purple",
    icon: IconUsers,
    category: "employment"
  },
  {
    name: "Sheria ya Ardhi (2012)",
    desc: "Inahusu umiliki wa ardhi, miamala, upangaji na usimamizi wa ardhi ya umma na binafsi.",
    tags: ["Umiliki", "Ukodishaji", "Miamala"],
    color: "coral",
    icon: IconMap,
    category: "property"
  },
  {
    name: "Sheria ya Mikataba (Sura ya 23)",
    desc: "Inaweka masharti ya kisheria kwa baadhi ya mikataba na kusimamia uundaji, utekelezaji na fidia za ukiukaji wa mikataba.",
    tags: ["Mikataba", "Ukiukaji", "Makubaliano"],
    color: "blue",
    icon: IconFileText,
    category: "business"
  },
  {
    name: "Sheria ya Urithi (Sura ya 160)",
    desc: "Inahusu urithi, wosia, urithi bila wosia na usimamizi wa mali za marehemu.",
    tags: ["Urithi", "Wosia", "Mali"],
    color: "pink",
    icon: IconFileCertificate,
    category: "family"
  },
  {
    name: "Sheria ya Ndoa (2014)",
    desc: "Utambuzi wa aina za ndoa, usajili, kuvunjwa kwa ndoa na haki za wanandoa.",
    tags: ["Ndoa", "Talaka", "Wanandoa"],
    color: "pink",
    icon: IconHeart,
    category: "family"
  },
  {
    name: "Sheria ya Watu Wenye Ulemavu (2003)",
    desc: "Inakuza haki, urekebishaji, upatikanaji wa huduma na fursa sawa kwa watu wenye ulemavu.",
    tags: ["Upatikanaji", "Ulinzi", "Haki"],
    color: "teal",
    icon: IconWheelchair,
    category: "rights"
  },
  {
    name: "Sheria ya Mahakama ya Madai Madogo (2016)",
    desc: "Inaweka Mahakama ya Madai Madogo na taratibu za kutatua migogoro ya madai kwa njia rahisi, nafuu na ya haraka.",
    tags: ["Migogoro", "Madai ya Kiraia", "Mahakama"],
    color: "blue",
    icon: IconScale,
    category: "rights"
  },
  {
    name: "Sheria ya Taratibu za Kodi (2015)",
    desc: "Taratibu za usajili wa kodi, tathmini na utekelezaji wa sheria za kodi.",
    tags: ["Usimamizi wa Kodi", "Uzingatiaji"],
    color: "amber",
    icon: IconClipboardList,
    category: "business"
  },
  {
    name: "Sheria ya Kodi ya Ongezeko la Thamani (2013)",
    desc: "Uwekaji na ukusanyaji wa kodi ya ongezeko la thamani kwa bidhaa na huduma.",
    tags: ["VAT", "Kodi", "Bidhaa"],
    color: "amber",
    icon: IconReceipt2,
    category: "business"
  },
  {
    name: "Sheria ya Fidia kwa Majeraha ya Kazini (2007)",
    desc: "Fidia kwa wafanyakazi waliojeruhiwa au kufariki wakati wa kutekeleza kazi zao.",
    tags: ["Jeraha", "Fidia", "Mahali pa Kazi"],
    color: "purple",
    icon: IconFirstAidKit,
    category: "employment"
  }
];
   const actsEn = [
  {
    name: "Children Act (2022)",
    desc: "Protects children's rights and provides for parental responsibility, custody, guardianship, adoption, child protection, and children in conflict with the law.",
    tags: ["Custody", "Adoption", "Maintenance"],
    color: "pink",
    icon: IconBabyCarriage,
    category: "family"
  },
  {
    name: "Criminal Procedure Code (Cap. 75)",
    desc: "Procedures for the investigation, arrest, trial, and sentencing of criminal offences.",
    tags: ["Arrest", "Trial", "Sentencing"],
    color: "coral",
    icon: IconGavel,
    category: "rights"
  },
  {
    name: "Data Protection Act (2019)",
    desc: "Rights over personal data, obligations of data controllers, and data privacy.",
    tags: ["Privacy", "Data Rights", "Controllers"],
    color: "teal",
    icon: IconDatabase,
    category: "rights"
  },
  {
    name: "Distress for Rent Act (Cap. 293)",
    desc: "Rules on when and how landlords may seize goods for unpaid rent.",
    tags: ["Rent Arrears", "Seizure"],
    color: "coral",
    icon: IconLock,
    category: "property"
  },
  {
    name: "Employment Act (2007)",
    desc: "Governs employment contracts, termination, wages, leave entitlements, and workplace rights.",
    tags: ["Contracts", "Wages", "Leave", "Dismissal"],
    color: "purple",
    icon:IconBriefcase,
    category: "employment"
  },
  {
    name: "Evidence Act (Cap. 80)",
    desc: "Rules on what evidence is admissible and how it may be presented in court.",
    tags: ["Admissibility", "Testimony", "Court"],
    color: "blue",
    icon: IconFileSearch,
    category: "rights"
  },
  {
    name: "Excise Duty Act (2015)",
    desc: "Imposition and collection of excise duty on goods and services.",
    tags: ["Duty", "Goods", "Taxation"],
    color: "amber",
    icon: IconReceiptTax,
    category: "business"
  },
  {
    name: "Fatal Accidents Act (Cap. 32)",
    desc: "Compensation claims for dependents when a death is caused by another's wrongful act.",
    tags: ["Compensation", "Death", "Dependents"],
    color: "coral",
    icon: IconAlertTriangle,
    category: "rights"
  },
  {
    name: "Income Tax Act (Cap. 470)",
    desc: "Rules on the assessment and payment of income tax for individuals and businesses.",
    tags: ["Tax", "Income", "Filing"],
    color: "amber",
    icon: IconCoin,
    category: "business"
  },
  {
    name: "Labour Relations Act (2007)",
    desc: "Covers trade unions, collective bargaining, strikes, and employer-employee disputes.",
    tags: ["Unions", "Strikes", "Disputes"],
    color: "purple",
    icon: IconUsers,
    category: "employment"
  },
  {
    name: "Land Act (2012)",
    desc: "Covers land ownership, transactions, leases, and management of public and private land.",
    tags: ["Ownership", "Leases", "Transactions"],
    color: "coral",
    icon: IconMap,
    category: "property"
  },
  {
    name: "Law of Contract Act (Cap. 23)",
    desc: "Provides legal requirements for certain contracts and governs aspects of contract formation, enforcement, and remedies.",
    tags: ["Contracts", "Breach", "Agreements"],
    color: "blue",
    icon: IconFileText,
    category: "business"
  },
  {
    name: "Law of Succession Act (Cap. 160)",
    desc: "Inheritance, wills, intestacy, and administration of deceased estates.",
    tags: ["Inheritance", "Wills", "Estates"],
    color: "pink",
    icon:IconFileCertificate,
    category: "family"
  },
  {
    name: "Marriage Act (2014)",
    desc: "Recognition of marriage types, registration, dissolution, and rights of spouses.",
    tags: ["Marriage", "Divorce", "Spouses"],
    color: "pink",
    icon: IconHeart,
    category: "family"
  },
  {
    name: "Persons with Disabilities Act (2003)",
    desc: "Promotes the rights, rehabilitation, accessibility, and equal opportunities of persons with disabilities.",
    tags: ["Accessibility", "Protections", "Rights"],
    color: "teal",
    icon: IconWheelchair,
    category: "rights"
  },
  {
    name: "Small Claims Court Act (2016)",
    desc: "Establishes the Small Claims Court and provides procedures for resolving specified civil disputes through a simple, affordable, and expedited process.",
    tags: ["Disputes", "Civil Claims", "Court"],
    color: "blue",
    icon: IconScale,
    category: "rights"
  },
  {
    name: "Tax Procedures Act (2015)",
    desc: "Administrative procedures for tax registration, assessment, and enforcement.",
    tags: ["Tax Admin", "Compliance"],
    color: "amber",
    icon: IconClipboardList,
    category: "business"
  },
  {
    name: "Value Added Tax Act (2013)",
    desc: "Imposition and collection of value added tax on goods and services.",
    tags: ["VAT", "Taxation", "Goods"],
    color: "amber",
    icon: IconReceipt2,
    category: "business"
  },
  {
    name: "Work Injury Benefits Act (2007)",
    desc: "Compensation for employees injured or killed in the course of employment.",
    tags: ["Injury", "Compensation", "Workplace"],
    color: "purple",
    icon: IconFirstAidKit,
    category: "employment"
  }
];
  const acts = lang === 'sw' ? actsSw : actsEn;
  const filteredActs = acts.filter((act) => {
  const matchesSearch =
    act.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    act.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    act.tags.some(tag =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const matchesCategory =
    selectedCategory === 'all' ||
    act.category === selectedCategory;

  return matchesSearch && matchesCategory;
});
  
  return (
    <>
    <ActsHeader/>
    <ActsHeading/>
    <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
    <div>
    <div className="constitution-banner">
        <h3> <i className="ti ti-award" aria-hidden="true"></i>
          {t.constitutionTitle}
        </h3>

        <p>{t.constitutionDesc}</p>

        <div className="badge">{t.foundationDoc}</div>
    </div>
  </div>
    <div className="acts-covered">
 
  {filteredActs.map((act, index) => {
    const Icon = act.icon;

    return (
      <div className="act-card" key={index}>
        <div className="act-top">
          <div className={`act-icon ${act.color}`}>
            <Icon size={24} />
          </div>

          <div>
            <div className="act-name">{act.name}</div>
          </div>
        </div>

        <div className="act-desc">{act.desc}</div>

        <div className="act-tags">
          {act.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="act-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  })}
</div>
    </>
   

  );
};

export default ActsCovered;
