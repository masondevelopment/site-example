"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
const features = [
  [
    "Індивідуальна консультація",
    "Спершу слухаємо. Обговорюємо довжину, форму та те, скільки часу ти готовий витрачати на укладання.",
  ],
  [
    "Точність у кожній деталі",
    "Перевіряємо форму, перехід і контури. Робота завершена, коли все на своєму місці.",
  ],
  [
    "Професійна косметика",
    "Підбираємо засоби під твоє волосся та шкіру. Показуємо, як користуватися ними вдома.",
  ],
  [
    "Атмосфера без зайвого шуму",
    "Хороша музика, кава та час для себе. Поговоримо або помовчимо — як тобі комфортніше.",
  ],
];
function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(value);
  useEffect(() => {
    if (!visible || reduced) return;
    const controls = animate(0, value, {
      duration: 1.35,
      ease: "easeOut",
      onUpdate: (v) =>
        setCount(value === 4.9 ? Math.round(v * 10) / 10 : Math.round(v)),
    });
    return controls.stop;
  }, [visible, reduced, value]);
  return (
    <div ref={ref} className="stat">
      <strong aria-label={`${value}${suffix}`}>
        {count.toLocaleString("uk-UA")}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}
export default function Experience() {
  return (
    <section className="experience section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / РІЗНИЦЯ У ПІДХОДІ</p>
            <h2>
              ЗРОБЛЕНО З УВАГОЮ.
              <br />
              ВІД ПЕРШОЇ ХВИЛИНИ.
            </h2>
          </div>
        </div>
        <div className="features">
          {features.map(([title, text], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="stats">
          <Counter value={10} suffix="+" label="років досвіду команди" />
          <Counter value={8000} suffix="+" label="стрижок із характером" />
          <Counter value={4.9} suffix="" label="середня оцінка гостей" />
        </div>
      </div>
    </section>
  );
}
