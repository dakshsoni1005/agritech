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
    <div className="max-w-md w-full mx-auto my-8 p-8 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl transition-all">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-emerald-900 dark:text-emerald-400">
          {mode === 'login' ? (lang === 'gu' ? t('signInTitleGu') : t('signInTitleEn')) : (lang === 'gu' ? t('signUpTitleGu') : t('signUpTitleEn'))}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          {mode === 'login' ? (
            lang === 'gu' ? 'તમારા ફાર્મ સલાહકાર ખાતામાં પ્રવેશો' : 'Access your personalized farm advisory dashboard.'
          ) : (
            lang === 'gu' ? 'ઉન્નત કૃષિ સલાહ અને ગણતરીઓ માટે નોંધણી કરો' : 'Register for advanced agricultural advisory and calculation history.'
          )}
        </p>
      </div>

      {error && (
        <div className="flex items-center space-x-2.5 p-3.5 mb-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center space-x-2.5 p-3.5 mb-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'gu' ? t('nameGu') : t('nameEn')}
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder=""
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
            {lang === 'gu' ? t('emailGu') : t('emailEn')}
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              placeholder=""
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
            {lang === 'gu' ? t('passwordGu') : t('passwordEn')}
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        {mode === 'signup' && (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                {lang === 'gu' ? t('regionGu') : t('regionEn')}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder=""
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                {lang === 'gu' ? t('soilTypeGu') : t('soilTypeEn')}
              </label>
              <div className="relative">
                <Layers className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder=""
                />
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-2xl font-bold text-sm tracking-wide hover:bg-black/90 dark:hover:bg-white/95 transition-all shadow-md mt-6 cursor-pointer"
        >
          <span>{mode === 'login' ? (lang === 'gu' ? t('loginBtnGu') : t('loginBtnEn')) : (lang === 'gu' ? t('signupBtnGu') : t('signupBtnEn'))}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {mode === 'login' ? (
            <>
              {lang === 'gu' ? t('noAccountGu') : t('noAccountEn')}{' '}
              <button
                onClick={() => setMode('signup')}
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline ml-1 cursor-pointer"
              >
                {lang === 'gu' ? t('switchSignupGu') : t('switchSignupEn')}
              </button>
            </>
          ) : (
            <>
              {lang === 'gu' ? t('hasAccountGu') : t('hasAccountEn')}{' '}
              <button
                onClick={() => setMode('login')}
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline ml-1 cursor-pointer"
              >
                {lang === 'gu' ? t('switchLoginGu') : t('switchLoginEn')}
              </button>
            </>
          )}
        </p>

        <button
          onClick={onBack}
          className="mt-4 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
        >
          {lang === 'gu' ? t('backHomeGu') : t('backHomeEn')}
        </button>
      </div>
    </div>
  );
}
