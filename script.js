'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// ////////////////////////////////////////////
// const arr = [1, 2, 6, 3, 5, 7, 9, 8, 2];
// const arr2 = [1, 2, 6, 3, 5, 7, 9, 8, 2];

// //slice
// //slice(start,end)
// //Return value =>A new array containing the extracted elements.
// console.log(arr.slice(1, 7));
// console.log(arr);
// console.log(arr.slice(1, -2));
////////////////////////////////////////////
//splice
//splice(start)
//splice(start, deleteCount)
//splice(start, deleteCount, item1)
//splice(start, deleteCount, item1, item2, itemN)
//Return value =>An array containing the deleted elements.
//If only one element is removed, an array of one element is returned.
//If no elements are removed, an empty array is returned.
// console.log(arr.splice(1, 0, 19)); //array contain deleting element
// console.log(arr); //src arry after change
// console.log(arr.splice(1, 1, 19)); //array contain deleting element

// ////////////////////////////////////////////
// //reverse
// //it changes the original array.
// console.log(arr.reverse());
////////////////////////////////////////////
//concate
//concate == disturcture
// const arrc = arr.concat(arr2);
// const arrc2 = [...arr, ...arr2];
// console.log(arrc.join('-'));
// console.log(arrc2.join('-'));
// console.log(
//   '------------------------------------------------------------------------------------------------------'
// );

// arr.forEach(element => {
//   console.log(element > 5 && element);
// });
//DOM
const display_account_ballance = function (account) {
  account.ballance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.ballance} €`;
};
const display_movement = (movementss, sorted = false) => {
  const movs = sorted ? movementss.slice().sort((a, b) => a - b) : movementss;

  containerMovements.innerHTML = '';
  movs.forEach((mov, i) => {
    const t = mov > 0 ? 'DEPOSIT'.toLowerCase() : 'WITHDRAWAL'.toLowerCase();

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${t}">${i} ${t} </div>
   <!-- <div class="movements__date">3 days ago</div> -->
    <div class="movements__value">${mov} €</div> 
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
accounts.length;
const calcsummary = function (acc) {
  const ins = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${ins} € `;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} € `;
  const INTEREST = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${Math.abs(INTEREST)} € `;
};
let current_account;
///////////////////////////////////////////////////
//login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  current_account = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (current_account?.pin === Number(inputLoginPin.value)) {
    inputLoginUsername.value = inputLoginPin.value = '';
    labelWelcome.textContent = `WELCOME ${current_account.owner}`;
    containerApp.style.opacity = 100;
    display_movement(current_account.movements);
    display_account_ballance(current_account);
    calcsummary(current_account);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const acc_transfer = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const ammount = Number(inputTransferAmount.value);
  if (
    ammount <= current_account.ballance &&
    acc_transfer?.username !== current_account.username &&
    ammount > 0
  ) {
    current_account.movements.push(-ammount);
    acc_transfer.movements.push(ammount);
    Update_UI(current_account);
  }
});
const Update_UI = acc => {
  calcsummary(acc);
  display_movement(acc.movements);
  display_account_ballance(acc);
};
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    current_account.movements.some(mov => mov >= 0.1 * amount)
  ) {
    current_account.movements.push(amount);
    Update_UI(current_account);
  }
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    current_account.username === inputCloseUsername.value &&
    current_account.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    accounts.splice(index, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
  }
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  display_movement(current_account.movements, !sorted);
  // Update_UI(current_account);
  sorted = !sorted;
});
/* 
Working With Arrays
Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners 
about their dog's age, and stored the data into an array (one array for each). For 
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years 
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have 
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat 
ages from that copied array (because it's a bad practice to mutate function 
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 
�
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far �
GOOD LUCK 
*/
// const checkDogs = (dogsJulia, dogsKate) => {
//   const rightdogsJulia = dogsJulia.slice(1, -2);
//   const Julia_Kate = [...rightdogsJulia, ...dogsKate];
//   Julia_Kate.forEach(function (dog, i) {
//     const displaydog = `Dog number ${i + 1} is  ${
//       dog >= 3 ? 'an adult' : 'a puppy'
//     }, and is ${dog} years old`;
//     console.log(displaydog);
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//map
// movements.map((mov, i) => {
//   console.log(`${i} - ${mov}`);
// });
const counyUserNameForAccounts = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(num => num[0])
      .join('');
  });
};
// const movements_value = document.querySelectorAll('.movements__value');
// console.log(movements_value);

counyUserNameForAccounts(accounts);
// console.log(accounts);
/* 
Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert 
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's 
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is 
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, 
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as 
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know 
from other challenges how we calculate averages �)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK �
Coding Challenge #
*/

// const calcAverageHumanAge = function (ages) {
//   const m = ages.map(acc => {
//     if (acc > 2) {
//       return 16 + acc * 4;
//     } else {
//       return 2 * acc;
//     }
//   });
//   const adult = m.filter(q => q >= 18);
//   const s = adult.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
//   console.log(m);
//   console.log(s);
// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

/*Coding Challenge #3
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time 
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK */
// Coding Challenge #3
// Let's continue with our football betting app! This time, we have a map called
// 'gameEvents' (see below) with a log of the events that happened during the
// game. The values are the events themselves, and the keys are the minutes in which
// each event happened (a football game has 90 minutes plus some extra time).
// Your tasks:
// 1. Create an array 'events' of the different game events that happened (no
// duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64
// was unfair. So remove this event from the game events log.
// 3. Compute and log the following string to the console: "An event happened, on
// average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over 'gameEvents' and log each element to the console, marking
// whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽ GOAL
// GOOD LUCK �
const m = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(m);
labelBalance.addEventListener('click', function (e) {
  // e.preventDefault();
  const display_plance = Array.from(
    document.querySelectorAll('.movements__value'),
    curr => Number(curr.textContent.replace('€', ''))
  );

  console.log(display_plance);
});
/*Coding Challenge #4
Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) �
3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"
5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects �)
The Complete JavaScript Course 26
Hints:
§ Use many different tools to solve these challenges, you can use the summary
lecture to choose between them �
§ Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.
Test data:
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
dogs.forEach(cur => (cur.recommendedFood = cur.weight ** 0.75 * 28));
console.log(dogs);
console.log(dogs.filter(a => a.owners.includes('Sarah')));
const owner_dogs_eat_to_match = dogs
  .flatMap(a => {
    if (a.curFood > a.recommendedFood * 1.1) {
      return a.owners;
    }
  })
  .filter(a => a !== undefined);
const owner_dogs_eat_to_littel = dogs
  .flatMap(function (a) {
    if (a.curFood < a.recommendedFood * 0.9) {
      return a.owners;
    }
  })
  .filter(a => a !== undefined);

console.log(`${owner_dogs_eat_to_match.join(' and ')}'s dogs eat too much! `);
console.log(
  `${owner_dogs_eat_to_littel.join(' and ')}'s dogs eat too littel! `
);
console.log(dogs.some(a => a.curFood === a.recommendedFood));
console.log(
  dogs.some(
    a =>
      a.curFood < a.recommendedFood * 1.1 && a.curFood > a.recommendedFood * 0.9
  )
);
const okay = dogs.filter(
  a =>
    a.curFood < a.recommendedFood * 1.1 && a.curFood > a.recommendedFood * 0.9
);
console.log(okay);
const sor_dogs = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(sor_dogs);
