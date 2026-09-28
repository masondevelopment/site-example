import { ArrowDown, ArrowUpRight } from "lucide-react";
import { photo } from "@/lib/data";
import Reveal from "./Reveal";
export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-image">
        <img
          src={photo(7697445, 2000)}
          alt="Барбер зосереджено працює над точною формою чоловічої стрижки"
          fetchPriority="high"
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-content container">
        <Reveal>
          <p className="eyebrow">
            <span className="small-line" /> БАРБЕРШОП ДЛЯ ТИХ, ХТО ЦІНУЄ ДЕТАЛІ
          </p>
          <h1>
            ТВІЙ СТИЛЬ.
            <br />
            <span>ТВОЇ ПРАВИЛА.</span>
          </h1>
          <p className="hero-description">
            Точні стрижки, бездоганні фейди
            <br />
            та догляд, створений під тебе.
          </p>
          <div className="hero-actions">
            <a className="button" href="#booking">
              Записатися <ArrowUpRight size={19} />
            </a>
            <a className="text-link" href="#services">
              Переглянути послуги <ArrowUpRight size={17} />
            </a>
          </div>
        </Reveal>
      </div>
      <div className="hero-bottom container">
        <span>КИЇВ, ВЕЛИКА ВАСИЛЬКІВСЬКА, 72</span>
        <span className="hours">
          <i /> ПН–ПТ · 09:00–20:00
        </span>
        <a href="#intro" aria-label="Дізнатися більше про BLACKLINE">
          <ArrowDown size={19} />
        </a>
      </div>
      <div className="hero-side">МАЙСТЕРНІСТЬ. ХАРАКТЕР. BLACKLINE.</div>
    </section>
  );
}
