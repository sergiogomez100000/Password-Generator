//Initialize global variables
//setting up variables for document objects.
const generateBtn = document.querySelector("#generate");
const copyBtn = document.querySelector("#copy");
const passwordText = document.querySelector("#password");
const tooltip = document.getElementById("myTooltip");
// setting up data-type variables with arrays of data-types(uppercase, lowercase, numbers, special characters)
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const specialCharacters = ["!","@","#","$","%","^","&","*","(",")","-","_","=","+",];
const upperCase = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
const lowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];

// function to render password from generatePassword()
function writePassword(genPassword) {
  // store result of generatePassword() in variable
  const password = genPassword;
  //set passwordtext value to password created
  passwordText.value = password;
}

// function to create password
function generatePassword() {
  //  creates variable to store all the possible chars and result as arrays
  let possibleUpper = [];
  let possibleLower = [];
  let possibleNumb = [];
  let possibleSpecial = [];
  let possibleChars = [];
  let result = [];

  // store user's parameters as variables using checkbox (true or false)
  const hasNumbers = document.getElementById("num").checked;
  const hasSpecialCharacters = document.getElementById("special").checked;
  const hasUpperCases = document.getElementById("upper").checked;
  const hasLowerCases = document.getElementById("lower").checked;

  //stores password length from length input as variable
  const length = document.getElementById("length").value;

  //if password length less than 8, more than 128 or Not A Number(NaN)
  if (length < 8 || length > 128 || isNaN(length) === true) {
    // then prompt alert and get out of function
    alert("Password length must be between 8 and 128!");
    return;
  }

  // if no checkboxes checked, prompt alert to check at least one and return
  if (
    hasUpperCases === false &&
    hasLowerCases === false && 
    hasNumbers === false &&
    hasSpecialCharacters === false
  ) {
    alert("You must choose at least one character type!");
    return;
  }

  //if hasUpperCases is true, the possible chars will include uppercase letters
  if (hasUpperCases === true) {
    for (var i = 0; i < length; i++){
    const randomUpper = getRandom(upperCase);
    possibleUpper.push(randomUpper);
    }
    possibleChars = possibleChars.concat(possibleUpper)
  }

  //if hasLowerCases is true, the possible chars will include lowercase letters
  if (hasLowerCases === true) {
    for (var i = 0; i < length; i++){
    const randomLower = getRandom(lowerCase);
    possibleLower.push(randomLower);
    }
    // possible characters equals itself + possibleLowers
    possibleChars = possibleChars.concat(possibleLower);
  }

  // if hasNumbers is true the possible chars will include numbers
  if (hasNumbers === true) {
  // for the length of password, get random number and add to possible chars
    for (var i = 0; i < length; i++){
    const randomNums = getRandom(numbers);
    possibleNumb.push(randomNums);
    }
    possibleChars = possibleChars.concat(possibleNumb);
  }
  // if hasSpecialChars is true, the possible chars will include special chars
  if (hasSpecialCharacters === true) {
    // possibleChars = possibleChars.concat(specialCharacters);
    for (var i = 0; i < length; i++){
    const randomSpecial = getRandom(specialCharacters);
    possibleSpecial.push(randomSpecial);
    }
    possibleChars = possibleChars.concat(possibleSpecial);
  }
  // for the length given, choose a random character from the possibleCharacters
  for (var i = 0; i < length; i++) {
    // console.log(possibleChars);
    const randomChar = getRandom(possibleChars);
    // push each random character into the result array
    result.push(randomChar);
  }
  console.log(result)

  // convert the result array into a string, store as variable and return variable
  const password = result.join("");
  //writePassword() using password above as parameter
  writePassword(password);
}

// helper function that returns a random element in an array
function getRandom(arr) {
  // stores a random number val that is less than the length of array as variable
  const randomIndex = Math.floor(Math.random() * arr.length);
  // select the item in arr that is at the random index selected as variable
  const randomEl = arr[randomIndex];
  // return the randomEl so we can use it outside function
  return randomEl;
}

//function to copy generated password to clipboard
function copyPassword() {
  //selects password, copies, shows tooltip showing "copied" message
  password.select();
  document.execCommand("Copy");
  tooltip.style.visibility = "visible";
  tooltip.innerHTML = "Copied!";
}

// function to hide copy tooltip
function resetToolTip() {
  tooltip.style.visibility = "hidden";
}

// Add event listeners to generate button and copy buttons
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
copyBtn.addEventListener("mouseout", resetToolTip);
