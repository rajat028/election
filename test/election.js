var Election = artifacts.require("./Election.sol");

contract("Election", function (accounts) {

    var electionInstance;

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
            assert.equal(candidate[0], "Rajat", "Correct Name");
            assert.equal(candidate[1], 1, "Correct Id");
            assert.equal(candidate[2], 0, "Default Vote Count");
            return electionInstance.candidates(2);
        }).then(function (secondCandidate) {
            assert.equal(secondCandidate[0], "Achal", "Correct Name");
            assert.equal(secondCandidate[1], 2, "Correct Id");
            assert.equal(secondCandidate[2], 0, "Default Vote Count");
        });
    });
});