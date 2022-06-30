import { Initializer } from "../components/Initializer";
import { NetworkChain } from "../components/NetworkChain";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import "../styles/index.css";
import theme from "../styles/theme";
import { supportedChains } from "../utils/constants";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { createClient, WagmiConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(supportedChains, [
  publicProvider(),
]);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

function Synthetix({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "rgb(49, 130, 206)",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
          })}
          chains={chains}
        >
          <ChakraProvider theme={theme}>
            <Box
              as="main"
              background="black"
              minHeight="100vh"
              color="rgba(255,255,255,0.85)"
              display="flex"
              flexDirection="column"
            >
              <Flex flex="1" flexDirection="column">
                <NetworkChain>
                  <Initializer>
                    <Header />
                    <Component {...pageProps} />
                  </Initializer>
                </NetworkChain>
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
