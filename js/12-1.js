/*
--ATTEMPT 1--

*/

const fs = require('fs')
const rawData = fs.readFileSync('../data/data_aoc_12.txt', 'utf8')

const data = rawData.replaceAll('\r').split('\n')

// for (const each of data) console.log(each)

const cardinals = [[-1, 0], [0, 1], [1, 0], [0, -1]]

/**
 *
 * @param plot
 * @param data
 * @param viewed
 */
function checkPaths (plot, data, viewed) {
  const char = data[plot[0]][plot[1]]
  const key = `${plot[0]}-${plot[1]}`
  let fences = 0
  let plots = 1
  viewed[char][key] = true

  for (const cardinal of cardinals) {
    const nextPlot = [plot[0] + cardinal[0], plot[1] + cardinal[1]]
    const nextChar = data[nextPlot[0]]?.[nextPlot[1]]

    if (viewed[char]?.[`${nextPlot[0]}-${nextPlot[1]}`]) continue
    if (char === nextChar) {
      const {plots: p, fences: f} = checkPaths(nextPlot, data, viewed)
      plots += p
      fences += f
    } else {
      fences++
    }

  }

  return {plots, fences}
}

function doChallenge () {
  const viewed = {}
  let total = 0

  for (let i = 0; i < data.length; i++) {
    let area = 0
    for (let j = 0; j < data[i].length; j++) {
      const coord = `${i}-${j}`
      const plot = data[i][j]

      if (!viewed[plot]) viewed[plot] = {}
      if (viewed[plot][coord]) continue

      const {plots, fences} = checkPaths([i, j], data, viewed)

      area += (plots * fences)
    }
    total += area
  }

  // 12-1 Answer: 1473276
  console.log('Answer: ', total)
}

// Run 12-1
doChallenge()
