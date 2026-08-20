import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../lib/animations';

/* ── Member data ────────────────────────────────────────────────── */
interface TeamMember {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  avatar: string | null;
  initials: string;
  github: string;
  linkedin: string;
  /** accent color for the front card gradient */
  accent: string;
}

const members: TeamMember[] = [
  {
    id: 'karim',
    nameAr: 'كريم حازم',
    nameEn: 'Karim Hazem',
    roleAr: 'مسؤول الاختبار',
    roleEn: 'Testing',
    avatar: '/avatar_karim.png',
    initials: 'KH',
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/kareemhazemm/',
    accent: '#e8e8e8',
  },
  {
    id: 'heba',
    nameAr: 'هبه عيسى',
    nameEn: 'Heba Eissa',
    roleAr: 'مطورة واجهات أمامية',
    roleEn: 'Frontend Developer',
    avatar: '/avatar_heba.png',
    initials: 'HE',
    github: 'https://github.com/hiba-siyaq',
    linkedin: 'https://www.linkedin.com/in/heba-eissa-4799bb220/',
    accent: '#ececec',
  },
  {
    id: 'angelo',
    nameAr: 'انجلو عصام',
    nameEn: 'Angelo Esam',
    roleAr: 'مطور واجهات أمامية',
    roleEn: 'Frontend Developer',
    avatar: '/avatar_angelo.png',
    initials: 'AE',
    github: 'https://github.com/AngeloEsam',
    linkedin: 'https://www.linkedin.com/in/angelo-esam/',
    accent: '#e4e4e4',
  },
  {
    id: 'abdelrahman',
    nameAr: 'عبدالرحمن علي',
    nameEn: 'Abdelrahman Ali',
    roleAr: 'مطور خلفي',
    roleEn: 'Backend Developer',
    avatar: '/avatar_abdelrahman.png',
    initials: 'AA',
    github: 'https://github.com/init0x1',
    linkedin: 'https://www.linkedin.com/in/abdulrahman-aly/',
    accent: '#e0e0e0',
  },
  {
    id: 'ahmed',
    nameAr: 'أحمد رمضان',
    nameEn: 'Ahmed Ramadan',
    roleAr: 'مطور خلفي',
    roleEn: 'Backend Developer',
    avatar: '/avatar_ahmed.png',
    initials: 'AR',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/in/ahmed-ramadan-b952021a3/',
    accent: '#e8e8e8',
  },
  {
    id: 'mohamedtarek',
    nameAr: 'محمد طارق',
    nameEn: 'Mohammed Tarek',
    roleAr: 'معماري حلول',
    roleEn: 'Solution Architect',
    avatar: '/avatar_mohammed.png',
    initials: 'MT',
    github: 'https://github.com/mohammedtarek245',
    linkedin: 'https://www.linkedin.com/in/mohammed-tarek-67b822254/',
    accent: '#dcdcdc',
  },
  {
    id: 'mohamedosama',
    nameAr: 'محمد أسامة',
    nameEn: 'Mohammed Osama',
    roleAr: 'مسؤول التسويق',
    roleEn: 'Media Buyer',
    avatar: '/avatar_mohamed.png',
    initials: 'MO',
    github: 'https://github.com/mohamedusamasmm-pixel',
    linkedin: 'https://www.linkedin.com/in/mohamed-usama-mediabuying/',
    accent: '#e8e8e8',
  },
  {
    id: 'rehamhamdy',
    nameAr: 'ريهام حمدي',
    nameEn: 'Reham Hamdy',
    roleAr: 'قائد الفريق',
    roleEn: 'Team Leader',
    avatar: '/avatar_heba.png',
    initials: 'RH',
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/riham-hamdi-b2b016257/',
    accent: '#d8d8d8',
  },
];

