export type Language = 'en' | 'hi' | 'ta';

export interface TranslationSet {
  // Navigation
  home: string;
  allSchemes: string;
  trackApplication: string;
  citizenProfile: string;
  latestUpdates: string;
  portal: string;
  govOfIndia: string;
  dbtActive: string;
  
  // Hero section
  heroSubtitle: string;
  heroTitleBase: string;
  heroTitleYojana: string;
  heroTitleEnd: string;
  heroDesc: string;
  searchPlaceholder: string;
  searchBtn: string;
  
  // Hero Stats
  activeSchemes: string;
  beneficiaries: string;
  statesCovered: string;
  benefitsDisbursed: string;
  secureDbtUpTime: string;
  successfulApplicants: string;
  centralInitiatives: string;

  // Categories
  allCategories: string;
  agriculture: string;
  health: string;
  education: string;
  housing: string;
  women: string;
  finance: string;

  // Tabs / Sections
  popularSchemesTitle: string;
  popularSchemesSubtitle: string;
  viewAllBtn: string;
  howToApplyTitle: string;
  howToApplySubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  step5Title: string;
  step5Desc: string;

  // Eligibility Checker
  smartCheckerTitle: string;
  smartCheckerDesc: string;
  dynamicEval: string;
  checkCriteriaAgeOccupation: string;
  checkIncomeThreshold: string;
  directShortcutLinks: string;
  evaluationComplete: string;
  matchingOpportunities: string;
  checkAgain: string;
  noMatchingSchemes: string;
  unmatchedAdjustFilters: string;
  notMatchingCount: string;
  findMySchemesBtn: string;
  genderCategoryLabel: string;
  allGenders: string;
  maleGender: string;
  femaleGender: string;
  ageYearsLabel: string;
  annualIncomeLabel: string;
  selectRangePlaceholder: string;
  stateLabel: string;
  selectOptionPlaceholder: string;
  occupationLabel: string;

  // Status Tracker
  trackerTitle: string;
  trackerDesc: string;
  trackInputPlaceholder: string;
  trackBtn: string;
  errorTrackPrompt: string;
  errorTrackNotFound: string;
  applicationStatusLabel: string;
  encryptedGatewayNode: string;
  expectedBy: string;

  // Profiles
  profileTitle: string;
  profileSubtitle: string;
  verifiedCitizen: string;
  emailLabel: string;
  stateLabelProfile: string;
  occupationLabelProfile: string;
  aadhaarStatusLabel: string;
  linkedStatus: string;
  submittedApplicationsLedger: string;
  inAudit: string;
  trackBtnProfile: string;
  submittedOn: string;

  // Card & Common Action Buttons
  guideBtn: string;
  applyNowBtn: string;
  closeBtn: string;
  onlineEForm: string;
  cancelBtn: string;
  submitEFormBtn: string;
  
  // Footer
  footerDesc: string;
  footerRights: string;
  footerHelpline: string;
  footerSupportBar: string;
  quickLinks: string;
  browseOptions: string;
  officialPortals: string;
}

