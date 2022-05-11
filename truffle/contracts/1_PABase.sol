// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./2_User.sol";
import "./3_Poll.sol";
import "./4_Social.sol";


contract PublicAdminContract {

    UserContract private userContract_ref;
    PollContract private pollContract_ref;
    SocialContract private socialContract_ref;

    constructor(UserContract _addrUserContract, PollContract _addrPollContract_ref, SocialContract _addrSocialContract_ref) {
        userContract_ref = _addrUserContract;
        pollContract_ref = _addrPollContract_ref;
        socialContract_ref = _addrSocialContract_ref;
    }

    receive() external payable {
        revert();
    }

}