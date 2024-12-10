/*
--ATTEMPT 1--
* Opted to copy/paste 8-1 instead of importing things so I can change the `findAntinodes` function if needed
* Similar to 8-1 but I think I need to find greatest common denominator of the x,y difference between the two locations
to ensure I have all possible locations that are "exactly in line with at least two antennas of the same frequency,
regardless of the distance"
* In addition to finding GCD, will basically need to use the diff on each location the diff coords uncover until that
line goes off the grid
* Had some initial trouble with my `reduceByGCD` function because I wasn't handling 0 properly and wasn't using absolute
values when determining which integer was lower
 */

const fs = require('fs')

/**
 * Find the lowest common denominator in an array of two numbers
 * @param {number} a - numerator
 * @param {number} b - denominator
 * @returns {number[]}
 */
function reduceByGCD ([a, b]) {
  let smaller
  let gcd = 1
  const aAbs = Math.abs(a)
  const bAbs = Math.abs(b)

  if (a === 0) smaller = bAbs
  else if (b === 0) smaller = aAbs
  else smaller = aAbs < bAbs ? aAbs : bAbs

  // Start at the highest possible value and stop before 1 (which is always the lowest common denominator)
  // If at any point a common denominator is found, that will be the GCD and we can move on
  for (let i = smaller; i > 1; i--) {
    if (a % i === 0 && b % i === 0) {
      gcd = i
      break
    }
  }

  return [a / gcd, b / gcd]
}

function findAntinodes (locations, ranges) {
  let antinodes = []
  const focus = locations[0]
  const {v: [minv, maxv], h: [minh, maxh]} = ranges

  for (let i = 1; i < locations.length; i++) {
    const location = locations[i]
    // Offset between points can be used to determine the location of corresponding nodes
    const diff = reduceByGCD([focus[0] - location[0], focus[1] - location[1]])
    const invDiff = [diff[0] * -1, diff[1] * -1]
    let nextLoc = [focus[0] + diff[0], focus[1] + diff[1]]

    // Iterate through locations on the path until out of bounds of the grid
    while (nextLoc[0] >= minv && nextLoc[0] <= maxv && nextLoc[1] >= minh && nextLoc[1] <= maxh) {
      antinodes.push(nextLoc)
      nextLoc = [nextLoc[0] + diff[0], nextLoc[1] + diff[1]]
    }

    // Now the inverse
    nextLoc = [focus[0] + invDiff[0], focus[1] + invDiff[1]]

    // Iterate through locations on the path until out of bounds of the grid (opposite direction)
    while (nextLoc[0] >= minv && nextLoc[0] <= maxv && nextLoc[1] >= minh && nextLoc[1] <= maxh) {
      antinodes.push(nextLoc)
      nextLoc = [nextLoc[0] + invDiff[0], nextLoc[1] + invDiff[1]]
    }
  }

  // After finding all the relationships between the current location and others
  // we can safely remove the current location and move on to the next
  if (locations.length > 1) antinodes.push(...findAntinodes(locations.slice(1), ranges))

  return antinodes
}

function doChallenge () {
  const uniqueAntinodes = new Set()
  const dataFile = fs.readFileSync('../data/data_aoc_8.txt', 'utf8')
  // const dataFile = fs.readFileSync('../data/sample_aoc_8.txt', 'utf8')
  const data = dataFile.replaceAll('\r', '').split('\n')
  const ranges = {v: [0, data.length - 1], h: [0, data[0].length - 1]}
  const map = {}

  for (const each of data) {
    console.log(each)
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const value = data[i][j]
      // Instead of looking for individual characters we'll look for "not" character
      // since all "nots" are represented with a singular character
      if (value === '.') continue
      if (!map[value]) map[value] = []

      // Record and group all locations of each unique character
      map[value].push([i, j])
    }
  }

  for (const character in map) {
    // If there are at least 2 antennas of a given type, all antenna
    // locations will automatically be antinode locations
    if (map[character].length > 0) {
      for (const each of map[character]) {
        uniqueAntinodes.add(each.join('-'))
      }
    }

    const antinodes = findAntinodes(map[character], ranges)

    for (const each of antinodes) {
      uniqueAntinodes.add(each.join('-'))
    }
  }

  // 8-2 Answer: 1277
  console.log(uniqueAntinodes.size)
}

// Run 8-2
doChallenge()
