/*
--ATTEMPT 1--
 */

const fs = require('fs')
const rawData = fs.readFileSync('../data/data_aoc_11.txt', 'utf8')
const sampleData = [125, 17]
const data = rawData.split(' ').map(each => Number(each))

function blink (data) {
  const blinkData = []

  for (const each of data) {
    if (each === 0) {
      blinkData.push(1)
    } else if (each.toString().length % 2 === 0) {
      const stringVal = each.toString()
      const halfIndex = stringVal.length / 2

      blinkData.push(Number(stringVal.substring(0, halfIndex)))
      blinkData.push(Number(stringVal.substring(halfIndex)))
    } else {
      blinkData.push(each * 2024)
    }
  }

  return blinkData
}

function doChallenge () {
  const blinkCount = 25
  let blinking = data
  for (let i = 0; i < blinkCount; i++) {
    blinking = blink(blinking)
  }

  // 11-1 Answer: 194557
  console.log(blinking.length)
}

// Run 11-1
doChallenge()
