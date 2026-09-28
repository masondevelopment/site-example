import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://blackline-kyiv-studio.hjglspduf.chatgpt.site"),
  title: "BLACKLINE — преміальний барбершоп у Києві",
  description:
    "Точні стрижки, фейди та догляд за бородою. BLACKLINE на Великій Васильківській: твій стиль починається з деталей. Записуйся онлайн.",
  openGraph: {
    title: "BLACKLINE — стиль у кожній деталі",
    description:
      "Сучасний барбершоп у серці Києва. Стрижки, фейди та догляд за бородою.",
    locale: "uk_UA",
    type: "website",
  },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
