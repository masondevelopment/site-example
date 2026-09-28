# BLACKLINE

Завершений портфоліо-концепт преміального київського барбершопу. Увесь інтерфейс українською. Next.js App Router, TypeScript, Tailwind CSS 4, Framer Motion та Lucide React.

## Запуск

Потрібен Node.js 20.9 або новіший.

```bash
cd blackline
npm install
npm run dev
```

Відкрийте http://localhost:3000. Якщо термінал уже в папці `blackline`, перша команда не потрібна. Репозиторій також містить `pnpm-lock.yaml`; для точно відтворюваного встановлення: `pnpm install --frozen-lockfile`.

```bash
npm run typecheck
npm run build
```

Проєкт налаштований на статичний експорт. Готовий сайт з’явиться в `out/`; розмістіть цю папку на будь-якому статичному хостингу. `npm start` запускає локальний перегляд готової папки `out/`.

## Структура

- `app/` — сторінка, українські SEO/OG-метадані та дизайн-система.
- `components/` — навігація, головний екран, редакційні розділи, статистика, запис і контакти.
- `lib/data.ts` — послуги, ціни, майстри та адреси фотографій.
- `public/icon.svg` — фірмовий favicon.
- `.openai/hosting.json` — конфігурація приватного розміщення Sites.

## Запис

Форма перевіряє послугу, майстра, дату, час, ім’я, український телефон та електронну адресу. Доступні найближчі 60 днів; неділі закриті. Час враховує київський часовий пояс, суботній графік і тривалість послуги. Клік на послугу або майстра заповнює відповідне поле. Успішне надсилання імітується локально: персональні дані нікуди не надсилаються, не зберігаються й зникають після перезавантаження.

Перед реальним комерційним запуском замініть вигадані контакти, портрети, відгуки та Instagram-посилання й під’єднайте сервіс запису. Зараз Instagram веде на головну сторінку платформи як демонстраційне посилання.

## Фотографії та шрифти

Фіксовані CDN-адреси Pexels; випадкових ендпоїнтів немає. Фотографії використовуються за [ліцензією Pexels](https://www.pexels.com/license/). Зображені люди є моделями для вигаданого концепту, а не фактичними працівниками BLACKLINE.

| Зображення | Автор / джерело |
| --- | --- |
| Робота барбера | [RDNE Stock project](https://www.pexels.com/photo/a-barber-at-work-7697445/) |
| Інтер’єр | [cottonbro studio](https://www.pexels.com/photo/black-leather-barber-chair-in-room-3993296/) |
| Інструменти | [RDNE Stock project](https://www.pexels.com/photo/close-up-of-barber-tools-7697208/) |
| Стрижка | [Jonathan Cooper](https://www.pexels.com/photo/man-at-barber-10003357/) |
| Гоління | [alexandre saraiva carniato](https://www.pexels.com/photo/a-man-holding-razor-blade-9387375/) |
| Портрет 1 | [Marcelo Verfe](https://www.pexels.com/photo/barber-standing-by-a-chair-18483774/) |
| Портрет 2 | [zaid mohammed](https://www.pexels.com/photo/bearded-man-wearing-a-black-shirt-10257077/) |
| Портрет 3 | [alireza shamsadinloo](https://www.pexels.com/photo/portrait-of-man-with-beard-in-black-shirt-26903605/) |

Manrope та Oswald завантажуються з Google Fonts із системними резервними шрифтами. Фотографії й вебшрифти потребують інтернету.

## Доступність

Семантичні розділи, посилання пропуску навігації, видимий фокус, українські підписи, доступні повідомлення помилок, клавіатурне мобільне меню з Escape та утриманням фокуса. Анімації поважають `prefers-reduced-motion`.
