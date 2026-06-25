import FeatureCard from '../landingpage/FeatureCard.jsx';
import group1 from '../../assets/group1.png';
import group2 from '../../assets/group2.png';
import group3 from '../../assets/group3.png';
import group4 from '../../assets/group4.png';
import group5 from '../../assets/group5.png';
import group6 from '../../assets/group6.png';

function Features() {
  const featuresData = [
    { id: 1, icon: group1, title: "High Quality Printing" },
    { id: 2, icon: group2, title: "Advanced Technology" },
    { id: 3, icon: group3, title: "Premium Quality" },
    { id: 4, icon: group4, title: "Custom Solutions" },
    { id: 5, icon: group5, title: "Affordable Price" },
    { id: 6, icon: group6, title: "Customer Satisfaction" },
  ];

  return (
    <section className="w-screen bg-white py-16 px-3 md:px-8 lg:px-10">
      <div className="w-full bg-[#021335] rounded-4xl p-3 md:p-9 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <span className="text-[#1A49C9] font-bold uppercase tracking-wider text-xl mb-2">
            Why Choose Us?
          </span>
          <h2 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-2">
            Quality Prints <br />
            <span className="text-[#F1C40F] mb-2">Every Time</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed my-3 max-w-md">
            We turn your ideas into impactful printed solutions. Combining modern technology and premium materials, we deliver quality you can trust for every project.
          </p>
          <button className="bg-[#F1C40F] text-[#021335] text-xl font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#e1b20a] transition-colors duration-200 shadow-md cursor-pointer mt-4">
            Know More <span className="text-lg">➔</span>
          </button>
        </div>
        <div className="lg:col-span-7 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} icon={feature.icon} title={feature.title}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;