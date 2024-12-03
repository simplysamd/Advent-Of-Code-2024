/*
* 2-2 is basically 2-1 with an extra consideration, so I have copied the code from 2-1
* Didn't realize at first that when encountering a problematic index, BOTH values that are problematic have to be
checked to see if omitting either fixes the rest. However this only applies to data that is invalid due to the asc/dsc
switch or duplication - as the numbers are required to be sequentially asc/dsc with a max diff of 3, any diff that
exceeds 3 will still exceed 3 if either number is removed from the sequence
* Since EITHER problematic value could be removed, moved the validity check into its own function and modified it to
support recursion
* I was missing some edge cases but was struggling to understand why. Found the `edgeCases` below online and used those
to help me debug. The issue was that I would only double-check the two values I was actively looking at when there was a
problem. There was an edge case though, eg '1 4 3 2 1' where the issue would present itself at '4 3' but I needed to
check the preceding '1' as well due to the asc-dsc change being impacted by that '1'.
 */

const data = require('./2-1')
// const edgeCases = [
//   '48 46 47 49 51 54 56',
//   '1 1 2 3 4 5',
//   '1 2 3 4 5 5',
//   '5 1 2 3 4 5',
//   '1 4 3 2 1',
//   '1 6 7 8 9',
//   '1 2 3 4 3',
//   '9 8 7 6 7',
//   '7 10 8 10 11',
//   '29 28 27 25 26 25 22 20',
// ]

/**
 * Check if a slice is valid. Recursive-capable to support attempts to check validity with a single value removed
 * @param {string[]} values - Strings should all be able to be converted into numbers
 * @param {boolean} [hasStrike] - Supports recursion by ending early if value is passed as `true`
 * @returns {boolean}
 */
function isSliceValid (values, hasStrike) {
  let isAsc

  // Success is making it to the end of the loop
  for (let i = 0; i < values.length; i++) {
    const curr = Number(values[i])
    const next = Number(values[i + 1])
    const diff = curr - next

    // VALID: nothing left to check and nothing invalidated our loop
    if (isNaN(next)){
      // console.log(values, isAsc)
      return true
    }

    // Determine if it's ascending
    if (isAsc === undefined) isAsc = curr < next

    // ERR: switches between asc/dsc OR diff is 0
    if ((curr > next && isAsc) || (curr < next && !isAsc) || diff === 0 || diff > 3 || diff < -3 ) {
      // return false

      // INVALID: already had one strike, cannot have more than one
      if (hasStrike) {
        return false
      }

      // test validity after removing `values[i]` and `values[i + 1]` and (if applicable) `values[i - 1]`
      const opt1 = [...values]
      const opt2 = [...values]
      const opt3 = [...values]
      opt1.splice(i, 1)
      opt2.splice(i + 1, 1)
      opt3.splice(i - 1, 1)

      // VALID: slice works after removing one of the trouble indices
      // INVALID: slice still doesn't work
      return isSliceValid(opt1, true) ||
        isSliceValid(opt2, true) ||
        (i > 0 ? isSliceValid(opt3, true) : false) ||
        false
    }
  }

  return false
}
function doChallenge () {
  let total = 0

  for (const each of data) {
    if (isSliceValid(each.split(' '))) total++
    else console.log(each)
    // else each.split(' ')
  }

  // 2-2 Answer: 311
  console.log('Answer: ', total)
}

// Run 2-2
doChallenge()
