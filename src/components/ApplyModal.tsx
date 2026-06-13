import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Scheme, Application } from '../types';
import { Language } from '../data/translations';

interface ApplyModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (application: Application) => void;
  userEmail?: string;
  currentLanguage: Language;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  scheme,
  isOpen,
  onClose,
  onSubmitApplication,
  userEmail,
  currentLanguage,
}) => {
  if (!isOpen || !scheme) return null;

  const isEn = currentLanguage === 'en';

  // Form Fields
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('All');
  const [phone, setPhone] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [income, setIncome] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [occupation, setOccupation] = useState('Farmer');
  const [declared, setDeclared] = useState(false);

  // Error States
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Success States
  const [successApp, setSuccessApp] = useState<Application | null>(null);

  const statesList = [
    'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh'
  ];

  const occupationsList = ['Farmer', 'Student', 'Self-employed', 'Salaried', 'Unemployed'];

  const validate = () => {
    const errs: Record<string, string> = {};
    const isEn = currentLanguage === 'en';
    const isHi = currentLanguage === 'hi';

    if (!name.trim()) {
      errs.name = isEn ? 'Full name is required' : isHi ? 'पूरा नाम अनिवार्य है' : 'முழு பெயர் கட்டாயமாகும்';
    }
    if (!age || Number(age) <= 0 || Number(age) > 120) {
      errs.age = isEn ? 'Provide a valid age (1-120)' : isHi ? 'एक वैध आयु प्रदान करें (1-120)' : 'சரியான வயதை உள்ளிடவும் (1-120)';
    }
    if (!phone || phone.length !== 10 || isNaN(Number(phone))) {
      errs.phone = isEn ? '10-digit mobile number required' : isHi ? '10 अंकों का मोबाइल नंबर अनिवार्य है' : '10 இலக்க மொபைல் எண் கட்டாயமாகும்';
    }
    if (!aadhaar || aadhaar.length !== 12 || isNaN(Number(aadhaar))) {
      errs.aadhaar = isEn ? '12-digit Aadhaar number is mandatory' : isHi ? '12 अंकों का आधार नंबर अनिवार्य है' : '12 இலக்க ஆதார் எண் கட்டாயமாகும்';
    }
    if (!income || Number(income) < 0) {
      errs.income = isEn ? 'Provide annual household income' : isHi ? 'वार्षिक घरेलू आय प्रदान करें' : 'ஆண்டு வருமானத்தை உள்ளிடவும்';
    }
    if (!declared) {
      errs.declared = isEn ? 'Please agree to the system declarations' : isHi ? 'कृपया सिस्टम घोषणाओं से सहमत हों' : 'தயவுசெய்து உறுதிமொழி படிவத்தை ஏற்றுக்கொள்ளவும்';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate random tracking number
    const prefix = scheme.id === 'pm-kisan' ? 'PKS' : scheme.id === 'ayushman-bharat' ? 'AYU' : 'SCH';
    const randDigits = Math.floor(1000000 + Math.random() * 9000000);
    const referenceCode = `${prefix}-2026-${randDigits}`;

    // Create realistic tracking timeline
    const currentDate = new Date();
    const localeCode = currentLanguage === 'en' ? 'en-GB' : currentLanguage === 'hi' ? 'hi-IN' : 'ta-IN';
    const formattedDate = currentDate.toLocaleDateString(localeCode, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const formattedTime = currentDate.toLocaleTimeString(localeCode, {
      hour: '2-digit',
      minute: '2-digit'
    });

    const isFarmerCheck = occupation === 'Farmer' && scheme.id === 'pm-kisan';
    const subStatus: 'Submitted' | 'Verified' | 'Approved' | 'Disbursed' = 'Submitted';

    const displayName = currentLanguage === 'ta' && scheme.taName 
      ? scheme.taName 
      : currentLanguage === 'hi' && scheme.hiName 
      ? scheme.hiName 
      : scheme.name;

    const displayCategory = currentLanguage === 'ta' 
      ? (scheme.category === 'Agriculture' ? 'விவசாயம்' : scheme.category === 'Health' ? 'சுகாதாரம்' : scheme.category === 'Education' ? 'கல்வி' : scheme.category === 'Housing' ? 'வீட்டுவசதி' : scheme.category === 'Women' ? 'பெண்கள் நலம்' : 'மத்திய திட்டம்')
      : currentLanguage === 'hi' 
      ? (scheme.category === 'Agriculture' ? 'कृषि' : scheme.category === 'Health' ? 'स्वास्थ्य' : scheme.category === 'Education' ? 'शिक्षा' : scheme.category === 'Housing' ? 'आवास' : scheme.category === 'Women' ? 'महिला कल्याण' : 'केंद्रीय योजना')
      : scheme.category;

    const newApp: Application = {
      referenceNumber: referenceCode,
      schemeId: scheme.id,
      schemeName: displayName,
      category: displayCategory,
      applicantName: name,
      applicantAge: Number(age),
      applicantIncome: Number(income),
      applicantState: state,
      applicantOccupation: occupation,
      applicantPhone: phone,
      submissionDate: formattedDate,
      status: subStatus,
      timeline: [
        {
          status: isEn ? 'Application Submitted' : currentLanguage === 'hi' ? 'आवेदन जमा हुआ' : 'விண்ணப்பம் சமர்ப்பிக்கப்பட்டது',
          date: `${formattedDate} — ${formattedTime}`,
          description: isEn 
            ? 'Citizen data uploaded successfully to the unified portal. Aadhaar signature status is active.'
            : currentLanguage === 'hi'
            ? 'नागरिक डेटा यूनिफाइड पोर्टल नोड्स पर सफलतापूर्वक अपलोड किया गया। आधार डिजिटल हस्ताक्षर सक्रिय है।'
            : 'பாரத் தளம் மூலம் குடிமக்களின் விவரங்கள் வெற்றிகரமாக பதிவேற்றப்பட்டது. ஆதார் இணைப்பும் வெற்றிகரமாக சரிபார்க்கப்பட்டது.',
          completed: true
        },
        {
          status: isEn ? 'Document Verification' : currentLanguage === 'hi' ? 'दस्तावेज सत्यापन' : 'ஆவணச் சரிபார்ப்பு',
          date: isEn ? 'Processing' : currentLanguage === 'hi' ? 'प्रक्रिया जारी' : 'செயலாக்கத்தில் உள்ளது',
          description: isEn
            ? 'National DBT portal checks matching land records, income brackets, or institution registries.'
            : currentLanguage === 'hi'
            ? 'राष्ट्रीय डीबीटी पोर्टल मिलान भूमि अभिलेखों, आय सीमाओं या संस्थान रजिस्ट्रियों की जाँच कर रहा है।'
            : 'மத்திய மற்றும் மாநில ஒருங்கிணைந்த தரவுத்தளங்கள் மூலம் ஆவணங்களின் விவரங்கள் சரிபார்க்கப்படுகின்றன.',
          completed: false
        },
        {
          status: isEn ? 'Approval Granted' : currentLanguage === 'hi' ? 'स्वीकृति दी गई' : 'ஒப்புதல் வழங்கப்பட்டது',
          date: isEn ? 'Pending' : currentLanguage === 'hi' ? 'लंबित' : 'நிலுவையில் உள்ளது',
          description: isEn
            ? 'Authorized local state department officer verifies compliance threshold.'
            : currentLanguage === 'hi'
            ? 'अधिकृत स्थानीय राज्य विभाग अधिकारी अनुपालन सीमा की पुष्टि करता है।'
            : 'அங்கீகரிக்கப்பட்ட உள்ளூர் உயரதிகாரி மூலம் தகுதிகள் மற்றும் ஆவணங்களின் மதிப்பீடு சரிபார்க்கப்படும்.',
          completed: false
        },
        {
          status: isEn ? 'Payment Processing' : currentLanguage === 'hi' ? 'भुगतान प्रक्रिया' : 'பணம் செலுத்துதல் செயல்பாட்டில் உள்ளது',
          date: isEn ? 'Pending' : currentLanguage === 'hi' ? 'लंबित' : 'நிலுவையில் உள்ளது',
          description: isEn
            ? 'Financial compensation credited via DBT gateway.'
            : currentLanguage === 'hi'
            ? 'डीबीटी गेटवे के माध्यम से वित्तीय लाभ सीधे आपके खाते में जमा किया जाएगा।'
            : 'நேரடி பணப் பரிமாற்றம் (DBT) மூலம் நிதி நேரடியாக உங்களது வங்கிக் கணக்கில் அனுப்பப்படும்.',
          completed: false
        }
      ]
    };

    onSubmitApplication(newApp);
    setSuccessApp(newApp);
  };

  const handleCopyCode = () => {
    if (successApp) {
      navigator.clipboard.writeText(successApp.referenceNumber);
      alert(
        currentLanguage === 'en'
          ? 'Tracking Reference copied to clipboard!'
          : currentLanguage === 'hi'
          ? 'ट्रैकिंग संदर्भ क्लिपबोर्ड पर कॉपी किया गया!'
          : 'விண்ணப்பக் குறிப்பு எண் நகலெடுக்கப்பட்டது!'
      );
    }
  };

  const getTranslatedOccupation = (occ: string) => {
    if (currentLanguage === 'hi') {
      switch (occ) {
        case 'Farmer': return 'किसान';
        case 'Student': return 'छात्र';
        case 'Self-employed': return 'स्व-व्यवसायी / उद्यमी';
        case 'Salaried': return 'वेतनभोगी';
        case 'Unemployed': return 'बेरोजगार';
        default: return occ;
      }
    } else if (currentLanguage === 'ta') {
      switch (occ) {
        case 'Farmer': return 'விவசாயி';
        case 'Student': return 'மாணவர்';
        case 'Self-employed': return 'சுயதொழில் செய்பவர்';
        case 'Salaried': return 'மாதச் சம்பளம் பெறுபவர்';
        case 'Unemployed': return 'வேலையற்றவர்';
        default: return occ;
      }
    }
    return occ;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={successApp ? undefined : onClose}></div>

      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden border border-slate-150 flex flex-col my-8">
        {/* Top Accent Strip */}
        <div className="h-2 bg-gradient-to-r from-saffron via-white to-green-india"></div>

        {/* Header inside */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-saffron uppercase tracking-widest leading-none">
              {isEn ? 'Portal e-Form' : 'पोर्टल ई-फॉर्म'}
            </span>
            <h3 className="text-base font-bold text-[#001b44] mt-1 pr-6 truncate max-w-[280px] sm:max-w-xs text-left">
              {isEn ? 'Apply for: ' : 'आवेदन हेतु: '} {isEn ? scheme.name : (scheme.hiName || scheme.name)}
            </h3>
          </div>
          {!successApp && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Form Body or Success Body */}
        {successApp ? (
          <div className="p-6 text-center space-y-6 font-sans">
            <div className="w-16 h-16 bg-green-100/80 rounded-full flex items-center justify-center mx-auto border border-green-200">
              <CheckCircle size={32} className="text-green-india" />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-extrabold text-slate-900">
                {isEn ? 'Application Submitted' : 'आवेदन सफलतापूर्वक जमा हुआ'}
              </h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                {isEn 
                  ? 'Your credentials have been uploaded successfully to Indian government database portal node registers.'
                  : 'आपकी जानकारी भारतीय सरकारी डेटाबेस पोर्टल नोड रजिस्टरों में सफलतापूर्वक अपलोड कर दी गई है।'}
              </p>
            </div>

            {/* Generated Code Holder Box */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-150 space-y-2 max-w-sm mx-auto text-center">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 block">
                {isEn ? 'Application Reference Code' : 'आवेदन संदर्भ कोड'}
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-mono font-extrabold text-[#0056c6] select-all">
                  {successApp.referenceNumber}
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="text-xs text-[#0056c6] hover:underline font-semibold cursor-pointer block mx-auto"
              >
                {isEn ? 'Copy Code' : 'कोड कॉपी करें'}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal max-w-xs mx-auto">
              {isEn
                ? 'You can instantly track this code using the **Track Application Status** box on the portal.'
                : 'आप पोर्टल पर **आवेदन की स्थिति ट्रैक करें** बॉक्स का उपयोग करके तुरंत इस कोड को ट्रैक कर सकते हैं।'}
            </p>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#001b44] text-white text-xs font-bold hover:brightness-110 transition-all shadow-md cursor-pointer inline-flex items-center justify-center gap-1.5 font-sans"
              >
                {isEn ? 'Go back to Dashboard' : 'डैशबोर्ड पर वापस जाएं'}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto font-sans text-left">
            {/* Citizen info alert block */}
            {userEmail && (
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100/60 flex items-center gap-3 text-[11px] text-[#0056c6] text-left">
                <ShieldCheck size={16} className="shrink-0" />
                <span>
                  {isEn ? 'Auto-populating with verified profile email: ' : 'सत्यापित नागरिक प्रोफ़ाइल ईमेल: '}
                  <strong>{userEmail}</strong>
                </span>
              </div>
            )}

            {/* Name */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-xs font-bold text-slate-700">
                {isEn ? 'Applicant Full Name' : 'आवेदक का पूरा नाम'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isEn ? "e.g. Ramesh Suder" : "उदा. रमेश सुदेर"}
                className={`w-full bg-slate-50 border ${errors.name ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#0056c6]'} rounded-xl py-2.5 px-3 text-sm focus:bg-white transition-all outline-hidden text-left`}
              />
              {errors.name && <span className="text-[10px] text-red-500 font-semibold">{errors.name}</span>}
            </div>

            {/* Row: Age & Gender */}
            <div className="grid grid-cols-2 gap-4 text-left font-sans">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-bold text-slate-700">
                  {isEn ? 'Age' : 'आयु'}
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 32"
                  className={`w-full bg-slate-50 border ${errors.age ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#0056c6]'} rounded-xl py-2.5 px-3 text-sm focus:bg-white transition-all outline-hidden`}
                />
                {errors.age && <span className="text-[10px] text-red-500 font-semibold">{errors.age}</span>}
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-bold text-slate-700">
                  {isEn ? 'Gender' : 'लिंग'}
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:ring-[#0056c6] rounded-xl py-2.5 px-3 text-sm focus:bg-white transition-all outline-hidden"
                >
                  <option value="All">{isEn ? 'All/Other' : 'अन्य / सभी'}</option>
                  <option value="Male">{isEn ? 'Male' : 'पुरुष'}</option>
                  <option value="Female">{isEn ? 'Female' : 'महिला'}</option>
                </select>
              </div>
            </div>

            {/* Row: Mobile & Aadhaar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-bold text-slate-700">
                  {isEn ? 'Mobile Number (10-Digit)' : 'मोबाइल नंबर (10-अंक)'}
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className={`w-full bg-slate-50 border ${errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#0056c6]'} rounded-xl py-2.5 px-3 text-sm focus:bg-white transition-all outline-hidden`}
                />
                {errors.phone && <span className="text-[10px] text-red-500 font-semibold">{errors.phone}</span>}
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-bold text-slate-700">
                  {isEn ? 'Aadhaar Card No. (12-Digit)' : 'आधार कार्ड संख्या (12-अंक)'}
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value)}
                  placeholder="e.g. 112233445566"
                  className={`w-full bg-slate-50 border ${errors.aadhaar ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#0056c6]'} rounded-xl py-2.5 px-3 text-sm focus:bg-white transition-all outline-hidden`}
                />
                {errors.aadhaar && <span className="text-[10px] text-red-500 font-semibold">{errors.aadhaar}</span>}
              </div>
            </div>

            {/* Annual Income */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-xs font-bold text-slate-700">
                {isEn ? 'Annual Family Income (₹)' : 'वार्षिक पारिवारिक आय (₹)'}
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="e.g. 150000"
                className={`w-full bg-slate-50 border ${errors.income ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-[#0056c6]'} rounded-xl py-2.5 px-3 text-sm focus:bg-white transition-all outline-hidden`}
              />
              {errors.income && <span className="text-[10px] text-red-500 font-semibold">{errors.income}</span>}
            </div>

            {/* State & Occupation */}
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-bold text-slate-700">
                  {isEn ? 'State' : 'राज्य'}
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:ring-[#0056c6] rounded-xl py-2.5 px-3 text-sm focus:bg-white transition-all outline-hidden"
                >
                  {statesList.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-bold text-slate-700">
                  {isEn ? 'Occupation' : 'व्यवसाय'}
                </label>
                <select
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:ring-[#0056c6] rounded-xl py-2.5 px-3 text-sm focus:bg-white transition-all outline-hidden"
                >
                  {occupationsList.map((occ) => (
                    <option key={occ} value={occ}>
                      {getTranslatedOccupation(occ)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Declarations Checkbox */}
            <div className="pt-2 border-t border-slate-100 flex gap-2.5 items-start text-left">
              <input
                type="checkbox"
                id="declared"
                checked={declared}
                onChange={(e) => setDeclared(e.target.checked)}
                className="w-4 h-4 text-saffron border-slate-300 rounded focus:ring-saffron mt-0.5 shrink-0"
              />
              <label htmlFor="declared" className="text-[11px] text-slate-500 leading-relaxed cursor-pointer select-none text-left">
                {isEn 
                  ? 'I hereby declare that the particulars submitted are genuine. I understand that matching database checks are done using local blockchain networks and any false listings yield legal liabilities.'
                  : 'मैं इस बात की घोषणा करता/करती हूँ कि जमा किया गया समस्त विवरण बिल्कुल सत्य है। मुझे संज्ञान है कि स्थानीय ब्लॉकचेन सत्यापन प्रणालियों द्वारा मिलान किया जाता है और गलत आवेदन पाए जाने पर कानूनी कार्यवाही हो सकती है।'}
              </label>
            </div>
            {errors.declared && <span className="text-[10px] text-red-500 font-semibold block">{errors.declared}</span>}

            {/* Buttons */}
            <div className="pt-3 flex gap-3 justify-end border-t border-slate-100 bg-white">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold bg-white hover:bg-slate-50 transition-all cursor-pointer"
              >
                {isEn ? 'Cancel' : 'रद्द करें'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-saffron text-white text-xs font-bold hover:brightness-110 shadow-md shadow-orange-500/10 cursor-pointer transition-all flex items-center gap-1.5"
              >
                {isEn ? 'Submit e-Form' : 'ई-फॉर्म जमा करें'}
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
