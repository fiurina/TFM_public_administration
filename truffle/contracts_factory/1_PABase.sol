// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./2_User.sol";
import "./3_Poll.sol";
import "./4_Social.sol";

contract PublicAdminContract {
    string public name;
    address public owner;

    UserContract public userContract_ref;
    PollContract public pollContract_ref;
    SocialContract public socialContract_ref;

    constructor(string memory _name, address _owner) {
        name = _name;
        owner = _owner;
        userContract_ref = new UserContract();
        pollContract_ref = new PollContract(userContract_ref);
        // socialContract_ref = new SocialContract(userContract_ref);
    }

    receive() external payable {
        revert();
    }

}