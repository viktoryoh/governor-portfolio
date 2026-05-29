"use client";

const stats = [
  {
    value: "500KM+",
    label: "Road Infrastructure",
  },
  {
    value: "120K+",
    label: "Jobs Created",
  },
  {
    value: "85%",
    label: "Digital Transformation",
  },
  {
    value: "1.2M",
    label: "Citizens Empowered",
  },
];

export default function ImpactStats() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#f7f4ef]">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-green-300/10 blur-[140px]" />

      <div className="relative z-10 max-w-[1350px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* SECTION HEADER */}
        <div className="max-w-[700px] mb-20">
          
          <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#e67817]">
            Governance Impact
          </p>

          <h2 className="text-[42px] md:text-[64px] font-black leading-[0.95] tracking-[-0.05em] text-[#038347] mb-8">
            Results That
            <br />
            Speak Clearly.
          </h2>

          <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#e67817] max-w-[620px]">
            Strategic investments in infrastructure,
            innovation, transportation, and economic
            empowerment delivering measurable
            transformation across the state.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/30
                bg-white/45
                backdrop-blur-2xl
                p-10
                min-h-[260px]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:bg-white/60
                hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)]
              "
            >
              
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-green-100/40 to-transparent" />

              {/* Number */}
              <h3 className="relative z-10 text-[54px] md:text-[64px] font-black tracking-[-0.06em] text-[#038347] leading-none mb-8">
                {stat.value}
              </h3>

              {/* Label */}
              <p className="relative z-10 text-[15px] uppercase tracking-[0.16em] text-[#038347] leading-[1.8]">
                {stat.label}
              </p>

              {/* Decorative Line */}
              <div className="absolute bottom-0 left-0 h-[4px] w-0 bg-[#e67817] transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}