import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldAlert, Globe, TrendingUp, Cpu, Landmark, CloudSun, 
  BarChart3, User, Search, AlertTriangle, ArrowRight, DollarSign, Home, CheckCircle2 
} from 'lucide-react';

// إعداد عميل Supabase باستخدام متغيرات البيئة
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env?.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function CrisisPulseApp() {
  const [lang, setLang] = useState('ar'); // 'ar' أو 'en'
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState('user'); // 'user' أو 'admin'
  
  // مدخلات المستخدم
  const [newsInput, setNewsInput] = useState('');
  const [country, setCountry] = useState('SA');
  const [city, setCity] = useState('الرياض');
  const [category, setCategory] = useState('economy');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // إحصائيات الأدمن
  const [adminStats, setAdminStats] = useState({
    totalViews: 1420,
    topCategory: '💵 اقتصاد ومالية (54%)',
    topCity: 'الرياض (32%)'
  });

  // معجم الترجمة ثنائي اللغة
  const t = {
    ar: {
      title: "Crisis Pulse AI",
      subtitle: "تحليل الأخبار العاجلة وتأثيرها المباشر على حياتك وراتبك ومدينتك",
      toggleLang: "English",
      toggleAdmin: isAdmin ? "خروج من الأدمن" : "دخول الأدمن",
      newsPlaceholder: "أدخل نص الخبر العاجل هنا...",
      selectCountry: "الدولة:",
      selectCity: "المدينة:",
      selectCategory: "تصنيف الخبر:",
      analyzeBtn: "تحليل التأثير المباشر",
      loading: "جاري تحليل الخبر وتأثيره الإقليمي والشخصي...",
      disclaimer: "⚠️ إخلاء مسؤولية: هذا التحليل لأغراض إعلامية وتثقيفية فقط ولا يمثل نصيحة مالية أو قانونية أو سلامة شخصية مباشرة.",
      categories: {
        economy: "💵 اقتصاد ومالية",
        climate: "🌍 مناخ وبيئة",
        tech: "💻 تقنية وذكاء اصطناعي",
        politics: "🏛️ سياسة ودوليات"
      },
      salaryImpact: "💵 التأثير المالي (الراتب والإنفاق)",
      climateImpact: "🏠 التأثير المناخي (السكن والمدينة)",
      actions: "🛠️ خطوات عملية موصى بها",
      directImpact: "📊 هل يؤثر عليك مباشرة؟",
      adminTitle: "لوحة تحكم الأدمن والإحصائيات الحية",
      totalViews: "إجمالي التحليلات",
      topCategory: "التصنيف الأكثر بحثًا",
      topCity: "المدينة الأكثر تفاعلاً"
    },
    en: {
      title: "Crisis Pulse AI",
      subtitle: "Real-time news analysis & impact on your salary, budget, and city",
      toggleLang: "العربية",
      toggleAdmin: isAdmin ? "Exit Admin" : "Admin Login",
      newsPlaceholder: "Paste the breaking news text here...",
      selectCountry: "Country:",
      selectCity: "City:",
      selectCategory: "Category:",
      analyzeBtn: "Analyze Direct Impact",
      loading: "Analyzing local & personal impact...",
      disclaimer: "⚠️ Disclaimer: This analysis is for informational purposes only and does not constitute direct financial, legal, or safety advice.",
      categories: {
        economy: "💵 Economy & Finance",
        climate: "🌍 Climate & Environment",
        tech: "💻 Tech & AI",
        politics: "🏛️ Politics & Global"
      },
      salaryImpact: "💵 Financial Impact (Salary & Budget)",
      climateImpact: "🏠 Climate Impact (Housing & City)",
      actions: "🛠️ Recommended Action Steps",
      directImpact: "📊 Does this directly impact you?",
      adminTitle: "Admin Dashboard & Live Analytics",
      totalViews: "Total Analyses",
      topCategory: "Top Category",
      topCity: "Top Active City"
    }
  };

  const currentT = t[lang];

  // تسجيل الأحداث في Supabase
  const logAnalyticsEvent = async (cat, ctry, cty) => {
    if (!supabase) return;
    try {
      await supabase.from('analytics_events').insert([
        { 
          country_code: ctry, 
          city: cty, 
          category: cat, 
          action_type: 'view_analysis' 
        }
      ]);
    } catch (err) {
      console.error('Supabase logging error:', err);
    }
  };

  // محاكاة استجابة الذكاء الاصطناعي وحفظ التحليل
  const handleAnalyze = async () => {
    if (!newsInput) return;
    setLoading(true);

    // تسجيل الحدث في قاعدة البيانات
    await logAnalyticsEvent(category, country, city);

    setTimeout(() => {
      let mockAnalysis = {
        summary: lang === 'ar' ? [
          "تغيرات رئيسية في الأسواق والسياسات المعلنة.",
          "تأثيرات متتابعة على أسعار الخدمات وسلاسل الإمداد.",
          "توجيهات جديدة تتطلب اتخاذ إجراءات احترازية."
        ] : [
          "Major shifts in market dynamics announced.",
          "Ripple effects on service costs and supply chains.",
          "New directives requiring precautionary adjustments."
        ],
        category: category,
        directImpact: lang === 'ar' ? "نعم - يؤثر بشكل مباشر خلال الأسابيع القادمة" : "Yes - Direct impact within upcoming weeks",
        actions: lang === 'ar' ? [
          "مراجعة ميزانيتك الشهرية وتحديد أولويات الإنفاق.",
          "تأمين خيارات بديلة قبل ارتفاع التكاليف.",
          "متابعة التحديثات الرسمية الخاصة بمدينتك."
        ] : [
          "Review your monthly budget and prioritize essential expenses.",
          "Secure alternative options before costs increase.",
          "Follow local official updates for your city."
        ]
      };

      if (category === 'economy') {
        mockAnalysis.financial = lang === 'ar' ? {
          salary: "قد تنخفض القوة الشرائية للراتب بنسبة بسيطة بسبب تضخم أسعار السلع الاستهلاكية.",
          spending: "ارتفاع متوقع في مصاريف المعيشة اليومية وتكاليف الوقود والطاقة.",
          strategy: "💡 تجنب الخسارة: قم بتوجيه الفائض للادخار في أصول آمنة ووقف الاشتراك في الخدمات غير الضرورية."
        } : {
          salary: "Slight decrease in salary purchasing power due to consumer price inflation.",
          spending: "Expected rise in daily living expenses, fuel, and utility bills.",
          strategy: "💡 Mitigate Risk: Allocate surplus to safe savings and pause non-essential subscriptions."
        };
      } else if (category === 'climate') {
        mockAnalysis.climate = lang === 'ar' ? {
          housing: `تأثر مباشر لبعض الأحياء السكنية في (${city}) بالتغيرات الجوية المتوقعة.`,
          city: "تغيرات في حركة التنقل والبنية التحتية وضغط إضافي على شبكات الكهرباء والماء.",
          strategy: "🛡️ إجراء وقائي: صيانة أنظمة التكييف والعزل المنزلي، وتجهيز حقيبة طوارئ بسيطة."
        } : {
          housing: `Direct localized effects on certain residential areas in (${city}).`,
          city: "Changes in local transit and added strain on energy and water infrastructure.",
          strategy: "🛡️ Precaution: Check home insulation/AC units and prepare basic emergency supplies."
        };
      }

      setAnalysisResult(mockAnalysis);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* الهيدر والعناوين */}
      <header className="max-w-5xl mx-auto flex justify-between items-center pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-400 flex items-center gap-2">
            <ShieldAlert className="w-8 h-8 text-blue-500" />
            {currentT.title}
          </h1>
          <p className="text-sm text-slate-400 mt-1">{currentT.subtitle}</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded border border-slate-700 transition"
          >
            {currentT.toggleLang}
          </button>
          <button 
            onClick={() => {
              setIsAdmin(!isAdmin);
              setView(isAdmin ? 'user' : 'admin');
            }}
            className={`px-3 py-1.5 text-xs rounded border transition ${isAdmin ? 'bg-amber-600 border-amber-500' : 'bg-slate-800 border-slate-700'}`}
          >
            {currentT.toggleAdmin}
          </button>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="max-w-5xl mx-auto mt-6">
        {view === 'user' ? (
          <div className="grid md:grid-cols-12 gap-6">
            {/* مدخلات التحكم والخبر */}
            <div className="md:col-span-5 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">{currentT.selectCategory}</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-100"
                >
                  <option value="economy">{currentT.categories.economy}</option>
                  <option value="climate">{currentT.categories.climate}</option>
                  <option value="tech">{currentT.categories.tech}</option>
                  <option value="politics">{currentT.categories.politics}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{currentT.selectCountry}</label>
                  <select 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-100"
                  >
                    <option value="SA">السعودية (KSA)</option>
                    <option value="AE">الإمارات (UAE)</option>
                    <option value="EG">مصر (Egypt)</option>
                    <option value="US">أمريكا (USA)</option>
                    <option value="SD">السودان (Sudan)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">{currentT.selectCity}</label>
                  <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">نص الخبر:</label>
                <textarea 
                  rows={5}
                  value={newsInput}
                  onChange={(e) => setNewsInput(e.target.value)}
                  placeholder={currentT.newsPlaceholder}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-100"
                />
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 rounded font-medium text-sm flex justify-center items-center gap-2 transition"
              >
                {loading ? currentT.loading : currentT.analyzeBtn}
              </button>
            </div>

            {/* ناتج التحليل */}
            <div className="md:col-span-7 bg-slate-900 p-5 rounded-xl border border-slate-800">
              {analysisResult ? (
                <div className="space-y-5">
                  <section>
                    <h3 className="text-sm font-semibold text-blue-400 mb-2">📰 ملخص الخبر</h3>
                    <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                      {analysisResult.summary.map((point, idx) => <li key={idx}>{point}</li>)}
                    </ul>
                  </section>

                  {/* القسم المالي */}
                  {analysisResult.financial && (
                    <section className="bg-slate-950 p-4 rounded border border-emerald-900/50">
                      <h3 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {currentT.salaryImpact}
                      </h3>
                      <p className="text-xs text-slate-300 mb-1"><strong>الراتب والقوة الشرائية:</strong> {analysisResult.financial.salary}</p>
                      <p className="text-xs text-slate-300 mb-2"><strong>المصاريف والإنفاق:</strong> {analysisResult.financial.spending}</p>
                      <p className="text-xs text-emerald-300 bg-emerald-950/60 p-2 rounded">{analysisResult.financial.strategy}</p>
                    </section>
                  )}

                  {/* القسم المناخي */}
                  {analysisResult.climate && (
                    <section className="bg-slate-950 p-4 rounded border border-cyan-900/50">
                      <h3 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                        <Home className="w-4 h-4" />
                        {currentT.climateImpact}
                      </h3>
                      <p className="text-xs text-slate-300 mb-1"><strong>تأثير السكن:</strong> {analysisResult.climate.housing}</p>
                      <p className="text-xs text-slate-300 mb-2"><strong>المدينة والبنية التحتية:</strong> {analysisResult.climate.city}</p>
                      <p className="text-xs text-cyan-300 bg-cyan-950/60 p-2 rounded">{analysisResult.climate.strategy}</p>
                    </section>
                  )}

                  <section>
                    <h3 className="text-sm font-semibold text-amber-400 mb-2">{currentT.actions}</h3>
                    <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
                      {analysisResult.actions.map((act, idx) => <li key={idx}>{act}</li>)}
                    </ol>
                  </section>

                  <div className="pt-2 border-t border-slate-800">
                    <p className="text-xs text-slate-400">{currentT.disclaimer}</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-slate-500 py-12">
                  <Search className="w-10 h-10 mb-2 opacity-50" />
                  <p className="text-sm">أدخل نص الخبر واضغط تحليل لعرض التفاصيل الشخصية والمناخية والمالية.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* واجهة لوحة تحكم الأدمن */
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              {currentT.adminTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">{currentT.totalViews}</p>
                <p className="text-2xl font-bold text-blue-400 mt-1">{adminStats.totalViews}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">{currentT.topCategory}</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">{adminStats.topCategory}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">{currentT.topCity}</p>
                <p className="text-2xl font-bold text-cyan-400 mt-1">{adminStats.topCity}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
