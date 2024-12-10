/*
--Attempt 1--
* I think we managed this one okay? Break out the data into values and empty spaces, fill the empty spaces from the end
of the array by popping them off, keep going till there's nothing left to pop.
*/
const fs = require('fs')

const data = fs.readFileSync('../data/data_aoc_9.txt', 'utf8')

function doChallenge () {
  let total = 0
  const filesystem = []

  for (let i = 0; i < data.length; i++) {
    let even = i % 2 === 0
    for (let j = 0; j < Number(data[i]); j++) {
      if (even) {
        filesystem.push(i / 2)
      } else {
        filesystem.push(null)
      }
    }
  }

  for (let i = 0; i < filesystem.length; i++) {
    // Fill in the `null`s with data from the end of the array
    if (filesystem[i] === null) {
      let x
      // `x` needs to be a non-null value. This `while` loop does NOT seem safe,
      // I should probably consider an alternate approach so I don't pop the whole array
      while (x === null || x === undefined) x = filesystem.pop()

      // The value we get back from this process is the value we need to update the
      // "filesystem checksum" so we do not actually need to update the array - but
      // we will anyway just for fun
      filesystem[i] = x
      total += (i * x)
    } else {
      total += (i * filesystem[i])
    }
  }

  // 9-1 Answer: 6260050832569
  console.log(total)
}

// Run 9-1
doChallenge()
