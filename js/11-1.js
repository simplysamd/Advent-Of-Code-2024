/*
--ATTEMPT 1--
 */

const fs = require('fs')
const rawData = fs.readFileSync('../data/data_aoc_11.txt', 'utf8')
const sampleData = [125, 17]
const data = rawData.split(' ').map(each => Number(each))
let count = 0
let buffer = null

function winks (data) {
  const blinkData = []

  for (const each of data) {
    if (each === 0) {
      count++
      clearTimeout(buffer)
      buffer = setTimeout(() => console.log(count), 1000)
      blinkData.push(1)
    } else if (each.toString().length % 2 === 0) {
      const stringVal = each.toString()
      const halfIndex = stringVal.length / 2

      try {
        blinkData.push(Number(stringVal.slice(0, halfIndex)))
        blinkData.push(Number(stringVal.slice(halfIndex)))

      } catch (e) {
        console.log(blinkData.length, 'asdf')
        throw new Error(e)
      }
    } else {
      blinkData.push(each * 2024)
    }
  }

  return blinkData
}

function blink (data, wink) {
  // const left = data.slice(0, Math.floor(data.length / 2))
  // const right = data.slice(Math.floor(data.length / 2))

  // console.log(left, right)


  return winks(data)
}

function doChallenge (blinkCount) {
  let blinking = data
  for (let i = 0; i < blinkCount; i++) {
    blinking = blink(blinking)
  }

  // 11-1 Answer: 194557
  console.log(blinking.length)

  return blinking
}

// Run 11-1
// doChallenge(25)

module.exports = {blink}
