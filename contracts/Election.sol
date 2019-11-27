pragma solidity ^0.5.11;

contract Election {
  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  mapping (uint => Candidate) public candidates;
  mapping (address => bool) public voters;

  uint public candidatesCount;

  event votedEvent (
    uint indexed _candidateId
  );

  constructor() public {
    addCandidate("Villian 1");
    addCandidate("Villian 2");
  }

  function addCandidate(string memory _name) private {
    candidatesCount++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }

  function vote (uint _candidateId) public {
    // require that they haven't voted before
    require(!voters[msg.sender], "Sender has already voted");

    // require a valid candidate
    require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");

    // record that voter has voted
    voters[msg.sender] = true;
    // update candidate vote count
    candidates[_candidateId].voteCount++;

    // trigger voted event
    emit votedEvent(_candidateId);
  }
}