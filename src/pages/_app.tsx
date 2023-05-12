import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google';

export default function App({ Component, pageProps }: AppProps) {
  return (    
    <main className="Poppins">
      <Component {...pageProps} />
    </main>
  ); 
}

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});
 