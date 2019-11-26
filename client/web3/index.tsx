import React, { useState, useEffect } from 'react'

import { getWeb3 } from './web3'
import { getContract } from './contracts'
import contractDefinition from '../../build/contracts/Election.json'

interface Props {
  renderLoading: () => any
  render: (data: any) => any
}

export const Web3Container: React.FC<Props> = ({ render, renderLoading }) => {
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    const load = async () => {
      const web3: any = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const contract = await getContract(web3, contractDefinition)
      setWeb3(web3)
      setAccounts(accounts)
      setContract(contract)
    }
    load()
  }, [])

  return web3 && accounts
    ? render({ web3, accounts, contract })
    : renderLoading()
}
