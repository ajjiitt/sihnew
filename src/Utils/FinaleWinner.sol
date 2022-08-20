//SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.5.0 < 0.9.0;

contract RegisterData {

    //struct
    struct Register {
        string name;
        address registerAddress;
    }

    //mapping
    mapping(address => bool) public hasRegistered;

    //Arrays
    Register[] public registerCenter;
    Register[] public registerState;
    Register[] public registerGround;

    //Register for Center Authority
    function regCenter(string memory _name, address _registerAddress) external {
        require(hasRegistered[msg.sender] == false, "already registered");
        Register memory newRegister;
        newRegister.name = _name;
        newRegister.registerAddress = _registerAddress;
        registerCenter.push(newRegister);
    }
    //Register for State Authority
    function regState(string memory _name, address _registerAddress) external {
        require(hasRegistered[msg.sender] == false, "already registered");
        Register memory newRegister;
        newRegister.name = _name;
        newRegister.registerAddress = _registerAddress;
        registerState.push(newRegister);
    }
    //Register for Ground Authority
    function regGround(string memory _name, address _registerAddress) external {
        require(hasRegistered[msg.sender] == false, "already registered");
        Register memory newRegister;
        newRegister.name = _name;
        newRegister.registerAddress = _registerAddress;
        registerGround.push(newRegister);
    }

    //Fetch all registered Center
    function getRegCenter() external view returns (Register[] memory) {
        return registerCenter;
    }

    //Fetch all registered Center
    function getRegState() external view returns (Register[] memory) {
        return registerState;
    }

    //Fetch all registered Center
    function getRegGround() external view returns (Register[] memory) {
        return registerGround;
    }

}

contract Disaster {
    //Contract Variables
    address private owner;
    address public MasterContractAddress;
    string public DisasterName;

    

    //Enums
    enum RequestState { Initiated, Dispatched, Delivered, Cancelled }
    enum DemandState { Unfulfilled, Fulfilled }
    //Structs
    struct Request {
        string supplyType;
        string requestedBy;
        string deliveryAddress;
        uint amount;
        RequestState state;
    }
    struct Demand {
        string name;
        string location;
        string demandDescription;
        DemandState state;
    }

    //Mappings
    mapping(address => Request[]) public authorityRequest;
    mapping(address => Demand[]) public authorityDemand;


    //Arrays
    Request[] public allRequests;
    Demand[] public allDemands;

    //Access Modifiers
    modifier onlyMasterContract {
        require(msg.sender == MasterContractAddress);
        _;
    }
 
    constructor(address _EOA, string memory _disasterName) {
        owner = _EOA;
        DisasterName = _disasterName;
        MasterContractAddress = msg.sender;
    }

    

    //Create a new Supply Request
    function createRequest(string memory _supplyType, string memory _deliveryAddress, string memory AuthorityName, uint _amount) external {

        Request memory newRequest;
        newRequest.supplyType = _supplyType;
        newRequest.requestedBy = AuthorityName;
        newRequest.deliveryAddress = _deliveryAddress;
        newRequest.amount = _amount;
        newRequest.state = RequestState.Initiated;
        allRequests.push(newRequest);
        authorityRequest[msg.sender].push(newRequest);

    }

    //Gets Disaster Name
    function getDisasterName() external view returns(string memory) {
        return DisasterName;
    }

    //Gets All Requests for this particular disastar
    function getAllRequest() external view returns(Request[] memory){
        return allRequests;
    }

    //Gets Specific User Supply Requests
    function getRequest(address supplyCreator) external view returns (Request[] memory){
        return authorityRequest[supplyCreator];
    }

    //Dispatch Supply
    function dispatchSupply(address supplyCreator, uint index) external {
        authorityRequest[supplyCreator][index].state = RequestState.Dispatched;
    }

    //Supply Delivered
    function deliveredSupply(address supplyCreator, uint index) external {
        authorityRequest[supplyCreator][index].state = RequestState.Delivered;
    }

    //Supply Cancelled
    function cancelSupply(address supplyCreator, uint index) external {
        authorityRequest[supplyCreator][index].state = RequestState.Cancelled;
    }

    //Create Demand
    function createDemand(string memory _location, string memory _demandDescription, string memory AuthorityName) external  {

        Demand memory newDemand;
        newDemand.location = _location;
        newDemand.demandDescription = _demandDescription;
        newDemand.name = AuthorityName;
        newDemand.state = DemandState.Unfulfilled;
        allDemands.push(newDemand);
        authorityDemand[msg.sender].push(newDemand);

    }

    //Accept Demand
    function acceptDemand(address demandCreator, uint index) external  {
        authorityDemand[demandCreator][index].state = DemandState.Fulfilled;
    }

    //Get All Demands
    function getAllDemands() external view returns (Demand[] memory) {
        return allDemands;
    }

    //Get Authority Specific Demands
    function getDemands(address demandCreator) external view returns (Demand[] memory) {
        return authorityDemand[demandCreator];
    }

    

    
}


