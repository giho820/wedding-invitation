import { weddingConfig } from "../src/config/wedding-config";
import StyledComponentsRegistry from "../src/lib/registry";
import { GlobalStyle } from "../src/styles/globalStyles";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata = {
  title: weddingConfig.meta.title,
  description: weddingConfig.meta.description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: weddingConfig.meta.title,
    description: weddingConfig.meta.description,
    images: [
      {
        url: weddingConfig.meta.ogImage,
        width: 1200,
        height: 630,
        alt: "웨딩 청첩장",
      },
    ],
  },
  robots: weddingConfig.meta.noIndex ? "noindex, nofollow" : "index, follow",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
        {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
