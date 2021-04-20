import '../styles/globals.css'
import ConfigProvider from '@contexts/ConfigContext'


function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default MyApp
