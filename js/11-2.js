/*
--ATTEMPT 1--
* Easy to set up, but doing 75 iterations with my 11-1 implementation is throwing an error because the array size
exceeds Javascript's limit after ~45 iterations
* Because array length only grows due to a 0's behavior I believe we can
 */

const {blink} = require('./11-1')
const fs = require('fs')
const rawData = fs.readFileSync('../data/data_aoc_11.txt', 'utf8')
const sampleData = [125, 17]
const data = rawData.split(' ').map(each => Number(each))

function wink (blinkCount, total, data) {
  console.log(blinkCount, total, data)
  let blinking = []

  for (const each of data) {
    blinking.push(blink([each]))
  }

  if (blinkCount === 1) {
    let winkLength = 0
    for (const each of blinking) {
      console.log('each', each)
      winkLength += each.length
    }
    return winkLength
  }

  let x
  for (const each of blinking) {
    total += wink(blinkCount - 1, total, each)
  }

  // return wink(blinkCount - 1, total, blinking)

  return total


  return blinkCount === 1 ? total + blinking.length : wink(blinkCount - 1, total + blinking.length, blinking)

  for (let i = 0; i < blinkCount; i++) {
    // for (let j = 0; j < i; j++) {
    //
    // }
    blinking = blink(blinking)
    blinking = blink(blinking, true)
  }

  for (const each of data) {
    let blinking = [each]
    console.log('start', blinking)
    for (let i = 0; i < blinkCount; i++) {
      // for (let j = 0; j < i; j++) {
      //
      // }
      blinking = blink(blinking, true)
    }
    console.log('done', each, blinking.length)
    total += blinking.length
  }
  return total
}

function doChallenge () {
  // const total = wink(5, 0, sampleData)
  // console.log(total)
  let blinking = [0]
  // let left = data.slice(0, Math.floor(data.length / 2))
  // let right = data.slice(Math.floor(data.length / 2))
  for (let i = 0; i < 75; i++) {
    blinking = blink(blinking)
    console.log(i, blinking.length)
  }

  // 11-2 Answer: 194557
  console.log(blinking.length)
}

// Run 11-2
doChallenge()
