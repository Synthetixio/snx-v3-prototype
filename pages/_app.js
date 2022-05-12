import { ChakraProvider, Box } from '@chakra-ui/react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { RecoilRoot } from 'recoil';
import '@rainbow-me/rainbowkit/styles.css';
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';

const { chains, provider } = configureChains(
  [chain.kovan],
  [
    apiProvider.fallback()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Synthetix',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: 'rgb(49, 130, 206)',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
        })} chains={chains}>
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
        </RainbowKitProvider>
      </WagmiProvider>
    </RecoilRoot>
  )
}
export default MyApp
