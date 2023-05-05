import styles from "../styles/globals.module.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header/Header'
import TopHeader from '@/components/header/TopHeader'
import Footer from '@/components/footer/Footer'
import { store } from "@/store"
import { Provider } from "react-redux"

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Provider store={store}>
  <TopHeader/>
  <Header/>
  <div className={styles.component}>
  <Component {...pageProps} />
  </div>
  <Footer/>
  </Provider>
  </>
}
