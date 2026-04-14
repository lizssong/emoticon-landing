/**
 * Design: 모던 그라디언트 + 글래스모피즘
 * Colors: 코랄(#FF6B6B) + 오렌지(#FF8E53) + 크림화이트(#FFF8F0)
 * Target: 캐릭터 이모티콘 디자이너 국비지원 강의 모객 랜딩페이지
 */

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/114049990/2NXYXQdjjZ9aMNwZdApGUP/hero-emoticon-DdGqMSjUkFA5Ek2xYVmrjP.webp";
const AI_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/114049990/2NXYXQdjjZ9aMNwZdApGUP/ai-character-design-cVLLCaJRh2XtGbdYWRmrmb.webp";

function CountUpNumber({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const floatingEmojis = ["✨", "🎨", "💖", "🌟", "🎭", "💫", "🦋", "🎪"];

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const deadline = new Date("2026-04-20T18:00:00+09:00");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const benefits = [
    { icon: "💰", title: "수강료 완전 무료", desc: "국비지원으로 수강료 0원!", highlight: "0원", color: "from-red-400 to-orange-400" },
    { icon: "💵", title: "매월 10만원 수당", desc: "출석 80% 이상 시 매월 지급", highlight: "10만원", color: "from-orange-400 to-yellow-400" },
    { icon: "🤖", title: "AI 활용 디자인", desc: "최신 AI 툴로 캐릭터 제작", highlight: "AI 활용", color: "from-pink-400 to-red-400" },
    { icon: "📱", title: "이모티콘 작가 등록", desc: "카카오 이모티콘 직접 출시", highlight: "작가 등록", color: "from-yellow-400 to-orange-400" },
    { icon: "🎨", title: "굿즈 창업 연계", desc: "굿즈 제작·판매로 부업/창업", highlight: "창업 가능", color: "from-orange-400 to-red-400" },
    { icon: "🏆", title: "취업성공수당", desc: "수료 후 6개월 내 취업 시 지급", highlight: "추가 지원", color: "from-red-400 to-pink-400" },
  ];

  const curriculum = [
    { step: "01", title: "캐릭터 기획", desc: "캐릭터 산업 동향 분석 + 이모티콘 기획 및 콘티 제작" },
    { step: "02", title: "드로잉 기초", desc: "포토샵 기본 구성 + 펜 타블렛으로 디지털 드로잉" },
    { step: "03", title: "일러스트 제작", desc: "클리핑 마스크, 브러쉬 툴 등 일러스트레이터 활용" },
    { step: "04", title: "캐릭터 디자인", desc: "나만의 캐릭터 CI/BI 제작 및 브랜딩" },
    { step: "05", title: "이모티콘 제작", desc: "움직이는 이모티콘 제작 + 카카오 작가 등록" },
    { step: "06", title: "굿즈 & 창업", desc: "굿즈 제작·판매를 통한 창업 방법 실습" },
    { step: "07", title: "현장 견학", desc: "캐릭터 라이선싱페어 현장 방문 견학" },
    { step: "08", title: "취업 준비", desc: "이력서·자기소개서 작성 + 면접 기법 코칭" },
  ];

  const faqs = [
    { q: "정말 수강료가 무료인가요?", a: "네! 국비지원 직업훈련 과정으로 수강료가 전액 지원됩니다. 단, 국민취업지원제도 직업훈련 지원수당 수급자 등 일부는 제외될 수 있습니다." },
    { q: "디자인 경험이 없어도 수강 가능한가요?", a: "물론입니다! 포토샵 기초부터 차근차근 배우는 커리큘럼으로 구성되어 있습니다. 어도비 디자인 경력자는 우대 혜택이 있습니다." },
    { q: "수당은 언제 받을 수 있나요?", a: "월 80% 이상 출석 시 매월 1회 훈련수당이 지급됩니다. 수료 후 6개월 이내 취업 성공 시 취업성공수당도 별도 지급됩니다." },
    { q: "신청은 어떻게 하나요?", a: "이력서 1부와 반명함 사진 2장을 준비하여 방문 접수하거나 womanjob1@naver.com으로 이메일 접수하세요. 서류 전형 합격 후 면접이 진행됩니다." },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden hero-gradient min-h-screen flex items-center">
        {/* Floating emoji decorations */}
        {floatingEmojis.map((emoji, i) => (
          <div
            key={i}
            className="emoji-float"
            style={{
              top: `${10 + (i * 11) % 80}%`,
              left: `${5 + (i * 13) % 90}%`,
              animationDelay: `${i * 0.4}s`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              fontSize: `${1.5 + (i % 3) * 0.5}rem`,
            }}
          >
            {emoji}
          </div>
        ))}

        <div className="container relative z-10 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-white"
            >
              {/* Deadline badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6"
              >
                <span className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></span>
                <span className="text-white font-700 text-sm">⏰ 접수 마감: 4월 20일(월) 18시까지</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white font-black mb-4"
                style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1.15 }}
              >
                수강료 <span className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1 inline-block">0원</span>으로<br />
                <span className="text-yellow-200">이모티콘 작가</span>가 되세요!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-lg mb-2 font-medium"
              >
                🤖 AI 활용 캐릭터 이모티콘 디자이너 양성과정
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-white/80 text-base mb-8"
              >
                강북여성인력개발센터 · 국비지원 직업훈련 · 2026. 4. 27 개강
              </motion.p>

              {/* Key benefits pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {["✅ 수강료 완전 무료", "💵 매월 10만원 수당", "🤖 AI 활용 수업", "🎨 이모티콘 작가 등록"].map((item, i) => (
                  <span key={i} className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-600 rounded-full px-4 py-2">
                    {item}
                  </span>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="mailto:womanjob1@naver.com"
                  className="cta-button"
                  style={{ background: "white", color: "#FF6B6B", fontWeight: 900 }}
                >
                  📧 지금 바로 신청하기
                </a>
                <a
                  href="tel:02-945-6674"
                  className="cta-button"
                  style={{ background: "rgba(255,255,255,0.2)", border: "2px solid white", backdropFilter: "blur(8px)" }}
                >
                  📞 전화 문의
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl float-animation">
                <img
                  src={HERO_IMAGE}
                  alt="캐릭터 이모티콘 디자인"
                  className="w-full object-cover"
                  style={{ maxHeight: "420px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating info cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 shadow-xl float-animation-delayed"
              >
                <div className="text-3xl font-black text-orange-500">240시간</div>
                <div className="text-sm text-gray-600 font-medium">전문 교육과정</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 }}
                className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 shadow-xl float-animation-slow"
              >
                <div className="text-3xl font-black text-red-500">0원</div>
                <div className="text-sm text-gray-600 font-medium">수강료 전액 지원</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#FFF8F0"/>
          </svg>
        </div>
      </section>

      {/* ===== COUNTDOWN TIMER ===== */}
      <section className="section-gradient py-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6 md:p-8 text-center shadow-lg border border-orange-100"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 rounded-full px-4 py-2 mb-4 font-700 text-sm">
              🔥 마감 임박! 서두르세요
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">접수 마감까지 남은 시간</h2>
            <p className="text-gray-500 mb-6 text-sm">2026년 4월 20일(월) 오후 6시 마감</p>
            <div className="flex justify-center gap-4 md:gap-8">
              {[
                { label: "일", value: timeLeft.days },
                { label: "시간", value: timeLeft.hours },
                { label: "분", value: timeLeft.minutes },
                { label: "초", value: timeLeft.seconds },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-white font-black text-2xl md:text-4xl shadow-lg"
                    style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E53)" }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <span className="text-gray-600 text-sm mt-2 font-600">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="section-gradient py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "💰", label: "수강료", value: 0, suffix: "원", desc: "완전 무료" },
              { icon: "💵", label: "월 수당", value: 10, suffix: "만원", desc: "매월 지급" },
              { icon: "⏱️", label: "교육시간", value: 240, suffix: "시간", desc: "전문 과정" },
              { icon: "📅", label: "교육기간", value: 60, suffix: "일", desc: "집중 훈련" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="benefit-card text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-sm text-gray-500 font-medium mb-1">{stat.label}</div>
                <div className="text-3xl md:text-4xl font-black gradient-text">
                  <CountUpNumber end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOOK SECTION ===== */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-orange-100 text-orange-600 rounded-full px-4 py-2 text-sm font-700 mb-4">
              이런 분께 딱입니다!
            </span>
            <h2 className="section-title text-gray-800 mb-4">
              지금 이 강의를 <span className="gradient-text">놓치면 후회</span>합니다
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              국비지원으로 수강료 0원, 매월 10만원 수당까지 받으면서 AI로 나만의 캐릭터를 만들 수 있는 기회!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { emoji: "😔", before: "이모티콘 만들고 싶은데 어디서 배워야 할지 모르겠어요", after: "체계적인 커리큘럼으로 기초부터 출시까지!" },
              { emoji: "💸", before: "디자인 학원비가 너무 비싸서 엄두가 안 나요", after: "국비지원으로 수강료 완전 무료!" },
              { emoji: "🤔", before: "AI 툴 활용법을 배우고 싶은데 기회가 없어요", after: "최신 AI 활용 캐릭터 디자인 실습!" },
              { emoji: "🏠", before: "육아하면서 취업 준비하기가 너무 힘들어요", after: "오후 수업 + 수당 지원으로 부담 없이!" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="benefit-card"
              >
                <div className="flex gap-4">
                  <div className="text-3xl flex-shrink-0">{item.emoji}</div>
                  <div>
                    <p className="text-gray-400 text-sm line-through mb-2">{item.before}</p>
                    <p className="text-gray-800 font-700 text-base">✨ {item.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS SECTION ===== */}
      <section className="section-gradient py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-red-100 text-red-600 rounded-full px-4 py-2 text-sm font-700 mb-4">
              💎 수강 혜택
            </span>
            <h2 className="section-title text-gray-800">
              이 모든 혜택이 <span className="gradient-text">무료</span>로!
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="benefit-card group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {benefit.icon}
                </div>
                <h3 className="font-800 text-gray-800 text-lg mb-1">{benefit.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{benefit.desc}</p>
                <span className={`inline-block text-white text-xs font-700 px-3 py-1 rounded-full bg-gradient-to-r ${benefit.color}`}>
                  {benefit.highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI SECTION ===== */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-purple-100 text-purple-600 rounded-full px-4 py-2 text-sm font-700 mb-4">
                🤖 AI 활용 수업
              </span>
              <h2 className="section-title text-gray-800 mb-6">
                AI로 더 빠르게,<br />
                <span className="gradient-text">더 창의적으로</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                최신 AI 도구를 활용하여 캐릭터 아이디어를 빠르게 시각화하고, 나만의 독창적인 이모티콘을 제작합니다. AI는 도구일 뿐, 창의력은 여러분의 것!
              </p>
              <div className="space-y-3">
                {[
                  "AI로 캐릭터 아이디어 스케치 자동화",
                  "AI 보조 컬러링 및 스타일 적용",
                  "움직이는 이모티콘 AI 활용 제작",
                  "카카오 이모티콘 심사 통과 노하우",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-xs font-700 flex-shrink-0">
                      ✓
                    </div>
                    <span className="text-gray-700 font-500">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl float-animation">
                <img src={AI_IMAGE} alt="AI 캐릭터 디자인" className="w-full object-cover" />
              </div>
              <div
                className="absolute -bottom-6 -right-6 rounded-2xl p-5 shadow-xl"
                style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E53)", color: "white" }}
              >
                <div className="text-2xl font-black">AI + 창의력</div>
                <div className="text-sm opacity-90">= 나만의 이모티콘</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CURRICULUM ===== */}
      <section className="section-gradient py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-orange-100 text-orange-600 rounded-full px-4 py-2 text-sm font-700 mb-4">
              📚 교육 커리큘럼
            </span>
            <h2 className="section-title text-gray-800">
              기초부터 <span className="gradient-text">출시까지</span>
            </h2>
            <p className="text-gray-500 mt-3">240시간 체계적인 전문 교육과정</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {curriculum.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="benefit-card relative overflow-hidden"
              >
                <div
                  className="text-5xl font-black absolute top-3 right-3 opacity-10"
                  style={{ color: "#FF6B6B" }}
                >
                  {item.step}
                </div>
                <div
                  className="text-xs font-700 rounded-full px-3 py-1 inline-block mb-3 text-white"
                  style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E53)" }}
                >
                  STEP {item.step}
                </div>
                <h3 className="font-800 text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCHEDULE INFO ===== */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-10">
              <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-4 py-2 text-sm font-700 mb-4">
                📋 교육 안내
              </span>
              <h2 className="section-title text-gray-800">
                교육 <span className="gradient-text">일정 & 신청</span>
              </h2>
            </div>

            <div className="glass-card rounded-3xl p-6 md:p-8 shadow-lg border border-orange-100">
              <div className="space-y-5">
                {[
                  { label: "교육기간", value: "2026. 4. 27.(월) ~ 7. 23.(목)", icon: "📅" },
                  { label: "교육시간", value: "월~금 13:30~17:30 (주5일, 1일 4시간)", icon: "⏰" },
                  { label: "접수마감", value: "2026. 4. 20.(월) 오후 6시까지", icon: "🔔", highlight: true },
                  { label: "접수방법", value: "방문 접수 또는 이메일 접수 (구비서류 제출)", icon: "📝" },
                  { label: "이메일", value: "womanjob1@naver.com", icon: "📧" },
                  { label: "선발방법", value: "서류 전형(1차 합격) 후 면접전형", icon: "✅" },
                  { label: "훈련대상", value: "캐릭터 디자이너로 취·창업 희망하는 대한민국 거주 여성", icon: "👩" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex gap-4 p-4 rounded-2xl ${item.highlight ? "bg-red-50 border-2 border-red-200" : "bg-gray-50"}`}
                  >
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-xs text-gray-400 font-600 mb-1">{item.label}</div>
                      <div className={`font-700 ${item.highlight ? "text-red-600 text-lg" : "text-gray-800"}`}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-orange-50 border border-orange-200">
                <p className="text-sm text-orange-700 font-600">
                  📎 제출서류: 이력서 1부 + 반명함 사진 2장 + 훈련신청서 + 구직신청서
                  <br />
                  <span className="text-orange-500 text-xs mt-1 block">※ 훈련신청서 및 구직신청서는 강북센터 홈페이지 자료실에서 다운로드 가능</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-gradient py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-green-100 text-green-600 rounded-full px-4 py-2 text-sm font-700 mb-4">
              ❓ 자주 묻는 질문
            </span>
            <h2 className="section-title text-gray-800">
              궁금한 점을 <span className="gradient-text">해결해드려요</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="benefit-card"
              >
                <div className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-700 flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E53)" }}
                  >
                    Q
                  </div>
                  <div>
                    <p className="font-700 text-gray-800 mb-2">{faq.q}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="hero-gradient py-16 relative overflow-hidden">
        {floatingEmojis.slice(0, 5).map((emoji, i) => (
          <div
            key={i}
            className="emoji-float"
            style={{
              top: `${10 + (i * 18) % 80}%`,
              left: `${5 + (i * 20) % 90}%`,
              animation: `float ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {emoji}
          </div>
        ))}

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
              <span className="text-white font-700 text-sm">마감 임박! 자리가 얼마 남지 않았습니다</span>
            </div>

            <h2
              className="text-white font-black mb-4"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.2 }}
            >
              지금 신청하면<br />
              <span className="text-yellow-200">수강료 0원 + 매월 10만원</span>
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              AI로 나만의 캐릭터를 만들고, 이모티콘 작가로 데뷔하세요!<br />
              강북여성인력개발센터가 함께합니다.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:womanjob1@naver.com"
                className="cta-button"
                style={{ background: "white", color: "#FF6B6B", fontWeight: 900, fontSize: "1.1rem" }}
              >
                📧 womanjob1@naver.com 신청하기
              </a>
              <a
                href="https://gangbuk.seoulwomanup.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                style={{ background: "rgba(255,255,255,0.2)", border: "2px solid white", backdropFilter: "blur(8px)" }}
              >
                🌐 강북센터 홈페이지
              </a>
            </div>

            <p className="text-white/70 text-sm mt-6">
              📞 팩스 문의: 02-945-6674 (1관) / 02-980-2379 (2관)
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container text-center">
          <div className="text-2xl font-black gradient-text mb-2">캐릭터 이모티콘 디자이너</div>
          <p className="text-gray-400 text-sm mb-4">강북여성인력개발센터 · 여성새로일하기센터 · 국비지원 직업훈련</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>📧 womanjob1@naver.com</span>
            <span>📞 02-945-6674</span>
            <span>📍 서울 강북구</span>
          </div>
          <p className="text-gray-600 text-xs mt-6">
            주관: 성평등가족부 · 서울특별시 | 운영: 강북여성인력개발센터
          </p>
        </div>
      </footer>

    </div>
  );
}
