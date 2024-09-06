import Web3 from 'web3';
import { abi } from '@uniswap/v2-core/build/IUniswapV2Pair.json';
import ERC20 from '../contract/erc20.json';
import ERC1155ABI from '../contract/erc1155.json';
const { ethereum } = window;
const web3 = new Web3(ethereum);
// Check if the metamas is installed
export const _isMetaMaskInstalled = () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  let { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};
export const getCurrentChainId = async () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  const chainID = await web3.eth.net.getId();
  return chainID;
};
// Check current chain is valid or not
export const _isValidChainId = async () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  if (_isMetaMaskInstalled()) {
    const chainID = await web3.eth.net.getId();
    if (chainID === 97) {
      // BSC testnet for demo version
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// Get Token Contract Instanse
export const getTokenContractInstance = () => {
  let newTokenContract = new web3.eth.Contract(ERC20, '');
  return newTokenContract;
};

export const getNFTContractInstance = () => {
  let newTokenContract = new web3.eth.Contract(ERC1155ABI, '');
  return newTokenContract;
};
