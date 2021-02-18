// // SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        string name;
        uint id;
        uint voteCount;
    }

    event votedEvent(
        uint indexed _candidateId
    );

    // stores the voter address to avoid mutiple votes
    mapping(address => bool) public voters;

    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;

    // Read Candidates Count
    uint public candidateCount;

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

    function vote(uint _candidateId) public {
        // verify the voters has not voted before
        require(!voters[msg.sender]);

        // candiadte Id should be valid

        require(_candidateId > 0 && _candidateId <= candidateCount);

        // Record that voter has voted
        voters[msg.sender] = true;
        // update candidate vote count
        candidates[_candidateId].voteCount++;

       emit votedEvent(_candidateId);
    }
}