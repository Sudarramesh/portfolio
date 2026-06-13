import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, ChevronRight, BookOpen, AlertCircle, Clock, Calendar, ShieldCheck } from 'lucide-react';
import { Application } from '../types';
import { Language, TRANSLATIONS } from '../data/translations';

interface StatusTrackerProps {
  applicationsList: Application[];
  initialSearchCode?: string;
  onClearInitialCode?: () => void;
  currentLanguage: Language;
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({
  applicationsList,
  initialSearchCode = '',
  onClearInitialCode,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [searchCode, setSearchCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [trackedApp, setTrackedApp] = useState<Application | null>(null);

  // Default seed data for the mockup code
  const DEFAULT_MOCK_CODE = 'PKS-2026-4820183';

  useEffect(() => {
    if (initialSearchCode) {
      setSearchCode(initialSearchCode);
      handleTrackCode(initialSearchCode);
      if (onClearInitialCode) onClearInitialCode();
    } else {
      // By default, seed with mock code so they see something initially or if they leave it empty
      handleTrackCode(DEFAULT_MOCK_CODE);
    }
  }, [initialSearchCode, currentLanguage]);

  const handleTrackCode = (codeToTrack: string) => {
    const code = codeToTrack.trim().toUpperCase();
    if (!code) {
      setErrorMessage(t.errorTrackPrompt);
      setTrackedApp(null);
      return;
    }

    // First, find in our props application list which holds dynamic entries
    let app = applicationsList.find(a => a.referenceNumber.toUpperCase() === code);

    // If not found, check if it matches the global mockup code
    if (!app && code === DEFAULT_MOCK_CODE) {
      app = {
         referenceNumber: DEFAULT_MOCK_CODE,
         schemeId: 'pm-kisan',
         schemeName: currentLanguage === 'en' ? 'PM Kisan Samman Nidhi' : currentLanguage === 'hi' ? 'पीएम किसान सम्मान निधि' : 'பிஎம் கிசான் சம்மான் நிதி (PM Kisan)',
         category: currentLanguage === 'en' ? 'Agriculture' : currentLanguage === 'hi' ? 'कृषि कल्याण' : 'விவசாயம்',
         applicantName: currentLanguage === 'en' ? 'Ramesh Suder' : currentLanguage === 'hi' ? 'रमेश सुदर' : 'ரமேஷ் சுதர்',
         applicantAge: 42,
         applicantIncome: 120000,
         applicantState: 'Maharashtra',
         applicantOccupation: 'Farmer',
         applicantPhone: '9845******',
         submissionDate: currentLanguage === 'en' ? '15 April 2026' : currentLanguage === 'hi' ? '15 अप्रैल 2026' : '15 ஏப்ரல் 2026',
         status: 'Approved',
         timeline: [
           {
             status: currentLanguage === 'en' ? 'Application Submitted' : currentLanguage === 'hi' ? 'आवेदन जमा किया गया' : 'விண்ணப்பம் சமர்ப்பிக்கப்பட்டது',
             date: currentLanguage === 'en' ? '15 April 2026 — 10:32 AM' : currentLanguage === 'hi' ? '15 अप्रैल 2026 — सुबह 10:32 बजे' : '15 ஏப்ரல் 2026 — முற்பகல் 10:32',
             description: currentLanguage === 'en' 
               ? 'Application received at State Agriculture Dept.' 
               : currentLanguage === 'hi'
               ? 'राज्य कृषि विभाग में आवेदन प्राप्त हुआ।'
               : 'மாநில விவசாயத் துறையில் விண்ணப்பம் பெறப்பட்டது.',
             completed: true,
           },
           {
             status: currentLanguage === 'en' ? 'Document Verification' : currentLanguage === 'hi' ? 'दस्तावेज़ सत्यापन' : 'ஆவணச் சரிபார்ப்பு',
             date: currentLanguage === 'en' ? '18 April 2026 — 2:15 PM' : currentLanguage === 'hi' ? '18 अप्रैल 2026 — दोपहर 2:15 बजे' : '18 ஏப்ரல் 2026 — பிற்பகல் 2:15',
             description: currentLanguage === 'en'
               ? 'Aadhaar, land records, and bank account verified.'
               : currentLanguage === 'hi'
               ? 'आधार, भूमि अभिलेख और बैंक खाते का सत्यापन पूर्ण।'
               : 'ஆதார், நில ஆவணங்கள் மற்றும் வங்கிக் கணக்கு சரிபார்க்கப்பட்டது.',
             completed: true,
           },
           {
             status: currentLanguage === 'en' ? 'Approval Granted' : currentLanguage === 'hi' ? 'मंजूरी दी गई' : 'ஒப்புதல் வழங்கப்பட்டது',
             date: currentLanguage === 'en' ? '22 April 2026 — 9:00 AM' : currentLanguage === 'hi' ? '22 अप्रैल 2026 — सुबह 9:00 बजे' : '22 ஏப்ரல் 2026 — முற்பகல் 9:00',
             description: currentLanguage === 'en'
               ? 'Approved by District Agriculture Officer.'
               : currentLanguage === 'hi'
               ? 'जिला कृषि अधिकारी द्वारा अनुमोदित।'
               : 'மாவட்ட வேளாண்மை அதிகாரியால் அங்கீகரிக்கப்பட்டது.',
             completed: true,
           },
           {
             status: currentLanguage === 'en' ? 'Payment Processing' : currentLanguage === 'hi' ? 'भुगतान प्रक्रियाधीन' : 'பணம் செலுத்துதல் செயல்பாட்டில் உள்ளது',
             date: currentLanguage === 'en' ? 'Expected by 28 May 2026' : currentLanguage === 'hi' ? '28 मई 2026 तक अपेक्षित' : 'எதிர்பார்க்கப்படும் தேதி 28 மே 2026',
             description: currentLanguage === 'en'
               ? 'Direct Benefit Transfer (DBT) credit batch dispatched.'
               : currentLanguage === 'hi'
               ? 'प्रत्यक्ष लाभ अंतरण (डीबीटी) क्रेडिट बैच भेजा गया।'
               : 'நேரடி பணப் பரிமாற்றம் (DBT) தொகுதி அனுப்பப்பட்டது.',
             completed: false,
           },
         ],
       };
    }

    if (app) {
      setTrackedApp(app);
      setErrorMessage('');
    } else {
      setErrorMessage(t.errorTrackNotFound.replace('{code}', codeToTrack));
      setTrackedApp(null);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrackCode(searchCode);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/20 border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-xs font-sans">
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <h2 className="text-xl md:text-2xl font-extrabold text-[#001b44]">
          {t.trackerTitle}
        </h2>
        <p className="text-xs text-slate-500">
          {t.trackerDesc.replace('{code}', DEFAULT_MOCK_CODE)}
        </p>
      </div>

      {/* Tracker Search Form */}
      <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto bg-white p-2 rounded-full border border-slate-300 flex items-center shadow-lg gap-2 mb-8">
        <span className="p-2 pl-3 text-slate-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          placeholder={t.trackInputPlaceholder.replace('{code}', DEFAULT_MOCK_CODE)}
          className="w-full bg-transparent border-none py-2 text-sm outline-hidden focus:ring-0 text-[#001b44] font-medium placeholder:text-slate-400"
        />
        <button
          type="submit"
          className="bg-[#001b44] text-white rounded-full px-6 py-2.5 text-xs font-bold hover:bg-[#0056c6] transition-all cursor-pointer whitespace-nowrap"
        >
          {t.trackBtn}
        </button>
      </form>

      {/* Error Output */}
      {errorMessage && (
        <div className="max-w-md mx-auto p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-2.5 text-xs text-orange-900 justify-center">
          <AlertCircle size={16} className="text-orange-500 shrink-0" />
          <span className="font-semibold text-left">{errorMessage}</span>
        </div>
      )}

      {/* Tracking Stepper Output */}
      {trackedApp && (
        <div className="max-w-xl mx-auto bg-white rounded-2xl p-5 md:p-8 border border-slate-200 shadow-xs space-y-6">
          {/* Header Card inside status */}
          <div className="flex items-center gap-4 p-4 bg-green-india/5 rounded-xl border border-green-india/10">
            <div className="w-10 h-10 bg-green-india text-white rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">
                {t.applicationStatusLabel.replace('{status}', trackedApp.status)}
              </div>
              <div className="text-[11px] text-slate-550 mt-0.5 truncate font-sans">
                {trackedApp.schemeName} — Ref: <span className="font-mono font-bold text-slate-800">{trackedApp.referenceNumber}</span>
              </div>
            </div>
          </div>

          {/* Stepper Timeline Points */}
          <div className="space-y-6 pl-4 relative before:absolute before:top-2 before:left-[11px] before:bottom-2 before:w-[2px] before:bg-slate-100">
            {trackedApp.timeline.map((item, index) => {
              let circleColor = 'bg-slate-200 border-slate-300';
              const isSeededMock = trackedApp.referenceNumber === DEFAULT_MOCK_CODE;
              
              if (isSeededMock) {
                if (index <= 1) {
                  circleColor = 'bg-green-india ring-4 ring-green-50';
                } else if (index === 2) {
                  circleColor = 'bg-[#001b44] ring-4 ring-blue-50 animate-pulse';
                } else {
                  circleColor = 'bg-slate-200';
                }
              } else {
                // Dynamic flow tracking
                if (item.completed) {
                  circleColor = 'bg-green-india ring-4 ring-green-50';
                } else if (index === 1 && trackedApp.status === 'Submitted') {
                  circleColor = 'bg-[#001b44] ring-4 ring-blue-50 animate-pulse';
                } else {
                  circleColor = 'bg-slate-200';
                }
              }

              return (
                <div key={index} className="relative pl-7 text-left">
                  {/* Stepper Node Element */}
                  <div className={`absolute left-0 top-1 w-3.5 h-3.5 rounded-full ${circleColor} z-10 transition-all duration-300`}></div>

                  <div className="space-y-1 text-left">
                    <h4 className={`text-xs font-extrabold ${index === 3 && isSeededMock ? 'text-slate-400' : 'text-slate-900'}`}>
                      {item.status}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold font-mono flex items-center gap-1">
                      <Clock size={11} className="text-slate-350" />
                      {item.date}
                    </span>
                    <p className={`text-xs ${index === 3 && isSeededMock ? 'text-slate-400' : 'text-slate-500'} leading-relaxed text-left`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secure disclaimer footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck size={14} className="text-[#0056c6]" />
            <span>{t.encryptedGatewayNode}</span>
          </div>
        </div>
      )}
    </div>
  );
};
