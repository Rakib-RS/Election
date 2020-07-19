var Election = artifacts.require("./Election.sol");

module.exports = function(deployer) {
	// body...
	deployer.deploy(Election);
};