/* ── 3D Flip Card ──────────────────────────────────────────────── */
const MemberCard: React.FC<{ member: TeamMember; isRTL: boolean }> = ({
  member,
  isRTL,
}) => {
  const name = isRTL ? member.nameAr : member.nameEn;
  const role = isRTL ? member.roleAr : member.roleEn;

  return (
    /* Scene — gives perspective depth */
    <div className="card-3d-scene" style={{ width: 200, height: 260 }}>
      <div className="card-3d-inner" style={{ borderRadius: 16 }}>

        {/* ── FRONT ─────────────────────────────────────────────── */}
        <div
          className="card-3d-front flex flex-col items-center justify-end pb-6 overflow-hidden"
          style={{
            borderRadius: 16,
            background: `linear-gradient(160deg, ${member.accent} 0%, #f4f4f4 60%, #ffffff 100%)`,
            border: '1px solid rgba(0,0,0,0.07)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >


          {/* Avatar */}
          <div
            className="relative mb-3 rounded-full overflow-hidden"
            style={{
              width: 100,
              height: 100,
              border: '3px solid rgba(0,0,0,0.1)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              background: '#e8e8e8',
              zIndex: 1,
            }}
          >
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={name}
                className="w-full h-full object-cover object-top select-none"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-black/50">
                {member.initials}
              </div>
            )}
          </div>

          <h3 className="text-sm font-semibold text-black text-center px-3 leading-tight">
            {name}
          </h3>
          <p className="text-xs text-black/40 mt-1 font-medium text-center px-3">
            {role}
          </p>
        </div>

        {/* ── BACK ──────────────────────────────────────────────── */}
        <div
          className="card-3d-back flex flex-col items-center justify-center gap-5 overflow-hidden"
          style={{
            borderRadius: 16,
            background: 'linear-gradient(160deg, #111 0%, #222 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          {/* Shimmer line */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
            }}
          />

          {/* Initials circle */}
          <div
            className="rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{
              width: 72,
              height: 72,
              background: 'rgba(255,255,255,0.06)',
              border: '1.5px solid rgba(255,255,255,0.15)',
              boxShadow: '0 0 24px rgba(255,255,255,0.05)',
            }}
          >
            {member.initials}
          </div>

          {/* Name + role */}
          <div className="text-center px-4">
            <p className="text-white text-sm font-semibold leading-tight">{name}</p>
            <p className="text-white/40 text-xs mt-1 font-medium">{role}</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/8 border border-white/10 text-white/60 hover:text-white hover:bg-white/15 transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <FaGithub size={16} />
            </a>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/15 transition-colors"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <FaLinkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Creative Section Background ───────────────────────────────── */
const TeamBackground: React.FC = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#F9F9F9]">
    {/* Animated soft blurred shapes for a premium, clean look */}
    <div
      className="absolute rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"
      style={{
        width: '40vw',
        height: '40vw',
        top: '-10%',
        right: '-10%',
        background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
        animationDuration: '8s'
      }}
    />
    <div
      className="absolute rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse"
      style={{
        width: '50vw',
        height: '50vw',
        bottom: '-15%',
        left: '-15%',
        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        animationDuration: '10s',
        animationDelay: '2s'
      }}
    />
    {/* Subtle Dot Grid Overlay for a tech feel */}
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{ 
        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F9F9F9]/50 to-[#F9F9F9]"></div>
  </div>
);

/* ── Section ────────────────────────────────────────────────────── */
const Team: React.FC = () => {
  const { isRTL } = useLanguage();

  const sectionTitle = isRTL
    ? 'تعرّف على فريقنا المميز'
    : 'Meet Our Outstanding Team';
  const sectionBadge = isRTL ? 'فريقنا من الرائعين' : 'A Group of Excellence';
  const sectionSubtitle = isRTL
    ? 'مجموعة من الخبراء الشباب المتحمسين الذين يبنون معك كل نقرة.'
    : 'A group of passionate young experts building with you, click by click.';

  return (
    <section
      id="team"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="py-24 md:py-32 bg-[#F9F9F9] relative overflow-hidden"
    >
      {/* Creative background */}
      <TeamBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <motion.span
            variants={fadeInUp}
            className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4"
          >
            {sectionBadge}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-medium text-black mb-4 leading-tight"
          >
            {sectionTitle}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 text-base max-w-xl">
            {sectionSubtitle}
          </motion.p>
        </motion.div>

        {/* Flip cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-wrap justify-center gap-8"
        >
          {members.map((m) => (
            <motion.div variants={fadeInUp} key={m.id}>
              <MemberCard member={m} isRTL={isRTL} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
