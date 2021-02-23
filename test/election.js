let Election = artifacts.require("./Election.sol");

contract("Election", function (accounts) {

    var electionInstance;
    var candidateId;

    it("initialize with four candidates", function () {
        return Election.deployed().then(function (instance) {
            return instance.candidateCount();
        }).then(function (count) {
            assert.equal(count, 4)
        });
    });

    it("initialize candidates with correct values", function () {
        return Election.deployed().then(function (instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function (candidate) {
            assert.equal(candidate[0], "Candidate1", "Correct Name");
            assert.equal(candidate[1], 1, "Correct Id");
            assert.equal(candidate[2], 0, "Default Vote Count");
            return electionInstance.candidates(2);
        }).then(function (secondCandidate) {
            assert.equal(secondCandidate[0], "Candidate2", "Correct Name");
            assert.equal(secondCandidate[1], 2, "Correct Id");
            assert.equal(secondCandidate[2], 0, "Default Vote Count");
        });
    });

    it("increase vote count of candidate when someone votes and store ", function () {
        return Election.deployed().then(function (instance) {
            electionInstance = instance;
            candidateId = 1;
            return electionInstance.vote(candidateId, { from: accounts[0] });
        }).then(function () {
            return electionInstance.voters(accounts[0]);
        }).then(function (voted) {
            assert(voted, "the voter marked as voted")
            return electionInstance.candidates(candidateId);
        }).then(function (candidate) {
            var voteCount = candidate[2];
            assert(voteCount, 1, "Vote is incrmented");
        });
    });

    it("throw exception in case of multiple voting attemps by same voter", function () {
        return Election.deployed().then(function (instance) {
            electionInstance = instance;
            return electionInstance.vote(3, { from: accounts[0] });
        }).then(function () {
            return electionInstance.vote(3, { from: accounts[0] });
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
        });
    });

    it("throw exception in case of invalid candidate", function () {
        return Election.deployed().then(function (instance) {
            electionInstance = instance;
            return electionInstance.vote(99, { from: accounts[0] });
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
            return electionInstance.candidates(1)
        }).then(function (candidate1) {
            var voteCount = candidate1[2];
            assert.equal(voteCount, 1, "candidate didnot received ant new votes");
            return electionInstance.candidates(2);
        }).then(function (candidate2) {
            var voteCount = candidate2[2];
            assert.equal(voteCount, 0, "vote count is zero");
        });
    });
});