import React from 'react';
import { Sprout, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ lang }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        
        <div className="flex items-center justify-center space-x-2">
          <Sprout className="w-5 h-5 text-emerald-400" />
          <span className="font-extrabold text-slate-100 text-base">
            {lang === 'gu' ? 'ગુજરાત કૃષિ એઆઈ પ્લેટફોર્મ' : 'Gujarat Krishi Advisory AI'}
          </span>
        </div>

        <p className="text-xs max-w-2xl mx-auto text-slate-400 leading-relaxed">
          {lang === 'gu'
            ? 'ગુજરાતના ૫ પ્રદેશો (ઉત્તર, દક્ષિણ, મધ્ય, સૌરાષ્ટ્ર અને કચ્છ) ના ખેડૂતો માટે સ્માર્ટ એઆઈ પાક ભલામણ અને સંપૂર્ણ ૧૮-ફીલ્ડ પાક માહિતી કોષ.'
            : 'Tailored smart crop advisory platform for North Gujarat, South Gujarat, Central Gujarat, Saurashtra & Kachchh farmers.'}
        </p>

        <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Smart Advisory Portal • Gujarat Soil Info</span>
          </div>

          <div className="flex items-center space-x-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Gujarat Farmers</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
