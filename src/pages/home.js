import React, { useCallback, useEffect, useState } from 'react';
import { shortenAddress } from '../utils/stylish';
import { useConnectWallet, useDisconnectWallet } from '../utils/hooks';
import { createweb3Modal } from '../utils/createweb3Modal';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { getTokenContractInstance } from '../utils/web3';

export default function LoginComponent() {
  const navigate = useNavigate();

  const { connectWallet, web3, address, networkId, connected } =
    useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();
  const [web3Modal, setModal] = useState(null);

  useEffect(() => {
    setModal(createweb3Modal);
  }, [setModal]);

  // useEffect(() => {
  //     if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
  //         connectWallet(web3Modal);
  //     }
  // }, [web3Modal, connectWallet]);

  const connectWalletCallback = useCallback(() => {
    connectWallet(web3Modal);
  }, [web3Modal, connectWallet]);

  const disconnectWalletCallback = useCallback(() => {
    disconnectWallet(web3, web3Modal);
  }, [web3, web3Modal, disconnectWallet]);

  const MyHeros = () => {
    navigate('/nftlist');
  };

  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    if (address) {
      const contract = getTokenContractInstance();
      const balance = await contract.methods.balanceOf(address).call();
      console.log(balance, '---balance');
      setBalance(balance);
    } else {
      navigate('/');
    }
  }, [address]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'grid', width: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '1' }}>
            <Button className='home_button'>
              <span style={{ fontSize: 'small' }}>Health</span>
              <span>100%</span>
            </Button>
          </div>
          <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
            <Button className='home_button'>
              <span style={{ fontSize: 'small' }}>Balance</span>
              <span>{balance}</span>
              <span style={{ fontSize: 'small' }}>TESTSITE</span>
            </Button>
          </div>
          <div style={{ flex: '1', display: 'flex', justifyContent: 'end' }}>
            <Button className='home_button'>
              <span style={{ fontSize: 'small' }}>Level</span>
              <span>1</span>
              <span style={{ fontSize: 'small' }}>0/1000</span>
            </Button>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button onClick={MyHeros} className='home_herobtn'>
            My Heros
          </Button>
        </div>
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button className='home_findbtn'>Find Battle</Button>
        </div>
      </div>
    </div>
  );
}
