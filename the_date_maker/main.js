import './style.css';
import './components/calendar/calendar.js';
import './components/sidebar/sidebar.js';
import './components/header/header.js';
import './components/insta_entry/insta_entry.js';

console.log('main starts the program');

// CALLBACK HELL
// In the callback syntax we call each function with a variable that contains a reference to the fucntion we want to call next. in this case 'blah' os a reference to makeBreakfast when called like:   wakeUp(() => {makeBreakfast()})  and so on down the line - hence callback hell

// function wakeup(blah){
//     setTimeout(() => {
//         console.log('wake up');
//         blah()
//     }, 3000);
// }

// function makeBreakfast(blah){
//     setTimeout(() => {
//         console.log('make breakfast');
//         blah()
//     }, 2500)
// }

// function goShopping(blah){
//     setTimeout(() => {
//         console.log('Go Shopping');
//         blah()
//     }, 1000);
// }

// function study(blah){
//     setTimeout(() => {
//         console.log('study');
//         blah()
//     }, 500);
// }

// CALLBACK HELL
// wakeup(() =>{
//     makeBreakfast(() => {
//         goShopping(() => {
//             study(() => {
//                 console.log('now you can game');
//             })
//         })
//     })
// })



// PROMISE .THEN CHAINING
// In Promises we can use the .then method of the promise instance. this is used to chain callback functions once the promise has been resolved or rejected.
// below we call this set of functions in two ways, one assuming we are recieving a value from the function and the other assuming we are not. in this case the value is console logged either by the function or as a value when calling the function, resolve returns a value, console log that value

// function wakeUp(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('Wake Up');
//             // resolve(console.log('Wake Up'));
//         }, 3000);
//     })
// }

// function makeBreakfast(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('Make Breakfast');
//             // resolve(console.log('Make Breakfast'));
//         }, 3000);
//     })
// }

// function goShopping(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('Go Shopping');
//             // resolve(console.log('Go Shopping'));
//         }, 3000);
//     })
// }

// function study(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('Study');
//             // resolve(console.log('Study'));
//         }, 3000);
//     })
// }

// PROMISE .THEN CHAINING
// PROMISE DOES NOT RETURN A VALUE
// wakeUp().then(makeBreakfast)
//     .then(goShopping)
//     .then(study)
//     .then(() => console.log('now you can game'))

// PROMISE RETURNS A VALUE
// wakeUp().then(value => {console.log(value); return makeBreakfast()})
//         .then(value => {console.log(value); return goShopping()})
//         .then(value => {console.log(value); return study()})
//         .then(value => {console.log(value); console.log('now you can game')})



// ASYNC AWAIT
// In async await so long as the function returns a promise we can await its completion before moving on to the next line of code, this effectively pauses the code. best written in try catches to predictably pick up errors.
// these functions are explicitly returning promises to demostrate an asynchronous call, setTimeout does not return a promise and so, despite the fact that a function declared with async's return value is automatically wrapped as a promise the async wouldnt be able to read the return that is inside the setTimeout, thus we must use promises to return a promise and simulate the async await properly
function wakeUp(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('Wake Up'));
        }, 3000);
    })
}

function makeBreakfast(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('Make Breakfast'));
        }, 3000);
    })
}

function goShopping(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('Go Shopping'));
        }, 3000);
    })
}

function study(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('Study'));
        }, 3000);
    })
}

// ASYNC AWAIT
async function dailyRoutine() {
    try {
        await wakeUp()
        await makeBreakfast()
        await goShopping()
        await study()
        console.log('now you can game')
    } catch {
        console.log('uh oh', error);
    }
}

dailyRoutine();


// In the Js stack if the stack is empty the event loop first checks the microtask queue then when that is empty it checks the task queue also known as the macrotask  queue

// await only blocks the async function