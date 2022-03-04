import { ChakraProvider, Box } from '@chakra-ui/react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box
        as="main"
        background="black"
        minHeight="100vh"
        color="rgba(255,255,255,0.85)"
        d="flex"
        flexDirection="column"
      >
        <Box flex="1">
          <Header />
          <Component {...pageProps} />
        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  )
}
export default MyApp
