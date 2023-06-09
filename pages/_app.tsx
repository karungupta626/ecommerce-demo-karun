// import "../styles/globals.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header/Header'
import TopHeader from '@/components/header/TopHeader'
import Footer from '@/components/footer/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <TopHeader/>
  <Header/>
  <Component {...pageProps} />
  <Footer/>
  </>
}
