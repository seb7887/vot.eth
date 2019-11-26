import React from 'react'
import { NextPage } from 'next'

import { Layout, VotEth } from '../components'
import { Web3Container } from '../web3'

const Index: NextPage = () => (
  <Layout title="Vot.Eth">
    <Web3Container
      renderLoading={() => <div>Loading ...</div>}
      render={props => <VotEth {...props} />}
    />
  </Layout>
)

export default Index
