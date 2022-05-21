const PublicAdminContract = artifacts.require("PublicAdminContract");
const UserContract = artifacts.require("UserContract");
const PollContract = artifacts.require("PollContract");
const SocialContract = artifacts.require("SocialContract");

// const PublicAdminFactory = artifacts.require("PublicAdminFactory");

module.exports = function(deployer) {
  deployer.then(async () => {
    await deployer.deploy(UserContract);
    await deployer.deploy(PollContract, UserContract.address);
    await deployer.deploy(SocialContract, UserContract.address);
    await deployer.deploy(PublicAdminContract, UserContract.address, PollContract.address, SocialContract.address);  
  });
};

// module.exports = function(deployer) {
//   deployer.then(async () => {
//     await deployer.deploy(PublicAdminFactory);
//     // await deployer.deploy(PollContract, UserContract.address);
//     // await deployer.deploy(SocialContract, UserContract.address);
//     // await deployer.deploy(PublicAdminContract, UserContract.address, PollContract.address, SocialContract.address);  
//   });
// };
