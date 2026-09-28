import Link from 'next/link';
export default function NotFound() {
  return <main className="container min-h-screen flex flex-col items-start justify-center gap-8"><p className="eyebrow brass">BLACKLINE / 404</p><h1 className="display text-6xl">СТОРІНКУ НЕ ЗНАЙДЕНО.</h1><p>Можливо, адреса змінилася. Повернімося на головну.</p><Link className="button" href="/">На головну ↗</Link></main>;
}
