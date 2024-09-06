import React, { useCallback, useEffect, useState } from 'react';
import { shortenAddress } from '../utils/stylish';
import { useConnectWallet, useDisconnectWallet } from '../utils/hooks';
import { createweb3Modal } from '../utils/createweb3Modal';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function LoginComponent() {
  const navigate = useNavigate();

  const { connectWallet, web3, address, networkId, connected } =
    useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();
  const [web3Modal, setModal] = useState(null);

  useEffect(() => {
    setModal(createweb3Modal);
  }, [setModal]);

  const connectWalletCallback = useCallback(() => {
    connectWallet(web3Modal);
  }, [web3Modal, connectWallet]);

  const disconnectWalletCallback = useCallback(() => {
    disconnectWallet(web3, web3Modal);
  }, [web3, web3Modal, disconnectWallet]);

  const goHome = () => {
    navigate('/home');
  };

  useEffect(() => {}, []);

  return (
    <div
      className='loginP'
      style={{ alignItems: 'center', height: window.innerHeight - 20 }}
    >
      {address ? (
        <div style={{ display: 'grid' }}>
          <span className='login_text'>Welcome</span>
          <span className='login_text'>{shortenAddress(address)}</span>
          <Button onClick={goHome} className='login_button'>
            PLAY NOW
          </Button>
        </div>
      ) : (
        <div style={{ display: 'grid' }}>
          <Button
            className='login_button'
            onClick={
              connected ? disconnectWalletCallback : connectWalletCallback
            }
          >
            {shortenAddress(address) ? shortenAddress(address) : 'Login'}
          </Button>
          <a href='' className='troubleLink' target='_blank'>
            Trouble logging in?
          </a>
        </div>
      )}
    </div>
  );
}
