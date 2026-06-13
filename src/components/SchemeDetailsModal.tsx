import React from 'react';
import { X, Check, FileText, Landmark, Calendar, Sparkles, ShieldAlert } from 'lucide-react';
import { Scheme } from '../types';
import { Language } from '../data/translations';

interface SchemeDetailsModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (schemeId: string) => void;
  currentLanguage: Language;
}

export const SchemeDetailsModal: React.FC<SchemeDetailsModalProps> = ({
  scheme,
  isOpen,
  onClose,
  onApply,
  currentLanguage,
}) => {
  if (!isOpen || !scheme) return null;

  // Set category colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Agriculture': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', accent: 'text-green-600' };
      case 'Health': return { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-200', accent: 'text-rose-600' };
      case 'Education': return { bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-200', accent: 'text-sky-600' };
      case 'Housing': return { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200', accent: 'text-amber-600' };
      case 'Women': return { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200', accent: 'text-indigo-600' };
      default: return { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', accent: 'text-slate-600' };
    }
  };

  const colors = getCategoryColor(scheme.category);

  const getTranslatedCategory = (category: string) => {
    if (currentLanguage === 'hi') {
      switch (category) {
        case 'Agriculture': return 'कृषि कल्याण';
        case 'Health': return 'स्वास्थ्य और परिवार';
        case 'Education': return 'शिक्षा व कौशल';
        case 'Housing': return 'आवास योजना';
        case 'Women': return 'महिला सशक्तिकरण';
        case 'Finance': return 'वित्तीय समावेशन';
        default: return 'केंद्रीय योजना';
      }
    } else if (currentLanguage === 'ta') {
      switch (category) {
        case 'Agriculture': return 'விவசாயம்';
        case 'Health': return 'சுகாதாரம்';
        case 'Education': return 'கல்வி';
        case 'Housing': return 'வீட்டுவசதி';
        case 'Women': return 'பெண்கள் நலம்';
        case 'Finance': return 'நிதி உள்ளடக்கம்';
        default: return 'மத்திய திட்டம்';
      }
    }
    return category;
  };

  const displayName = currentLanguage === 'ta' && scheme.taName ? scheme.taName : currentLanguage === 'hi' && scheme.hiName ? scheme.hiName : scheme.name;
  const displaySponsor = currentLanguage === 'ta' && scheme.taSponsor ? scheme.taSponsor : currentLanguage === 'hi' && scheme.hiSponsor ? scheme.hiSponsor : scheme.sponsor;
  const displayDesc = currentLanguage === 'ta' && scheme.taDescription ? scheme.taDescription : currentLanguage === 'hi' && scheme.hiDescription ? scheme.hiDescription : scheme.description;
  const displayBenefits = currentLanguage === 'ta' && scheme.taBenefits ? scheme.taBenefits : currentLanguage === 'hi' && scheme.hiBenefits ? scheme.hiBenefits : scheme.benefits;
  const displayDeadline = currentLanguage === 'ta'
    ? (scheme.taTimelineLabel || scheme.taDeadline || 'தொடர்கிறது')
    : currentLanguage === 'hi'
    ? (scheme.hiTimelineLabel || scheme.hiDeadline || 'सतत आवेदन')
    : (scheme.deadline || 'Ongoing Application');
  const displayKeyPoints = currentLanguage === 'ta' && scheme.taKeyPoints ? scheme.taKeyPoints : currentLanguage === 'hi' && scheme.hiKeyPoints ? scheme.hiKeyPoints : scheme.keyPoints;
  const displayDocuments = currentLanguage === 'ta' && scheme.taDocumentsRequired ? scheme.taDocumentsRequired : currentLanguage === 'hi' && scheme.hiDocumentsRequired ? scheme.hiDocumentsRequired : scheme.documentsRequired;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden border border-slate-100 flex flex-col my-8 font-sans">
        {/* Top Banner Accent */}
        <div className="h-2 bg-gradient-to-r from-saffron via-white to-green-india"></div>

        {/* Header section with Close */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between">
          <div className="flex flex-col gap-1.5 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border}`}>
                {getTranslatedCategory(scheme.category)}
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                {currentLanguage === 'en' ? 'Sponsored by: ' : currentLanguage === 'hi' ? 'द्वारा प्रायोजित: ' : 'வழங்குபவர்: '} {displaySponsor}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 pr-4 mt-1 leading-tight text-left">
              {displayName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content inside */}
        <div className="p-6 overflow-y-auto space-y-6 max-h-[70vh]">
          {/* Main Description & Scheme Image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3 text-left">
              <p className="text-sm text-slate-600 leading-relaxed text-left">
                {displayDesc}
              </p>
              
              {/* Highlight metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-150">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    {currentLanguage === 'en' ? 'Benefits' : currentLanguage === 'hi' ? 'योग्य लाभ' : 'திட்டத்தின் பலன்கள்'}
                  </span>
                  <span className="text-sm font-bold text-[#001b44] flex items-center gap-1.5 mt-0.5">
                    <Landmark size={14} className={colors.accent} />
                    {displayBenefits}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-150">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    {currentLanguage === 'en' ? 'Status / Deadline' : currentLanguage === 'hi' ? 'आवेदन समय सीमा' : 'நிலை / காலக்கெடு'}
                  </span>
                  <span className="text-sm font-bold text-[#001b44] flex items-center gap-1.5 mt-0.5">
                    <Calendar size={14} className="text-saffron" />
                    {displayDeadline}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="col-span-1">
              <div className="h-32 md:h-full w-full rounded-xl overflow-hidden border border-slate-200">
                <img
                  src={scheme.image}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Key Scheme Bullet Highlights */}
          <div className="space-y-3 text-left">
            <h4 className="text-sm font-extrabold text-[#001b44] uppercase tracking-wide flex items-center gap-2">
              <Sparkles size={16} className="text-saffron" />
              {currentLanguage === 'en' ? 'Key Highlights' : currentLanguage === 'hi' ? 'मुख्य विशेषताएं' : 'முக்கிய அம்சங்கள்'}
            </h4>
            <ul className="grid grid-cols-1 gap-2.5 pl-1">
              {displayKeyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed text-left">
                  <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} className={colors.accent} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents Checklist */}
          <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-100 space-y-3 text-left">
            <h4 className="text-sm font-extrabold text-[#001b44] uppercase tracking-wide flex items-center gap-2">
              <FileText size={16} className="text-[#0056c6]" />
              {currentLanguage === 'en' ? 'Mandatory Documents Checklist' : currentLanguage === 'hi' ? 'अनिवार्य दस्तावेज चेकलिस्ट' : 'தேவைப்படும் கட்டாய ஆவணங்கள்'}
            </h4>
            <p className="text-[11px] text-slate-500 text-left">
              {currentLanguage === 'en'
                ? 'Please ensure you have high-quality scanned copies or digits of these documents ready before clicking apply.'
                : currentLanguage === 'hi'
                ? 'कृपया सुनिश्चित करें कि आप आवेदन करने से पहले इन दस्तावेज़ों के उच्च-गुणवत्ता वाले स्कैन कॉपियाँ या सॉफ्ट कॉपी तैयार रखें।'
                : 'பதிவு செய்வதற்கு முன், இந்த ஆவணங்களின் தெளிவான படங்களை அல்லது மென்படிகளைத் தயார் நிலையில் வைத்திருக்கவும்.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {displayDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-700 text-left">
                  <span className="w-2 h-2 rounded-full bg-[#0056c6] shrink-0"></span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Notice */}
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3 text-xs text-orange-850 text-left">
            <ShieldAlert size={18} className="text-orange-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-left">
              <span className="font-bold block text-left">
                {currentLanguage === 'en' ? 'Eligibility Threshold Warning' : currentLanguage === 'hi' ? 'पात्रता सीमा चेतावनी' : 'தகுதி வரம்பு எச்சரிக்கை'}
              </span>
              <p className="text-orange-800 leading-normal text-left">
                {currentLanguage === 'en'
                  ? 'Applying with inaccurate age or income details can lead to system rejections during the automatic block verification audit. Please fill out details honestly.'
                  : currentLanguage === 'hi'
                  ? 'गलत आयु या आय विवरण के साथ आवेदन करने से स्वचालित सत्यापन ऑडिट के दौरान सिस्टम अस्वीकृति हो सकती है। कृपया अपनी जानकारी पूरी शुद्धता और ईमानदारी से भरें।'
                  : 'தவறான வயது அல்லது வருமான விவரங்களுடன் விண்ணப்பிப்பது தானியங்கி சரிபார்ப்பு தணிக்கையின் போது விண்ணப்பம் நிராகரிக்கப்படக் காரணமாகலாம். தயவுசெய்து உண்மையான விவரங்களைப் பதிவு செய்யவும்.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold bg-white hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {currentLanguage === 'en' ? 'Close Guide' : currentLanguage === 'hi' ? 'गाइड बंद करें' : 'வழிகாட்டியை மூடு'}
          </button>
          <button
            onClick={() => {
              onApply(scheme.id);
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#001b44] text-white text-xs font-bold hover:brightness-110 transition-all shadow-md shadow-blue-900/10 cursor-pointer"
          >
            {currentLanguage === 'en' ? 'Apply Online' : currentLanguage === 'hi' ? 'ऑनलाइन आवेदन करें' : 'இணையத்தில் விண்ணப்பிக்கவும்'}
          </button>
        </div>
      </div>
    </div>
  );
};