contract MasterContract is RegisterData{
    address private ownerMaster;

    //mappings
    mapping(address => string) public AuthorityName;
    mapping(address => bool) public isCenter;
    mapping(address => bool) public isState;
    mapping(address => bool) public isGround;

    //Arrays
    CenterData[] public allCenterData;
    StateData[] public allStateData;
    GroundData[] public allGroundData;

    //structs
     struct CenterData {
        address centerAddress;
        string name;
    }
    struct StateData {
        address stateAddress;
        string name;
    }
    struct GroundData {
        address groundAddress;
        string name;
    }
    struct Disasters {
        address disastarContract;
        string disasterName;
        string location;
        string severity;
    }

    Disasters[] public allDisasters;

    constructor () {
        ownerMaster = msg.sender;
        isCenter[msg.sender] = true;
    }

    function CreateDisaster(string memory _disasterName, string memory _location, string memory _severity) public {
        Disaster new_Disaster_address = new Disaster(msg.sender, _disasterName);
        Disasters memory newDisaster;
        newDisaster.disastarContract = address(new_Disaster_address);
        newDisaster.disasterName = _disasterName;
        newDisaster.location = _location;
        newDisaster.severity = _severity;
        allDisasters.push(newDisaster);

        isCenter[msg.sender] = true;
        CenterData memory newCenter;
        newCenter.centerAddress = msg.sender;
        newCenter.name = "Admin";
        allCenterData.push(newCenter);
    }

    function getDisasters() external view returns(Disasters[] memory){
        return allDisasters;
    }

    //Access Modifiers
    modifier onlyAdmin{
        require(ownerMaster == msg.sender, "Not an Admin");
        _;
    }

    modifier onlyCenter{
        require(isCenter[msg.sender] == true, "Only Center");
        _;
    }

    modifier onlyState{
        require(isState[msg.sender] == true, "Only State");
        _;
    }

    modifier onlyStateOrCenter {
        require(isState[msg.sender] == true || isCenter[msg.sender] == true, "Only Center or State");
        _;
    }

    modifier onlyInvolvedAuthorities {
        require(isState[msg.sender] == true || isCenter[msg.sender] == true || isGround[msg.sender] == true, "Only Involved");
        _;
    }

    //Gets all Center Data 
    function getCenterData() external view returns (CenterData[] memory) {
        return allCenterData;
    }

    //Gets all State Data 
    function getStateData() external view returns (StateData[] memory) {
        return allStateData;
    }

    //gets all Ground Data
    function getGroundData() external view returns (GroundData[] memory) {
        return allGroundData;
    }

    //create Center Level 
    function createCenterLevel(address toGrant, string memory centerName) external onlyCenter {

        require(isCenter[toGrant] == false, "Already registered");
        AuthorityName[toGrant] = centerName;
        isCenter[toGrant] = true;
        CenterData memory newCenter;
        newCenter.centerAddress = toGrant;
        newCenter.name = centerName;
        allCenterData.push(newCenter);

    }

    //create State level
    function createStateLevel(address toGrant, string memory stateName) external onlyCenter {

        require(isState[toGrant] == false, "Already registered");
        AuthorityName[toGrant] = stateName;
        isState[toGrant] = true;
        StateData memory newState;
        newState.stateAddress = toGrant;
        newState.name = stateName;
        allStateData.push(newState);

    }

    //create Ground Level
    function createGroundLevel(address toGrant, string memory GroundName) external onlyStateOrCenter {

        require(isGround[toGrant] == false, "Already registered");
        AuthorityName[toGrant] = GroundName;
        isGround[toGrant] = true;
        GroundData memory newGround;
        newGround.groundAddress = toGrant;
        newGround.name = GroundName;
        allGroundData.push(newGround);

    }

    function getDisasterName(Disaster curDisaster) external view returns(string memory) {
        return curDisaster.getDisasterName();
    }

    
}