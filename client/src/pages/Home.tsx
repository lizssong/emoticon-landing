/**
 * DESIGN: FastCampus-grade Premium Dark EdTech Landing Page
 * Theme: Deep navy (#0A0E1A) + Coral (#FF5C3A) + Gold (#F5A623)
 * Font: Pretendard Variable (display) + Noto Sans KR (body)
 * Layout: Full-bleed dark sections, asymmetric hero, sticky nav
 */

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ── Asset URLs ─────────────────────────────────────────────────────────────
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/114049990/2NXYXQdjjZ9aMNwZdApGUP/hero-premium-J8huvoh8sjJ5btxk8PPpCo.webp";


// ── Animated Counter ───────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

// ── Countdown Timer ────────────────────────────────────────────────────────
function Countdown() {
  const deadline = new Date("2026-04-20T18:00:00+09:00").getTime();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, deadline - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const Box = ({ val, label }: { val: number; label: string }) => (
    <div className="countdown-box">
      <div className="text-2xl font-black text-primary-text tabular-nums">{String(val).padStart(2, "0")}</div>
      <div className="text-xs text-muted-text mt-0.5 font-medium">{label}</div>
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      <Box val={time.d} label="일" />
      <span className="text-coral font-black text-xl">:</span>
      <Box val={time.h} label="시간" />
      <span className="text-coral font-black text-xl">:</span>
      <Box val={time.m} label="분" />
      <span className="text-coral font-black text-xl">:</span>
      <Box val={time.s} label="초" />
    </div>
  );
}

