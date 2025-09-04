import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import {Geologica, Manrope, Montserrat} from "next/font/google";
import React from "react";
import "../styles/globals.css";
import {getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import {ReduxProvider} from "@/store/ReduxProvider";
import {RootState} from "@/store";
import Finder from "@/components/Finder";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["cyrillic"]
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "WORK-RC",
  description: "Маркетплейс радиоуправляемых моделей: автомобили, самолёты, квадрокоптеры, запчасти и аксессуары. Широкий выбор, доставка, выгодные цены.",
  icons: {
    icon: '/favicon.ico', // для всех браузеров
    apple: '/apple-touch-icon.png', // для Safari/iOS
    other: [
      {
        rel: 'icon',
        url: '/logo192.png',
      },
      {
        rel: 'icon',
        url: '/logo512.png',
      },
    ],
  },
};

export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  const locale = (await params).locale || 'ru';

  const messages = await getMessages();

  const initialState: Partial<RootState> = {
    finder: {
      isOpen: false,
    }
  }

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} ${geologica.variable} ${manrope.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider initialState={initialState}>
            <Finder />
            <Header />
            {children}
            <Footer />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
