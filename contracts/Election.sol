pragma solidity ^0.5.11;

contract Election {
  string public candidate;

  constructor() public {
    candidate = "Candidate 1";
  }
}