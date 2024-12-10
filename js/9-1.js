/*
--ATTEMPT 1--
* I think we managed this one okay? Break out the data into values and empty spaces, fill the empty spaces from the end
of the array by popping them off, keep going till there's nothing left to pop.
--ATTEMPT 2--
* We did not manage this one okay :(
* I updated my logic to not do the `.pop` strategy and tested some edge cases with `0`
*/
const fs = require('fs')

const data = fs.readFileSync('../data/sample_aoc_9.txt', 'utf8')

function doChallenge () {
  let total = 0
  const filesystem = []

  for (let i = 0; i < data.length; i++) {
    let even = i % 2 === 0
    for (let j = 0; j < Number(data[i]); j++) {
      if (Number(data[i]) === 0) {
        console.log('its 0')
      }
      if (even) {
        filesystem.push(i / 2)
      } else {
        filesystem.push(null)
      }
    }
  }

  console.log(filesystem)

  filesystemloop: for (let i = 0; i < filesystem.length; i++) {
    if (filesystem[i] === null) {
      let x
      for (let j = filesystem.length - 1; j >= 0; j--) {
        // Will I ever need this condition?
        if (j === i) {
          break filesystemloop
        }

        if (filesystem[j] !== null && filesystem[j] >= 0) {
          x = filesystem[j]
          filesystem[i] = x
          filesystem[j] = null
          continue filesystemloop
        }
      }
    }
  }

  console.log(filesystem)

  for (let i = 0; i < filesystem.length; i++) {
    total += (i * filesystem[i])
  }

  // 6260050832569 was too high
  // 9-1 Answer: 6259790630969
  console.log(total)
}

// Run 9-1
doChallenge()
