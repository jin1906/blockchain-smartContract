var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

//Crypto hash stuff for task 6.
var crypto = require('crypto');
const hash = crypto.createHash('sha256');

var logs = ""; //Global variable to hold logs

var defaultAcc = "";

setDefaultAccount();

function server() {
  var user = {
    'userA':'pwd123',
    'userB':'pwd456',
  };
  var fileX = "This is the file from server";
  var filePermissionBit = {
    'userA':0,
    'userB':0
  };
  var loginStatus = {
    'userA':0,
    'userB':0
  };
  var addr = { //Added accounts? for task 3. Not sure if it was supposed to be implemented this way
    'userA':"0xC889Bf81aa41990ACcdb9f5C3E13cf5A2f1F6450",
    'userB':"0x8121F5cEc61C350dd6dAF5d72C66E8c82dd1B427"
  };

  this.user_exist = function(userId){
    if (userId in user)
      return addr[userId]
    else 
      return defaultAcc
  }
  this.user_Login = function(userId,pwd) {
    bkc_logging(userId); //Task 1
    if(user[userId] == pwd)
    {
      loginStatus[userId] = 1;
      event = userId+" Login";
    }
  }
  
  this.user_Logout = function(userId) {
    bkc_logging(userId); //Task 1
    loginStatus[userId] = 0;
  }
  
  this.file_permission_set = function(user) {
    bkc_logging(user); //Task 1
    filePermissionBit[user] = 1;
  }
  
  this.file_delegate = function( delegator,  delegatee) {
    if(filePermissionBit[delegator] == 1)
    {
      console.log(delegator +" giving file-read permission to "+delegatee);
      filePermissionBit[delegatee] = 1;
    }
  }
  
  this.file_Access = function(user) {
    bkc_logging(user); //Task 1
    if(loginStatus[user] == 1 && filePermissionBit[user] == 1)
    {
      return fileX;
    }
    return "You are not authorized to read this file.";
  }
}

function client(){
  server1=new server();
  this.execute = function() {
    server1.user_Login("userA","pwd123");
    server1.user_Login("userB","pwd456");
    
    server1.file_permission_set("userA");
    var response = server1.file_Access("userA");
    console.log("Response after userA reading file:"+response);
    response=server1.file_Access("userB");
    console.log("Response after userB reading file:"+response);
    
    server1.file_delegate("userA","userB");
    response = server1.file_Access("userB");
    console.log("Response after userB reading file :"+response);

    server1.user_Logout("userA");
    server1.user_Logout("userB"); 
    final_log(logs); //To send all the logs collected as one
  }  
}

//const cipher = crypto.createCipher('aes128', 'a password');


function bkc_logging(str){ //Added 'hash' to reduce the transaction fee
  logs = logs.concat(" || ".concat(toString(str))); //finalLog = logUpdate1 || logUpdate2 || ... || logUpdate5
}

function final_log(str){ //This is the same as task 2's bkc_logging function
  let str_hex = web3.utils.toHex(str);
  web3.eth.sendTransaction({from:defaultAcc, data:str_hex, to:defaultAcc}, function(err,succ){
    if (err)
      console.log("Failed to send the transaction.");
    else {
      console.log("all set");
      console.log(succ);
      var receipt = web3.eth.getTransactionReceipt(succ).then(console.log);
    }
});
}

//Task 3 using str as the data field and/or recipient
/*Function to generate hex encoded value for input string & sending transaction to blockchain for logging puropse*/
// function bkc_logging(str){
//   server2 = new server();
//   let str_hex = web3.utils.toHex(str);

//   let recipient = server2.user_exist(str);

//   web3.eth.sendTransaction({from:defaultAcc, data:str_hex, to:recipient}, function(err,succ){
//     if (err)
//       console.log("Failed to send the transaction.");
//     else {
//       console.log("all set");
//       console.log(succ);
//       var receipt = web3.eth.getTransactionReceipt(succ).then(console.log);
//     }
// });
// }


/*Function to get a account from local blockchain*/
function setDefaultAccount(){
  web3.eth.getAccounts(function(error, result){
    if(!error){
      defaultAcc  = result[0];
      var client1 = new client();
      client1.execute();
    }}
  );
}