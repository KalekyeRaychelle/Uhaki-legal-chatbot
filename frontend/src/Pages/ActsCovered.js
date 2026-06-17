import ActsHeader from '../Components/ActsHeader';
import ActsHeading from '../Components/ActsHeading';
import SearchBar from '../Components/SearchBar';
import '../Styles/ActsCovered.css';
import React, { useState } from 'react';
import { IconBook2, IconBabyCarriage, IconGavel, IconDatabase, IconLock, IconBriefcase, IconFileSearch, IconReceiptTax, IconAlertTriangle, IconCoin, IconUsers, IconMap, IconFileText, IconFileCertificate, IconHeart, IconWheelchair, IconScale, IconClipboardList, IconReceipt2, IconFirstAidKit } from "@tabler/icons-react";
const ActsCovered = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
   const acts = [
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
      <div>
        <h3><i className="ti ti-award"  aria-hidden="true"></i>Constitution of Kenya, 2010</h3>
        <p>The supreme law — covers fundamental rights, devolution, government structure, and more.</p>
      </div>
      <div className="badge">Foundation document</div>
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
