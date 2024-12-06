/*
--ATTEMPT 1--
* Refactored the 5-1 function to be able to import it here and then updated it to return the list of valid and invalid
updates
* Sort the invalid updates using the rules and then run them back through the existing function that expects valid
updates
 */

const {startData, sample, formatData, calculateValidUpdateMedians} = require('./5-1')

const data = startData

function doChallenge () {
  const formatted = formatData(data.rules)
  const [_, tracked] = calculateValidUpdateMedians(formatted, data.updates)
  const opts = []

  for (const invalid of tracked.invalid) {
    const nowValid = invalid.toSorted((a, b) => {
      if (formatted[a].aft.includes(b)) return 1
      if (formatted[a].bef.includes(b)) return -1
      return 0
    })
    opts.push(nowValid)
  }

  const [total] = calculateValidUpdateMedians(formatted, opts)

  // 5-2 Answer: 5900
  console.log(total)
}

// Run 5-2
doChallenge()
