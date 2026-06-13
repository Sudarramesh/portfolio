import { Scheme } from '../types';

export const SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM Kisan Samman Nidhi',
    sponsor: 'Ministry of Agriculture and Farmers Welfare',
    category: 'Agriculture',
    description: 'Direct income support of ₹6,000 per year to all landholding farmer families across the country in three equal installments.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzALiggrndQz3EFq0HnvffjBsLQ04gMXVGdS_1Ual2T1O6IV5eHfE9lpl1ykqNivRQIGEUsTP0cU6FlOY7mIkD-UTjBO_MD-k96tDWTIdtuAR6p-cONDtY6wLGQyntyuxZAgWW59EylDxSN-WrBZkngLnC718Jj0-Ql4audXwJLwkYvYxDhCsW8vhnzjn-Zw5CtbyMXw4Z9-kuyarsLX245HoQPogen8C3ypJXvYAkQaVo2Q5V_7OyTW-RxpAS4gRCXLcyEMO10-k',
    benefits: '₹6,000 per Year',
    benefitsLabel: '₹6,000/year',
    timelineLabel: 'Ongoing',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 100,
      allowedOccupations: ['Farmer'],
      gender: 'All'
    },
    keyPoints: [
      'Financial benefit of ₹6,000 per structured family per year.',
      'Transferred directly to the bank accounts of beneficiaries via DBT.',
      'Aadhaar-seeded bank account is mandatory for receiving benefits.',
      'Includes small and marginal farmer families under unified holdings.'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Land Ownership Documents (Khatauni/Patta)',
      'Bank Account Passbook (with IFSC Code)',
      'Active Mobile Number linked with Aadhaar'
    ],
    tags: ['Income Support', 'Farmers', 'Direct Benefit Transfer'],
    hiName: 'पीएम किसान सम्मान निधि',
    hiSponsor: 'कृषि एवं किसान कल्याण मंत्रालय',
    hiDescription: 'देश भर के सभी भूमिधारक किसान परिवारों को तीन समान किश्तों में प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता।',
    hiBenefits: '₹6,000 प्रति वर्ष',
    hiBenefitsLabel: '₹6,000/वर्ष',
    hiTimelineLabel: 'सतत',
    hiKeyPoints: [
      'प्रति संरचित परिवार प्रति वर्ष ₹6,000 का वित्तीय लाभ।',
      'डीबीटी के माध्यम से लाभार्थियों के बैंक खातों में सीधे हस्तांतरित।',
      'लाभ प्राप्त करने के लिए आधार से जुड़ा बैंक खाता होना अनिवार्य है।',
      'संयुक्त जोत के तहत छोटे और सीमांत किसान परिवारों को शामिल करता है।'
    ],
    hiDocumentsRequired: [
      'आधार कार्ड',
      'भूमि स्वामित्व दस्तावेज (खतौनी/पट्टा)',
      'बैंक खाता पासबुक (IFSC कोड के साथ)',
      'आधार से जुड़ा सक्रिय मोबाइल नंबर'
    ],
    taName: 'பிஎம் கிசான் சம்மான் நிதி (PM Kisan)',
    taSponsor: 'வேளாண்மை மற்றும் விவசாயிகள் நல அமைச்சகம்',
    taDescription: 'நாடு முழுவதும் உள்ள நிலமுள்ள அனைத்து விவசாயக் குடும்பங்களுக்கும் தலா ₹6,000 வீதம் ஆண்டுக்கு மூன்று சம தவணைகளில் நேரடி நிதியுதவி.',
    taBenefits: 'ஆண்டுக்கு ₹6,000',
    taBenefitsLabel: '₹6,000/ஆண்டு',
    taTimelineLabel: 'தொடர்கிறது',
    taKeyPoints: [
      'ஒருங்கிணைந்த விவசாயக் குடும்பத்திற்கு ஆண்டுக்கு ₹6,000 நிதியுதவி.',
      'டிபிடி (DBT) மூலம் விவசாயிகளின் வங்கிக் கணக்குகளில் நேரடியாக செலுத்தப்படும்.',
      'பலன்களைப் பெற ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கு கட்டாயமாகும்.',
      'குறு மற்றும் சிறு விவசாயக் குடும்பங்கள் ஒருங்கிணைந்த முறையில் பயன்பெறுவர்.'
    ],
    taDocumentsRequired: [
      'ஆதார் அட்டை',
      'நில உரிமை ஆவணங்கள் (பட்டா/சிட்டா)',
      'வங்கி கணக்கு புத்தகம் (IFSC குறியீட்டுடன்)',
      'ஆதாருடன் இணைக்கப்பட்ட மொபைல் எண்'
    ]
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat – PM-JAY',
    sponsor: 'National Health Authority (NHA)',
    category: 'Health',
    description: 'World\'s largest government-funded health assurance scheme providing health cover of ₹5 Lakh per family per year for secondary and tertiary hospitalisation.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAjB4B-cEC1iQ7no2owCjLCiNWX6QZVivHbs-KM7yMdN6gNdxwYfANOOjl7KrG5VUmRL9xgvCfHd3lacl50mjHBQrPzRMPw2a4SzOH4MWwzunUTgyr4h3wMsYPkNA3IbfY0oYc9ZyWRLhFJDg1YWpfUDvJCnQi3QZypmAy6w8XmoWawVTnQrVBowDS6bd-NNCL_vIwmtoevvUaGJBjXtUFcvCwKz_Z9zUrLOw_6hUB7Ys4MSewTz7OohOUzc1t-Myb_fBw3vCVzNA',
    benefits: '₹5 Lakh Health Cover',
    benefitsLabel: '₹5 Lakh Cover',
    timelineLabel: 'Ongoing',
    eligibilityCriteria: {
      minAge: 0,
      maxAge: 100,
      maxIncome: 300000,
      gender: 'All'
    },
    keyPoints: [
      'Provides cashless and paperless access to services for the beneficiary at the point of service.',
      'Covers up to 3 days of pre-hospitalization and 15 days post-hospitalization expenses.',
      'No restriction on family size, age, or gender.',
      'Pre-existing conditions are covered from day one in all empanelled hospitals.'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Ration Card (under National Food Security Act)',
      'Income Certificate (stating income < ₹3,0,000/year)',
      'PM-JAY Gold Card (if already registered)'
    ],
    tags: ['Cashless Hospitalization', 'Insurance', 'Family Cover'],
    hiName: 'आयुष्मान भारत – पीएम-जय',
    hiSponsor: 'राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA)',
    hiDescription: 'माध्यमिक और तृतीयक अस्पताल में भर्ती के लिए प्रति वर्ष प्रति परिवार ₹5 लाख का स्वास्थ्य कवर प्रदान करने वाली दुनिया की सबसे बड़ी सरकारी वित्त पोषित स्वास्थ्य योजना।',
    hiBenefits: '₹5 लाख का स्वास्थ्य कवर',
    hiBenefitsLabel: '₹5 लाख कवर',
    hiTimelineLabel: 'सतत',
    hiKeyPoints: [
      'सेवा स्थल पर लाभार्थी के लिए सेवाओं तक कैशलेस और पेपरलेस पहुंच प्रदान करता है।',
      'अस्पताल में भर्ती होने से पहले के 3 दिन और अस्पताल में भर्ती होने के बाद के 15 दिनों के खर्च को कवर करता है।',
      'परिवार के आकार, आयु या लिंग पर कोई प्रतिबंध नहीं।',
      'सभी सूचीबद्ध अस्पतालों में पहले दिन से ही पहले से मौजूद संचारी व गैर-संचारी रोग कवर होते हैं।'
    ],
    hiDocumentsRequired: [
      'आधार कार्ड',
      'राशन कार्ड (राष्ट्रीय खाद्य सुरक्षा अधिनियम के तहत)',
      'आय प्रमाण पत्र (आय < ₹3,00,000/वर्ष)',
      'पीएम-जय गोल्ड कार्ड (यदि पहले से पंजीकृत है)'
    ],
    taName: 'ஆயுஷ்மான் பாரத் – PM-JAY',
    taSponsor: 'தேசிய சுகாதார ஆணையம் (NHA)',
    taDescription: 'இரண்டாம் நிலை மற்றும் மூன்றாம் நிலை மருத்துவச் சிகிச்சைக்காக ஒரு குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் மருத்துவக் காப்பீடு வழங்கும் உலகின் மிகப்பெரிய அரசு நிதியுதவி சுகாதாரத் திட்டம்.',
    taBenefits: '₹5 லட்சம் மருத்துவக் காப்பீடு',
    taBenefitsLabel: '₹5 லட்சம் காப்பீடு',
    taTimelineLabel: 'தொடர்கிறது',
    taKeyPoints: [
      'சிகிச்சை தலம் அல்லது மருத்துவமனையில் பணமில்லா மற்றும் காகிதமில்லாச் சேவைகளை வழங்குகிறது.',
      'மருத்துவமனையில் அனுமதிக்கப்படுவதற்கு முந்தைய 3 நாட்கள் மற்றும் அனுமதிக்குப் பிந்தைய 15 நாட்களுக்கான செலவுகளை உள்ளடக்கியது.',
      'குடும்ப உறுப்பினர்களின் எண்ணிக்கை, வயது அல்லது பாலினத்திற்கு வரம்புகள் இல்லை.',
      'அனைத்து அரசுப் பரிந்துரைத்த மருத்துவமனைகளிலும் முதல் நாளிலிருந்தே முன்பிருந்த நோய்களுக்கும் காப்பீடு உண்டு.'
    ],
    taDocumentsRequired: [
      'ஆதார் அட்டை',
      'குடும்ப அட்டை (ரேஷன் கார்டு)',
      'வருமானச் சான்றிதழ் (ஆண்டு வருமானம் < ₹3,00,000)',
      'PM-JAY தங்க அட்டை (ஏற்கனவே பதிவு செய்திருந்தால்)'
    ]
  },
  {
    id: 'nsp-scholarship',
    name: 'NSP Scholarship Portal',
    sponsor: 'Ministry of Minority Affairs / Ministry of Education',
    category: 'Education',
    description: 'Centralized portal offering 50+ scholarships including pre-matric, post-matric, and merit-cum-means assistance for disadvantaged and minority students.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgtXlHDK2Hgcu4ELtKGZexFxQryXUwLtkywVclNFT1NmLYz5P54A135xbtUknILAAJIz90r3oVuDffRE46_WTTV_RvSHMAB-IfK2iBG5ih3txTtzFYPIKcEArv6pceKtbdDQ9eBjMiuNrEHwo1G5KHzwqfxHNnK_88qUtiMfKi9eCx6BmEdHTRIgMcUP-eC77Pz38qnDRM75lX5LzYiuJX0ZFO-0HfGFTwGl_sNB_FcexhXCqKP7EhnFq94ZTBb9MAb6YlMy8ghN0',
    benefits: 'Tuition Fee Waiver & Stipend up to ₹50,000',
    benefitsLabel: 'Varied Benefits',
    timelineLabel: 'May 31, 2026',
    deadline: 'May 31, 2026',
    eligibilityCriteria: {
      minAge: 5,
      maxAge: 30,
      maxIncome: 250000,
      allowedOccupations: ['Student'],
      gender: 'All'
    },
    keyPoints: [
      'Simplifies scholarship application process down to a single digital standard.',
      'Covers standard educational course fees, books, and living maintenance allowances.',
      'Direct credit into student accounts using Aadhaar Pay Gateway.',
      'Provides reservation benefits for girls and female students.'
    ],
    documentsRequired: [
      'Student Aadhaar Card',
      'Mark sheet of last qualifying examination (Minimum 50% marks)',
      'Current Institute Fee Receipt & Bonafide Student Certificate',
      'Annual Income Certificate of Parents',
      'Bank details (Passbook or cancelled cheque)'
    ],
    tags: ['Students', 'Higher Education', 'Financial Assistance'],
    hiName: 'एनएसपी छात्रवृत्ति पोर्टल',
    hiSponsor: 'अल्पसंख्यक कार्य मंत्रालय / शिक्षा मंत्रालय',
    hiDescription: 'वंचित और अल्पसंख्यक छात्रों के लिए प्री-मैट्रिक, पोस्ट-मैट्रिक और मेरिट-कम-मींस सहायता सहित 50+ छात्रवृत्तियां प्रदान करने वाला केंद्रीकृत पोर्टल।',
    hiBenefits: 'ट्यूशन फीस माफी और ₹50,000 तक का वजीफा',
    hiBenefitsLabel: 'विविध लाभ',
    hiTimelineLabel: '३१ मई, २०२६',
    hiKeyPoints: [
      'छात्रवृत्ति आवेदन प्रक्रिया को एक ही डिजिटल मानक में सरल बनाता है।',
      'मानक शैक्षिक पाठ्यक्रम शुल्क, किताबें और दैनिक जीवन रखरखाव भत्ते को कवर करता है।',
      'आधार भुगतान गेटवे का उपयोग करके छात्र खातों में सीधे क्रेडिट।',
      'छात्राओं और महिला वर्ग के लिए आरक्षण श्रेणी का लाभ उठाता है।'
    ],
    hiDocumentsRequired: [
      'छात्र का आधार कार्ड',
      'पिछली उत्तीर्ण परीक्षा की मार्कशीट (न्यूनतम 50% अंक)',
      'संस्थान की वर्तमान शुल्क रसीद और बोनाफाइड छात्र प्रमाण पत्र',
      'माता-पिता का वार्षिक आय प्रमाण पत्र',
      'बैंक विवरण (पासबुक या रद्द किया गया चेक)'
    ],
    taName: 'தேசிய கல்வி உதவித்தொகை தளம் (NSP)',
    taSponsor: 'பிற்படுத்தப்பட்டோர் மற்றும் சிறுபான்மையினர் நல அமைச்சகம் / கல்வி அமைச்சகம்',
    taDescription: 'பின்தங்கிய மற்றும் சிறுபான்மையின மாணவர்களுக்கான மெட்ரிக் முன்படிப்பு, மெட்ரிக் மேற்படிப்பு மற்றும் தகுதி அடிப்படையிலான நிதியுதவி உட்பட 50க்கும் மேற்பட்ட கல்வி உதவித்தொகைகளை வழங்கும் ஒருங்கிணைந்த தளம்.',
    taBenefits: 'கல்வி கட்டண விலக்கு மற்றும் ₹50,000 வரை உதவித்தொகை',
    taBenefitsLabel: 'பல்வேறு நன்மைகள்',
    taTimelineLabel: '31 மே, 2026',
    taKeyPoints: [
      'கல்வி உதவித்தொகை விண்ணப்பச் செயல்முறையை ஒற்றை டிஜிட்டல் தளமாக எளிதாக்குகிறது.',
      'கல்விப் படிப்புக்கான கட்டணம், புத்தகங்கள் மற்றும் தங்கும் செலவு அலவன்ஸ்களை உள்ளடக்கியது.',
      'ஆதார் பேமண்ட் கேட்வே மூலம் மாணவர்களின் வங்கிக் கணக்குகளில் நேரடியாக பணம் செலுத்தப்படும்.',
      'மாணவிகளுக்கு முன்னுரிமை மற்றும் சிறப்பு ஒதுக்கீடு பலன்களை வழங்குகிறது.'
    ],
    taDocumentsRequired: [
      'மாணவர் ஆதார் அட்டை',
      'கடைசி தகுதித் தேர்வின் மதிப்பெண் பட்டியல் (குறைந்தது 50% மதிப்பெண்கள்)',
      'தற்போதைய கல்வி நிலைய கட்டண ரசீது மற்றும் மாணவர் சான்றிதழ்',
      'பெற்றோரின் ஆண்டு வருமானச் சான்றிதழ்',
      'வங்கி கணக்கு விவரங்கள் (வங்கி புத்தக நகல்)'
    ]
  },
  {
    id: 'pm-awas',
    name: 'Pradhan Mantri Awas Yojana (PMAY)',
    sponsor: 'Ministry of Housing and Urban Affairs',
    category: 'Housing',
    description: 'Bridges housing shortages by providing interest subsidies up to 6.5% on housing loans or direct financial assistance for building affordable homes.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800',
    benefits: 'Home Loan Subsidy up to ₹2.67 Lakhs',
    benefitsLabel: '₹2.67 Lakh Subsidy',
    timelineLabel: 'March 2027',
    deadline: 'March 31, 2027',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      maxIncome: 600000,
      gender: 'All'
    },
    keyPoints: [
      'Empowers women by mandating female co-ownership of housing projects.',
      'Subsidizes home purchase, construction, or extension of existing rooms.',
      'Preference given to low-income groups (LIG) and economically weaker sections (EWS).'
    ],
    documentsRequired: [
      'Aadhaar Card of all family members',
      'Income Certificate / Salaried Form 16',
      'Affidavit mentioning that candidate does not own a Pucca house',
      'Land/Property Registration Paper'
    ],
    tags: ['Affordable Housing', 'Home Loan Sab', 'Subsidy'],
    hiName: 'प्रधान मंत्री आवास योजना (PMAY)',
    hiSponsor: 'आवासन और शहरी कार्य मंत्रालय',
    hiDescription: 'सस्ती दरों पर पक्के घर बनाने के लिए आवास ऋण पर 6.5% तक की ब्याज सब्सिडी या सीधे वित्तीय सहायता प्रदान करके आवास की कमी को दूर करता है।',
    hiBenefits: 'गृह ऋण ब्याज में ₹2.67 लाख तक की सब्सिडी',
    hiBenefitsLabel: '₹2.67 लाख सब्सिडी',
    hiTimelineLabel: 'मार्च २०२७',
    hiKeyPoints: [
      'आवास परियोजनाओं में महिलाओं के संयुक्त स्वामित्व को अनिवार्य कर सशक्त बनाता है।',
      'घर खरीदने, निर्माण करने या अतिरिक्त कमरों के विस्तार पर सब्सिडी प्रदान करता है।',
      'कम आय वाले समूहों (LIG) और आर्थिक रूप से कमजोर वर्गों (EWS) को प्राथमिकता दी जाती है।'
    ],
    hiDocumentsRequired: [
      'परिवार के सभी सदस्यों के आधार कार्ड',
      'आय प्रमाण पत्र / वेतनभोगी फॉर्म 16',
      'शपथ पत्र कि उम्मीदवार के पास पक्का घर नहीं है',
      'भूमि या संपत्ति पंजीकरण के कागजात'
    ],
    taName: 'பிரதான் மந்திரி ஆவாஸ் யோஜனா (PMAY)',
    taSponsor: 'வீட்டுவசதி மற்றும் நகர்ப்புற விவகாரங்கள் அமைச்சகம்',
    taDescription: 'குறைந்த விலையில் பக்கா வீடுகளைக் கட்டுவதற்கு வீட்டுவசதி கடன்களுக்கு 6.5% வரை வட்டி மானியம் அல்லது நேரடி நிதியுதவி அளிப்பதன் மூலம் வசிப்பிடப் பற்றாக்குறையைப் போக்குகிறது.',
    taBenefits: '₹2.67 லட்சம் வரை வீட்டுக்கடன் வட்டி மானியம்',
    taBenefitsLabel: '₹2.67 லட்சம் மானியம்',
    taTimelineLabel: 'மார்ச் 2027',
    taKeyPoints: [
      'வீட்டுத் திட்டங்களில் பெண்களின் கூட்டு உரிமையை முன்னிறுத்தி அவர்களை மேம்படுத்துகிறது.',
      'புதிய வீடு வாங்குதல், கட்டுதல் அல்லது ஏற்கனவே உள்ள வீட்டை விரிவுபடுத்துதல் ஆகியவற்றிற்கு மானியம் வழங்குகிறது.',
      'குறைந்த வருமானம் உடையவர்கள் (LIG) மற்றும் பொருளாதாரத்தில் நலிவடைந்த பிரிவினருக்கு (EWS) முன்னுரிமை வழங்கப்படும்.'
    ],
    taDocumentsRequired: [
      'குடும்ப உறுப்பினர்கள் அனைவரின் ஆதார் அட்டை',
      'வருமானச் சான்றிதழ் / சம்பள சான்று (படிவம் 16)',
      'சொந்தமாக பக்கா வீடு இல்லை என்பதற்கான உறுதிமொழிப் பத்திரம்',
      'நிலம் அல்லது சொத்து பதிவு ஆவணங்கள்'
    ]
  },
  {
    id: 'mahila-samman',
    name: 'Mahila Samman Saving Certificate',
    sponsor: 'Ministry of Finance / Department of Posts',
    category: 'Women',
    description: 'A special high-yield small savings scheme for women and girls offering a guaranteed interest rate of 7.5% per annum with flexible partial withdrawal limits.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    benefits: 'Guaranteed 7.5% Compounded Interest',
    benefitsLabel: '7.5% Compound',
    timelineLabel: 'Ongoing',
    eligibilityCriteria: {
      minAge: 1,
      maxAge: 90,
      gender: 'Female'
    },
    keyPoints: [
      'Earns high guaranteed interest rate of 7.5% per annum.',
      'Investment limit: Minimum of ₹1,000 and Maximum of ₹2,00,000.',
      'Tenure of 2 years with option for partial withdrawal up to 40% after 1 year.',
      'Exempted from tax deductions at source (TDS).'
    ],
    documentsRequired: [
      'Aadhaar Card of girl/woman',
      'PAN Card',
      'Post Office Account details',
      'Passport size photographs'
    ],
    tags: ['Savings', 'Women Empowerment', 'Guaranteed Returns'],
    hiName: 'महिला सम्मान बचत पत्र',
    hiSponsor: 'वित्त मंत्रालय / डाक विभाग',
    hiDescription: 'लचीली आंशिक निकासी सीमाओं के साथ 7.5% प्रति वर्ष की गारंटीकृत ब्याज दर की पेशकश करने वाली महिलाओं और लड़कियों के लिए एक विशेष उच्च-उपज वाली छोटी बचत योजना।',
    hiBenefits: 'गारंटीकृत 7.5% चक्रवृद्धि ब्याज',
    hiBenefitsLabel: '7.5% चक्रवृद्धि',
    hiTimelineLabel: 'सतत',
    hiKeyPoints: [
      'प्रति वर्ष 7.5% की उच्च गारंटीकृत ब्याज दर अर्जित करता है।',
      'निवेश सीमा: न्यूनतम ₹1,000 और अधिकतम ₹2,00,000।',
      '२ वर्ष की अवधि के साथ १ वर्ष के बाद ४०% तक आंशिक निकासी का विकल्प।',
      'स्रोत पर कर कटौती (TDS) से छूट दी गई है।'
    ],
    hiDocumentsRequired: [
      'लड़की या महिला का आधार कार्ड',
      'पैन कार्ड',
      'डाकघर खाता विवरण',
      'पासपोर्ट आकार की तस्वीरें'
    ],
    taName: 'மகிளா சம்மான் சேமிப்புச் சான்றிதழ்',
    taSponsor: 'நிதி அமைச்சகம் / அஞ்சல் துறை',
    taDescription: 'பெண்கள் மற்றும் சிறுமிகளுக்கான சிறப்பு சிறு சேமிப்புத் திட்டம், ஆண்டுக்கு 7.5% உத்தரவாத வட்டி விகிதத்துடன் நெகிழ்வான பகுதித் திரும்பப் பெறும் வசதியையும் வழங்குகிறது.',
    taBenefits: 'உத்தரவாதம் அளிக்கப்பட்ட 7.5% கூட்டு வட்டி',
    taBenefitsLabel: '7.5% கூட்டு வட்டி',
    taTimelineLabel: 'தொடர்கிறது',
    taKeyPoints: [
      'ஆண்டுக்கு 7.5% என்ற மிக உயர்ந்த உத்தரவாத வட்டி விகிதத்தை வழங்குகிறது.',
      'முதலீட்டு வரம்பு: குறைந்தபட்சம் ₹1,000 மற்றும் அதிகபட்சம் ₹2,00,000 வரை.',
      '2 ஆண்டுகள் முதிர்வு காலம், 1 ஆண்டுக்கு பின் 40% வரை பகுதித் திரும்பப் பெறும் வசதி.',
      'வருமான வரி மூல வரி பிடித்தத்தில் (TDS) இருந்து விலக்கு அளிக்கப்பட்டுள்ளது.'
    ],
    taDocumentsRequired: [
      'பெண்/சிறுமியின் ஆதார் அட்டை',
      'பான் கார்டு (PAN)',
      'தபால் நிலைய கணக்கு விவரங்கள்',
      'பாஸ்போர்ட் அளவு புகைப்படங்கள்'
    ]
  },
  {
    id: 'pm-mudra',
    name: 'Pradhan Mantri MUDRA Yojana',
    sponsor: 'Micro Units Development & Refinance Agency Ltd.',
    category: 'Finance',
    description: 'Enables micro and small enterprises to access collateral-free business loans up to ₹10 Lakhs across Shishu, Kishor, and Tarun categories.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    benefits: 'Collateral-free loan up to ₹10 Lakhs',
    benefitsLabel: 'Up to ₹10L Loan',
    timelineLabel: 'Ongoing',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      allowedOccupations: ['Self-employed'],
      gender: 'All'
    },
    keyPoints: [
      'Shishu category: Loan coverage up to ₹50,000 for startup vendors.',
      'Kishor category: Loan coverage up to ₹5,00,000 for expanding services.',
      'Tarun category: Loan coverage up to ₹10,00,000 for commercial business scale.',
      'Zero processing fee and low commercial interest rates applied.'
    ],
    documentsRequired: [
      'Identity Proof (Voter ID/Driving License/Aadhaar)',
      'Business Registration & Address proof',
      'Balance sheet of past 2 years (For Kishor & Tarun loans)',
      'Quotation of machinery/assets to purchase'
    ],
    tags: ['Business Loan', 'Entrepreneurs', 'SME Growth'],
    hiName: 'प्रधान मंत्री मुद्रा योजना',
    hiSponsor: 'माइक्रो यूनिट्स डेवलपमेंट एंड रीफाइनेंस एजेंसी लिमिटेड',
    hiDescription: 'शिशु, किशोर और तरुण श्रेणियों में सूक्ष्म और लघु उद्यमों को ₹10 लाख तक के संपार्श्विक-मुक्त व्यापार ऋण का उपयोग करने में सक्षम बनाता है।',
    hiBenefits: '₹10 लाख तक का कोलेटरल-फ्री व्यापार ऋण',
    hiBenefitsLabel: '₹10 लाख तक ऋण',
    hiTimelineLabel: 'सतत',
    hiKeyPoints: [
      'शिशु श्रेणी: स्टार्टअप विक्रेताओं के लिए ₹50,000 तक का ऋण कवरेज।',
      'किशोर श्रेणी: सेवाओं के विस्तार के लिए ₹5,00,000 तक का ऋण कवरेज।',
      'तरुण श्रेणी: वाणिज्यिक व्यापार पैमाने के लिए ₹10,00,000 तक का ऋण कवरेज।',
      'लागू की गई शून्य प्रसंस्करण शुल्क और कम कर्माशियली ब्याज दरें।'
    ],
    hiDocumentsRequired: [
      'पहचान प्रमाण (मतदाता पहचान पत्र/ड्राइविंग लाइसेंस/आधार)',
      'व्यापार पंजीकरण और पता प्रमाण',
      'पिछले २ वर्षों की बैलेंस शीट (किशोर और तरुण ऋण के लिए)',
      'मशीनरी या संपत्ति खरीदने के लिए कोटेशन दस्तावेज'
    ],
    taName: 'பிரதான் மந்திரி முத்ரா யோஜனா',
    taSponsor: 'நுண் அலகுகள் மேம்பாடு மற்றும் மறுநிதி முகமை (MUDRA)',
    taDescription: 'நுண்ணிய மற்றும் சிறு நிறுவனங்கள் ஷிஷு, கிஷோர் மற்றும் தருண் பிரிவுகளின் கீழ் ₹10 லட்சம் வரை பிணையமில்லா வணிகக் கடன்களைப் பெற உதவுகிறது.',
    taBenefits: '₹10 லட்சம் வரை பிணையமில்லா வணிகக் கடன்',
    taBenefitsLabel: '₹10 லட்சம் வரை கடன்',
    taTimelineLabel: 'தொடர்கிறது',
    taKeyPoints: [
      'ஷிஷு பிரிவு: புதிய வியாபாரிகளுக்கு ₹50,000 வரை கடன் வழங்குதல்.',
      'கிஷோர் பிரிவு: வணிகத்தை மேம்படுத்த ₹5,00,000 வரை கடன் வழங்குதல்.',
      'தருண் பிரிவு: பெரிய அளவிலான வர்த்தகங்களுக்கு ₹10,00,000 வரை கடன் வழங்குதல்.',
      'ஆவண செயலாக்கக் கட்டணம் எதுவும் இல்லை மற்றும் குறைந்த வட்டி விகிதங்கள் மட்டுமே.'
    ],
    taDocumentsRequired: [
      'அடையாளச் சான்று (வாக்காளர் அட்டை/ஓட்டுநர் உரிமம்/ஆதார் அட்டை)',
      'வணிகப் பதிவு மற்றும் முகவரிச் சான்று',
      'கடந்த 2 ஆண்டுகளின் இருப்புநிலைக் குறிப்பு (கிஷோர் மற்றும் தருண் கடன்களுக்கு)',
      'வாங்க வேண்டிய இயந்திரங்கள்/சொத்துகளின் விலைப்பட்டியல் விவரம்'
    ]
  }
];
