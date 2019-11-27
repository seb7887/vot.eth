import React, { useState, useEffect } from 'react'

import { Container, Title, Table } from './styles'
import Candidate from '../Candidate'

interface Props {
  web3: any
  accounts: any
  contract: any
}

const VotEth: React.FC<Props> = ({ web3, accounts, contract }) => {
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    const load = async () => {
      if (!contract) {
        return
      }
      const candidatesArray = []
      const candidatesCount = await contract.methods.candidatesCount().call()

      for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await contract.methods.candidates(i).call()
        candidatesArray.push({
          id: candidate[0],
          name: candidate[1],
          voteCount: candidate[2]
        })
      }

      setCandidates(candidatesArray)
    }
    load()
  }, [contract])

  return (
    <Container>
      <Title>Vot.eth</Title>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <Candidate key={candidate.id} candidate={candidate} />
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default VotEth
