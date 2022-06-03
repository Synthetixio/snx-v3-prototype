import { chainIdState } from '../../state';
import { getChainNameById, supportedChains } from '../../utils/constants';
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { useConnect, useNetwork } from 'wagmi';

export function NetworkController() {
  const { activeConnector } = useConnect();
  const router = useRouter();
  const { chains: networkChains } = useNetwork();
  const [localChainId, setLocalChainId] = useRecoilState(chainIdState);

  const chains = networkChains.length ? networkChains : supportedChains;
  const localChain = chains.find(chain => chain.id === localChainId);

  // Look in here for logged out chains to render images https://github.com/rainbow-me/rainbowkit/blob/main/packages/rainbowkit/src/components/ConnectButton/ConnectButtonRenderer.tsx

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
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {activeConnector ? (
              <Button
                bg="gray.800"
                _hover={{ bg: 'gray.700' }}
                onClick={openChainModal}
                style={{ display: 'flex', alignItems: 'center' }}
                type="button"
                mr="4"
              >
                {chain?.hasIcon && (
                  <div
                    style={{
                      background: chain?.iconBackground,
                      width: 20,
                      height: 20,
                      borderRadius: 999,
                      overflow: 'hidden',
                      marginRight: 8,
                    }}
                  >
                    {chain?.iconUrl && (
                      <Image
                        width={20}
                        height={20}
                        alt={chain?.name ?? 'Chain icon'}
                        src={chain?.iconUrl}
                      />
                    )}
                  </div>
                )}
                {chain?.name}
              </Button>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  bg="gray.800"
                  _hover={{ bg: 'gray.700' }}
                  _active={{ bg: 'gray.700' }}
                  mr="4"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {chain?.hasIcon && (
                    <div
                      style={{
                        background: chain?.iconBackground,
                        width: 20,
                        height: 20,
                        borderRadius: 999,
                        overflow: 'hidden',
                        marginRight: 8,
                      }}
                    >
                      {chain?.iconUrl && (
                        <Image
                          height={20}
                          width={20}
                          alt={chain?.name ?? 'Chain icon'}
                          src={chain?.iconUrl}
                        />
                      )}
                    </div>
                  )}
                  {chain?.name || localChain?.name}
                </MenuButton>
                <MenuList
                  px={2}
                  bg="black"
                  border="1px solid rgba(255,255,255,0.33)"
                >
                  {chains &&
                    chains.map(chainOption => (
                      <MenuItem
                        key={chainOption.id}
                        alignItems="left"
                        mb={1}
                        flexDirection="column"
                        _hover={{ bg: 'gray.800' }}
                        _focus={{ bg: 'gray.800' }}
                        _active={{ bg: 'gray.800' }}
                        onClick={() => {
                          setLocalChainId(chainOption.id);
                          const chain = getChainNameById(chainOption.id);
                          router.replace(
                            {
                              pathname: router.basePath,
                              query: {
                                chain,
                              },
                            },
                            undefined,
                            {
                              shallow: true,
                            }
                          );
                        }}
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
                  _hover={{ bg: 'gray.700' }}
                  onClick={openAccountModal}
                  type="button"
                >
                  {account.displayName}
                  {false && account?.displayBalance
                    ? ` (${account?.displayBalance})`
                    : ''}
                </Button>
              );
            })()}
          </Flex>
        );
      }}
    </ConnectButton.Custom>
  );
}
