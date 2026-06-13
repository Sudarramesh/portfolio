import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle, HelpCircle, ArrowRight, X } from 'lucide-react';
import { Scheme } from '../types';
import { SCHEMES } from '../data/schemes';
import { Language, TRANSLATIONS } from '../data/translations';

interface EligibilityCheckerProps {
  onOpenApply: (scheme: Scheme) => void;
  onOpenDetails: (scheme: Scheme) => void;
  currentLanguage: Language;
  allSchemes?: Scheme[];
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({
  onOpenApply,
  onOpenDetails,
  currentLanguage,
  allSchemes = SCHEMES,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [age, setAge] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [state, setState] = useState('');
  const [occupation, setOccupation] = useState('');
  const [gender, setGender] = useState('All');

  // Results State
  const [hasChecked, setHasChecked] = useState(false);
  const [matches, setMatches] = useState<Scheme[]>([]);
  const [nonMatches, setNonMatches] = useState<Scheme[]>([]);

  const statesList = [
    'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh'
  ];

  const occupationsList = ['Farmer', 'Student', 'Self-employed', 'Salaried', 'Unemployed'];

  const occupationsTranslations: Record<string, string> = {
    'Farmer': currentLanguage === 'en' ? 'Farmer' : currentLanguage === 'hi' ? 'किसान' : 'விவசாயி',
    'Student': currentLanguage === 'en' ? 'Student' : currentLanguage === 'hi' ? 'छात्र/छात्रा' : 'மாணவர்/மாணவி',
    'Self-employed': currentLanguage === 'en' ? 'Self-employed' : currentLanguage === 'hi' ? 'स्व-नियोजित' : 'சுயதொழில் செய்பவர்',
    'Salaried': currentLanguage === 'en' ? 'Salaried' : currentLanguage === 'hi' ? 'वेतनभोगी' : 'மாதச் சம்பளம் பெறுபவர்',
    'Unemployed': currentLanguage === 'en' ? 'Unemployed' : currentLanguage === 'hi' ? 'बेरोजगार' : 'வேலையற்றவர்',
  };

  const incomeRanges = [
    { label: currentLanguage === 'en' ? 'Below ₹1.5 Lakhs' : currentLanguage === 'hi' ? '₹1.5 लाख से कम' : '₹1.5 லட்சத்திற்கு கீழ்', maxNumeric: 150000, value: 'Below ₹1.5 Lakhs' },
    { label: currentLanguage === 'en' ? '₹1.5–3 Lakhs' : currentLanguage === 'hi' ? '₹1.5–3 लाख' : '₹1.5–3 லட்சம்', maxNumeric: 300000, value: '₹1.5–3 Lakhs' },
    { label: currentLanguage === 'en' ? '₹3–6 Lakhs' : currentLanguage === 'hi' ? '₹3–6 लाख' : '₹3–6 லட்சம்', maxNumeric: 600000, value: '₹3–6 Lakhs' },
    { label: currentLanguage === 'en' ? '₹6–10 Lakhs' : currentLanguage === 'hi' ? '₹6–10 लाख' : '₹6–10 லட்சம்', maxNumeric: 1000000, value: '₹6–10 Lakhs' },
    { label: currentLanguage === 'en' ? 'Above ₹10 Lakhs' : currentLanguage === 'hi' ? '₹10 लाख से अधिक' : '₹10 லட்சத்திற்கு மேல்', maxNumeric: 99999999, value: 'Above ₹10 Lakhs' }
  ];

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!age || !incomeRange || !state || !occupation) {
      alert(currentLanguage === 'en' ? 'Please fill in all general fields to analyze' : currentLanguage === 'hi' ? 'विश्लेषण करने के लिए कृपया सभी फ़ील्ड भरें' : 'பகுப்பாய்வு செய்ய அனைத்து விவரங்களையும் பூர்த்தி செய்யவும்');
      return;
    }

    const ageNum = Number(age);
    // Find numeric max value for corresponding income range selected
    const selectedIncomeObj = incomeRanges.find(r => r.value === incomeRange);
    const userIncomeLimit = selectedIncomeObj ? selectedIncomeObj.maxNumeric : 99999999;

    const matchedSchemes: Scheme[] = [];
    const unmatchedSchemes: Scheme[] = [];

    allSchemes.forEach((scheme) => {
      let isEligible = true;

      // Age Threshold Evaluation
      if (scheme.eligibilityCriteria.minAge !== undefined && ageNum < scheme.eligibilityCriteria.minAge) {
        isEligible = false;
      }
      if (scheme.eligibilityCriteria.maxAge !== undefined && ageNum > scheme.eligibilityCriteria.maxAge) {
        isEligible = false;
      }

      // Income Threshold Evaluation
      if (scheme.eligibilityCriteria.maxIncome !== undefined && userIncomeLimit > scheme.eligibilityCriteria.maxIncome) {
        isEligible = false;
      }

      // State Limitation Evaluation
      if (scheme.eligibilityCriteria.allowedStates && scheme.eligibilityCriteria.allowedStates.length > 0) {
        if (!scheme.eligibilityCriteria.allowedStates.includes(state)) {
          isEligible = false;
        }
      }

      // Occupation Specification Evaluation
      if (scheme.eligibilityCriteria.allowedOccupations && scheme.eligibilityCriteria.allowedOccupations.length > 0) {
        if (!scheme.eligibilityCriteria.allowedOccupations.includes(occupation)) {
          isEligible = false;
        }
      }

      // Gender evaluation
      if (scheme.eligibilityCriteria.gender && scheme.eligibilityCriteria.gender !== 'All' && gender !== 'All') {
        if (scheme.eligibilityCriteria.gender !== gender) {
          isEligible = false;
        }
      }

      if (isEligible) {
        matchedSchemes.push(scheme);
      } else {
        unmatchedSchemes.push(scheme);
      }
    });

    setMatches(matchedSchemes);
    setNonMatches(unmatchedSchemes);
    setHasChecked(true);
  };

