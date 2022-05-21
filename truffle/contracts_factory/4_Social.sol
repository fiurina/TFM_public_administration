// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./2_User.sol";

contract SocialContract {

    UserContract private userContract_ref;

    constructor(UserContract _addrUserContract) {
        userContract_ref = _addrUserContract;
    }

    struct SocialAid {
        uint id;
        bool created;
        address creator;
        string title;
        string description;
        uint creationDate;
        uint tokens;
        string imageURL;
        Condition condition;
    }

    struct Condition {
        SocialTypesEnum condition_type;
        uint minRange;
        uint maxRange;
        string param;
    }

    enum SocialTypesEnum {
        GENDER, SALARY, AGE
    }

    struct UserSocialAidAssigned {
        bool recieved;
        bool conditionsReached;
    }

    struct SocialAidAssigned {
        mapping(address => UserSocialAidAssigned) asignations;
    }

    //SocialAid.id => index array socialAids
    SocialAid[] socialAids;
    //SocialAid.id => SocialAidAssigned
    mapping(uint => SocialAidAssigned) socialAidAssignations;
    uint total_social;
    uint social_id_increment = 1;
    

    function transferFunds() public payable returns (bool){
        require(userContract_ref.getAdminUser(msg.sender).registered == true,"User has to be a registered admin");
        return true;
    }

    function getContractBalance() public view returns (uint){
        return address(this).balance;
    }

    function createSocialAid(string memory title, string memory description, uint creationDate, uint tokens, string memory imageURL, SocialTypesEnum condition_type
    , uint minRange, uint maxRange, string memory param) external returns (bool){
        require(userContract_ref.getAdminUser(msg.sender).registered == true,"User has to be a registered admin");

        Condition memory condition = Condition(condition_type, minRange, maxRange, param);
        socialAids.push(SocialAid(social_id_increment, true, msg.sender, title, description, creationDate, tokens, imageURL, condition));
        total_social ++;
        social_id_increment ++;
        return true;
    }

    function checkSocialAid(uint id) external returns (bool){
        uint index = id - 1;
        require(userContract_ref.getClientUser(msg.sender).registered == true,"User has to be registered");
        require(socialAids[index].created == true,"The SocialAid requested does not exist");

        bool accepted = false;
        if (socialAids[index].condition.condition_type == SocialTypesEnum.GENDER){
            if(keccak256(abi.encodePacked(userContract_ref.getClientUser(msg.sender).socialParams.gender)) == keccak256(abi.encodePacked(socialAids[index].condition.param))){
                accepted = true;
            }
        }else if (socialAids[index].condition.condition_type == SocialTypesEnum.AGE){
            bool minRange = userContract_ref.getClientUser(msg.sender).socialParams.age >= socialAids[index].condition.minRange;
            bool maxRange = userContract_ref.getClientUser(msg.sender).socialParams.age <= socialAids[index].condition.maxRange;
            if(minRange && maxRange){ accepted = true; }
        }else if (socialAids[index].condition.condition_type == SocialTypesEnum.SALARY){
            if(keccak256(abi.encodePacked(userContract_ref.getClientUser(msg.sender).socialParams.salary)) == keccak256(abi.encodePacked(socialAids[index].condition.param))){
                accepted = true;
            }
        }
        require(accepted, "Check conditions failed.");      
        socialAidAssignations[index].asignations[msg.sender].conditionsReached = true;
        return true;
    }

    function recieveSocialAid(uint id) external returns (bool){
        uint index = id - 1;
        require(userContract_ref.getClientUser(msg.sender).registered == true,"User has to be registered");
        require(socialAids[index].created == true,"The SocialAid requested does not exist");
        require(socialAidAssignations[index].asignations[msg.sender].conditionsReached == true,"The SocialAid is not assigned to this user");
        require(socialAidAssignations[index].asignations[msg.sender].recieved == false,"The SocialAid has already been recieved to this user");

        (bool success, ) = msg.sender.call{value: socialAids[index].tokens}("");
        require(success, "Transfer failed.");   
        socialAidAssignations[index].asignations[msg.sender].recieved = true;
        return true;
    }

    function getAllSocialAids() public view returns (SocialAid[] memory){
        return socialAids;
    }

    function getSocialAidById(uint id) public view returns (SocialAid memory){
        uint index = id -1;
        require(socialAids[index].created == true,"The SocialAid requested does not exist");
        return socialAids[index];
    }

    function deleteSocial(uint id) external returns (bool){
        uint index = id - 1;
        require(userContract_ref.getAdminUser(msg.sender).registered == true,"User has to be registered");
        require(socialAids[index].created == true,"The SocialAid requested does not exist");
        delete socialAids[index];
        delete socialAidAssignations[id];
        total_social --;
        return true;
    }

    function getTotalSocialAids() public view returns (uint){
        return total_social;
    }

    receive() external payable {
        revert();
    }

}