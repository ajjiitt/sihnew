//SPDX-License-Identifier: GPL-3.0
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
pragma solidity >= 0.5.0 < 0.9.0;

contract RegisterData {

    //struct
    struct Register {
        string name;
        address registerAddress;
    }

    //mapping
    mapping(address => bool) public hasRegistered;
    mapping(uint => Register[]) public registerAuth;
    
    //Register for Specific Authority
    function regAuth(string memory _name, address _registerAddress, uint curAuthority) external {
        require(hasRegistered[msg.sender] == false);
        Register memory newRegister;
        newRegister.name = _name;
        newRegister.registerAddress = _registerAddress;
        
        registerAuth[curAuthority].push(newRegister);

    }

    //Fetch Registered Array
    function getRegCenter(uint curAuthority) external view returns(Register[] memory){
        
        return registerAuth[curAuthority];

    }

}
contract commonStruct {
    struct FileDisaster {
        string name;
        string description;
        string link;
        string time;
        address from;
    }
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

    //Enums
    enum RequestState { Initiated, Dispatched, Delivered, Cancelled }
    enum DemandState { Unfulfilled, Fulfilled }

    mapping(address => string) public AuthorityName;
}

contract Disaster is commonStruct{
    //Contract Variables
    address private owner;
    address public MasterContractAddress;
    string public DisasterName;


    //Mappings
    mapping(address => Request[]) public authorityRequest;
    mapping(address => Demand[]) public authorityDemand;


    //Arrays
    Request[] public allRequests;
    Demand[] public allDemands;
    FileDisaster[] public allFiles;
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
    function createRequest(string memory _supplyType, string memory _deliveryAddress, address sender, uint _amount) external {

        Request memory newRequest;
        newRequest.supplyType = _supplyType;
        newRequest.requestedBy = AuthorityName[sender];
        newRequest.deliveryAddress = _deliveryAddress;
        newRequest.amount = _amount;
        newRequest.state = RequestState.Initiated;
        allRequests.push(newRequest);
        authorityRequest[sender].push(newRequest);

    }

    //Gets All Requests for this particular disastar
    function getAllRequest() external view returns(Request[] memory){
        return allRequests;
    }

    //Gets Specific User Supply Requests
    function getRequest(address supplyCreator) external view returns (Request[] memory){
        return authorityRequest[supplyCreator];
    }

    //Supply state change
    function supplyStateChange(address supplyCreator, uint index, bool isCancelled) external {
       if(isCancelled == true){
            authorityRequest[supplyCreator][index].state = RequestState.Cancelled;
        }else if(authorityRequest[supplyCreator][index].state == RequestState.Initiated){
            authorityRequest[supplyCreator][index].state = RequestState.Dispatched;
        }else if(authorityRequest[supplyCreator][index].state == RequestState.Dispatched){
            authorityRequest[supplyCreator][index].state = RequestState.Delivered;
        }
    }

    //Create Demand
    function createDemand(string memory _location, string memory _demandDescription, address sender) external  {

        Demand memory newDemand;
        newDemand.location = _location;
        newDemand.demandDescription = _demandDescription;
        newDemand.name = AuthorityName[sender];
        newDemand.state = DemandState.Unfulfilled;
        allDemands.push(newDemand);
        authorityDemand[sender].push(newDemand);

    }

    //Accept Demand
    function acceptDemand(address demandCreator, uint index) external  {
        require(authorityDemand[demandCreator][index].state == DemandState.Unfulfilled);
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

    //Share File Globally
    function shareFileGlobal(string memory _name, string memory _description, string memory _link, string memory _time, address _sender) external {

        FileDisaster memory newFile;
        newFile.name = _name;
        newFile.description = _description;
        newFile.link = _link;
        newFile.time = _time;
        newFile.from = _sender;

        allFiles.push(newFile);
    }

    //Get all files
    function getAllFiles() external view returns (FileDisaster[] memory) {
        return allFiles; 
    }
    

    
}

contract VOL is ERC20 {
    constructor() ERC20("HELP", "VOL") {
        _mint(msg.sender, 1000000000000000000000);
    }
}

contract MasterContract is RegisterData, commonStruct {
    address private ownerMaster;

    //mappings
    mapping(address => bool) public isCenter;
    mapping(address => bool) public isState;
    mapping(address => bool) public isGround;
    mapping(uint => mapping(address => bool)) public isAuth;
    mapping(address => File[]) public personalShare;
    mapping(uint => authData[]) public allAuth;


    //structs
     struct authData {
        address centerAddress;
        string name;
    }

    struct Disasters {
        address disastarContract;
        string disasterName;
        string location;
        string severity;
    }
    struct File {
        string name;
        string description;
        string link;
        string time;
        address from;
        address to;
    }

    Disasters[] public allDisasters;
    
    constructor () {
        ownerMaster = msg.sender;
        isAuth[0][msg.sender] = true;
        authData memory newCenter;
        newCenter.centerAddress = msg.sender;
        newCenter.name = "Admin";
        allAuth[0].push(newCenter);
    }

    //Create a new disaster 
    function createDisaster(string memory _disasterName, string memory _location, string memory _severity)  public onlyAdmin {
        Disaster new_Disaster_address = new Disaster(msg.sender, _disasterName);
        Disasters memory newDisaster;
        newDisaster.disastarContract = address(new_Disaster_address);
        newDisaster.disasterName = _disasterName;
        newDisaster.location = _location;
        newDisaster.severity = _severity;
        allDisasters.push(newDisaster);
        
    }
    

    //Fetch all Disasters
    function getDisasters() external view returns(Disasters[] memory){
        return allDisasters;
    }

    //Access Modifiers
    modifier onlyAdmin{
        require(ownerMaster == msg.sender);
        _;
    }

    modifier onlyCenter{
        require(isAuth[0][msg.sender] == true);
        _;
    }

    modifier onlyState{
        require(isAuth[1][msg.sender] == true);
        _;
    }

    modifier onlyStateOrCenter {
        require(isAuth[1][msg.sender] == true || isAuth[2][msg.sender] == true);
        _;
    }

    modifier onlyInvolvedAuthorities {
        require(isAuth[0][msg.sender] == true || isAuth[1][msg.sender] == true || isAuth[2][msg.sender] == true);
        _;
    }

    //Gets all Center Data 
    function getAuthData(uint index) external view returns (authData[] memory) {
        return allAuth[index];
    }


    //create Center Level 
    function createLevel(address toGrant, string memory centerName, uint index) external onlyCenter {

        require(isAuth[index][toGrant] == false);
        AuthorityName[toGrant] = centerName;
        isCenter[toGrant] = true;
        authData memory newCenter;
        newCenter.centerAddress = toGrant;
        newCenter.name = centerName;
        allAuth[index].push(newCenter);

    }


    //Share File With Other Person
    function shareFile(string memory _name, string memory _description, string memory _link, string memory _time, address _to) external {
        File memory newFile;
        newFile.name = _name;
        newFile.description = _description;
        newFile.link = _link;
        newFile.time = _time;
        newFile.from = msg.sender;
        newFile.to = _to;
        personalShare[msg.sender].push(newFile);
        personalShare[_to].push(newFile);
    }

    // //Fetch all files of that specific Person
    function fetchUserFiles(address user) external view returns (File[] memory) {
        return personalShare[user];
    }

    // //share files to all
    function shareFileGlobal(Disaster curDisaster, string memory _name, string memory _description, string memory _link, string memory _time) external {
        return curDisaster.shareFileGlobal(_name, _description, _link, _time, msg.sender);
    }

    // //fetch Global Files
    function getFilesGlobally(Disaster curDisaster) external view returns(FileDisaster[] memory){        
        return curDisaster.getAllFiles();
    }

    function createDemand(Disaster curDisaster, string memory _loc, string memory _demandDesc) external  {
        
        curDisaster.createDemand(_loc, _demandDesc, msg.sender);

    }

 
    // //Accept Demand
    function acceptDemand(Disaster curDisaster, address demandCreator, uint index) external  {
        curDisaster.acceptDemand(demandCreator, index);
    }

    // //Get All Demands
    function getAllDemands(Disaster curDisaster) external view returns (Demand[] memory) {
        return curDisaster.getAllDemands();
    }

    // //Get Authority Specific Demands
    function getDemands(Disaster curDisaster, address demandCreator) external view returns (Demand[] memory) {
        return curDisaster.getDemands(demandCreator);
    }

    function getAllRequest(Disaster curDisaster) external view returns(Request[] memory){
        return curDisaster.getAllRequest();
    }

    // //Gets Specific User Supply Requests
    function getRequest(Disaster curDisaster, address supplyCreator) external view returns (Request[] memory){
        return curDisaster.getRequest(supplyCreator);
    }

    //  //Create a new Supply Request
    function createRequest(Disaster curDisaster, string memory _supplyType, string memory _deliveryAddress, uint _amount) external {

       curDisaster.createRequest(_supplyType, _deliveryAddress, msg.sender, _amount);

    }

    // //Dispatch Supply
    // function dispatchSupply(Disaster curDisaster, address supplyCreator, uint index) external {
    //     curDisaster.dispatchSupply(supplyCreator, index);
    // }

    //Supply Delivered
    // function deliveredSupply(Disaster curDisaster, address supplyCreator, uint index) external {
    //     curDisaster.deliveredSupply(supplyCreator, index);
    // }

    // // //Supply Cancelled
    // function cancelSupply(Disaster curDisaster, address supplyCreator, uint index) external {
    //     curDisaster.cancelSupply(supplyCreator, index);
    // }
}