export const TRANSLATIONS: Record<Language, TranslationSet> = {
  en: {
    home: 'Home',
    allSchemes: 'Schemes',
    trackApplication: 'My Applications',
    citizenProfile: 'Analytics',
    latestUpdates: 'LATEST UPDATES',
    portal: 'SCHEMESETU',
    govOfIndia: 'Govt. Services',
    dbtActive: 'DBT Net Active',
    
    heroSubtitle: 'Built for Trust, Designed for Speed',
    heroTitleBase: 'Every government scheme you qualify for, in ',
    heroTitleYojana: 'one place.',
    heroTitleEnd: '',
    heroDesc: 'Find schemes by category, apply in guided steps with the right documents, and track each application until the benefit reaches you.',
    searchPlaceholder: 'Search schemes by name, category, or state details...',
    searchBtn: 'Search',
    
    activeSchemes: 'Active Schemes',
    beneficiaries: 'Beneficiaries',
    statesCovered: 'States Covered',
    benefitsDisbursed: 'Disbursed directly via DBT',
    secureDbtUpTime: 'Secure digital up-time',
    successfulApplicants: 'Successful applicants',
    centralInitiatives: 'Active central schemes',

    allCategories: 'All Categories',
    agriculture: 'Agriculture',
    health: 'Health',
    education: 'Education',
    housing: 'Housing',
    women: 'Women',
    finance: 'Finance',

    popularSchemesTitle: 'Popular schemes this month',
    popularSchemesSubtitle: 'Four pillars that make accessing benefits as straightforward as it should be.',
    viewAllBtn: 'View all →',
    howToApplyTitle: 'How to Apply — Step by Step',
    howToApplySubtitle: 'The simplified central unified pipeline for hassle-free direct audits and funding.',
    
    step1Title: 'Find Your Scheme',
    step1Desc: 'Scan or filter list indices. Use our smart matching Eligibility widget below.',
    step2Title: 'Check Eligibility',
    step2Desc: 'Input parameters representing age, state, brackets. Match results instantly.',
    step3Title: 'Prepare Docs',
    step3Desc: 'Consult requirements guides checklist. Scrape together PDFs or softcopies.',
    step4Title: 'Apply Online',
    step4Desc: 'Complete rapid digital form on portal nodes and sign with Aadhaar credentials.',
    step5Title: 'Track Status',
    step5Desc: 'Copy reference keys. Check live timelines to watch approvals disburse funds.',

    smartCheckerTitle: 'Smart Eligibility Checker',
    smartCheckerDesc: 'Answer a few simple questions representing household statistics — we will scan all central databases and display compatible welfare schemes instantly.',
    dynamicEval: 'Dynamic Evaluation',
    checkCriteriaAgeOccupation: 'Match against Age and Occupation parameters',
    checkIncomeThreshold: 'Check income threshold compatibility rules',
    directShortcutLinks: 'Direct shortcut links to application e-forms',
    evaluationComplete: 'Evaluation Complete',
    matchingOpportunities: 'Found {count} matching welfare opportunities',
    checkAgain: 'Check Again',
    noMatchingSchemes: 'No direct active matches found.',
    unmatchedAdjustFilters: 'Adjust your occupation filters or income limits to browse general category initiatives.',
    notMatchingCount: 'Other Non-Matching Schemes available on Portal: {count}',
    findMySchemesBtn: 'Find My Schemes',
    genderCategoryLabel: 'Gender Category',
    allGenders: 'All Genders',
    maleGender: 'Male',
    femaleGender: 'Female',
    ageYearsLabel: 'Age (Years)',
    annualIncomeLabel: 'Annual Income (₹)',
    selectRangePlaceholder: 'Select range',
    stateLabel: 'State',
    selectOptionPlaceholder: 'Select Option',
    occupationLabel: 'Occupation',

    trackerTitle: 'Track Your Application Status',
    trackerDesc: 'Enter your unique e-Form reference number (e.g. {code}) to query the status.',
    trackInputPlaceholder: 'Enter Reference (e.g. {code})',
    trackBtn: 'Track Status',
    errorTrackPrompt: 'Please enter an application reference code',
    errorTrackNotFound: 'No matching records found for Code: "{code}". Please verify and try again.',
    applicationStatusLabel: 'Application Status: {status}',
    encryptedGatewayNode: 'Encrypted DBT Gateway Node ID: 221-NIC-SECURE',
    expectedBy: 'Expected by',

    profileTitle: 'Analytics Portal',
    profileSubtitle: 'Transparent analytics showing application cycles and real-time processing indicators.',
    verifiedCitizen: 'Verified Citizen',
    emailLabel: 'Email:',
    stateLabelProfile: 'State:',
    occupationLabelProfile: 'Occupation:',
    aadhaarStatusLabel: 'Aadhaar status:',
    linkedStatus: 'Linked',
    submittedApplicationsLedger: 'Submitted Applications Ledger',
    inAudit: 'In Audit',
    trackBtnProfile: 'Track',
    submittedOn: 'Submitted on: ',

    guideBtn: 'Guide',
    applyNowBtn: 'Apply Now',
    closeBtn: 'Close Guide',
    onlineEForm: 'Portal e-Form',
    cancelBtn: 'Cancel',
    submitEFormBtn: 'Submit e-Form',

    footerDesc: "Discover, apply, and track every government scheme from one trusted portal.",
    footerRights: '© 2026 SchemeSetu — A demo portal for citizen services. Prototype — data is stored locally.',
    footerHelpline: 'National toll-free Helpline:',
    footerSupportBar: 'Jai Hind — SchemeSetu Gov Services',
    quickLinks: 'Quick Links',
    browseOptions: 'Browse Options',
    officialPortals: 'Official Portals',
  },
  hi: {
    home: 'होम',
    allSchemes: 'योजनाएं',
    trackApplication: 'मेरे आवेदन',
    citizenProfile: 'विश्लेषण',
    latestUpdates: 'नवीनतम अपडेट',
    portal: 'योजनासेतु',
    govOfIndia: 'सरकारी सेवाएं',
    dbtActive: 'डीबीटी सक्रिय',
    
    heroSubtitle: 'विश्वास के लिए निर्मित, गति के लिए डिज़ाइन किया गया',
    heroTitleBase: 'वही सरकारी योजनाएं जिनके आप पात्र हैं, ',
    heroTitleYojana: 'एक ही स्थान पर।',
    heroTitleEnd: '',
    heroDesc: 'श्रेणी के अनुसार योजनाएं खोजें, सही दस्तावेजों के साथ निर्देशित चरणों में आवेदन करें, और प्रत्येक आवेदन को तब तक ट्रैक करें जब तक कि लाभ आप तक न पहुंच जाए।',
    searchPlaceholder: 'नाम, श्रेणी या राज्य विवरण द्वारा योजनाएं खोजें...',
    searchBtn: 'खोजें',
    
    activeSchemes: 'सक्रिय योजनाएं',
    beneficiaries: 'लाभार्थी',
    statesCovered: 'कवर किए गए राज्य',
    benefitsDisbursed: 'डीबीटी के माध्यम से सीधे वितरित किया गया',
    secureDbtUpTime: 'सुरक्षित डिजिटल अप-टाइम',
    successfulApplicants: 'सफल आवेदक',
    centralInitiatives: 'सक्रिय केंद्रीय योजनाएं',

    allCategories: 'सभी श्रेणियां',
    agriculture: 'कृषि',
    health: 'स्वास्थ्य',
    education: 'शिक्षा',
    housing: 'आवास',
    women: 'महिला कल्याण',
    finance: 'वित्त',

    popularSchemesTitle: 'इस महीने योजनाएं लोकप्रिय हैं',
    popularSchemesSubtitle: 'चार स्तंभ जो लाभों तक पहुँच को उतना ही सीधा बनाते हैं जितना कि होना चाहिए।',
    viewAllBtn: 'सभी देखें →',
    howToApplyTitle: 'आवेदन कैसे करें — चरण दर चरण',
    howToApplySubtitle: 'परेशानी मुक्त प्रत्यक्ष ऑडिट और धन के लिए सरलीकृत केंद्रीय एकीकृत पाइपलाइन।',
    
    step1Title: 'अपनी योजना खोजें',
    step1Desc: 'योजना सूची को स्कैन या फ़िल्टर करें। नीचे दिए गए हमारे स्मार्ट पात्रता टूल का उपयोग करें।',
    step2Title: 'पात्रता जाँचे',
    step2Desc: 'आयु, राज्य, आय सीमा का प्रतिनिधित्व करने वाले विवरण भरें। तुरंत परिणाम प्राप्त करें।',
    step3Title: 'दस्तावेज तैयार करें',
    step3Desc: 'आवश्यक दस्तावेज चेकलिस्ट की सलाह लें। पीडीएफ या सॉफ्ट कॉपी एकत्र करें।',
    step4Title: 'ऑनलाइन आवेदन करें',
    step4Desc: 'पोर्टल नोड्स पर त्वरित डिजिटल फॉर्म पूरा करें और आधार क्रेडेंशियल के साथ हस्ताक्षर करें।',
    step5Title: 'स्थिति ट्रैक करें',
    step5Desc: 'संदर्भ कोड कॉपी करें। भुगतान वितरण और अनुमोदन देखने के लिए लाइव टाइमलाइन देखें।',

    smartCheckerTitle: 'स्मार्ट पात्रता जांच',
    smartCheckerDesc: 'पारिवारिक विवरण से जुड़े कुछ सरल सवालों के जवाब दें — हम तुरंत सभी केंद्रीय डेटाबेस को स्कैन करेंगे और अनुकूल योजनाएं दिखाएंगे।',
    dynamicEval: 'गतिशील मूल्यांकन',
    checkCriteriaAgeOccupation: 'आयु और व्यवसाय मापदंडों के विरुद्ध मिलान करें',
    checkIncomeThreshold: 'आय सीमा अनुकूलता नियमों की जाँच करें',
    directShortcutLinks: 'एप्लिकेशन ई-फॉर्म के सीधे शॉर्टकट लिंक',
    evaluationComplete: 'मूल्यांकन पूर्ण',
    matchingOpportunities: '{count} मिलान कल्याणकारी अवसर मिले',
    checkAgain: 'पुनः जांचें',
    noMatchingSchemes: 'कोई सीधा सक्रिय मिलान नहीं मिला।',
    unmatchedAdjustFilters: 'कल्याणकारी योजनाओं को ब्राउज़ करने के लिए अपने व्यवसाय फ़िल्टर या आय सीमा को समायोजित करें।',
    notMatchingCount: 'पोर्टल पर उपलब्ध अन्य गैर-मिलान योजनाएं: {count}',
    findMySchemesBtn: 'मेरी योजनाएं खोजें',
    genderCategoryLabel: 'लिंग श्रेणी',
    allGenders: 'सभी लिंग',
    maleGender: 'पुरुष',
    femaleGender: 'महिला',
    ageYearsLabel: 'आयु (वर्ष)',
    annualIncomeLabel: 'वार्षिक आय (₹)',
    selectRangePlaceholder: 'आय सीमा चुनें',
    stateLabel: 'राज्य',
    selectOptionPlaceholder: 'विकल्प चुनें',
    occupationLabel: 'व्यवसाय',

    trackerTitle: 'अपने आवेदन की स्थिति ट्रैक करें',
    trackerDesc: 'स्थिति जानने के लिए अपना विशिष्ट ई-फॉर्म संदर्भ नंबर (जैसे {code}) दर्ज करें।',
    trackInputPlaceholder: 'संदर्भ नंबर दर्ज करें (जैसे {code})',
    trackBtn: 'स्थिति ट्रैक करें',
    errorTrackPrompt: 'कृपया आवेदन संदर्भ कोड दर्ज करें',
    errorTrackNotFound: 'कोड: "{code}" के लिए कोई मिलान रिकॉर्ड नहीं मिला। कृपया जांचें और पुनः प्रयास करें।',
    applicationStatusLabel: 'आवेदन की स्थिति: {status}',
    encryptedGatewayNode: 'एन्क्रिप्टेड डीबीटी गेटवे नोड आईडी: 221-NIC-SECURE',
    expectedBy: 'अपेक्षित तिथि',

    profileTitle: 'विश्लेषण पोर्टल',
    profileSubtitle: 'आवेदन चक्र और वास्तविक समय प्रसंस्करण संकेतक दिखाने वाले पारदर्शी विश्लेषण।',
    verifiedCitizen: 'सत्यापित नागरिक',
    emailLabel: 'ईमेल:',
    stateLabelProfile: 'राज्य:',
    occupationLabelProfile: 'व्यवसाय:',
    aadhaarStatusLabel: 'आधार स्थिति:',
    linkedStatus: 'सम्बद्ध (Linked)',
    submittedApplicationsLedger: 'जमा किए गए आवेदनों का लेजर',
    inAudit: 'ऑडिट में',
    trackBtnProfile: 'ट्रैक करें',
    submittedOn: 'जमा करने की तिथि: ',

    guideBtn: 'मार्गदर्शिका',
    applyNowBtn: 'अभी आवेदन करें',
    closeBtn: 'गाइड बंद करें',
    onlineEForm: 'पोर्टल ई-फॉर्म',
    cancelBtn: 'रद्द करें',
    submitEFormBtn: 'ई-फॉर्म जमा करें',

    footerDesc: 'एक विश्वस्त पोर्टल के माध्यम से प्रत्येक सरकारी योजना खोजें, आवेदन करें और ट्रैक करें।',
    footerRights: '© २०२६ SchemeSetu — नागरिक सेवाओं के लिए एक प्रोटोटाइप पोर्टल। डेटा स्थानीय रूप से सहेजा गया है।',
    footerHelpline: 'राष्ट्रीय टोल-फ्री हेल्पलाइन:',
    footerSupportBar: 'जय हिंद — SchemeSetu सरकारी सेवाएं',
    quickLinks: 'त्वरित लिंक',
    browseOptions: 'विकल्प खोजें',
    officialPortals: 'आधिकारिक पोर्टल',
  },
  ta: {
    home: 'முகப்பு',
    allSchemes: 'திட்டங்கள்',
    trackApplication: 'எனது விண்ணப்பங்கள்',
    citizenProfile: 'பகுப்பாய்வு',
    latestUpdates: 'சமீபத்திய புதுப்பிப்புகள்',
    portal: 'SCHEMESETU',
    govOfIndia: 'அரசு சேவைகள்',
    dbtActive: 'டிபிடி செயலில் உள்ளது',
    
    heroSubtitle: 'நம்பகத்தன்மைக்காக உருவாக்கப்பட்டது, வேகத்திற்காக வடிவமைக்கப்பட்டது',
    heroTitleBase: 'நீங்கள் தகுதிபெறும் ஒவ்வொரு அரசு திட்டமும், ',
    heroTitleYojana: 'ஒரே இடத்தில்.',
    heroTitleEnd: '',
    heroDesc: 'வகைகளின் அடிப்படையில் திட்டங்களைக் கண்டறியவும், சரியான ஆவணங்களுடன் வழிகாட்டும் படிகளில் விண்ணப்பிக்கவும், மற்றும் உங்களிடம் பலன்கள் வந்து சேரும் வரை ஒவ்வொரு விண்ணப்பத்தையும் கண்காணிக்கவும்.',
    searchPlaceholder: 'பெயர், வகை அல்லது மாநில விவரங்கள் மூலம் திட்டங்களைத் தேடுங்கள்...',
    searchBtn: 'தேடு',
    
    activeSchemes: 'செயலில் உள்ள திட்டங்கள்',
    beneficiaries: 'பயனாளிகள்',
    statesCovered: 'உள்ளடக்கிய மாநிலங்கள்',
    benefitsDisbursed: 'டிபிடி (DBT) மூலம் நேரடியாக வழங்கப்பட்டது',
    secureDbtUpTime: 'பாதுகாப்பான டிஜிட்டல் செயல்பாட்டு நேரம்',
    successfulApplicants: 'வெற்றிகரமான விண்ணப்பதாரர்கள்',
    centralInitiatives: 'செயலில் உள்ள மத்திய திட்டங்கள்',

    allCategories: 'அனைத்து வகைகள்',
    agriculture: 'விவசாயம்',
    health: 'சுகாதாரம்',
    education: 'கல்வி',
    housing: 'வீட்டுவசதி',
    women: 'பெண்கள் நலம்',
    finance: 'நிதி',

    popularSchemesTitle: 'இந்த மாதத்தின் பிரபலமான திட்டங்கள்',
    popularSchemesSubtitle: 'பலன்களை நேரடியாக அணுகுவதை எளிதாக்குவதற்கான நான்கு தூண்கள்.',
    viewAllBtn: 'அனைத்தையும் காண்க →',
    howToApplyTitle: 'விண்ணப்பிப்பது எப்படி - படிப்படியாக',
    howToApplySubtitle: 'எளிமையான மத்திய ஒருங்கிணைந்த தளம் மூலம் நேரடி தணிக்கை மற்றும் நிதி பகிர்வு.',
    
    step1Title: 'உங்கள் திட்டத்தைக் கண்டறியவும்',
    step1Desc: 'திட்ட பட்டியலை ஸ்கேன் அல்லது ஃபில்டர் செய்யவும். கீழே உள்ள எங்கள் தகுதி கண்டறியும் கருவியைப் பயன்படுத்தவும்.',
    step2Title: 'தகுதியை சரிபார்க்கவும்',
    step2Desc: 'வயது, மாநிலம், வருமான வரம்பு போன்ற விவரங்களை உள்ளிட்டு தகுதியை உடனுக்குடன் ஒப்பிடவும்.',
    step3Title: 'ஆவணங்களைத் தயார் செய்யவும்',
    step3Desc: 'தேவைப்படும் ஆவணங்களின் சரிபார்ப்பு பட்டியலை ஆலோசித்து, பிடிஎஃப் (PDF) அல்லது மென்படிகளைத் தயார் செய்யவும்.',
    step4Title: 'இணையத்தில் விண்ணப்பிக்கவும்',
    step4Desc: 'விரைவான டிஜிட்டல் படிவத்தை பூர்த்தி செய்து, உங்கள் ஆதார் சான்றுகளுடன் கையொப்பமிடவும்.',
    step5Title: 'நிலையை கண்காணிக்கவும்',
    step5Desc: 'விண்ணப்பக் குறிப்பு எண்ணை சேமிக்கவும். நிதி பகிர்வு மற்றும் ஒப்புதல்களை உடனுக்குடன் கண்காணிக்கவும்.',

    smartCheckerTitle: 'ஸ்மார்ட் தகுதி கண்டறியும் கருவி',
    smartCheckerDesc: 'குடும்ப விவரங்கள் தொடர்பான சில எளிய கேள்விகளுக்கு பதிலளிக்கவும் — நாங்கள் உடனடியாக மத்திய தரவுத்தளங்களை ஸ்கேன் செய்து தகுதியான திட்டங்களை காட்டுவோம்.',
    dynamicEval: 'மாறும் மதிப்பீடு',
    checkCriteriaAgeOccupation: 'வயது மற்றும் தொழில் அளவுருக்களுடன் பொருத்துதல்',
    checkIncomeThreshold: 'வருமான வரம்பு தகுதி விதிகளை சரிபார்த்தல்',
    directShortcutLinks: 'விண்ணப்ப படிவங்களுக்கான நேரடி குறுக்குவழி இணைப்புகள்',
    evaluationComplete: 'மதிப்பீடு முடிந்தது',
    matchingOpportunities: '{count} பொருத்தமான திட்டங்கள் கண்டறியப்பட்டுள்ளன',
    checkAgain: 'மீண்டும் சரிபார்க்கவும்',
    noMatchingSchemes: 'நேரடி பொருத்தமான திட்டங்கள் எதுவும் கண்டறியப்படவில்லை.',
    unmatchedAdjustFilters: 'பொதுவான திட்டங்களைக் காண உங்களது தொழில் ஃபில்டர்கள் அல்லது வருமான வரம்புகளை மாற்றியமைக்கவும்.',
    notMatchingCount: 'தளத்தில் உள்ள பிற பொருந்தாத திட்டங்கள்: {count}',
    findMySchemesBtn: 'எனது திட்டங்களைக் கண்டறி',
    genderCategoryLabel: 'பாலினம்',
    allGenders: 'அனைத்து பாலினத்தவர்',
    maleGender: 'ஆண்',
    femaleGender: 'பெண்',
    ageYearsLabel: 'வயது (ஆண்டுகள்)',
    annualIncomeLabel: 'ஆண்டு வருமானம் (₹)',
    selectRangePlaceholder: 'வருமான வரம்பைத் தேர்ந்தெடுக்கவும்',
    stateLabel: 'மாநிலம்',
    selectOptionPlaceholder: 'விருப்பத்தைத் தேர்ந்தெடுக்கவும்',
    occupationLabel: 'தொழில்',

    trackerTitle: 'விண்ணப்ப நிலையை கண்காணிக்கவும்',
    trackerDesc: 'விண்ணப்பத்தின் நிலையை அறிய உங்கள் தனித்துவமான விண்ணப்பக் குறிப்பு எண்ணை (உதா: {code}) உள்ளிடவும்.',
    trackInputPlaceholder: 'விண்ணப்பக் குறிப்பு எண்ணை உள்ளிடவும் (உதா: {code})',
    trackBtn: 'நிலையை கண்காணிக்கவும்',
    errorTrackPrompt: 'தயவுசெய்து விண்ணப்பக் குறிப்பு எண்ணை உள்ளிடவும்',
    errorTrackNotFound: 'குறிப்பு எண்: "{code}" க்கான விண்ணப்பங்கள் எதுவும் இல்லை. தயவுசெய்து சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
    applicationStatusLabel: 'விண்ணப்ப நிலை: {status}',
    encryptedGatewayNode: 'பாதுகாக்கப்பட்ட டிபிடி நுழைவாயில் முனையம்: 221-NIC-SECURE',
    expectedBy: 'எதிர்பார்க்கப்படும் தேதி',

    profileTitle: 'பகுப்பாய்வு தளம்',
    profileSubtitle: 'விண்ணப்ப சுழற்சிகள் மற்றும் நிகழ்நேர செயலாக்க குறிகாட்டிகளைக் காட்டும் வெளிப்படையான பகுப்பாய்வுகள்.',
    verifiedCitizen: 'சரிபார்க்கப்பட்ட குடிமகன்',
    emailLabel: 'மின்னஞ்சல்:',
    stateLabelProfile: 'மாநிலம்:',
    occupationLabelProfile: 'தொழில்:',
    aadhaarStatusLabel: 'ஆதார் நிலை:',
    linkedStatus: 'இணைக்கப்பட்டுள்ளது',
    submittedApplicationsLedger: 'விண்ணப்ப சமர்ப்பிப்புப் பதிவேடு',
    inAudit: 'தணிக்கையில் உள்ளது',
    trackBtnProfile: 'கண்காணி',
    submittedOn: 'சமர்ப்பிக்கப்பட்ட தேதி: ',

    guideBtn: 'வழிகாட்டி',
    applyNowBtn: 'இப்போது விண்ணப்பி',
    closeBtn: 'வழிகாட்டியை மூடு',
    onlineEForm: 'இணைய படிவம்',
    cancelBtn: 'ரத்து செய்',
    submitEFormBtn: 'படிவத்தை சமர்ப்பி',

    footerDesc: 'நம்பகமான ஒற்றைத் தளம் மூலம் ஒவ்வொரு அரசு திட்டத்தையும் கண்டறிந்து, விண்ணப்பித்து, கண்காணிக்கவும்.',
    footerRights: '© 2026 SchemeSetu — குடிமக்களுக்கான மாதிரி சேவைத் தளம். மாதிரி தரவுகள் உள்ளூரில் சேமிக்கப்படும்.',
    footerHelpline: 'தேசிய கட்டணமில்லா உதவி எண்:',
    footerSupportBar: 'ஜெய் ஹிந்த் — SchemeSetu அரசு சேவைகள்',
    quickLinks: 'குறுக்குவழி இணைப்புகள்',
    browseOptions: 'தேடல் விருப்பங்கள்',
    officialPortals: 'அதிகாரப்பூர்வ தளங்கள்',
  }
};
