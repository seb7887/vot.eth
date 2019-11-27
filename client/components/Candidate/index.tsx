import React from 'react'

import { Tr } from './styles'

interface Candidate {
  id: string
  name: string
  voteCount: number
}

interface Props {
  candidate: Candidate
}

const Candidate: React.FC<Props> = ({ candidate }) => (
  <Tr>
    <th>{candidate.id}</th>
    <td>{candidate.name}</td>
    <td>{candidate.voteCount}</td>
  </Tr>
)

export default Candidate
