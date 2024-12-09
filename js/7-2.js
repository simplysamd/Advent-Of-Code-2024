/*
--ATTEMPT 1--
* Copied the 7-1 code and added support for '||' in two places, super simple. I did notice the performance has taken a
big hit though probably due to the number of permutations being calculated - ~7.5s permutations, ~2.7s checking them
* When adding up the time spent in calculating permutations vs the time spent parsing those permutations, I noticed that
many of the permutations are the same length. Of course this makes sense because the permutations are always being
calculated for the same characters, it's only the number of possible permutations that changes based on the number of
possible operations
* We can cut down on the number of permutations we need to check by caching permutations based on the length of the data
(which corresponds to the number of permutations)
* Success! Time to calculate permutations went from ~7.5s -> 106ms
* Another thought, and this one's pretty obvious - because our value is only getting larger, we can terminate an active
permutation check as soon as the current count exceeds the target
* Mild success? Time spent applying operators went from ~2.7s -> 2s
 */

const {permute2d, sampleData, startData} = require('./7-1.js')

const data = startData

// Copied this from 7-1. Only added the '||' logic to `operatorPossibilities`
// and the switch statement that handles the various operator options
function doChallenge () {
  const permutationCache = {}
  let total = 0

  for (const each of data) {
    const [resultStr, right] = each.split(': ')
    const values = right.split(' ')
    const operatorPossibilities = []
    let operatorPermutations
    const result = Number(resultStr)


    // `right.length - 1` because there will always be one less operator than number
    for (let i = 0; i < values.length - 1; i++) operatorPossibilities.push(['+', '*', '||'])

    // Because the permutations are the same for equal length arrays,
    // this caching saves lots of time. ~7.5s -> ~100ms on my machine
    if (permutationCache[values.length - 1]) {
      operatorPermutations = permutationCache[values.length - 1]
    } else {
      operatorPermutations = permute2d(operatorPossibilities)
      permutationCache[values.length - 1] = operatorPermutations
    }

    // Check each permutation
    operateloop: for (const each of operatorPermutations) {
      let count = Number(values[0])

      // Perform operations according to each operation character
      for (let i = 0; i < values.length - 1; i++) {
        const val = Number(values[i + 1])
        switch (each[i]) {
          case '+': count = count + val; break
          case '*': count = count * val; break
          case '||': count = Number(count.toString() + val.toString()); break
        }

        // If current value exceeds target, move on
        if (count > result) continue operateloop
      }

      // End early if one of the permutations works
      if (count === result) {
        total += result
        break
      }
    }
  }

  // 7-2 Answer: 145149066755184
  console.log('Answer: ', total)
}

// Run 7-2
doChallenge()
