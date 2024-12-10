/*
--ATTEMPT 1--
* Opting to iterate through each character in the grid and record each location in a group with the other locations for
that character
* After everything is grouped we can move through each character and iterate over each location, first identifying the
nodes it creates with every other location of that type and then removing it from the array and repeating the process
the next location
* At the end we turn them into unique strings and throw them in a Set to make sure there's no dupes
--ATTEMPT 2--
* 497 was too high. Checked the output and saw some negative location indexes which shouldn't be possible
* I was not doing the bounds check correctly so some out of bounds locations were being pushed to the location array.
This appears to be an edge case as it was not picked up when I tested with the sample data
* My range check was even worse than I thought
 */

const fs = require('fs')

function findAntinodes (locations, ranges) {
  let antinodes = []
  const focus = locations[0]

  for (let i = 1; i < locations.length; i++) {
    const location = locations[i]
    // Offset between points can be used to determine the location of corresponding nodes
    const diff = [focus[0] - location[0], focus[1] - location[1]]
    const aloc = [focus[0] +  diff[0], focus[1] + diff[1]]
    const bloc = [location[0] + (diff[0] * -1), location[1] + (diff[1] * -1)]

    // Do not push any locations that are outside the bounds
    if (aloc[0] >= ranges.v[0] && aloc[0] <= ranges.v[1] && aloc[1] >= ranges.h[0] && aloc[1] <= ranges.h[1]) {
      antinodes.push(aloc)
    }
    if (bloc[0] >= ranges.v[0] && bloc[0] <= ranges.v[1] && bloc[1] >= ranges.h[0] && bloc[1] <= ranges.h[1]) {
      antinodes.push(bloc)
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
    const antinodes = findAntinodes(map[character], ranges)
    for (const each of antinodes) {
      uniqueAntinodes.add(each.join('-'))
    }
  }

  // 497 was too high
  // 8-1 Answer: 394
  console.log(uniqueAntinodes.size)
}

// Run 8-1
doChallenge()
