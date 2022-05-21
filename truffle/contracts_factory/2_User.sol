// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract UserContract {

    struct ClientUser {
        string name;
        string surname;
        string dni;
        bool registered;
        UserRoles role;
        SocialParams socialParams;
    }

    struct AdminUser {
        string name;
        string surname;
        string dni;
        bool registered;
        UserRoles role;
    }

    enum UserRoles {
        CITIZEN, ADMIN
    }

    struct SocialParams {
        string gender;
        string salary;
        uint age;
    }

    mapping(address => ClientUser) clientUsers;
    mapping(address => AdminUser) adminUsers;

    uint total_users;
    uint total_admins;
    
    function registerAdminUser(string memory name, string memory surname, string memory dni) public payable returns (bool){
        require(adminUsers[msg.sender].registered == false, "User already registered!");
        require(clientUsers[msg.sender].registered == false, "User already registered!");

        adminUsers[msg.sender].registered = true;
        adminUsers[msg.sender].name = name;
        adminUsers[msg.sender].surname = surname;
        adminUsers[msg.sender].dni = dni;
        adminUsers[msg.sender].role = UserRoles.ADMIN;

        total_admins++;
        return true;
    }

    function registerUser(string memory name, string memory surname, string memory dni, string memory gender, string memory salary, uint age) public payable returns (bool){
        require(adminUsers[msg.sender].registered == false, "User already registered!");
        require(clientUsers[msg.sender].registered == false, "User already registered!");

        clientUsers[msg.sender].registered = true;
        clientUsers[msg.sender].name = name;
        clientUsers[msg.sender].surname = surname;
        clientUsers[msg.sender].dni = dni;
        clientUsers[msg.sender].socialParams.gender = gender;
        clientUsers[msg.sender].socialParams.salary = salary;
        clientUsers[msg.sender].socialParams.age = age;
        clientUsers[msg.sender].role = UserRoles.CITIZEN;

        total_users++;
        return true;
    }

    function editClientUser(string memory name, string memory surname, string memory dni, string memory gender, string memory salary, uint age) external returns(bool) {
        require(clientUsers[msg.sender].registered == true,"User has to be registered");
        clientUsers[msg.sender].name = name;
        clientUsers[msg.sender].surname = surname;
        clientUsers[msg.sender].dni = dni;
        clientUsers[msg.sender].socialParams.gender = gender;
        clientUsers[msg.sender].socialParams.salary = salary;
        clientUsers[msg.sender].socialParams.age = age;
        return true;
    }

    function editAdminUser(string memory name, string memory surname, string memory dni) external returns(bool) {
        require(adminUsers[msg.sender].registered == true,"Admin user has to be registered");
        adminUsers[msg.sender].name = name;
        adminUsers[msg.sender].surname = surname;
        adminUsers[msg.sender].dni = dni;
        return true;
    }

    function deleteClientUser() external returns(bool) {
        require(clientUsers[msg.sender].registered == true,"User has to be registered");
        delete clientUsers[msg.sender];
        //TODO: Delete all social and polls?
        total_users --;
        return true;
    }

    function deleteAdminUser() external returns(bool) {
        require(adminUsers[msg.sender].registered == true,"Admin user has to be registered");
        delete adminUsers[msg.sender];
        //TODO: Delete all social and polls?
        total_admins --;
        return true;
    }

    function getClientUser(address addr) public view returns (ClientUser memory){
        // require(clientUsers[msg.sender].registered == true, "User not registered!");
        return clientUsers[addr];
    }

    function getAdminUser(address addr) public view returns (AdminUser memory){
        // require(adminUsers[msg.sender].registered == true, "User not registered!");
        return adminUsers[addr];
    }

    function getTotalUsers() public view returns (uint){
        return total_users;
    }

    function getTotalAdminUsers() public view returns (uint){
        return total_admins;
    }

    receive() external payable {
        revert();
    }

}