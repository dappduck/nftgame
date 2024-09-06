import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Dashboard() {
    
    const allMyNFTs = useSelector(state => state.houseNft.allMyNFTs)

    useEffect(() => {
        console.log(allMyNFTs);
    }, [allMyNFTs])

    return (
        <div>Dashboard</div>
    )
}
