import { ArrowUpRight, Instagram, MapPin } from "lucide-react";
import { nav } from "@/lib/data";
export default function Contact() {
  return (
    <>
      <section id="contact" className="section container contact">
        <div>
          <p className="eyebrow">09 / ЗУСТРІНЕМОСЯ В BLACKLINE</p>
          <h2>
            ТВОЄ МІСЦЕ.
            <br />У СЕРЦІ КИЄВА.
          </h2>
          <address>
            вул. Велика Васильківська, 72
            <br />
            Київ, Україна
          </address>
          <a className="contact-phone" href="tel:+380670000000">
            +380 67 000 00 00
          </a>
          <a className="contact-email" href="mailto:hello@blackline.barber">
            hello@blackline.barber
          </a>
          <div className="opening-hours">
            <div>
              <span>Пн–Пт</span>
              <span>09:00–20:00</span>
            </div>
            <div>
              <span>Сб</span>
              <span>10:00–18:00</span>
            </div>
            <div>
              <span>Нд</span>
              <span>Вихідний</span>
            </div>
          </div>
          <a
            href="https://www.instagram.com/"
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={17} />
            @blackline.barber
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div
          className="map-panel"
          aria-label="Схематичне розташування: Велика Васильківська, 72, біля метро Олімпійська"
        >
          <div className="map-grid" />
          <div className="map-road road-one" />
          <div className="map-road road-two" />
          <div className="map-road road-three" />
          <span className="map-street">ВЕЛИКА ВАСИЛЬКІВСЬКА</span>
          <span className="map-street second">ВУЛ. ЖИЛЯНСЬКА</span>
          <span className="map-metro">М · ОЛІМПІЙСЬКА</span>
          <div className="map-pin">
            <MapPin size={26} />
            <strong>BLACKLINE</strong>
            <span>Велика Васильківська, 72</span>
          </div>
          <span className="map-caption">
            КИЇВ / 50.432° ПН. Ш. · 30.516° СХ. Д.
          </span>
          <a
            className="map-link"
            href="https://www.google.com/maps/search/?api=1&query=Київ+Велика+Васильківська+72"
            target="_blank"
            rel="noreferrer"
          >
            Прокласти маршрут <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a className="wordmark" href="#home">
              BLACKLINE<span>СТИЛЬ У КОЖНІЙ ДЕТАЛІ.</span>
            </a>
            <nav aria-label="Навігація внизу сторінки">
              {nav
                .filter(([, id]) =>
                  ["services", "team", "gallery", "contact"].includes(id),
                )
                .map(([label, id]) => (
                  <a key={id} href={`#${id}`}>
                    {label}
                  </a>
                ))}
            </nav>
            <a href="mailto:hello@blackline.barber">
              hello@blackline.barber <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="footer-bottom">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="BLACKLINE в Instagram — демонстраційне посилання">Instagram ↗</a>
            <span>
              © {new Date().getFullYear()} BLACKLINE. Усі права захищено.
            </span>
            <span>Портфоліо-концепт. Заклад, команда та відгуки вигадані.</span>
            <a href="#home">Нагору ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
