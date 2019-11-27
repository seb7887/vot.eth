const Election = artifacts.require('./Election')

contract('Election', accounts => {
  let electionInstance
  let candidateId

  beforeEach(async () => {
    electionInstance = await Election.deployed()
  })

  it('initializes with two candidates', async () => {
    const count = await electionInstance.candidatesCount()

    assert.equal(count, 2, 'There are not two candidates')
  })

  it('initializes the candidates with the correct values', async () => {
    let candidate = await electionInstance.candidates(1)
    assert.equal(candidate[0], 1, 'contains the correct id')
    assert.equal(candidate[1], 'Villian 1', 'contains the correct name')
    assert.equal(candidate[2], 0, 'contains the correct votes count')

    candidate = await electionInstance.candidates(2)
    assert.equal(candidate[0], 2, 'contains the correct id')
    assert.equal(candidate[1], 'Villian 2', 'contains the correct name')
    assert.equal(candidate[2], 0, 'contains the correct votes count')
  })

  it('allows a voter to cast a vote', async () => {
    candidateId = 1
    const receipt = await electionInstance.vote(candidateId, {
      from: accounts[0]
    })
    assert.equal(receipt.logs.length, 1, 'an events was triggered')
    assert.equal(
      receipt.logs[0].event,
      'votedEvent',
      'the event type is correct'
    )
    assert.equal(
      receipt.logs[0].args._candidateId.toNumber(),
      candidateId,
      'the candidate is correct'
    )
    const voted = await electionInstance.voters(accounts[0])
    assert(voted, 'the voter was marked as voted')
    const candidate = await electionInstance.candidates(candidateId)
    assert.equal(candidate[2], 1, `increments the candidate's vote count`)
  })

  it('throws an exception for invalid candidates', () => {
    electionInstance
      .vote(99, { from: accounts[1] })
      .then(assert.fail)
      .catch(async error => {
        assert(
          error.message.indexOf('revert') >= 0,
          'error must contain revert'
        )
        const candidate1 = await electionInstance.candidates(1)
        assert.equal(candidate1[2], 1, 'candidate 1 did not receive any votes')
        const candidate2 = await electionInstance.candidates(2)
        assert.equal(candidate2[2], 1, 'candidate 2 did not receive any votes')
      })
  })

  it('throws an exception for double voting', async () => {
    candidateId = 2
    await electionInstance.vote(candidateId, { from: accounts[1] })
    const candidate = await electionInstance.candidates(candidateId)
    assert.equal(candidate[2], 1, 'accepts first vote')
    // Try to vote again
    electionInstance
      .vote(candidateId, { from: accounts[1] })
      .then(assert.fail)
      .catch(async error => {
        assert(
          error.message.indexOf('revert') >= 0,
          'error message must contain revert'
        )
        const candidate1 = await electionInstance.candidates(1)
        assert.equal(candidate1[2], 1, 'candidate 1 did not receive any votes')
        const candidate2 = await electionInstance.candidates(2)
        assert.equal(candidate2[2], 1, 'candidate 2 did not receive any votes')
      })
  })
})
