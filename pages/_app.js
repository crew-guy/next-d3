import '../styles/globals.css'
import ConfigProvider from "@contexts/ConfigContext"


const MyApp=({ Component, pageProps }) =>  
(
  <ConfigProvider>
    <Component {...pageProps} />
  </ConfigProvider>
)


export default MyApp
