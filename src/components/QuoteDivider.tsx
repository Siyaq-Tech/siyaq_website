import { useLanguage } from "../context/LanguageContext";

export const QuoteDivider: React.FC = () => {
  const { isRTL } = useLanguage();
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif font-medium leading-relaxed text-white/90">
          {isRTL 
            ? "نحن لا نكتب الكود فقط، بل نصنع تجارب رقمية تلهم وتدوم." 
            : "We don't just write code; we craft digital experiences that inspire and endure."}
        </h2>
        <div className="w-16 h-px bg-white/30 mx-auto mt-10" />
      </div>
    </section>
  );
};