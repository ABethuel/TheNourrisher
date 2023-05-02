import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          viewport-fit="cover"
        />
        <link rel="icon" href="/LogoTheNourisherGold.png" />
      </Head>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
}
