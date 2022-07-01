import { chainIdState } from "../../state";
import { getChainNameById, supportedChains } from "../../utils/constants";
import { routeToChain } from "../NetworkChain";
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useConnect, useNetwork } from "wagmi";

export function NetworkController() {
  const { activeConnector } = useConnect();
  const router = useRouter();
  const { chains: networkChains } = useNetwork();
  const [localChainId, setLocalChainId] = useRecoilState(chainIdState);

  const chains = /* networkChains.length ? networkChains : */ supportedChains;
  const localChain = chains.find(chain => chain.id === localChainId);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <Flex
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {activeConnector ? (
              <Button
                bg="gray.800"
                _hover={{ bg: "gray.700" }}
                onClick={openChainModal}
                style={{ display: "flex", alignItems: "center" }}
                type="button"
                mr="4"
                size={["sm", "sm", "sm", "md"]}
              >
                {chain?.hasIcon && (
                  <span
                    style={{
                      background: chain?.iconBackground,
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      overflow: "hidden",
                      marginRight: 8,
                    }}
                  >
                    {chain?.iconUrl && (
                      <Image
                        width={20}
                        height={20}
                        alt={chain?.name ?? "Chain icon"}
                        src={chain?.iconUrl}
                      />
                    )}
                  </span>
                )}
                {chain?.name}
              </Button>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  textAlign="left"
                  bg="gray.800"
                  _hover={{ bg: "gray.700" }}
                  _active={{ bg: "gray.700" }}
                  mr="4"
                  style={{ display: "flex", alignItems: "center" }}
                  size={["sm", "sm", "sm", "md"]}
                >
                  {chain?.hasIcon && (
                    <div
                      style={{
                        background: chain?.iconBackground,
                        width: 20,
                        height: 20,
                        borderRadius: 999,
                        overflow: "hidden",
                        marginRight: 8,
                      }}
                    >
                      {chain?.iconUrl && (
                        <Image
                          height={20}
                          width={20}
                          alt={chain?.name ?? "Chain icon"}
                          src={chain?.iconUrl}
                        />
                      )}
                    </div>
                  )}
                  {chain?.name || localChain?.name}
                </MenuButton>
                <MenuList
                  px={2}
                  minW="0"
                  bg="black"
                  border="1px solid rgba(255,255,255,0.33)"
                >
                  {chains &&
                    chains.map(chainOption => (
                      <MenuItem
                        borderRadius="sm"
                        key={chainOption.id}
                        alignItems="left"
                        mb={1}
                        flexDirection="column"
                        _hover={{ bg: "gray.800" }}
                        _focus={{ bg: "gray.800" }}
                        _active={{ bg: "gray.800" }}
                        onClick={() => {
                          routeToChain(router.basePath, chainOption.id);
                        }}
                        fontWeight="600"
                      >
                        {/* chainOption.hasIcon && (
                          <div
                            style={{
                              background: chainOption.iconBackground,
                              width: 20,
                              height: 20,
                              borderRadius: 999,
                              overflow: 'hidden',
                              marginRight: 8,
                            }}
                          >
                            {chainOption.iconUrl && (
                              <img
                                alt={chainOption.name ?? 'Chain icon'}
                                src={chainOption.iconUrl}
                                style={{ width: 20, height: 20 }}
                              />
                            )}
                          </div>
                            ) */}
                        {chainOption.name}
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>
            )}
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button
                    colorScheme="blue"
                    onClick={openConnectModal}
                    type="button"
                    size={["sm", "sm", "sm", "md"]}
                  >
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    colorScheme="red"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <Button
                  bg="gray.800"
                  _hover={{ bg: "gray.700" }}
                  onClick={openAccountModal}
                  type="button"
                >
                  {account.displayName}
                  {false && account?.displayBalance
                    ? ` (${account?.displayBalance})`
                    : ""}
                </Button>
              );
            })()}
          </Flex>
        );
      }}
    </ConnectButton.Custom>
  );
}
