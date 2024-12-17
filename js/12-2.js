/*
--ATTEMPT 1--
* Started from 12-1 code
* Difficult to visualize the correct approach. I was already storing the `viewed` table which I was using to record
which plots had already been checked - while looking at those values it occurred to me we could probably use some
sequence of that information to determine shared fence line
* As a plot's 4 borders are checked and non-matching adjacent plots iterate the `fences` counter, record the plot coords
and the direction the fence is facing
* After assembling all the fence information, we can check for sequential fences along the same border. Non-sequential
coordinates indicate a separate fence line
*/

/**
 * @typedef {Object} FenceTracker - Records locations on a grid in cardinal directions that do not match current location
 * @property {string[]} 0 - eg `"0-1", "2-8"` indicating grid locations where the location above does not match
 * @property {string[]} 1 - eg `"0-1", "2-8"` indicating grid locations where the location to right does not match
 * @property {string[]} 2 - eg `"0-1", "2-8"` indicating grid locations where the location below does not match
 * @property {string[]} 3 - eg `"0-1", "2-8"` indicating grid locations where the location to left does not match
 */

const fs = require('fs')
const rawData = fs.readFileSync('../data/data_aoc_12.txt', 'utf8')
const data = rawData.replaceAll('\r').split('\n')
const cardinals = [[-1, 0], [0, 1], [1, 0], [0, -1]]

// for (const each of data) console.log(each)

/**
 *
 * @param {number[]} plot
 * @param {string[]} data
 * @param {Object<string,Object<string,boolean>>} viewed
 * @param {FenceTracker} tracker - {@link FenceTracker}
 * @returns {{plots: number, tracker: FenceTracker}}
 */
function checkPaths (plot, data, viewed, tracker) {
  const char = data[plot[0]][plot[1]]
  const key = `${plot[0]}-${plot[1]}`
  let plots = 1
  viewed[char][key] = true

  for (let i = 0; i < cardinals.length; i++) {
    const cardinal = cardinals[i]
    const nextPlot = [plot[0] + cardinal[0], plot[1] + cardinal[1]]
    const nextChar = data[nextPlot[0]]?.[nextPlot[1]]

    if (viewed[char]?.[`${nextPlot[0]}-${nextPlot[1]}`]) continue
    if (char === nextChar) {
      const {plots: p, tracker: t} = checkPaths(nextPlot, data, viewed, tracker)
      plots += p

      for (const each in t) {
        tracker[each].concat(t[each])
      }
    } else {
      tracker[i].push(key)
    }

  }

  return {plots, tracker}
}

function doChallenge () {
  const viewed = {}
  let total = 0

  for (let i = 0; i < data.length; i++) {
    let area = 0

    for (let j = 0; j < data[i].length; j++) {
      let borders = 0
      const coord = `${i}-${j}`
      const plot = data[i][j]

      if (!viewed[plot]) viewed[plot] = {}
      if (viewed[plot][coord]) continue

      const {plots, tracker} = checkPaths([i, j], data, viewed, {0: [], 1: [], 2: [], 3: []})

      for (const key in tracker) {
        for (let v = 0; v < tracker[key].length; v++) {
          const e = tracker[key][v]
          const indices = e.split('-')
          let value

          if (Number(key) % 2 !== 0) {
            value = Number(indices.reverse().join(''))
          } else {
            value = Number(indices.join(''))
          }
          tracker[key][v] = value
        }
        tracker[key].sort((a, b) => a - b)
      }

      for (const key in tracker) {
        // Our starting point is also the start of a border
        borders++

        // Deviations indicate a separate border facing the same direction
        for (let v = 1; v < tracker[key].length; v++) {
          if (Math.abs(tracker[key][v] - tracker[key][v - 1]) > 1) borders++
        }
      }
      area += (plots * borders)
    }
    total += area
  }

  // 12-2 Answer: 909952
  console.log('Answer: ', total)
}

// Run 12-2
doChallenge()
