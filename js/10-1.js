/*
--ATTEMPT 1--
* Use a recursive function to check each branching path. Each termination point (a `9`) is unique so we need to filter
our result to only include each `9` once
* After determining all unique points of termination connected to a trailhead by a valid ascending sequence of numbers,
we can take the length of the object to determine the count
 */

const fs = require('fs')
const dataRaw = fs.readFileSync('../data/data_aoc_10.txt', 'utf8')

const data = dataRaw.replaceAll('\r', '').split('\n')

function checkBranch ([i, j], data) {
  const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]
  const here = Number(data[i][j])
  let terminationLocations = {}

  for (const each of directions) {
    const next = Number(data[i + each[0]]?.[j + each[1]])

    // If invalid, check the next possible direction
    if (isNaN(next) || next - here !== 1) continue

    // If not invalid and is a 9, it's a complete trail
    if (next === 9) {
      terminationLocations[(i + each[0]) + '-' + (j + each[1])] = true
      continue
    }

    terminationLocations = {...terminationLocations, ...checkBranch([i + each[0], j + each[1]], data)}
  }

  return terminationLocations
}

function doChallenge () {
  let total = 0

  for (let i = 0; i < data.length; i++) {
    const sections = data[i]

    for (let j = 0; j < sections.length; j++) {
      const segment = sections[j]

      // Trailhead
      if (segment === '0') {
        total += Object.keys(checkBranch([i, j], data)).length
      }
    }
  }

  // 10-1 Answer: 786
  console.log('Answer: ', total)
}

// Run 10-1
doChallenge()
