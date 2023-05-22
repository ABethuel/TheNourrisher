import { HeaderOrdi } from '@/components/NavBar/HeaderOrdi';
import { NavBar } from '@/components/NavBar/NavBar';
import { GlobalState } from '@/contexts/GlobalContext/GlobalState';
import { RecipeState } from '@/contexts/RecipeContext/RecipeState';
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
      <GlobalState>
        <RecipeState>
          <HeaderOrdi></HeaderOrdi>
          <Component {...pageProps} />
          <NavBar></NavBar>
        </RecipeState>
      </GlobalState>
    </>
  );
}
