import { AuthProvider } from "@/contexts/auth.context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className="Poppins">
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}
