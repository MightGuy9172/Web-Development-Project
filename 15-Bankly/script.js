'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Manish Maurya',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2025-01-28T09:15:04.904Z',
    '2025-06-12T10:17:24.185Z',
    '2025-06-17T14:11:59.604Z',
    '2025-06-19T17:01:17.194Z',
    '2025-06-19T23:36:17.929Z',
    '2025-06-21T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const account2 = {
  owner: 'James Bond',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Lionel Messi',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'ARS',
  locale: 'es-AR',
};

const account4 = {
  owner: 'Cristiano Ronaldo',
  movements: [430, 1000, 700, 50, -90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-04-01T10:17:24.185Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account5 = {
  owner: 'Ram Kumar',
  movements: [430, 1000, 700, 50, -90],
  interestRate: 1,
  pin: 5555,
  movementsDates: [
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-04-01T10:17:24.185Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const accounts = [account1, account2, account3, account4, account5];

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

//-----------------------Setting UserNames---------------------
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUsername(accounts);

//-----------------------Updating UI data---------------------
function updateData(acc) {
  //Balance
  calcPrintBalance(acc);
  //Trasactions
  displayMov(acc);
  //Summary
  calcDisplaySummary(acc);

  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };

  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);
}

//-----------------------Login---------------------

let currentAccount, watch;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //UI
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;
    containerApp.style.opacity = 100;
    //start timer
    if (watch) clearInterval(watch);
    watch = logoutTimer();
    //update ui
    updateData(currentAccount);
  }
  //Clear fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
});

//-----------------------Displaying Trasactions (Movement)---------------------
function displayMov(acc, sort = false) {
  containerMovements.innerHTML = '';
  const combinedMov = acc.movements.map((mov, i) => {
    return {
      movement: mov,
      movementDate: new Date(acc.movementsDates[i]),
    };
  });
  if (sort) {
    combinedMov.sort((a, b) => a.movement - b.movement);
  }

  combinedMov.forEach((mov, i) => {
    const { movement, movementDate } = mov;
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(movementDate);
    const displayDate = formattingDate(date, acc.locale);

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatMoney(
            movement,
            acc.locale,
            acc.currency
          )}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

//-----------------------Setting Totall Balance---------------------
function calcPrintBalance(acc) {
  acc.totalBalance = acc.movements.reduce((acc, amount) => acc + amount);
  labelBalance.textContent = formatMoney(
    acc.totalBalance,
    acc.locale,
    acc.currency
  );
}

//----------------------Summary-----------------------------
function calcDisplaySummary(account) {
  const incoming = account.movements
    .filter(mov => mov >= 0)
    .reduce((acc, mov) => acc + mov);
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);

  const interest = account.movements
    .filter(mov => mov >= 0)
    .map(depsit => (depsit * account.interestRate) / 100)
    .reduce((acc, int) => acc + int);

  labelSumIn.textContent = formatMoney(
    incoming,
    account.locale,
    account.currency
  );
  labelSumOut.textContent = formatMoney(
    Math.abs(out),
    account.locale,
    account.currency
  );
  labelSumInterest.textContent = formatMoney(
    interest.toFixed(2),
    account.locale,
    account.currency
  );
}

//----------------------Transfer-----------------------------
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciever = accounts.find(acc => acc.userName === inputTransferTo.value);

  if (
    amount > 0 &&
    reciever &&
    amount <= currentAccount.totalBalance &&
    reciever?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    reciever.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    reciever.movementsDates.push(new Date().toISOString());
    updateData(currentAccount);
    //reset timer
    clearInterval(watch);
    watch = logoutTimer();
  } else {
    alert('Transaction Failed !! (Check User or Amount)');
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

//----------------------Close Account-----------------------------
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const closeUser = inputCloseUsername.value;
  const closePin = Number(inputClosePin.value);
  if (
    currentAccount.userName === closeUser &&
    currentAccount.pin === closePin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  } else {
    alert('Wrong credentials !!');
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//----------------------Loan-----------------------------
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateData(currentAccount);
    //reset timer
    clearInterval(watch);
    watch = logoutTimer();
  } else {
    alert('Criteria Not met !!');
  }
  inputLoanAmount.value = '';
});

let sorted = false;
//----------------------Sort-----------------------------
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMov(currentAccount, !sorted);
  sorted = !sorted;
});

//----------------------Format Date-----------------------------
function formattingDate(date, locale) {
  const calDayPass = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const dayPass = calDayPass(new Date(), date);
  if (dayPass === 0) return 'Today';
  else if (dayPass === 1) return 'Yesterday';
  else if (dayPass <= 7) return `${dayPass} days ago`;
  else {
    // const day=`${date.getDate()}`.padStart(2,0);
    // const month=`${date.getMonth()+1}`.padStart(2,0);
    // const year=date.getFullYear();
    // // const hour=date.getHours();
    // // const min=date.getMinutes();
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat(locale, options).format(date);
  }
}

//----------------------Format money-----------------------------
function formatMoney(amount, locale, currency) {
  const options = {
    style: 'currency',
    currency: currency,
  };
  return new Intl.NumberFormat(locale, options).format(amount);
}

//----------------------Logout Timer-----------------------------
function logoutTimer() {
  const tick = function () {
    const min = String(Math.trunc(timer / 60)).padStart(2, 0);
    const sec = String(timer % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (timer === 0) {
      clearInterval(watch);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    timer--;
  };

  let timer = 300;
  tick();
  const watch = setInterval(tick, 1000);
  return watch;
}
