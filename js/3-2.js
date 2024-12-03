/*
* Attempting to effectively remove the parts of the string that exist after a `don't()` and before a `do()` so we can
run the function from the 3-1 question on the trimmed data
 */

const startData = require('./3-1')

/**
 * Trim data string to only include strings that appear after a `do()` and before a `don't()`
 * @param {string} data - string of random characters
 * @param {string} current - subset of `data` based on the trimming performed by this func
 * @returns {string}
 */
function addEnabled (data, current) {
  let end = data.indexOf("don't()")
  const next = data.indexOf('do()')

  if (end === -1) {
    return current + data.slice(0)
  } else {
    current += data.slice(0, end)
  }

  return next > -1 ? addEnabled(data.slice(next + 4), current) : current
}

function doChallenge () {
  let total = 0
  const enabled = addEnabled(startData, '')

  // Copied this block from the 3-1 challenge
  const potential = enabled.split('mul(')

  for (const each of potential) {
    const possible = each.slice(0, each.indexOf(')'))

    // ^ - from start of string
    // \d - any digit
    // \d{1,3} - at least and up to three sequential occurrences of any digit
    // , - then a comma
    // then 1-3 more digits
    // $ - the string terminates here aka no additional characters are present
    if (possible.match(/^\d{1,3},\d{1,3}$/)) {
      const [x, y] = possible.split(',')
      total += (x * y)
    }
  }

  // 3-2 Answer: 95128599
  console.log(total)
}

// Run 3-2
doChallenge()
