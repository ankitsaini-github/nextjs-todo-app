import '../styles/globals.css'

import Topbar from '../components/layout/Topbar/Topbar'

function MyApp({ Component, pageProps }) {
  return (
    <Topbar>
      <Component {...pageProps} />
    </Topbar>
  )
}

export default MyApp
