import { chainIdState } from '../../state';
import { getChainById } from '../constants';
import { useRecoilState } from 'recoil';

export const useContract = () => {
  const [localChainId] = useRecoilState(chainIdState);
  const chain = getChainById(localChainId);
  return {
    contractJSON: require(`./deployments/${chain?.name} / sythentix.proxy.json`),
    chainId: localChainId,
  };
};
