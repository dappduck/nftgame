import React from 'react'
import Router from './routes'
import { MoralisProvider } from 'react-moralis';
import './App.css';

export default function App() {
  return (
    <MoralisProvider
      appId="KUcyBHyjAeowmTcPzsLemsjtaN3LG8F5d6r1PoQe"
      serverUrl="https://q09txpjvrnzs.usemoralis.com:2053/server"
    >
      <Router />
    </MoralisProvider>
  )
}
