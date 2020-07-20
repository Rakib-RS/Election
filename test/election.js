var Election = artifacts.require("./Election.sol");

contract("Election",function (accounts) {
	// body...In
	var electionInstance;

	it("initialize with two candidates",function(){
		return Election.deployed().then(function(instance){
			return instance.candidatesCount();
		}).then(function(count){
			assert.equal(count,2);
		});

	});
	
	it("it initialize candidates with correct values",function(){
		return Election.deployed().then(function(instance){
			electionInstance = instance;
			return electionInstance.candidates(1);
		}).then(function(candidate){
			assert.equal(candidate[0],1,"contains the correct id of candidate");
			assert.equal(candidate[1],"rakib","contains the correct candidate name");
			assert.equal(candidate[2],0,"contains the correct votesCount");
			return electionInstance.candidates(2);
		}).then(function(candidate){
			assert.equal(candidate[0],2,"contains the correct id");
			assert.equal(candidate[1],"rs","contains the correct name");
			assert.equal(candidate[2],0,"contains the correct votesCount");
		})
	});
	it("allows a voter to cast a vote",function(){
		return Election.deployed().then(function(instance){
			electionInstance = instance;
			candidateId = 2;
			return electionInstance.vote(candidateId,{from:accounts[0]});
		}).then(function(receipt){
			assert.equal(receipt.logs.length,1,"an event triggered");
			assert.equal(receipt.logs[0].event,"votedEvent","trigger type is correct");
			assert.equal(receipt.logs[0].args._candidateId.toNumber(),candidateId,"candidate id is correct");
			return electionInstance.voters(accounts[0]);
		}).then(function(voted){
			assert(voted,"voter voted");
			return electionInstance.candidates(candidateId);
		}).then(function(candidate){
			assert.equal(candidate[2],1,"increment the candidate's vote count");
		})
	});
	it("throws an exception for invalid candidates",function(){
		return Election.deployed().then(function(instance){
			electionInstance = instance;
			return electionInstance.vote(99,{from:accounts[1]});
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
			return electionInstance.candidates(1);
		}).then(function(candidate1){
			var voteCount;
			voteCount = candidate1[2];
			assert.equal(voteCount,0,'candidate 1 did not receive any vote');
			return electionInstance.candidates(2);
		}).then(function(candidate2){
			var voteCount = candidate2[2];
			assert.equal(voteCount,1,'candidate2 did not receive any vote')
		})

	});
	
})