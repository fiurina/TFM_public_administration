// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "./2_User.sol";

contract PollContract {

    UserContract private userContract_ref;

    constructor(UserContract _addrUserContract) {
        userContract_ref = _addrUserContract;
    }

    struct Poll {
        uint id;
        bool created;
        address creator;
        string title;
        string description;
        uint creationDate;
        string imageURL;
        string question;
        string[] answerOptions;
    }

    struct PollAnswer {
        mapping(address => UserAnswer) answers;
        uint total_answers;
    }

    struct UserAnswer {
        // uint answerOptionSelected;
        bool answered;
    }

    struct Result {
        uint[] results;
    }

    //Poll.id => index array polls
    Poll[] polls;
    //Poll.id => PollAnswer
    mapping(uint => PollAnswer) pollAnswers;
    //Poll.id => array with sum of answers each answer. [2,3,3] -> First answer has 2 votes, second 3 and third 3
    mapping(uint => Result) pollResults;

    uint total_polls;
    uint polls_id_increment = 1;


    function createPoll(string memory title, string memory description, uint creationDate, string memory imageURL, string memory question, string[] memory answerOptions) external returns (bool){
        require(userContract_ref.getAdminUser(msg.sender).registered == true,"User has to be a registered admin");

        polls.push(Poll(polls_id_increment, true, msg.sender, title, description, creationDate, imageURL, question, answerOptions));
        total_polls ++;
        //Init results array
        pollResults[polls_id_increment].results = new uint[](answerOptions.length);
        polls_id_increment ++;
        return true;
    }

    function answerPoll(uint id, uint optionSelected) external returns (bool){
        uint index = id -1;
        require(userContract_ref.getClientUser(msg.sender).registered == true,"User has to be registered");
        require(polls[index].created == true,"The Poll requested does not exist");
        require(pollAnswers[id].answers[msg.sender].answered == false,"The Poll has already been answered by this user");

        // pollAnswers[id].answers[msg.sender].answerOptionSelected = optionSelected;
        pollAnswers[id].answers[msg.sender].answered = true;
        pollAnswers[id].total_answers ++;

        //Recalculate result
        pollResults[id].results[optionSelected] ++;
        return true;
    }

    function getPollResults(uint id) public view returns (Result memory){
        uint index = id -1;
        require(polls[index].created == true,"The Poll requested does not exist");
        return pollResults[id];
    }

    function getPollById(uint id) public view returns (Poll memory){
        uint index = id -1;
        require(polls[index].created == true,"The Poll requested does not exist");
        return polls[index];
    }

    function deletePoll(uint id) external returns (bool){
        uint index = id -1;
        require(userContract_ref.getAdminUser(msg.sender).registered == true,"User has to be registered");
        require(polls[index].created == true,"The Poll requested does not exist");
        delete polls[index];
        delete pollAnswers[id];
        delete pollResults[id];
        total_polls--;
        return true;
    }

    function getAllPolls() public view returns (Poll[] memory){
        return polls;
    }

    function getTotalPolls() public view returns (uint){
        return total_polls;
    }

    receive() external payable {
        revert();
    }

}