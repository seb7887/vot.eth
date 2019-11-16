const Election = artifacts.require('./Election')

contract('Election', accounts => {
  it('initializes with two candidates', async () => {
    const electionInstance = await Election.deployed()

    const count = await electionInstance.candidatesCount()

    assert.equal(count, 2, 'There are not two candidates')
  })

  it('initializes the candidates with the correct values', async () => {
    const electionInstance = await Election.deployed()

    let candidate = await electionInstance.candidates(1)
    assert.equal(candidate[0], 1, 'contains the correct id')
    assert.equal(candidate[1], 'Villian 1', 'contains the correct name')
    assert.equal(candidate[2], 0, 'contains the correct votes count')

    candidate = await electionInstance.candidates(2)
    assert.equal(candidate[0], 2, 'contains the correct id')
    assert.equal(candidate[1], 'Villian 2', 'contains the correct name')
    assert.equal(candidate[2], 0, 'contains the correct votes count')
  })
})
