/*
--ATTEMPT 1--
* Initial idea for solving this is to run the loop once for each tile that is not already marked with a '#' or '^' and
see if the loop gets stuck when that tile is replaced with an obstacle ('#')
* To determine the loop is stuck, we will keep the 4 most recent sequences (ie, the indices used to move up then right
then down then left), convert them to a string, and then compare them to the next 4 sequences. If it is stuck in an
infinite loop, the combined and stringified sequences will match. Right?
* ^ This did not work because it assumed 4 sequences but the infinite loop does not have to be rectangular in shape
* To determine if the loop is stuck, we will keep the final two sequences, in order, before each obstacle. As soon as we
find those same two tiles in that same order, we'll know we're looping
 */

const {startData, sampleData, explore} = require('./6-1')

const data = startData

function doChallenge() {
  let usedData = structuredClone(data)
  let start
  let total = 0
  let allObstaclePossibilities = []

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      // If we find the starting location, initialize some things then move on
      if (data[i][j] === '^') {
        start = [i, j]

        // Test our custom condition handles the infinite loop
        if (data === sampleData) {
          usedData[i] = usedData[i].substring(0, j - 1) + '#' + usedData[i].substring(j)

          for (const each of usedData) {
            console.log(each)
          }
        }
        continue
      }

      // Existing obstacle, move on
      if (data[i][j] === '#') continue

      // Create an alternative grid that has an obstacle at `data[i][j]`
      const possibility = data.slice()
      possibility[i] = possibility[i].substring(0, j) + '#' + possibility[i].substring(j + 1)
      allObstaclePossibilities.push(possibility)
    }
  }

  function initGuardIsLooped () {
    const uniqueSequences = []

    function guardIsLooped (col, row, nextCol, nextRow, data) {
      // If next tile is an obstacle, record the current + next tile as a unique record
      if (data[nextCol]?.[nextRow] === '#') {
        const sequence = `${col}-${row};${nextCol}-${nextRow}`

        // If the unique sequence already exists, we're in a loop and can move on the the next sample
        if (uniqueSequences.includes(sequence)) {
          total++
          return true
        }
        uniqueSequences.push(sequence)
        return false
      }
      return false
    }

    return guardIsLooped
  }

  for (const each of allObstaclePossibilities) {
    explore(start, each, [initGuardIsLooped()])
  }

  // 6-2 Answer: 1530
  console.log('Answer: ', total)
  console.log('Iterations: ', allObstaclePossibilities.length)
}

// Run 6-2
doChallenge()
