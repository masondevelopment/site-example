import { ArrowUpRight, Instagram, Star } from "lucide-react";
import { barbers, photo, services } from "@/lib/data";
import Reveal from "./Reveal";
export function Intro() {
  return (
    <section id="intro" className="section container intro">
      <div className="intro-photo">
        <img
          src={photo(3993296, 1000)}
          alt="Шкіряне крісло та дзеркало в інтер’єрі барбершопу"
          loading="lazy"
        />
        <span className="photo-note">ТВІЙ ЧАС. ТВОЄ МІСЦЕ.</span>
      </div>
      <Reveal className="intro-copy">
        <p className="eyebrow">01 / ЗНАЙОМСТВО</p>
        <h2>
          БІЛЬШЕ, НІЖ
          <br />
          ПРОСТО СТРИЖКА<span className="brass">.</span>
        </h2>
        <p>
          BLACKLINE — це простір, де майстерність, стиль і увага до деталей
          стають частиною твого образу.
        </p>
        <p>
          Ми не працюємо за шаблоном. Кожна стрижка починається з розуміння
          людини, яка сидить у кріслі. Твій ритм життя, твоє волосся, твої
          звички — саме з цього починається хороша форма.
        </p>
        <a className="text-link" href="#about">
          Наш підхід <ArrowUpRight size={18} />
        </a>
        <div className="intro-sign">
          З ПОВАГОЮ ДО ТВОГО СТИЛЮ, <strong>BLACKLINE</strong>
        </div>
      </Reveal>
    </section>
  );
}
export function Services() {
  return (
    <section id="services" className="services section">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">02 / ПОСЛУГИ ТА ЦІНИ</p>
            <h2>
              НІЧОГО ЗАЙВОГО.
              <br />
              ТІЛЬКИ ТВОЄ.
            </h2>
          </div>
          <p>
            Від класики до нової версії себе.
            <br />
            Консультація та укладання —<br />
            частина кожної стрижки.
          </p>
        </Reveal>
        <div className="service-list">
          {services.map((s, i) => (
            <a
              className="service-row"
              href={`#booking?service=${i}`}
              key={s.name}
            >
              <span className="service-number">0{i + 1}</span>
              <div className="service-title">
                <h3>{s.name}</h3>
                <p>{s.description}</p>
              </div>
              <span className="service-duration">{s.duration} хв</span>
              <span className="service-price">
                {s.price.toLocaleString("uk-UA")} <small>₴</small>
              </span>
              <ArrowUpRight className="service-arrow" size={23} />
              <span className="sr-only"> — записатися</span>
            </a>
          ))}
        </div>
        <p className="service-note">
          Усе необхідне включено. Без прихованих доплат.
        </p>
      </div>
    </section>
  );
}
export function Team() {
  return (
    <section id="team" className="section container">
      <Reveal className="section-heading">
        <div>
          <p className="eyebrow">03 / НАШІ МАЙСТРИ</p>
          <h2>
            РУКИ, ЯКИМ
            <br />
            ДОВІРЯЮТЬ.
          </h2>
        </div>
        <p>
          Різні характери. Власний почерк.
          <br />
          Одна вимога до себе —<br />
          зробити свою роботу бездоганно.
        </p>
      </Reveal>
      <div className="team-grid">
        {barbers.map((b, i) => (
          <article className={`barber barber-${i}`} key={b.name}>
            <div className="barber-image">
              <img
                src={photo(b.image, 800)}
                alt={`${b.name}, ${b.role.toLowerCase()}`}
                loading="lazy"
              />
              <span className="barber-years">{b.years}</span>
              <a
                className="instagram-button"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label={`${b.name} — Instagram (демонстраційне посилання)`}
              >
                <Instagram size={18} />
              </a>
            </div>
            <div className="barber-label">
              <p>{b.role}</p>
              <span>0{i + 1}</span>
            </div>
            <h3>{b.name}</h3>
            <p className="barber-description">{b.description}</p>
            <a className="text-link" href={`#booking?barber=${i}`}>
              До майстра <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
const gallery = [
  [
    10003357,
    "Форма має значення",
    "Чоловіча стрижка з акуратним переходом і доглянутою бородою",
  ],
  [
    7697208,
    "Інструменти майстерності",
    "Професійні ножиці, машинки та інструменти барбера",
  ],
  [7697445, "У процесі", "Барбер працює над стрижкою гостя"],
  [
    9387375,
    "Чіткість кожної лінії",
    "Барбер із небезпечною бритвою перед початком гоління",
  ],
  [
    3993296,
    "Місце, де можна видихнути",
    "Крісло та деталі інтер’єру барбершопу",
  ],
] as const;
export function Gallery() {
  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">05 / У ФОКУСІ</p>
            <h2>ДЕТАЛІ ГОВОРЯТЬ.</h2>
          </div>
          <span className="gallery-aside">
            БЕЗ ЗАЙВИХ СЛІВ.
            <br />
            ПРОСТО НАША РОБОТА.
          </span>
        </Reveal>
        <div className="gallery-grid">
          {gallery.map(([id, caption, alt], i) => (
            <figure
              className={`gallery-item gallery-${i}`}
              key={caption}
              tabIndex={0}
            >
              <img src={photo(id, 1200)} alt={alt} loading="lazy" />
              <figcaption>
                <span>{caption}</span>
                <span>0{i + 1}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
const reviews = [
  {
    name: "Дмитро",
    text: "Прийшов уперше за порадою друга. Максим одразу зрозумів, що хочу, хоча я сам нормально пояснити не зміг. Тепер записуюсь тільки сюди.",
    detail: "Фейд · майстер Максим",
  },
  {
    name: "Олег",
    text: "Ціную, коли починають вчасно і не поспішають закінчити. Андрій порадив трохи змінити форму — волосся тепер набагато простіше вкладати зранку.",
    detail: "Класична стрижка · майстер Андрій",
  },
  {
    name: "Владислав",
    text: "Спокійне місце, хороша кава, нормальна розмова. Бороду зробили саме так, як просив. Приємно, що пояснили, як доглядати за нею вдома.",
    detail: "Стрижка + борода · майстер Олексій",
  },
];
export function Testimonials() {
  return (
    <section className="section container reviews">
      <div className="section-heading">
        <div>
          <p className="eyebrow">06 / СЛОВО ГОСТЯМ</p>
          <h2>
            ПОВЕРТАЮТЬСЯ.
            <br />І РАДЯТЬ ДРУЗЯМ.
          </h2>
        </div>
        <div className="review-rating">
          <strong>
            4,9<span>/ 5</span>
          </strong>
          <div aria-label="5 зірок">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={15} fill="currentColor" />
            ))}
          </div>
          <p>Середня оцінка гостей</p>
        </div>
      </div>
      <div className="reviews-grid">
        {reviews.map((r) => (
          <figure key={r.name}>
            <span className="quote-mark">“</span>
            <blockquote>{r.text}</blockquote>
            <figcaption>
              <strong>{r.name}</strong>
              <span>{r.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
export function Philosophy() {
  return (
    <section id="about" className="philosophy section">
      <div className="container">
        <p className="eyebrow">08 / ФІЛОСОФІЯ BLACKLINE</p>
        <Reveal>
          <h2>
            МИ СТРИЖЕМО
            <br />
            <span>НЕ ЗА ТРЕНДАМИ.</span>
            <br />
            МИ ПРАЦЮЄМО
            <br />З ТВОЇМ СТИЛЕМ.
          </h2>
        </Reveal>
        <div className="philosophy-bottom">
          <span className="philosophy-mark">B/</span>
          <p>
            Хороша стрижка не перетворює тебе на когось іншого. Вона підкреслює
            те, що вже є. Ми віримо в майстерність без показовості, чесну пораду
            й деталі, які залишаються з тобою після виходу з барбершопу.
          </p>
        </div>
      </div>
    </section>
  );
}
