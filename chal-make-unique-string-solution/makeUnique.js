// Write your solution below:

// Solution 1:
function makeUnique(str) {
  let uniqueStr = ""

  for (let i = 0; i < str.length; i++) {
    if (uniqueStr.includes(str[i])) {
      continue
    } else {
      uniqueStr += str[i]
    }
  }
  return uniqueStr
}

// Solution 2:
function makeUnique(str) {
  let strSet = new Set(str.split(""))
  return [...strSet].join("")
}