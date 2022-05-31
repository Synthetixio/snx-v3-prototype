import { ChakraProvider, Flex, Box, extendTheme } from '@chakra-ui/react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { RecoilRoot } from 'recoil';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import Initializer from "../components/Initializer";
import '../styles/index.css'

const { chains, provider } = configureChains(
  [chain.mainnet, chain.kovan, chain.localhost],
  [publicProvider()]
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

function Synthetix({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: 'rgb(49, 130, 206)',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
        })} chains={chains}>
          <ChakraProvider>
            <Initializer />
            <Box
              as="main"
              background="black"
              minHeight="100vh"
              color="rgba(255,255,255,0.85)"
              display="flex"
              flexDirection="column"
            >
              <Flex flex="1" flexDirection="column">
                <Header />
                <Component {...pageProps} />
              </Flex>
              <Footer />
            </Box>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </RecoilRoot>
  )
}
export default Synthetix
