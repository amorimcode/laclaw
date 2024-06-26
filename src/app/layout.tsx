import "./globals.css";

import Header from "@/components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LacLaw Dashboard",
  description: "LacLaw Dashboard",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const messages = await getMessages();

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Header />

        {children}
      </body>
    </html>
  );
};

export default RootLayout;
