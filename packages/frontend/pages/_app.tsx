import { Initializer } from '../components/Initializer';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import '../styles/index.css';
import { ChakraProvider, Flex, Box, extendTheme } from '@chakra-ui/react';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.kovan, chain.hardhat],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Synthetix',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function Synthetix({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <WagmiConfig client={wagmiClient}>
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
            <Box
              as="main"
              background="black"
              minHeight="100vh"
              color="rgba(255,255,255,0.85)"
              display="flex"
              flexDirection="column"
            >
              <Flex flex="1" flexDirection="column">
                <Initializer />
                <Header />
                <Component {...pageProps} />
              </Flex>
              <Footer />
            </Box>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </RecoilRoot>
  );
}
export default Synthetix;