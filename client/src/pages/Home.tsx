/**
 * DESIGN: "Forge" — Premium Conversion-Optimized EdTech Landing Page
 * Philosophy: Every pixel earns its place. Urgency + Aspiration + Trust.
 * Palette: Obsidian (#060810) + Coral (#FF4D2E) + Gold (#F5A623) + Ice (#E8F0FF)
 * Typography: Pretendard Variable — 900 weight display, editorial hierarchy
 * Layout: Full-bleed cinematic sections, asymmetric hero, sticky urgency bar
 * Conversion: Countdown, social proof marquee, benefit stacking, sticky CTA
 */

import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const APPLY_URL = "https://gangbuk.seoulwomanup.or.kr/gangbuk/common/bbs/selectBBS.do?bbs_seq=139728&bbs_code=D1106&bbs_type_code=10&bbs_type=&WrdNoticeAllValue=&reqUrl=&sch_type=&sch_text=%C2%A4tPage=1";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/114049990/2NXYXQdjjZ9aMNwZdApGUP/hero-v2-bZWBRmvBeRZdT5xBZFQZRK.webp";
const BG_TEX = "https://d2xsxph8kpxj0f.cloudfront.net/114049990/2NXYXQdjjZ9aMNwZdApGUP/social-proof-bg-Lh44XV2cHgmRWnchKeFKxN.webp";

// ── Animated Counter ───────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(0);
  useEffect(() => { if (inView) motionVal.set(target); }, [inView, target, motionVal]);
  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);
  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

// ── Countdown ──────────────────────────────────────────────────────────────
function Countdown({ compact = false }: { compact?: boolean }) {
  const deadline = new Date("2026-04-20T18:00:00+09:00").getTime();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, deadline - Date.now());
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [deadline]);

  if (compact) {
    return (
      <span className="font-black tabular-nums" style={{ color: "var(--coral)" }}>
        {String(time.d).padStart(2,"0")}일 {String(time.h).padStart(2,"0")}:{String(time.m).padStart(2,"0")}:{String(time.s).padStart(2,"0")}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {[{ v: time.d, l: "일" }, { v: time.h, l: "시간" }, { v: time.m, l: "분" }, { v: time.s, l: "초" }].map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="countdown-box">
            <div className="text-2xl font-black tabular-nums" style={{ color: "var(--text-primary)" }}>{String(item.v).padStart(2, "0")}</div>
            <div className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-muted)" }}>{item.l}</div>
          </div>
          {i < 3 && <span className="text-xl font-black" style={{ color: "var(--coral)" }}>:</span>}
        </div>
      ))}
    </div>
  );
}

// ── Fade-up wrapper ────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}>{children}</motion.div>
  );
}

