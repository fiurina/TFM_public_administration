// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./1_PABase.sol";

contract PublicAdminFactory {
    PublicAdminContract[] private publicAdmins;

    constructor() {
        createPublicAdmin('TFM_PA');
    }

    function createPublicAdmin(string memory name) public {
        PublicAdminContract pa = new PublicAdminContract(name, msg.sender);
        publicAdmins.push(pa);
    }

    function getAllPublicAdmins() public view returns(PublicAdminContract[] memory){
        return publicAdmins;
    }

    function getPublicAdmin(uint index) public view returns(PublicAdminContract){
        return publicAdmins[index];
    }

    receive() external payable {
        revert();
    }

}