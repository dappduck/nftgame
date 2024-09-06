import React, { useCallback, useEffect, useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CircularProgress } from '@mui/material';
import { shortenAddress } from '../utils/stylish';
import { useConnectWallet, useDisconnectWallet } from '../utils/hooks';
import { createweb3Modal } from '../utils/createweb3Modal';
import { getNFTContractInstance } from '../utils/web3';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import nftImage from '../assets/imgs/404.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/system';

export default function NftList() {
  const [nftData, setNFTData] = useState([]);
  const [nftMetaData, setNftMetaData] = useState([]);

  const { connectWallet, web3, address, networkId, connected } =
    useConnectWallet();

  const Web3Api = useMoralisWeb3Api();

  const navigate = useNavigate();

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

  const fetchNFTs = async () => {
    const options = {
      chain: 'bsc',
      address: address,
    };
    const bscWalletNFTs = await Web3Api.account.getNFTs(options);
    for (let index = 0; index < bscWalletNFTs.result.length; index++) {
      const ipfsLinks = bscWalletNFTs.result;
      console.log(ipfsLinks, 'links------------');
      axios
        .post('http://localhost:3300/NFTData/getNFTData', {
          links: ipfsLinks,
        })
        .then((result) => {
          console.log(result.data, 'nftMetaData----------');
          setNftMetaData(result.data);
        })
        .catch((err) => {
          console.log(err, 'err');
        });
    }
  };

  const GoHome = () => {
    navigate('/home');
  };

  useEffect(async () => {
    if (address) {
      fetchNFTs();
    } else {
      navigate('/');
    }
  }, [address]);

  return (
    <div style={{ display: 'grid', padding: '10px' }}>
      <div>
        <span className='heroTitle'>My Heros</span>
      </div>
      <div style={{ marginTop: '20px', display: 'grid' }}>
        <span className='heroBack' onClick={GoHome}>
          <ChevronLeftIcon />
          Back
        </span>
      </div>
      <div style={{ display: 'grid' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {nftMetaData.length ? (
            nftMetaData.map((nft, key) => {
              if (nft.artist === '') {
                return (
                  <Card sx={{ maxWidth: 345, margin: '10px' }} key={key}>
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        image={nft.image}
                        alt='green iguana'
                      />
                      {/* <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent> */}
                    </CardActionArea>
                  </Card>
                );
              }
            })
          ) : (
            <>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '500px',
                }}
              >
                <CircularProgress
                  style={{ color: 'yellow', width: '60px', height: '60px' }}
                />
              </Box>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
