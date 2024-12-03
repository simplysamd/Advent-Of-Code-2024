/*
--ATTEMPT 1--
* Attempting to effectively remove the parts of the string that exist after a `don't()` and before a `do()` so we can
run the function from the 3-1 question on the trimmed data
--ATTEMPT 2--
* Having trouble effectively visualizing the code in my `addEnabled` function so we're pivoting to a simpler system:
split the string on all instances of the `don't()` string and then look in each string for the first instance of the
`do()` flag and append any subsequent data
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
  let enabled = ''

  let dontsSplit = startData.split("don't()")

  for (const each of dontsSplit) {
    // By default the first section is always considered "enabled"
    if (!enabled) {
      enabled += each
      continue
    }

    const startEn = each.indexOf('do()')

    if (startEn > -1) enabled += each.slice(startEn)
  }

  // console.log('enabled', enabled.length) // 9802
                                            // 5845


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

  // 95128599 was too high
  // 3-2 Answer: 56275602
  console.log(total)
}

// Run 3-2
doChallenge()