  const handleReset = () => {
    setAge('');
    setIncomeRange('');
    setState('');
    setOccupation('');
    setGender('All');
    setHasChecked(false);
    setMatches([]);
    setNonMatches([]);
  };

  return (
    <div className="bg-[#001b44] rounded-3xl overflow-hidden relative p-8 md:p-12 shadow-xl border border-slate-700/30 font-sans">
      {/* Dynamic Background Design Elements */}
      <div className="absolute right-0 top-0 opacity-10 pointer-events-none select-none">
        <Sparkles size={180} className="text-white" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Information Panel */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 border border-saffron/30 text-saffron">
            <Sparkles size={13} className="animate-spin-slow" />
            <span className="text-[10px] uppercase font-extrabold tracking-widest font-mono">{t.dynamicEval}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {currentLanguage === 'en' ? (
              <>Smart Eligibility <br className="hidden md:inline" /> Checker</>
            ) : currentLanguage === 'hi' ? (
              <>स्मार्ट पात्रता <br className="hidden md:inline" /> जांच टूल</>
            ) : (
              <>தகுதி சரிபார்ப்பு <br className="hidden md:inline" /> கருவி</>
            )}
          </h2>
          <p className="text-slate-300 text-xs leading-relaxed max-w-md">
            {t.smartCheckerDesc}
          </p>

          <div className="space-y-3.5 pt-2">
            {[
              t.checkCriteriaAgeOccupation,
              t.checkIncomeThreshold,
              t.directShortcutLinks
            ].map((highlight, index) => (
              <div key={index} className="flex items-center gap-3 text-xs text-white">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-saffron/20 border border-saffron/30 text-saffron">
                  <CheckCircle size={12} />
                </span>
                <span className="font-medium text-left">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form or Results Panel */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white/10 backdrop-blur-md rounded-2xl p-5 md:p-7 border border-white/20 shadow-inner">
          {hasChecked ? (
            <div className="space-y-5 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex flex-col text-left">
                  <span className="text-white font-extrabold text-sm flex items-center gap-1.5">
                    <CheckCircle size={16} className="text-green-400 font-bold" />
                    {t.evaluationComplete}
                  </span>
                  <span className="text-[10px] text-slate-300 mt-0.5 font-medium">
                    {t.matchingOpportunities.replace('{count}', String(matches.length))}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg border border-white/25 text-white text-xs font-semibold hover:bg-white/10 cursor-pointer transition-colors"
                >
                  {t.checkAgain}
                </button>
              </div>

              {/* Matched Schemes List */}
              {matches.length > 0 ? (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {matches.map((scheme) => {
                    const mappedName = currentLanguage === 'ta' && scheme.taName ? scheme.taName : currentLanguage === 'hi' && scheme.hiName ? scheme.hiName : scheme.name;
                    const mappedCategory = currentLanguage === 'ta' 
                      ? (scheme.category === 'Agriculture' ? 'விவசாயம்' : scheme.category === 'Health' ? 'சுகாதாரம்' : scheme.category === 'Education' ? 'கல்வி' : scheme.category === 'Housing' ? 'வீட்டுவசதி' : scheme.category === 'Women' ? 'பெண்கள் நலம்' : 'மத்திய திட்டம்')
                      : currentLanguage === 'hi' && scheme.category === 'Agriculture' ? 'कृषि' : scheme.category;
                    const mappedBenefitsLabel = currentLanguage === 'ta' && scheme.taBenefitsLabel ? scheme.taBenefitsLabel : currentLanguage === 'hi' && scheme.hiBenefitsLabel ? scheme.hiBenefitsLabel : scheme.benefitsLabel;

                    return (
                      <div
                        key={scheme.id}
                        className="p-4 bg-white rounded-xl border border-slate-100 flex items-center justify-between gap-4 shadow-sm hover:ring-1 hover:ring-[#0056c6] transition-all"
                      >
                        <div className="space-y-1 text-left">
                          <span className="text-[9px] bg-slate-100 text-slate-650 px-1.5 py-0.5 rounded font-extrabold uppercase">
                            {mappedCategory}
                          </span>
                          <h4 className="text-xs font-extrabold text-[#001b44] leading-normal truncate max-w-[170px] sm:max-w-xs">
                            {mappedName}
                          </h4>
                          <span className="text-[10px] font-bold text-green-india block">
                            {currentLanguage === 'en' ? 'Benefit: ' : currentLanguage === 'hi' ? 'लाभ: ' : 'பலன்: '}{mappedBenefitsLabel}
                          </span>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => onOpenDetails(scheme)}
                            className="px-2.5 py-1.5 rounded border border-slate-200 text-slate-650 text-[10px] font-bold bg-white hover:bg-slate-50 cursor-pointer"
                          >
                            {t.guideBtn}
                          </button>
                          <button
                            type="button"
                            onClick={() => onOpenApply(scheme)}
                            className="px-3 py-1.5 rounded bg-[#001b44] text-white text-[10px] font-extrabold hover:bg-[#0056c6] shadow-xs cursor-pointer"
                          >
                            {currentLanguage === 'en' ? 'Apply' : currentLanguage === 'hi' ? 'आवेदन करें' : 'விண்ணப்பிக்கவும்'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-white space-y-2">
                  <p className="text-sm font-semibold">{t.noMatchingSchemes}</p>
                  <p className="text-xs text-slate-300">
                    {t.unmatchedAdjustFilters}
                  </p>
                </div>
              )}

              {/* Collapsed view of other active elements */}
              {nonMatches.length > 0 && (
                <div className="pt-2 text-left">
                  <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold block">
                    {t.notMatchingCount.replace('{count}', String(nonMatches.length))}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleCheck} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {/* Age */}
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[10px] text-white/85 uppercase tracking-wider font-extrabold text-left">
                  {t.ageYearsLabel}
                </label>
                <input
                  type="number"
                  value={age}
                  required
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 32"
                  className="bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-saffron focus:bg-white/15 transition-all outline-hidden font-medium"
                />
              </div>

              {/* Annual Income */}
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[10px] text-white/85 uppercase tracking-wider font-extrabold text-left">
                  {t.annualIncomeLabel}
                </label>
                <select
                  value={incomeRange}
                  required
                  onChange={(e) => setIncomeRange(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-saffron focus:bg-white/15 transition-all outline-hidden font-medium"
                >
                  <option value="" className="text-slate-800">{t.selectRangePlaceholder}</option>
                  {incomeRanges.map((range) => (
                    <option key={range.value} value={range.value} className="text-slate-800">
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[10px] text-white/85 uppercase tracking-wider font-extrabold text-left">
                  {t.stateLabel}
                </label>
                <select
                  value={state}
                  required
                  onChange={(e) => setState(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-saffron focus:bg-white/15 transition-all outline-hidden font-medium"
                >
                  <option value="" className="text-slate-800">
                    {currentLanguage === 'en' ? 'Select State' : currentLanguage === 'hi' ? 'राज्य चुनें' : 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்'}
                  </option>
                  {statesList.map((st) => (
                    <option key={st} value={st} className="text-slate-800">{st}</option>
                  ))}
                </select>
              </div>

              {/* Occupation */}
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[10px] text-white/85 uppercase tracking-wider font-extrabold text-left">
                  {t.occupationLabel}
                </label>
                <select
                  value={occupation}
                  required
                  onChange={(e) => setOccupation(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-saffron focus:bg-white/15 transition-all outline-hidden font-medium"
                >
                  <option value="" className="text-slate-800">
                    {currentLanguage === 'en' ? 'Select Occupation' : currentLanguage === 'hi' ? 'व्यवसाय चुनें' : 'தொழிலைத் தேர்ந்தெடுக்கவும்'}
                  </option>
                  {occupationsList.map((occ) => (
                    <option key={occ} value={occ} className="text-slate-800">
                      {occupationsTranslations[occ]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender selector */}
              <div className="sm:col-span-2 flex flex-col gap-1 text-left">
                <label className="text-[10px] text-white/85 uppercase tracking-wider font-extrabold mb-1 text-left">
                  {t.genderCategoryLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'All', val: t.allGenders },
                    { key: 'Male', val: t.maleGender },
                    { key: 'Female', val: t.femaleGender }
                  ].map((gen) => (
                    <button
                      key={gen.key}
                      type="button"
                      onClick={() => setGender(gen.key)}
                      className={`text-xs font-semibold py-2 rounded-xl border text-center transition-all cursor-pointer ${
                        gender === gen.key
                          ? 'bg-saffron border-saffron text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      {gen.val}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="sm:col-span-2 bg-saffron text-white text-xs font-bold py-3.5 rounded-xl hover:brightness-110 active:scale-99 transition-all mt-3 shadow-md shadow-orange-600/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {t.findMySchemesBtn}
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
