// Write your solution below:

function sorter (tshirt) {
let sCount = 0;
let mCount = 0;
let lCount = 0;

//loops through string and turns matching letters into a number
for (let i = 0; i < tshirt.length; i++) {
    if (tshirt[i] === 's') {
        sCount++
    } else if (tshirt[i] === 'm') {
        mCount++
    } else if (tshirt[i] === 'l') {
        lCount++
    }
 }
console.log(sCount, mCount, lCount)
// this changes the number into the letter it counted
return 's'.repeat(sCount) + 'm'.repeat(mCount) + 'l'.repeat(lCount)
}

//my attempt
// let s = tshirt.filter((l) => l === 's' )
// sorted.push(s)
// let m = tshirt.filter((l) => l === 'm' )
// sorted.push(m)
// let l = tshirt.filter((l) => l === 'l' )
// sorted.push(l)

console.log(sorter ('smllms'))

//shortest version
const tshirtSorterSm = str => str.split("").sort().reverse().join("");

const tshirtSorter = str => {
    let one = str.split("")
    console.log(one) // splits into an array
    let two = one.sort()
    console.log(two) // sorts alphabetically l, m, s
    let three = two.reverse()
    console.log(three) // array is not s, m, l
    let four = three.join("");
    console.log(four) // array is now one string as requested
    return four
}
console.log(tshirtSorter('slsmmsllsmsmlmsls'))