// ── Fade-in wrapper ────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const curriculum = [
    { step: "01", icon: "💡", title: "캐릭터 기획", desc: "캐릭터 산업 동향 분석, 이모티콘 기획 및 콘티 제작" },
    { step: "02", icon: "🖥️", title: "포토샵 드로잉", desc: "Adobe Photoshop 기본 구성 + 펜 타블렛 디지털 드로잉" },
    { step: "03", icon: "✏️", title: "일러스트 제작", desc: "Adobe Illustrator 클리핑 마스크, 브러쉬 툴 전문 활용" },
    { step: "04", icon: "🎨", title: "캐릭터 디자인", desc: "나만의 캐릭터 CI/BI 제작 및 브랜딩 전략" },
    { step: "05", icon: "✨", title: "이모티콘 제작", desc: "움직이는 이모티콘 제작 + 카카오 작가 등록" },
    { step: "06", icon: "🛍️", title: "굿즈 & 창업", desc: "굿즈 제작·판매를 통한 창업 방법 실습" },
    { step: "07", icon: "🏢", title: "현장 견학", desc: "캐릭터 라이선싱페어 현장 방문 견학" },
    { step: "08", icon: "💼", title: "취업 준비", desc: "이력서·자기소개서 작성 + 면접 코칭" },
  ];

  const benefits = [
    { icon: "₩", label: "수강료", value: "0원", sub: "전액 국비지원", color: "#FF5C3A" },
    { icon: "💰", label: "훈련수당", value: "10만원", sub: "매월 지급", color: "#F5A623" },
    { icon: "⏱", label: "교육시간", value: "240h", sub: "60일 집중과정", color: "#5BA4F5" },
    { icon: "🏆", label: "취업수당", value: "추가지급", sub: "수료 후 6개월 내", color: "#7ED4A4" },
  ];

  const tools = [
    { name: "Adobe Photoshop", color: "#31A8FF", bg: "rgba(49,168,255,0.12)", desc: "디지털 드로잉 & 이모티콘 제작" },
    { name: "Adobe Illustrator", color: "#FF9A00", bg: "rgba(255,154,0,0.12)", desc: "캐릭터 CI/BI 브랜딩" },
    { name: "AI 생성 툴", color: "#B47FFF", bg: "rgba(180,127,255,0.12)", desc: "아이디어 즉시 시각화" },
    { name: "펜 타블렛", color: "#7ED4A4", bg: "rgba(126,212,164,0.12)", desc: "전문 드로잉 실습" },
  ];

  const faqs = [
    { q: "디자인 경험이 없어도 수강 가능한가요?", a: "네! 기초부터 체계적으로 배우는 과정으로, 디자인 경험이 전혀 없어도 수강 가능합니다. 포토샵·일러스트 기초부터 시작합니다." },
    { q: "국비지원이란 무엇인가요?", a: "정부에서 직업훈련 비용을 지원하는 제도입니다. 수강료 전액을 국가가 부담하므로 본인 부담금이 0원입니다." },
    { q: "훈련수당은 어떻게 받나요?", a: "월 80% 이상 출석 시 매월 10만원의 훈련수당이 지급됩니다. 수료 후 6개월 내 취업 시 취업성공수당도 추가 지급됩니다." },
    { q: "수료 후 어떤 직업을 가질 수 있나요?", a: "카카오·라인 이모티콘 작가, 캐릭터 디자이너, 굿즈 창업, 프리랜서 일러스트레이터 등 다양한 진로가 열립니다." },
  ];

  const navLinks = [
    { label: "혜택", href: "#benefits" },
    { label: "커리큘럼", href: "#curriculum" },
    { label: "도구", href: "#tools" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--navy)", color: "var(--text-primary)" }}>

      {/* ── STICKY NAV ─────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(10,14,26,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, var(--coral), var(--gold))" }}>✨</div>
              <span className="font-black text-sm tracking-tight" style={{ color: "var(--text-primary)" }}>이모티콘 디자이너</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className="text-sm font-medium transition-colors" style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >{l.label}</a>
              ))}
            </nav>
            <a href="https://gangbuk.seoulwomanup.or.kr/gangbuk/common/bbs/selectBBS.do?bbs_seq=139728&bbs_code=D1106&bbs_type_code=10&bbs_type=&WrdNoticeAllValue=&reqUrl=&sch_type=&sch_text=%C2%A4tPage=1" target="_blank" rel="noopener noreferrer" className="btn-primary hidden md:inline-flex" style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}>
              지금 신청하기
            </a>
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--text-primary)" }}>
              <div className="w-5 h-0.5 mb-1.5 transition-all" style={{ backgroundColor: "currentColor", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
              <div className="w-5 h-0.5 mb-1.5" style={{ backgroundColor: "currentColor", opacity: menuOpen ? 0 : 1 }} />
              <div className="w-5 h-0.5 transition-all" style={{ backgroundColor: "currentColor", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden py-4 border-t" style={{ borderColor: "var(--border)" }}>
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className="block py-3 text-sm font-medium" style={{ color: "var(--text-secondary)" }} onClick={() => setMenuOpen(false)}>{l.label}</a>
              ))}
              <a href="https://gangbuk.seoulwomanup.or.kr/gangbuk/common/bbs/selectBBS.do?bbs_seq=139728&bbs_code=D1106&bbs_type_code=10&bbs_type=&WrdNoticeAllValue=&reqUrl=&sch_type=&sch_text=%C2%A4tPage=1" target="_blank" rel="noopener noreferrer" className="btn-primary mt-3 w-full justify-center">지금 신청하기</a>
            </div>
          )}
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background layers */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0A0E1A 0%, #141828 50%, #0F1420 100%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(255,92,58,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 30% 80%, rgba(245,166,35,0.06) 0%, transparent 60%)" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              {/* Deadline badge */}
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: "rgba(255,92,58,0.1)", border: "1px solid rgba(255,92,58,0.25)", color: "var(--coral-light)" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--coral)" }} />
                접수 마감: 2026년 4월 20일(월) 18시
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="display-xl mb-4" style={{ color: "var(--text-primary)" }}>
                수강료 <span className="gradient-coral">0원</span>으로<br />
                이모티콘 작가가<br />
                <span className="gradient-gold">되세요!</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="body-lg mb-8 max-w-lg">
                Adobe Photoshop · Illustrator + AI 활용<br />
                <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>캐릭터 이모티콘 디자이너 양성과정</strong><br />
                강북여성인력개발센터 · 국비지원 직업훈련 · 2026.4.27 개강
              </motion.p>

              {/* Tag pills */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-2 mb-8">
                {["수강료 전액 무료", "매월 10만원 수당", "Adobe 정규 교육", "AI 활용 수업", "이모티콘 작가 등록"].map((t) => (
                  <span key={t} className="badge-coral">{t}</span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-3 mb-10">
                <a href="https://gangbuk.seoulwomanup.or.kr/gangbuk/common/bbs/selectBBS.do?bbs_seq=139728&bbs_code=D1106&bbs_type_code=10&bbs_type=&WrdNoticeAllValue=&reqUrl=&sch_type=&sch_text=%C2%A4tPage=1" target="_blank" rel="noopener noreferrer" className="btn-primary text-base" style={{ padding: "1rem 2rem" }}>
                  지금 바로 신청하기 →
                </a>
                <a href="tel:070-4048-6575" className="btn-outline text-base">
                  📞 070-4048-6575
                </a>
              </motion.div>

              {/* Countdown */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
                <p className="section-label mb-3">마감까지 남은 시간</p>
                <Countdown />
              </motion.div>
            </div>

            {/* Right: Hero image */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)" }}>
                <img src={HERO_IMG} alt="캐릭터 이모티콘 디자이너 수업" className="w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,14,26,0.6) 0%, transparent 50%)" }} />
              </div>
              {/* Floating stat cards */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 card-glass px-4 py-3 rounded-xl">
                <div className="text-xs text-muted-text mb-1 font-medium">국비지원</div>
                <div className="text-2xl font-black text-coral">0원</div>
              </motion.div>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -right-4 card-glass px-4 py-3 rounded-xl">
                <div className="text-xs text-muted-text mb-1 font-medium">훈련수당</div>
                <div className="text-2xl font-black text-gold">월 10만원</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--navy-mid)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
            {[
              { num: 0, suffix: "원", label: "수강료 전액 지원" },
              { num: 10, suffix: "만원", label: "매월 훈련수당" },
              { num: 240, suffix: "시간", label: "전문 교육과정" },
              { num: 60, suffix: "일", label: "집중 훈련기간" },
            ].map((s, i) => (
              <FadeUp key={i} delay={i * 0.1} className="text-center px-6">
                <div className="stat-number gradient-coral">
                  <AnimatedNumber target={s.num} suffix={s.suffix} />
                </div>
                <div className="text-sm mt-1 font-medium" style={{ color: "var(--text-secondary)" }}>{s.label}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────────────────────── */}
      <section id="benefits" className="section-py" style={{ backgroundColor: "var(--navy)" }}>
        <div className="container">
          <FadeUp className="text-center mb-14">
            <p className="section-label mb-3">왜 이 과정인가요?</p>
            <h2 className="display-md" style={{ color: "var(--text-primary)" }}>
              이런 혜택, <span className="gradient-coral">다른 곳에 없습니다</span>
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="card-dark p-6 h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: `${b.color}18`, border: `1px solid ${b.color}30` }}>
                    {b.icon}
                  </div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}>{b.label}</div>
                  <div className="text-3xl font-black mb-1" style={{ color: b.color }}>{b.value}</div>
                  <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{b.sub}</div>
                </div>
              </FadeUp>
            ))}
          </div>


        </div>
      </section>

      {/* ── TOOLS ──────────────────────────────────────────────────────────── */}
      <section id="tools" className="section-py" style={{ backgroundColor: "var(--navy-mid)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <p className="section-label mb-3">사용 툴</p>
              <h2 className="display-md mb-4" style={{ color: "var(--text-primary)" }}>
                어도비 + AI로<br />
                <span className="gradient-coral">전문가처럼!</span>
              </h2>
              <p className="body-lg mb-8">
                업계 표준 <strong style={{ color: "var(--text-primary)" }}>Adobe Photoshop & Illustrator</strong>로 전문 디자인 스킬을 쌓고, 최신 AI 도구로 창작 속도를 높이세요.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {tools.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ backgroundColor: t.bg, border: `1px solid ${t.color}25` }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0"
                      style={{ backgroundColor: t.color, color: "white" }}>
                      {t.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: t.color }}>{t.name}</div>
                      <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{t.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
                  <img src={HERO_IMG} alt="어도비 + AI 수업" className="w-full object-cover" />
                </div>
                <div className="absolute -bottom-5 -left-5 card-glass p-4 rounded-xl">
                  <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>배울 수 있는 툴</div>
                  <div className="flex gap-2">
                    {["Ps", "Ai", "AI"].map((t, i) => (
                      <span key={i} className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                        style={{ backgroundColor: ["#31A8FF", "#FF9A00", "#B47FFF"][i], color: "white" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ─────────────────────────────────────────────────────── */}
      <section id="curriculum" className="section-py" style={{ backgroundColor: "var(--navy)" }}>
        <div className="container">
          <FadeUp className="text-center mb-14">
            <p className="section-label mb-3">교육 커리큘럼</p>
            <h2 className="display-md" style={{ color: "var(--text-primary)" }}>
              기초부터 <span className="gradient-coral">출시까지</span>
            </h2>
            <p className="body-md mt-3 max-w-lg mx-auto">240시간 체계적인 전문 교육과정</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {["Adobe Photoshop", "Adobe Illustrator", "AI 생성 툴"].map((t, i) => (
                <span key={i} className={["badge-blue", "badge-gold", "badge-coral"][i]}>{t}</span>
              ))}
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {curriculum.map((item, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="card-dark p-5 h-full group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-black px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(255,92,58,0.15)", color: "var(--coral)" }}>
                      STEP {item.step}
                    </span>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARGET AUDIENCE ────────────────────────────────────────────────── */}
      <section className="section-py" style={{ backgroundColor: "var(--navy-mid)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeUp>
              <p className="section-label mb-3">이런 분께 추천</p>
              <h2 className="display-md mb-6" style={{ color: "var(--text-primary)" }}>
                당신을 위한<br /><span className="gradient-coral">과정입니다</span>
              </h2>
              <div className="space-y-3">
                {[
                  "캐릭터 디자이너로 취·창업을 희망하는 여성",
                  "포토샵·일러스트를 제대로 배우고 싶은 분",
                  "AI 도구로 창작 효율을 높이고 싶은 분",
                  "이모티콘 작가로 부업·창업을 꿈꾸는 분",
                  "어도비 디자인 경력자 (우대)",
                  "대한민국 거주 여성이라면 누구나 가능",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: "var(--navy-card)", border: "1px solid var(--border)" }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "rgba(255,92,58,0.2)", color: "var(--coral)" }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="section-label mb-3">교육 일정</p>
              <h2 className="display-md mb-6" style={{ color: "var(--text-primary)" }}>
                신청 정보
              </h2>
              <div className="space-y-4">
                {[
                  { label: "교육 기간", value: "2026. 4. 27 ~ 7. 23 (60일, 240시간)" },
                  { label: "교육 시간", value: "월~금 13:30~17:30 / 주5일 1일 4시간" },
                  { label: "접수 마감", value: "2026. 4. 20(월) 18시까지" },
                  { label: "접수 방법", value: "방문 접수 또는 이메일 접수 (구비서류 제출)" },
                  { label: "이메일", value: "womanjob1@naver.com" },
                  { label: "선발 방법", value: "서류 전형(1차 합격) 후 면접 전형" },
                ].map((r, i) => (
                  <div key={i} className="flex gap-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                    <div className="text-sm font-semibold w-24 flex-shrink-0" style={{ color: "var(--coral)" }}>{r.label}</div>
                    <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{r.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: "rgba(255,92,58,0.08)", border: "1px solid rgba(255,92,58,0.2)" }}>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--coral)" }}>제출 서류</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>이력서 1부 & 반명함 사진 2장 + 훈련신청서 및 구직신청서 (사무실 비치 및 강북센터 홈페이지 자료실)</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="section-py" style={{ backgroundColor: "var(--navy)" }}>
        <div className="container max-w-3xl">
          <FadeUp className="text-center mb-12">
            <p className="section-label mb-3">자주 묻는 질문</p>
            <h2 className="display-md" style={{ color: "var(--text-primary)" }}>FAQ</h2>
          </FadeUp>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <details className="card-dark p-6 group" style={{ cursor: "pointer" }}>
                  <summary className="flex items-center justify-between font-semibold text-base list-none" style={{ color: "var(--text-primary)" }}>
                    <span>Q. {f.q}</span>
                    <span className="text-coral ml-4 flex-shrink-0 text-xl font-light">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.a}</p>
                </details>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="section-py relative overflow-hidden" style={{ backgroundColor: "var(--navy-mid)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,92,58,0.08) 0%, transparent 70%)" }} />
        <div className="container relative z-10 text-center">
          <FadeUp>
            <div className="badge-coral mx-auto mb-6 w-fit">마감 임박</div>
            <h2 className="display-lg mb-4" style={{ color: "var(--text-primary)" }}>
              지금 바로<br /><span className="gradient-coral">신청하세요!</span>
            </h2>
            <p className="body-lg mb-8 max-w-lg mx-auto">
              수강료 0원 + 매월 10만원 수당<br />
              <strong style={{ color: "var(--text-primary)" }}>2026년 4월 20일(월) 18시 마감</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="https://gangbuk.seoulwomanup.or.kr/gangbuk/common/bbs/selectBBS.do?bbs_seq=139728&bbs_code=D1106&bbs_type_code=10&bbs_type=&WrdNoticeAllValue=&reqUrl=&sch_type=&sch_text=%C2%A4tPage=1" target="_blank" rel="noopener noreferrer" className="btn-primary text-lg" style={{ padding: "1.125rem 2.5rem" }}>
                지금 바로 신청하기 →
              </a>
              <a href="https://gangbuk.seoulwomanup.or.kr" target="_blank" rel="noopener noreferrer" className="btn-outline text-lg">
                강북센터 홈페이지
              </a>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              womanjob1@naver.com · 강북여성인력개발센터
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "var(--navy)", borderTop: "1px solid var(--border)" }}>
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg, var(--coral), var(--gold))" }}>✨</div>
              <span className="font-bold text-sm" style={{ color: "var(--text-secondary)" }}>캐릭터 이모티콘 디자이너 양성과정</span>
            </div>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              강북여성인력개발센터 · 국비지원 직업훈련 · 성평등가족부 · 서울특별시
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>© 2026 강북여성인력개발센터</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
