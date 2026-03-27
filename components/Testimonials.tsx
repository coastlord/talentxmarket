const testimonials = [
  { quote: 'TalentX gave me direct access to compliance-specialist employers. Within two weeks of posting my availability, I had three conversations with relevant hiring managers — no recruiters, no delays.', name: 'James O.', role: 'MLRO • Financial Services', initials: 'JO', color: 'bg-blue-500' },
  { quote: 'We needed a Head of AML quickly. TalentX had a pool of genuinely available, relevant candidates that no agency could match. We made a hire in under 3 weeks.', name: 'Natalie R.', role: 'Head of HR • FinTech Scale-up', initials: 'NR', color: 'bg-purple-500' },
  { quote: 'As a Trust & Safety professional, finding roles in my niche was always difficult on generic platforms. TalentX actually understands this space.', name: 'Marcus T.', role: 'Trust & Safety Lead • Tech Platform', initials: 'MT', color: 'bg-green-500' },
];
export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-16 h-1 bg-[#C9A84C] rounded-full mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">What People Are Saying</h2>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">Compliance professionals and hiring teams trust TalentX to make the right connections.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col">
              <div className="text-[#C9A84C] text-5xl font-serif leading-none mb-4 opacity-40">"</div>
              <p className="text-gray-700 text-sm leading-relaxed flex-1 -mt-2">{t.quote}</p>
              <div className="mt-8 flex items-center gap-3 pt-6 border-t border-gray-100">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold`}>{t.initials}</div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
