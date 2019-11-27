import React, { useState, useEffect } from 'react'

import { Container, Title, Table } from './styles'
import Candidate from '../Candidate'
import Vote from '../Vote'

interface Props {
  web3: any
  accounts: any
  contract: any
}

const VotEth: React.FC<Props> = ({ web3, accounts, contract }) => {
  const [candidates, setCandidates] = useState([])
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    const load = async () => {
      if (!contract) {
        return
      }
      const candidatesArray = []
      const hasVoted = await contract.methods.voters(accounts[0]).call()
      const candidatesCount = await contract.methods.candidatesCount().call()

      for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await contract.methods.candidates(i).call()
        candidatesArray.push({
          id: candidate[0],
          name: candidate[1],
          voteCount: candidate[2]
        })
      }

      setHasVoted(hasVoted)
      setCandidates(candidatesArray)
    }
    const listenForEvents = () => {
      if (!contract) {
        return
      }
      const event = contract.events.votedEvent({
        fromBlock: 0
      })
      event.on('data', () => {
        console.log('event triggered')
        load()
      })
    }

    load()
    listenForEvents()
  }, [contract])

  const handleVote = async (candidateId: string) => {
    try {
      const response = await contract.methods
        .vote(Number(candidateId))
        .send({ from: accounts[0] })
      console.log(response)
      debugger
    } catch (err) {
      console.log(err)
    }
  }
  console.log(hasVoted)
  console.log(candidates)

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
      {!hasVoted && <Vote onSubmit={handleVote} candidates={candidates} />}
    </Container>
  )
}

export default VotEth