// ── Scroll Progress Bar ────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div className="progress-bar" style={{ scaleX, transformOrigin: "0%" }} />
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  const APPLY_LINK = APPLY_URL;

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

  const tools = [
    { abbr: "Ps", name: "Adobe Photoshop", color: "#31A8FF", bg: "rgba(49,168,255,0.1)", desc: "디지털 드로잉 & 이모티콘 제작의 업계 표준" },
    { abbr: "Ai", name: "Adobe Illustrator", color: "#FF9A00", bg: "rgba(255,154,0,0.1)", desc: "캐릭터 CI/BI 브랜딩 & 벡터 일러스트" },
    { abbr: "AI", name: "AI 생성 툴", color: "#B47FFF", bg: "rgba(180,127,255,0.1)", desc: "아이디어를 즉시 시각화하는 최신 AI 도구" },
    { abbr: "🖊", name: "펜 타블렛", color: "#7ED4A4", bg: "rgba(126,212,164,0.1)", desc: "전문 드로잉 실습 장비 제공" },
  ];

  const faqs = [
    { q: "디자인 경험이 없어도 수강 가능한가요?", a: "네! 기초부터 체계적으로 배우는 과정으로, 디자인 경험이 전혀 없어도 수강 가능합니다. 포토샵·일러스트 기초부터 시작합니다." },
    { q: "국비지원이란 무엇인가요?", a: "정부에서 직업훈련 비용을 지원하는 제도입니다. 수강료 전액을 국가가 부담하므로 본인 부담금이 0원입니다." },
    { q: "훈련수당은 어떻게 받나요?", a: "월 80% 이상 출석 시 매월 10만원의 훈련수당이 지급됩니다. 수료 후 6개월 내 취업 시 취업성공수당도 추가 지급됩니다." },
    { q: "수료 후 어떤 직업을 가질 수 있나요?", a: "카카오·라인 이모티콘 작가, 캐릭터 디자이너, 굿즈 창업, 프리랜서 일러스트레이터 등 다양한 진로가 열립니다." },
  ];

  const marqueeTags = [
    "수강료 0원", "매월 10만원 수당", "Adobe 정규 교육", "AI 활용 수업",
    "이모티콘 작가 등록", "국비지원 직업훈련", "취업성공수당", "캐릭터 디자이너",
    "수강료 0원", "매월 10만원 수당", "Adobe 정규 교육", "AI 활용 수업",
    "이모티콘 작가 등록", "국비지원 직업훈련", "취업성공수당", "캐릭터 디자이너",
  ];

  return (
    <div style={{ backgroundColor: "var(--obsidian)", color: "var(--text-primary)", fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif" }}>
      <ScrollProgress />

      {/* ── STICKY TOP URGENCY BAR ─────────────────────────────────────────── */}
      <div className="relative z-50 py-2.5 text-center text-sm font-bold"
        style={{ background: "linear-gradient(90deg, var(--coral) 0%, #FF6B4A 50%, var(--gold) 100%)", color: "#fff" }}>
        <span className="urgency-pulse inline-block w-2 h-2 rounded-full bg-white mr-2 align-middle opacity-90" />
        접수 마감까지 <Countdown compact /> — 지금 바로 신청하세요!
        <a href={APPLY_LINK} target="_blank" rel="noopener noreferrer"
          className="ml-3 px-3 py-0.5 rounded-full text-xs font-black"
          style={{ background: "rgba(0,0,0,0.25)", color: "#fff", textDecoration: "none" }}>
          신청 →
        </a>
      </div>

      {/* ── STICKY NAV ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(6,8,16,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid var(--ice-border)" : "none",
        }}>
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base font-black"
                style={{ background: "linear-gradient(135deg, var(--coral), var(--gold))", color: "#fff" }}>✨</div>
              <div>
                <div className="text-sm font-black leading-tight" style={{ color: "var(--text-primary)" }}>이모티콘 디자이너</div>
                <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>국비지원 양성과정</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-7">
              {[["혜택", "#benefits"], ["커리큘럼", "#curriculum"], ["도구", "#tools"], ["일정", "#schedule"], ["FAQ", "#faq"]].map(([l, h]) => (
                <a key={l} href={h} className="text-sm font-semibold transition-colors"
                  style={{ color: "var(--text-secondary)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>{l}</a>
              ))}
            </nav>
            <a href={APPLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-nav hidden md:inline-flex">
              지금 신청하기
            </a>
            <button className="md:hidden p-2 rounded-lg" onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: "var(--text-primary)", background: "transparent", border: "none" }}>
              <div className="space-y-1.5">
                <div className="w-6 h-0.5 transition-all" style={{ backgroundColor: "currentColor", transform: menuOpen ? "rotate(45deg) translate(0,8px)" : "none" }} />
                <div className="w-6 h-0.5" style={{ backgroundColor: "currentColor", opacity: menuOpen ? 0 : 1 }} />
                <div className="w-6 h-0.5 transition-all" style={{ backgroundColor: "currentColor", transform: menuOpen ? "rotate(-45deg) translate(0,-8px)" : "none" }} />
              </div>
            </button>
          </div>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t" style={{ borderColor: "var(--ice-border)" }}>
              {[["혜택", "#benefits"], ["커리큘럼", "#curriculum"], ["도구", "#tools"], ["일정", "#schedule"], ["FAQ", "#faq"]].map(([l, h]) => (
                <a key={l} href={h} className="block py-3 text-sm font-semibold" style={{ color: "var(--text-secondary)", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{l}</a>
              ))}
              <a href={APPLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-cta mt-4 w-full" style={{ padding: "0.875rem 1.5rem" }}>지금 신청하기</a>
            </motion.div>
          )}
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "100svh", display: "flex", alignItems: "center" }}>
        {/* Deep background */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 65% 40%, rgba(255,77,46,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 20% 80%, rgba(245,166,35,0.05) 0%, transparent 60%), linear-gradient(160deg, #060810 0%, #0A0E1A 40%, #060810 100%)" }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(232,240,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,240,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="container relative z-10 py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">

            {/* LEFT */}
            <motion.div style={{ opacity: heroOpacity, y: heroY }}>
              {/* Badges row */}
              <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-2 mb-7">
                <span className="badge-coral">
                  <span className="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse" style={{ backgroundColor: "var(--coral)", display: "inline-block" }} />
                  접수 마감 D-{Math.max(0, Math.ceil((new Date("2026-04-20T18:00:00+09:00").getTime() - Date.now()) / 86400000))}
                </span>
                <span className="badge-gold">🚀 4월 27일 개강</span>
                <span className="badge-ice">강북여성인력개발센터</span>
              </motion.div>

              {/* Headline */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
                <h1 className="display-hero mb-5" style={{ color: "var(--text-primary)" }}>
                  수강료<br />
                  <span className="gradient-coral">0원</span>으로<br />
                  <span className="shimmer-text">이모티콘 작가</span><br />
                  <span style={{ color: "var(--text-primary)" }}>되기</span>
                </h1>
              </motion.div>

              {/* Sub */}
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="body-xl mb-8 max-w-md">
                Adobe Photoshop · Illustrator + AI 활용<br />
                <strong style={{ color: "var(--text-primary)", fontWeight: 800 }}>캐릭터 이모티콘 디자이너 양성과정</strong>
              </motion.p>

              {/* Benefit pills */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-2 mb-9">
                {["수강료 전액 무료", "매월 10만원 수당", "Adobe 정규 교육", "AI 활용 수업", "이모티콘 작가 등록"].map((t) => (
                  <span key={t} className="badge-ice">{t}</span>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3 mb-10">
                <a href={APPLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ fontSize: "1.0625rem", padding: "1.125rem 2.25rem" }}>
                  무료로 신청하기 →
                </a>
                <a href="tel:070-4048-6575" className="btn-ghost">
                  📞 070-4048-6575
                </a>
              </motion.div>

              {/* Countdown */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <div className="label-sm mb-3">마감까지 남은 시간</div>
                <Countdown />
              </motion.div>
            </motion.div>

            {/* RIGHT — Hero image */}
            <motion.div initial={{ opacity: 0, scale: 0.92, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block">
              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(ellipse at center, rgba(255,77,46,0.15) 0%, transparent 70%)", transform: "scale(1.1)", filter: "blur(40px)" }} />
              <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px var(--ice-border)" }}>
                <img src={HERO_IMG} alt="캐릭터 이모티콘 디자이너 수업" className="w-full object-cover" style={{ display: "block" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,8,16,0.7) 0%, rgba(6,8,16,0.1) 40%, transparent 70%)" }} />
              </div>
              {/* Floating cards */}
              <div className="float-a absolute -top-5 -left-6 card-glass px-4 py-3 rounded-2xl" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                <div className="label-sm mb-1">국비지원</div>
                <div className="text-3xl font-black" style={{ color: "var(--coral)" }}>0원</div>
              </div>
              <div className="float-b absolute -bottom-5 -right-6 card-glass px-4 py-3 rounded-2xl" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                <div className="label-sm mb-1">훈련수당</div>
                <div className="text-3xl font-black" style={{ color: "var(--gold)" }}>월 10만원</div>
              </div>
              <div className="float-a absolute top-1/2 -right-8 card-glass px-3 py-2 rounded-xl" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)", animationDelay: "1s" }}>
                <div className="text-xs font-bold mb-0.5" style={{ color: "var(--text-muted)" }}>개강일</div>
                <div className="text-sm font-black" style={{ color: "var(--text-primary)" }}>4월 27일</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ──────────────────────────────────────────────────── */}
      <div className="overflow-hidden py-4 relative" style={{ borderTop: "1px solid var(--ice-border)", borderBottom: "1px solid var(--ice-border)", backgroundColor: "var(--navy-mid)" }}>
        <div className="marquee-track flex gap-6 w-max">
          {marqueeTags.map((t, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: i % 2 === 0 ? "var(--coral)" : "var(--gold)" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--navy-deep)" }}>
        <div className="container py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: 0, suffix: "원", label: "수강료 전액 지원", color: "var(--coral)", icon: "₩" },
              { num: 10, suffix: "만원", label: "매월 훈련수당 지급", color: "var(--gold)", icon: "💰" },
              { num: 240, suffix: "시간", label: "전문 교육과정", color: "#5BA4F5", icon: "⏱" },
              { num: 60, suffix: "일", label: "집중 훈련기간", color: "#7ED4A4", icon: "📅" },
            ].map((s, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="card-stat">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="stat-number mb-1" style={{ color: s.color }}>
                    <AnimatedNumber target={s.num} suffix={s.suffix} />
                  </div>
                  <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────────────────────── */}
      <section id="benefits" className="section-py" style={{ backgroundColor: "var(--obsidian)" }}>
        <div className="container">
          <FadeUp className="mb-16">
            <div className="label-sm mb-4">왜 이 과정인가요?</div>
            <h2 className="display-lg" style={{ color: "var(--text-primary)", maxWidth: "640px" }}>
              이런 혜택,<br /><span className="gradient-coral">다른 곳에 없습니다</span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: "🎓", title: "수강료 0원", desc: "전액 국비지원으로 본인 부담금 없음", color: "var(--coral)", glow: "rgba(255,77,46,0.15)" },
              { icon: "💰", title: "매월 10만원", desc: "월 80% 이상 출석 시 훈련수당 지급", color: "var(--gold)", glow: "rgba(245,166,35,0.15)" },
              { icon: "🏆", title: "취업성공수당", desc: "수료 후 6개월 내 취업 시 추가 지급", color: "#7ED4A4", glow: "rgba(126,212,164,0.15)" },
              { icon: "🎨", title: "Adobe 정규 교육", desc: "포토샵·일러스트 업계 표준 툴 정규 수업", color: "#5BA4F5", glow: "rgba(91,164,245,0.15)" },
            ].map((b, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="card-premium p-6 h-full" style={{ background: `linear-gradient(145deg, ${b.glow} 0%, var(--navy-card) 100%)` }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                    style={{ backgroundColor: `${b.glow}`, border: `1px solid ${b.color}30` }}>
                    {b.icon}
                  </div>
                  <h3 className="text-xl font-black mb-2" style={{ color: b.color }}>{b.title}</h3>
                  <p className="body-md">{b.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Big CTA banner */}
          <FadeUp delay={0.3}>
            <div className="relative rounded-3xl overflow-hidden p-8 md:p-12"
              style={{ background: "linear-gradient(135deg, rgba(255,77,46,0.12) 0%, rgba(245,166,35,0.08) 100%)", border: "1px solid rgba(255,77,46,0.2)" }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${BG_TEX})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="label-sm mb-2">지금 바로 시작하세요</div>
                  <h3 className="display-md" style={{ color: "var(--text-primary)" }}>
                    수강료 <span className="gradient-coral">0원</span> + 매월 <span className="gradient-gold">10만원</span>
                  </h3>
                  <p className="body-lg mt-2">2026년 4월 27일 개강 · 접수 마감 4월 20일(월) 18시</p>
                </div>
                <a href={APPLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-cta flex-shrink-0" style={{ padding: "1.125rem 2.5rem", fontSize: "1.0625rem" }}>
                  무료 신청하기 →
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TOOLS ──────────────────────────────────────────────────────────── */}
      <section id="tools" className="section-py" style={{ backgroundColor: "var(--navy-mid)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="label-sm mb-4">사용 툴</div>
              <h2 className="display-lg mb-5" style={{ color: "var(--text-primary)" }}>
                어도비 + AI로<br /><span className="gradient-coral">전문가처럼!</span>
              </h2>
              <p className="body-xl mb-10">
                업계 표준 <strong style={{ color: "var(--text-primary)" }}>Adobe Photoshop & Illustrator</strong>로 전문 스킬을 쌓고, 최신 AI 도구로 창작 속도를 10배 높이세요.
              </p>
              <div className="space-y-3">
                {tools.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 cursor-default"
                    style={{ backgroundColor: t.bg, border: `1px solid ${t.color}20` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${t.color}50`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${t.color}20`; }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                      style={{ backgroundColor: t.color, color: "#fff", fontSize: typeof t.abbr === "string" && t.abbr.length > 2 ? "1.25rem" : "0.875rem" }}>
                      {t.abbr}
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-0.5" style={{ color: t.color }}>{t.name}</div>
                      <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{t.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(ellipse at center, rgba(255,77,46,0.12) 0%, transparent 70%)", transform: "scale(1.05)", filter: "blur(30px)" }} />
                <div className="relative rounded-3xl overflow-hidden" style={{ border: "1px solid var(--ice-border)", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
                  <img src={HERO_IMG} alt="어도비 + AI 수업" className="w-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 card-glass p-4 rounded-2xl" style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
                  <div className="label-sm mb-2">배울 수 있는 툴</div>
                  <div className="flex gap-2">
                    {[{ l: "Ps", c: "#31A8FF" }, { l: "Ai", c: "#FF9A00" }, { l: "AI", c: "#B47FFF" }].map((t, i) => (
                      <span key={i} className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black"
                        style={{ backgroundColor: t.c, color: "#fff" }}>{t.l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ─────────────────────────────────────────────────────── */}
      <section id="curriculum" className="section-py" style={{ backgroundColor: "var(--obsidian)" }}>
        <div className="container">
          <FadeUp className="mb-16">
            <div className="label-sm mb-4">교육 커리큘럼</div>
            <h2 className="display-lg" style={{ color: "var(--text-primary)", maxWidth: "560px" }}>
              기초부터 <span className="gradient-coral">출시까지</span><br />8단계 완성
            </h2>
            <p className="body-lg mt-4 max-w-lg">240시간 체계적인 전문 교육과정</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {["Adobe Photoshop", "Adobe Illustrator", "AI 생성 툴"].map((t, i) => (
                <span key={i} className={["badge-ice", "badge-gold", "badge-coral"][i]}>{t}</span>
              ))}
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {curriculum.map((item, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <motion.div className="card-premium p-6 h-full"
                  whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg"
                      style={{ backgroundColor: "rgba(255,77,46,0.12)", color: "var(--coral)", letterSpacing: "0.05em" }}>
                      STEP {item.step}
                    </span>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="font-black text-base mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARGET + SCHEDULE ──────────────────────────────────────────────── */}
      <section id="schedule" className="section-py" style={{ backgroundColor: "var(--navy-mid)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Target */}
            <FadeUp>
              <div className="label-sm mb-4">이런 분께 추천</div>
              <h2 className="display-md mb-8" style={{ color: "var(--text-primary)" }}>
                당신을 위한<br /><span className="gradient-coral">과정입니다</span>
              </h2>
              <div className="space-y-3">
                {[
                  { icon: "👩‍🎨", text: "캐릭터 디자이너로 취·창업을 희망하는 여성" },
                  { icon: "💻", text: "포토샵·일러스트를 제대로 배우고 싶은 분" },
                  { icon: "🤖", text: "AI 도구로 창작 효율을 높이고 싶은 분" },
                  { icon: "💫", text: "이모티콘 작가로 부업·창업을 꿈꾸는 분" },
                  { icon: "⭐", text: "어도비 디자인 경력자 (우대)" },
                  { icon: "🇰🇷", text: "대한민국 거주 여성이라면 누구나 가능" },
                ].map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{ backgroundColor: "var(--navy-card)", border: "1px solid var(--ice-border)" }}>
                    <span className="text-xl flex-shrink-0">{t.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{t.text}</span>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            {/* Schedule */}
            <FadeUp delay={0.2}>
              <div className="label-sm mb-4">교육 일정</div>
              <h2 className="display-md mb-6" style={{ color: "var(--text-primary)" }}>신청 정보</h2>

              {/* Start date highlight */}
              <div className="relative p-6 rounded-3xl mb-6 overflow-hidden"
                style={{ background: "linear-gradient(135deg, rgba(245,166,35,0.15) 0%, rgba(255,77,46,0.1) 100%)", border: "1px solid rgba(245,166,35,0.3)" }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                  style={{ background: "var(--gold)", filter: "blur(40px)", transform: "translate(30%, -30%)" }} />
                <div className="relative z-10">
                  <div className="label-sm mb-2" style={{ color: "var(--gold)" }}>개강일</div>
                  <div className="text-4xl font-black mb-1" style={{ color: "var(--text-primary)" }}>2026년 4월 27일</div>
                  <div className="text-base font-semibold" style={{ color: "var(--text-secondary)" }}>월요일 · 월~금 13:30~17:30 · 60일 · 240시간</div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative pl-6" style={{ borderLeft: "2px solid var(--navy-border)" }}>
                {[
                  { icon: "📋", label: "접수 마감", value: "2026. 4. 20(월) 18시까지", highlight: true },
                  { icon: "📁", label: "접수 방법", value: "방문 접수 또는 이메일 접수 (구비서류 제출)", highlight: false },
                  { icon: "✉️", label: "이메일", value: "womanjob1@naver.com", highlight: false },
                  { icon: "📞", label: "전화 문의", value: "070-4048-6575", highlight: false },
                  { icon: "🏁", label: "선발 방법", value: "서류 전형(1차 합격) 후 면접 전형", highlight: false },
                  { icon: "📅", label: "교육 기간", value: "2026. 4. 27 ~ 7. 23 (60일, 240시간)", highlight: false },
                ].map((r, i) => (
                  <div key={i} className="relative flex gap-4 py-4" style={{ borderBottom: i < 5 ? "1px solid var(--ice-border)" : "none" }}>
                    <div className="timeline-dot absolute -left-[1.9375rem]"
                      style={{ backgroundColor: r.highlight ? "var(--coral)" : "var(--navy-card)", border: `2px solid ${r.highlight ? "var(--coral)" : "var(--navy-border)"}`, top: "1.25rem" }} />
                    <span className="text-base flex-shrink-0">{r.icon}</span>
                    <div>
                      <div className="text-xs font-bold mb-0.5" style={{ color: r.highlight ? "var(--coral)" : "var(--text-muted)", letterSpacing: "0.06em" }}>{r.label}</div>
                      <div className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{r.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-4 rounded-2xl" style={{ backgroundColor: "rgba(255,77,46,0.07)", border: "1px solid rgba(255,77,46,0.18)" }}>
                <p className="text-sm font-bold mb-1" style={{ color: "var(--coral)" }}>제출 서류</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>이력서 1부 & 반명함 사진 2장 + 훈련신청서 및 구직신청서</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="section-py" style={{ backgroundColor: "var(--obsidian)" }}>
        <div className="container max-w-3xl">
          <FadeUp className="mb-14">
            <div className="label-sm mb-4">자주 묻는 질문</div>
            <h2 className="display-lg" style={{ color: "var(--text-primary)" }}>FAQ</h2>
          </FadeUp>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <details className="group" style={{ background: "var(--navy-card)", border: "1px solid var(--ice-border)", borderRadius: "1.25rem", overflow: "hidden", cursor: "pointer" }}>
                  <summary className="flex items-center justify-between p-6 font-bold text-base list-none gap-4"
                    style={{ color: "var(--text-primary)" }}>
                    <span>Q. {f.q}</span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg font-light transition-transform"
                      style={{ backgroundColor: "rgba(255,77,46,0.12)", color: "var(--coral)" }}>+</span>
                  </summary>
                  <div className="px-6 pb-6 text-sm leading-relaxed" style={{ color: "var(--text-secondary)", borderTop: "1px solid var(--ice-border)", paddingTop: "1.25rem" }}>
                    {f.a}
                  </div>
                </details>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="section-py relative overflow-hidden" style={{ backgroundColor: "var(--navy-deep)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${BG_TEX})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,77,46,0.1) 0%, transparent 70%)" }} />
        <div className="container relative z-10 text-center">
          <FadeUp>
            <span className="badge-coral mx-auto mb-6 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse" style={{ backgroundColor: "var(--coral)", display: "inline-block" }} />
              마감 임박
            </span>
            <h2 className="display-hero mb-5" style={{ color: "var(--text-primary)" }}>
              지금 바로<br /><span className="gradient-coral">신청하세요!</span>
            </h2>
            <p className="body-xl mb-3 max-w-xl mx-auto">
              수강료 0원 + 매월 10만원 수당
            </p>
            <p className="text-lg font-bold mb-10" style={{ color: "var(--coral)" }}>
              2026년 4월 20일(월) 18시 마감
            </p>

            {/* Countdown big */}
            <div className="flex justify-center mb-10">
              <Countdown />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href={APPLY_LINK} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ fontSize: "1.125rem", padding: "1.25rem 3rem" }}>
                무료로 신청하기 →
              </a>
              <a href="tel:070-4048-6575" className="btn-ghost" style={{ padding: "1.25rem 2rem" }}>
                📞 070-4048-6575
              </a>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              womanjob1@naver.com · 강북여성인력개발센터 · 국비지원 직업훈련
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "var(--obsidian)", borderTop: "1px solid var(--ice-border)" }}>
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black"
                style={{ background: "linear-gradient(135deg, var(--coral), var(--gold))", color: "#fff" }}>✨</div>
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
