'use client';

import { useRef, useState } from 'react';

export default function ShareProfileStrip({ candidateId }: { candidateId: string }) {
  const [showMenu, setShowMenu]   = useState(false);
  const [copied, setCopied]       = useState(false);
  const menuRef                   = useRef<HTMLDivElement>(null);

  const profileUrl  = `https://talentxmarket.com/talent/${candidateId}`;
  const shareMsg    = `I'm now listed on TalentX Market — a verified platform connecting compliance professionals with employers in AML, MLRO, KYC, Financial Crime and Risk Management.\n\nView my profile here 👉 ${profileUrl}\n\n#Compliance #AML #MLRO #FinancialCrime #OpenToWork #TalentXMarket`;
  const tweetMsg    = `I'm now on TalentX Market — the verified compliance talent platform.\n\nView my profile 👉 ${profileUrl}\n\n#Compliance #AML #MLRO #TalentXMarket`;

  const enc = (s: string) => encodeURIComponent(s);

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true);
      setTimeout(() => { setCopied(false); setShowMenu(false); }, 1500);
    });
  };

  const ITEMS = [
    {
      label: 'LinkedIn',
      href:  `https://www.linkedin.com/sharing/share-offsite/?url=${enc(profileUrl)}`,
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href:  `https://wa.me/?text=${enc(shareMsg)}`,
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#25D366">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: 'X (Twitter)',
      href:  `https://twitter.com/intent/tweet?text=${enc(tweetMsg)}`,
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#0A0A0A">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-5 flex items-center gap-3">

      {/* Clickable share icon */}
      <div className="relative flex-shrink-0" ref={menuRef}>
        <button
          onClick={() => setShowMenu((v) => !v)}
          aria-label="Share profile"
          className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
            <div className="absolute left-0 top-10 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 w-48">

              {ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {item.icon}
                  <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                </a>
              ))}

              <div className="border-t border-gray-100 my-1" />

              <button
                onClick={copyLink}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs font-semibold text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-700">Copy link</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      <span className="text-xs font-semibold text-gray-700 flex-1 min-w-0">Share your profile</span>

      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 text-[11px] font-bold text-[#C9A84C] hover:underline"
      >
        View &#8594;
      </a>
    </div>
  );
}
