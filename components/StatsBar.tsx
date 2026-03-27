export default function StatsBar() {
  const stats = [
    { value: '2,500+', label: 'Compliance Professionals' },
    { value: '400+', label: 'Active Vacancies' },
    { value: '15+', label: 'Specialisms Covered' },
    { value: '30+', label: 'Countries Represented' },
  ];
  return (
    <section className="bg-[#0A0A0A] border-y border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((s, i) => (
            <div key={i} className="text-center lg:px-8">
              <p className="text-4xl font-black text-[#C9A84C]">{s.value}</p>
              <p className="text-white/50 text-sm mt-2 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
