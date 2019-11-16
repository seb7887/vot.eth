pragma solidity ^0.5.11;

contract Election {
  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  mapping (uint => Candidate) public candidates;

  uint public candidatesCount;

  constructor() public {
    addCandidate("Villian 1");
    addCandidate("Villian 2");
  }

  function addCandidate(string memory _name) private {
    candidatesCount++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }
}