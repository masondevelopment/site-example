"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, CheckCircle2, Clock3 } from "lucide-react";
import { barbers, services } from "@/lib/data";
import { useBookingTool } from "./useBookingTool";
type Fields = {
  service: string;
  barber: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
};
const initial: Fields = {
  service: "",
  barber: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
};
function localDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
function getSlots(date: string, duration: number) {
  if (!date) return [];
  const day = new Date(`${date}T12:00:00`).getDay();
  if (day === 0) return [];
  const start = day === 6 ? 10 : 9;
  const end = day === 6 ? 18 : 20;
  const now = new Date();
  const currentTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Kyiv",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  return Array.from(
    { length: (end - start) * 2 },
    (_, i) =>
      `${String(start + Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`,
  ).filter((t) => {
    const [h, m] = t.split(":").map(Number);
    return (
      h * 60 + m + duration <= end * 60 &&
      (date !== localDate() || t > currentTime)
    );
  });
}
export default function Booking() {
  const [values, setValues] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [today, setToday] = useState("");
  const stageService = useCallback((service: string) => {
    setValues((v) => ({ ...v, service, time: "" }));
    setStatus("idle");
    setErrors({});
  }, []);
  useBookingTool(stageService);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    setToday(localDate());
    const readHash = () => {
      if (!window.location.hash.startsWith("#booking?")) return;
      const params = new URLSearchParams(window.location.hash.split("?")[1]);
      const service = params.get("service");
      const barber = params.get("barber");
      setStatus("idle");
      setValues((v) => ({
        ...v,
        ...(service !== null && services[Number(service)]
          ? { service, time: "" }
          : {}),
        ...(barber !== null && barbers[Number(barber)] ? { barber } : {}),
      }));
      document.getElementById("booking")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => {
      window.removeEventListener("hashchange", readHash);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);
  const selected =
    values.service === "" ? null : services[Number(values.service)];
  const slots = getSlots(values.date, selected?.duration ?? 40);
  const dates = today
    ? Array.from({ length: 60 }, (_, i) => {
        const date = new Date(`${today}T12:00:00`);
        date.setDate(date.getDate() + i);
        return {
          value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
          label: date.toLocaleDateString("uk-UA", {
            weekday: "short",
            day: "numeric",
            month: "long",
          }),
          closed: date.getDay() === 0,
        };
      })
    : [];
  function update(key: keyof Fields, value: string) {
    setValues((v) => ({
      ...v,
      [key]: value,
      ...(key === "date" || key === "service" ? { time: "" } : {}),
    }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!selected) next.service = "Оберіть послугу.";
    if (!values.barber) next.barber = "Оберіть майстра.";
    if (!values.date || values.date < localDate())
      next.date = "Оберіть сьогоднішню або майбутню дату.";
    else if (new Date(`${values.date}T12:00:00`).getDay() === 0)
      next.date = "У неділю відпочиваємо. Оберіть інший день.";
    if (!slots.includes(values.time)) next.time = "Оберіть доступний час.";
    if (values.name.trim().length < 2) next.name = "Вкажіть ваше ім’я.";
    const phone = values.phone.replace(/\D/g, "");
    if (!/^(380\d{9}|0\d{9})$/.test(phone))
      next.phone = "Введіть коректний номер телефону.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Введіть коректну електронну адресу.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    setStatus("submitting");
    timer.current = setTimeout(() => setStatus("success"), 850);
  }
  const attrs = (key: keyof Fields) => ({
    id: key,
    name: key,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      update(key, e.target.value),
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });
  const error = (key: keyof Fields) =>
    errors[key] && (
      <span id={`${key}-error`} className="field-error">
        {errors[key]}
      </span>
    );
  return (
    <section id="booking" className="section booking">
      <div className="container booking-layout">
        <div className="booking-copy">
          <p className="eyebrow">07 / ТВОЄ НАСТУПНЕ ПЕРЕТВОРЕННЯ</p>
          <h2>
            ЧАС ОНОВИТИ
            <br />
            <span className="brass">СТИЛЬ.</span>
          </h2>
          <p>Обери послугу, майстра та зручний час — решту залиш нам.</p>
          <div className="booking-promise">
            <Check size={17} />
            <span>Без передоплати</span>
            <Check size={17} />
            <span>Підтвердження телефоном</span>
          </div>
          <div className="booking-help">
            <span>Потрібна порада?</span>
            <a href="tel:+380670000000">
              +380 67 000 00 00 <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="booking-form-panel">
          {status === "success" ? (
            <div
              className="success"
              ref={successRef}
              tabIndex={-1}
              role="status"
            >
              <CheckCircle2 size={48} strokeWidth={1} />
              <p className="eyebrow">ЧЕКАЄМО НА ЗУСТРІЧ</p>
              <h3>Запис прийнято.</h3>
              <p>Дякуємо! Ми зв’яжемося з вами для підтвердження.</p>
              <div className="success-summary">
                <strong>{selected?.name}</strong>
                <span>
                  {new Date(`${values.date}T12:00:00`).toLocaleDateString(
                    "uk-UA",
                    { day: "numeric", month: "long" },
                  )}{" "}
                  · {values.time}
                </span>
                <span>
                  {values.barber === "any"
                    ? "Будь-який вільний майстер"
                    : barbers[Number(values.barber)]?.name}
                </span>
              </div>
              <p className="demo-note">
                Це демонстраційний запис. Дані не надсилаються та не
                зберігаються.
              </p>
              <button
                className="text-link"
                onClick={() => {
                  setValues(initial);
                  setStatus("idle");
                }}
              >
                Зробити ще один запис <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={submit}
              noValidate
              aria-label="Запис до барбершопу"
            >
              <div className="form-step">
                <span>01</span> Послуга та час
              </div>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="service">Послуга</label>
                  <select {...attrs("service")} required>
                    <option value="">Оберіть послугу</option>
                    {services.map((s, i) => (
                      <option value={i} key={s.name}>
                        {s.name} — {s.price} ₴
                      </option>
                    ))}
                  </select>
                  {error("service")}
                </div>
                <div className="field">
                  <label htmlFor="barber">Майстер</label>
                  <select {...attrs("barber")} required>
                    <option value="">Оберіть майстра</option>
                    <option value="any">Будь-який вільний майстер</option>
                    {barbers.map((b, i) => (
                      <option value={i} key={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                  {error("barber")}
                </div>
                <div className="field">
                  <label htmlFor="date">Дата</label>
                  <select {...attrs("date")} required>
                    <option value="">Оберіть дату</option>
                    {dates.map((date) => (
                      <option
                        key={date.value}
                        value={date.value}
                        disabled={date.closed}
                      >
                        {date.label}
                        {date.closed ? " — вихідний" : ""}
                      </option>
                    ))}
                  </select>
                  {error("date")}
                </div>
                <div className="field">
                  <label htmlFor="time">Час</label>
                  <select {...attrs("time")} required>
                    <option value="">
                      {values.date
                        ? slots.length
                          ? "Оберіть час"
                          : "Немає доступного часу"
                        : "Спершу оберіть дату"}
                    </option>
                    {slots.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  {error("time")}
                </div>
              </div>
              <div className="form-step">
                <span>02</span> Твої контакти
              </div>
              <div className="form-grid">
                <div className="field full">
                  <label htmlFor="name">Ім’я</label>
                  <input
                    {...attrs("name")}
                    autoComplete="given-name"
                    placeholder="Як до тебе звертатися?"
                    required
                    maxLength={80}
                  />
                  {error("name")}
                </div>
                <div className="field">
                  <label htmlFor="phone">Номер телефону</label>
                  <input
                    {...attrs("phone")}
                    type="tel"
                    autoComplete="tel"
                    placeholder="+380 __ ___ __ __"
                    required
                  />
                  {error("phone")}
                </div>
                <div className="field">
                  <label htmlFor="email">Електронна пошта</label>
                  <input
                    {...attrs("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="Твоя електронна адреса"
                    required
                  />
                  {error("email")}
                </div>
              </div>
              {selected && (
                <div className="booking-total" aria-live="polite">
                  <span>
                    <Clock3 size={16} />
                    {selected.duration} хв
                  </span>
                  <strong>{selected.price.toLocaleString("uk-UA")} ₴</strong>
                </div>
              )}
              <button
                className="button submit-button"
                type="submit"
                disabled={status === "submitting"}
              >
                {status === "submitting"
                  ? "Оформлюємо запис…"
                  : "Підтвердити запис"}
                <ArrowUpRight size={19} />
              </button>
              <p className="demo-note">
                Демонстраційна форма. Дані не надсилаються та не зберігаються.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
