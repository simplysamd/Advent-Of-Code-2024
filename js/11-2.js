/*
--ATTEMPT 1--
* Easy to set up, but doing 75 iterations with my 11-1 implementation is throwing an error because the array size
exceeds Javascript's limit after ~45 iterations
* Changing this to store the numbers from each iteration in an object to avoid size limits
 */

const {blink} = require('./11-1')
const fs = require('fs')
const rawData = fs.readFileSync('../data/data_aoc_11.txt', 'utf8')
const sampleData = [125, 17]
const data = rawData.split(' ').map(each => Number(each))

function doChallenge () {
  let blinking = {}
  for (const each of data) {
    blinking[each] = (blinking[each] ?? 0) + 1
  }

  for (let i = 0; i < 75; i++) {
    const newBlinking = {}
    for (const key of Object.keys(blinking)) {
      const iterated = blink([Number(key)])
      for (const each of iterated) {
        newBlinking[each] = (newBlinking[each] ?? 0) + blinking[key]
      }
    }
    blinking = newBlinking
  }

  let total = 0

  for (const each of Object.values(blinking)) {
    total += each
  }

  // 11-2 Answer: 231532558973909
  console.log(total)
}

// Run 11-2
doChallenge()
