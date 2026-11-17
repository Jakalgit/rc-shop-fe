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
import Footer from "@/components/Footer";
import {getContacts} from "@/api/contacts/api";
import {ProgressBar} from "@/widgets/ProgressBar";
import {Header} from "@/widgets/Header";
import {HeaderSearchSlot} from "@/widgets/HeaderSearch";
import headerStackStyles from "@/widgets/HeaderSearch/ui/HeaderSearch.module.css";
import Script from 'next/script';
import {SupportChat} from "@/widgets/SupportChat";
import {getSiteUrl} from "@/shared/lib/schema/offerMicrodata";

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

const siteDescription = "Маркетплейс радиоуправляемых моделей: автомобили, самолёты, квадрокоптеры, запчасти и аксессуары. Широкий выбор, доставка, выгодные цены.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "WORK-RC",
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "WORK-RC",
    title: "WORK-RC",
    description: siteDescription,
    images: ["/logo512.png"],
  },
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
  const contacts = await getContacts();
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "WORK-RC",
        url: siteUrl,
        logo: `${siteUrl}/logo512.png`,
        email: contacts.email,
        telephone: contacts.phone1,
        address: {
          "@type": "PostalAddress",
          streetAddress: contacts.address,
          addressCountry: "RU",
        },
      },
      {
        "@type": "WebSite",
        name: "WORK-RC",
        url: siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/catalog?finder={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  const initialState: Partial<RootState> = {
    finder: {
      isOpen: false,
    }
  }

  return (
    <html lang={locale}>
    <head>
      <Script
        src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3"
        strategy="beforeInteractive"
      />
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                      if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),
                  a=e.getElementsByTagName(t)[0],
                  k.async=1,
                  k.src=r,
                  a.parentNode.insertBefore(k,a)
              })(window, document, 'script',
                'https://mc.yandex.ru/metrika/tag.js?id=111657388',
                'ym'
              );

              ym(111657388, 'init', {
                  ssr: true,
                  webvisor: true,
                  clickmap: true,
                  ecommerce: "dataLayer",
                  referrer: document.referrer,
                  url: location.href,
                  accurateTrackBounce: true,
                  trackLinks: true
              });
            `,
        }}
      />
      <meta name="yandex-verification" content="bca5e19f9a873902"/>
    </head>
    <body
      className={`${montserrat.variable} ${geologica.variable} ${manrope.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />
        <ProgressBar/>
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider initialState={initialState}>
            <Finder/>
            <div className={headerStackStyles.stack}>
              <Header {...contacts}/>
              <HeaderSearchSlot/>
            </div>
            <div className={headerStackStyles.pageOffset} aria-hidden="true"/>
            <SupportChat/>
            {children}
            <Footer {...contacts}/>
          </ReduxProvider>
        </NextIntlClientProvider>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/111657388"
              style={{
                position: "absolute",
                left: "-9999px",
              }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
