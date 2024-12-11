/*
--ATTEMPT 1--`
* Copied `doChallenge` from 10-1, barely any modifications needed
* Counting each distinct path is actually what I did in my initial implementation of 10-1 before I realized each point
of termination should be considered unique for each trailhead so we'll slightly modify our `checkBranch` function to
add the count of distinct path as the value of the keys in `terminationLocation`
 */

const fs = require('fs')
const {checkBranch} = require('./10-1')
const dataRaw = fs.readFileSync('../data/data_aoc_10.txt', 'utf8')

const data = dataRaw.replaceAll('\r', '').split('\n')

function doChallenge () {
  let total = 0

  for (let i = 0; i < data.length; i++) {
    const sections = data[i]

    for (let j = 0; j < sections.length; j++) {
      const segment = sections[j]

      // Trailhead
      if (segment === '0') {
        const distinctBranches = checkBranch([i, j], data)

        for (const key in distinctBranches) {
          total += distinctBranches[key]
        }
      }
    }
  }

  // 10-2 Answer: 1722
  console.log('Answer: ', total)
}

// Run 10-2
doChallenge()
