/*
* No issues with this one!
* Brought in the data from 1-1 challenge and iterated over the left list then used each iteration to go over the entire
right list
* Initially I wanted to remove matches, but I realized there could be duplicates in the left list so any matches in the
right list may still be needed for a subsequent number from the left
* I suppose I could filter the right list after determining the number on the left list had no more duplicates
* Having everything already sorted made the logic for the right list easier as seen by the three `if...break` statements
 */
const challenge1_1 = require('./1-1.js')

function doChallenge () {
  const {leftList, rightList} = challenge1_1()
  let total = 0

  for (let i = 0; i < leftList.length; i++) {
    const left = leftList[i]
    let count = 0

    for (const each of rightList) {
      if (each > left) break
      if (each === left) {
        count++
        continue
      }
      if (count > 0) break
    }

    total += (left * count)
  }

  // 1-2 Answer:
  // console.log('Answer: ', total)
  return {total}
}

// Run 1-2
// doChallenge()

module.exports = doChallenge
