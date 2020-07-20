pragma solidity ^0.5.0;

/**
 * The Election contract does this and that...
 */
contract Election {
	struct Candidate {
		uint id;
		string name;
		uint voteCount;
		
	}
	mapping (uint => Candidate) public candidates;

	
	// Store accounts that have voted
    mapping(address => bool) public voters;

    event votedEvent(uint indexed _candidateId);
    
	

	uint public candidatesCount;

	function addCandidate (string memory name) private {
		candidatesCount++;
		candidates[candidatesCount] =Candidate(candidatesCount,name,0);
		
	}
	function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        //trigger voted event
       emit votedEvent(_candidateId);
    }
	


	constructor()public{
		addCandidate("rakib");
		addCandidate("rs");
	} 
	
	
}

