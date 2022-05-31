import Initializer from '../components/Initializer';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import {
  apiProvider,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { RecoilRoot } from 'recoil';
import { configureChains, chain, createClient, WagmiProvider } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.kovan, chain.localhost],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Synthetix',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider: provider({ chainId: 1 }),
});

function Synthetix({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: 'rgb(49, 130, 206)',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
          })}
          chains={chains}
        >
          <ChakraProvider>
            <Initializer />
            <Box
              as="main"
              background="black"
              minHeight="100vh"
              color="rgba(255,255,255,0.85)"
              d="flex"
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
      </WagmiProvider>
    </RecoilRoot>
  );
}
export default Synthetix;
