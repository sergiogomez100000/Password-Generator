//Initialize global variables
//setting up variable for the generate button in the document.
var generateBtn = document.querySelector("#generate");
var copyBtn= document.querySelector("#copy")
// setting up data-type variables with arrays of data-types(uppercase, lowercase, numbers, special characters)
var numbers = [0,1,2,3,4,5,6,7,8,9];
// array of the data-type strings needs quotation marks split with commas
var specialCharacters = ["!","@","#","$","%","^","&","*","(",")","-","_","=","+"];
var upperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var lowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  //go and retrieve html element with id of password
  var passwordText = document.querySelector("#password");
//change the text that is inside passwordText to password variable
  passwordText.value = password;

}
// 1. we need a function named generatePassword();
function generatePassword() {
  //stores password length from length Id as variable
  var length = document.getElementById("length").value;
  // the length has to be > 8 and <128
    // if it's not, we need to start over
      // otherwise, continue with the other prompts
      //if password length less than 8, more than 128 or Not A Number(NaN)
  if (length<8 || length>128 || isNaN(length) === true) {
    // then do this if password  length not between 8 or 128.
    alert("Password length must be between 8 and 128!");
    return;
    //return to page if not between 8 or 128.
  }
  // store user's responses as variables using a confirmation box
  var hasNumbers = document.getElementById("num").checked;
  var hasspecialCharacter = document.getElementById("special").checked;
  var hasupperCase = document.getElementById("upper").checked;
  var haslowerCase = document.getElementById("lower").checked;

  // check to make sure user selected at least one character type
  // if no characters are selected then alert follows and returns
  if (hasNumbers === false &&
    hasspecialCharacter === false &&
    hasupperCase === false &&
    haslowerCase === false){
      alert("You must choose at least one character type!");
      return;
    }

  //  creates variable to store all the possible choices, based on the user's input
  var possibleChars = [];
  // variable to store the final password as an array
  var result = [];
  // variable to store guaranteed characters, initialized as empty array

// if they asked for numbers the possiblecharacters will include numbers
  if (hasNumbers===true){
    // Array.prototype.concat() => merging / adding two arrays together
    // possible characters equals itself + numbers
    possibleChars = possibleChars.concat(numbers);
  }
//if they asked for special characters, the possiblecharcters will include specialcharacters
  if (hasspecialCharacter === true) {
    possibleChars = possibleChars.concat(specialCharacters);
  }
  //if they asked for upper case, the possible charcters will include upper case letters
  if (hasupperCase === true) {
    possibleChars = possibleChars.concat(upperCase);
  }
  //if they asked for lower case, the possible characters will include lower case letters
  if(haslowerCase === true) {
    possibleChars = possibleChars.concat(lowerCase);
  }

  // now that we have all the options, we have to figure out the password
    // for the length that the user selected, choose a random character from the possibleCharacters
      // then push that into the result array
  for(var i=0; i<length; i++) {
    var randomChar = getRandom(possibleChars);
    // push each random character into the result -- Array.prototype.push()
    result.push(randomChar);
  }
  // convert the result array into a string, stored in a variable called password, and return it
  var password = result.join("");
  return password;
}
// helper function that returns a random element in an array
function getRandom(arr) {
  // this returns a number value - a random number that is less than the length of the array
  var randomIndex = Math.floor(Math.random()*arr.length);
  // select the item that is at the random index selected
  var randomEl = arr[randomIndex];
  // return the randomEl so we can use it outside this function
  return randomEl;

}

//function to copy generated password to clipboard
function copyPassword(){
  password.select();
  document.execCommand("Copy");
  // alert("Copied to Clipboard!")
  var tooltip = document.getElementById("myTooltip");
  tooltip.style.visibility= "visible";
  tooltip.innerHTML = "Copied!";


}

function resetToolTip(){
var tooltip = document.getElementById("myTooltip");
tooltip.style.visibility = "hidden";  
}

// Add event listener to generate button and copy button
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copyPassword)
copyBtn.addEventListener("mouseout", resetToolTip)
