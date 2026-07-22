import React, { useState } from 'react';
import { Mail, Lock, User, MapPin, Layers, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthView({ lang, onAuthSuccess, initialMode = 'login', onBack }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    region: '',
    soilType: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const translations = {
    signInTitleEn: 'Sign In to Krishi-Seva',
    signInTitleGu: 'કૃષિ-સેવામાં લોગ ઈન કરો',
    signUpTitleEn: 'Create Your Account',
    signUpTitleGu: 'નવું એકાઉન્ટ બનાવો',
    nameEn: 'Full Name',
    nameGu: 'પૂરેપૂરું નામ',
    emailEn: 'Email Address / Mobile',
    emailGu: 'ઈમેલ એડ્રેસ / મોબાઈલ',
    passwordEn: 'Password',
    passwordGu: 'પાસવર્ડ',
    regionEn: 'Region (e.g. Saurashtra, South Gujarat)',
    regionGu: 'પ્રદેશ (દા.ત. સૌરાષ્ટ્ર, દક્ષિણ ગુજરાત)',
    soilTypeEn: 'Soil Type (e.g. Black Clayey, Alluvial)',
    soilTypeGu: 'જમીનનો પ્રકાર (દા.ત. કાળી કાંપવાળી, ગોરાડુ)',
    loginBtnEn: 'Sign In',
    loginBtnGu: 'લોગ ઈન કરો',
    signupBtnEn: 'Create Account',
    signupBtnGu: 'એકાઉન્ટ બનાવો',
    noAccountEn: "Don't have an account?",
    noAccountGu: 'એકાઉન્ટ નથી?',
    hasAccountEn: 'Already have an account?',
    hasAccountGu: 'પહેલાથી જ એકાઉન્ટ છે?',
    switchSignupEn: 'Sign up free',
    switchSignupGu: 'મફત રજીસ્ટ્રેશન કરો',
    switchLoginEn: 'Sign in here',
    switchLoginGu: 'અહીં લોગ ઈન કરો',
    reqFieldsEn: 'Please fill all required fields',
    reqFieldsGu: 'કૃપા કરીને બધી માહિતી ભરો',
    loginSuccessEn: 'Logged in successfully!',
    loginSuccessGu: 'સફળતાપૂર્વક લોગ ઈન થયા છો!',
    signupSuccessEn: 'Account created successfully! Logging you in...',
    signupSuccessGu: 'એકાઉન્ટ સફળતાપૂર્વક બની ગયું છે! લોગ ઈન થઈ રહ્યું છે...',
    invalidCredsEn: 'Invalid email/mobile or password',
    invalidCredsGu: 'ખોટો ઈમેલ/મોબાઈલ અથવા પાસવર્ડ',
    backHomeEn: 'Back to Home',
    backHomeGu: 'મુખ્ય પૃષ્ઠ પર પાછા જાઓ'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic Validation
    if (mode === 'signup') {
      if (!formData.name || !formData.email || !formData.password || !formData.region || !formData.soilType) {
        setError(lang === 'gu' ? translations.reqFieldsGu : translations.reqFieldsEn);
        return;
      }

      // Save user to localStorage (mock database)
      const existingUsers = JSON.parse(localStorage.getItem('ks_users') || '[]');
      const userExists = existingUsers.some(u => u.email === formData.email);
      if (userExists) {
        setError(lang === 'gu' ? 'આ ઈમેલ/મોબાઈલ પહેલેથી જ નોંધાયેલ છે' : 'This email/mobile is already registered.');
        return;
      }

      const newUser = { ...formData };
      existingUsers.push(newUser);
      localStorage.setItem('ks_users', JSON.stringify(existingUsers));
      localStorage.setItem('ks_current_user', JSON.stringify(newUser));

      setSuccess(lang === 'gu' ? translations.signupSuccessGu : translations.signupSuccessEn);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        onAuthSuccess(newUser);
      }, 1500);

    } else {
      if (!formData.email || !formData.password) {
        setError(lang === 'gu' ? translations.reqFieldsGu : translations.reqFieldsEn);
        return;
      }

      const existingUsers = JSON.parse(localStorage.getItem('ks_users') || '[]');
      const user = existingUsers.find(u => u.email === formData.email && u.password === formData.password);

      if (!user) {
        // Create a default user if none exists just to make testing easy
        if (formData.email === 'khedut@krishi.com' && formData.password === '123456') {
          const testUser = {
            name: 'Khedut Kalyan',
            email: 'khedut@krishi.com',
            password: '123456',
            region: 'Saurashtra',
            soilType: 'Medium Black'
          };
          localStorage.setItem('ks_current_user', JSON.stringify(testUser));
          setSuccess(lang === 'gu' ? translations.loginSuccessGu : translations.loginSuccessEn);
          confetti({ particleCount: 80, spread: 60 });
          setTimeout(() => {
            onAuthSuccess(testUser);
          }, 1000);
          return;
        }
        setError(lang === 'gu' ? translations.invalidCredsGu : translations.invalidCredsEn);
        return;
      }

      localStorage.setItem('ks_current_user', JSON.stringify(user));
      setSuccess(lang === 'gu' ? translations.loginSuccessGu : translations.loginSuccessEn);
      confetti({
        particleCount: 80,
        spread: 60
      });

      setTimeout(() => {
        onAuthSuccess(user);
      }, 1200);
    }
  };

  const t = (key) => translations[key] || '';

  return (
    <div className="relative max-w-md w-full mx-auto my-8">
      {/* Visual background glows to make UI pop in dark/light mode */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/20 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main glassmorphic card container */}
      <div className="relative bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2.5rem] border border-slate-100 dark:border-slate-800/80 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)] p-8 sm:p-10 transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-emerald-950 dark:text-emerald-450">
            {mode === 'login' ? (lang === 'gu' ? t('signInTitleGu') : t('signInTitleEn')) : (lang === 'gu' ? t('signUpTitleGu') : t('signUpTitleEn'))}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-450 mt-3 font-medium">
            {mode === 'login' ? (
              lang === 'gu' ? 'તમારા ફાર્મ સલાહકાર ખાતામાં પ્રવેશો' : 'Access your personalized farm advisory dashboard.'
            ) : (
              lang === 'gu' ? 'ઉન્નત કૃષિ સલાહ અને ગણતરીઓ માટે નોંધણી કરો' : 'Register for advanced agricultural advisory and calculation history.'
            )}
          </p>
        </div>

        {error && (
          <div className="flex items-center space-x-3 p-4 mb-6 rounded-2xl bg-rose-500/10 dark:bg-rose-500/5 border border-rose-500/20 dark:border-rose-500/10 text-rose-600 dark:text-rose-450 text-xs font-semibold animate-shake">
            <AlertCircle className="w-4.5 h-4.5 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-3 p-4 mb-6 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 dark:border-emerald-500/10 text-emerald-600 dark:text-emerald-450 text-xs font-semibold">
            <CheckCircle2 className="w-4.5 h-4.5 shrink-0 text-emerald-500" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider pl-1">
                {lang === 'gu' ? t('nameGu') : t('nameEn')}
              </label>
              <div className="relative group">
                <User className={`absolute left-4 top-3.5 w-4.5 h-4.5 transition-colors duration-200 ${focusedField === 'name' ? 'text-emerald-500 dark:text-emerald-450' : 'text-slate-400 dark:text-slate-500'}`} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/5 focus:border-emerald-500 dark:focus:border-emerald-500/80 transition-all duration-200"
                  placeholder=""
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider pl-1">
              {lang === 'gu' ? t('emailGu') : t('emailEn')}
            </label>
            <div className="relative group">
              <Mail className={`absolute left-4 top-3.5 w-4.5 h-4.5 transition-colors duration-200 ${focusedField === 'email' ? 'text-emerald-500 dark:text-emerald-450' : 'text-slate-400 dark:text-slate-500'}`} />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/5 focus:border-emerald-500 dark:focus:border-emerald-500/80 transition-all duration-200"
                placeholder=""
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider pl-1">
              {lang === 'gu' ? t('passwordGu') : t('passwordEn')}
            </label>
            <div className="relative group">
              <Lock className={`absolute left-4 top-3.5 w-4.5 h-4.5 transition-colors duration-200 ${focusedField === 'password' ? 'text-emerald-500 dark:text-emerald-450' : 'text-slate-400 dark:text-slate-500'}`} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/5 focus:border-emerald-500 dark:focus:border-emerald-500/80 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider pl-1">
                  {lang === 'gu' ? t('regionGu') : t('regionEn')}
                </label>
                <div className="relative group">
                  <MapPin className={`absolute left-4 top-3.5 w-4.5 h-4.5 transition-colors duration-200 ${focusedField === 'region' ? 'text-emerald-500 dark:text-emerald-450' : 'text-slate-400 dark:text-slate-500'}`} />
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('region')}
                    onBlur={() => setFocusedField('')}
                    className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/5 focus:border-emerald-500 dark:focus:border-emerald-500/80 transition-all duration-200"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider pl-1">
                  {lang === 'gu' ? t('soilTypeGu') : t('soilTypeEn')}
                </label>
                <div className="relative group">
                  <Layers className={`absolute left-4 top-3.5 w-4.5 h-4.5 transition-colors duration-200 ${focusedField === 'soilType' ? 'text-emerald-500 dark:text-emerald-450' : 'text-slate-400 dark:text-slate-500'}`} />
                  <input
                    type="text"
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('soilType')}
                    onBlur={() => setFocusedField('')}
                    className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/5 focus:border-emerald-500 dark:focus:border-emerald-500/80 transition-all duration-200"
                    placeholder=""
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 py-3.5 px-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] mt-6 cursor-pointer"
          >
            <span>{mode === 'login' ? (lang === 'gu' ? t('loginBtnGu') : t('loginBtnEn')) : (lang === 'gu' ? t('signupBtnGu') : t('signupBtnEn'))}</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {mode === 'login' ? (
              <>
                {lang === 'gu' ? t('noAccountGu') : t('noAccountEn')}{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="font-bold text-emerald-600 dark:text-emerald-450 hover:underline ml-1 cursor-pointer"
                >
                  {lang === 'gu' ? t('switchSignupGu') : t('switchSignupEn')}
                </button>
              </>
            ) : (
              <>
                {lang === 'gu' ? t('hasAccountGu') : t('hasAccountEn')}{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-bold text-emerald-600 dark:text-emerald-450 hover:underline ml-1 cursor-pointer"
                >
                  {lang === 'gu' ? t('switchLoginGu') : t('switchLoginEn')}
                </button>
              </>
            )}
          </p>

          <button
            onClick={onBack}
            className="mt-5 text-xs font-bold text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-450 transition-colors cursor-pointer"
          >
            {lang === 'gu' ? t('backHomeGu') : t('backHomeEn')}
          </button>
        </div>
      </div>
    </div>
  );
}
