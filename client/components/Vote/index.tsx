import React, { useState } from 'react'

import { Form, FormGroup } from './styles'

interface Candidate {
  id: string
  name: string
  voteCount: number
}

interface Props {
  onSubmit: (data: any) => any
  candidates: Candidate[]
}

const Vote: React.FC<Props> = ({ onSubmit, candidates }) => {
  const [votedCandidate, setVoted] = useState(null)

  const handleChange = (e: any) => {
    e.preventDefault()
    setVoted(e.target.value)
  }

  return (
    <Form onSubmit={() => onSubmit(votedCandidate)}>
      <FormGroup>
        <label htmlFor="candidatesSelect">Select Candidate</label>
        <select id="candidatesSelect" onChange={handleChange}>
          {candidates.map(candidate => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>
      </FormGroup>
      <button type="submit">Vote</button>
    </Form>
  )
}

export default Vote
