// // SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        string name;
        uint256 id;
        uint256 voteCount;
    }

    // Store Candidates
    // Fetch Candidate
    mapping(uint256 => Candidate) public candidates;

    // Read Candidates Count
    uint256 public candidateCount;

    constructor() {
        addCandidate("Rajat");
        addCandidate("Achal");
        addCandidate("Hansa");
        addCandidate("Bhumi");
    }

    function addCandidate(string memory _name) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(_name, candidateCount, 0);
    }
}
