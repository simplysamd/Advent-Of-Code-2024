/*
--ATTEMPT 1--
* Copied everything from 9-1 for the starting point
* Let's change our system to be an array of arrays. This will allow us to compare sizes of arrays to see if a block of
files can be moved to the left. We will also want to iterate from back to front (the reverse of 9-1) so we can attempt
to move each file block one time. Iterating over the gaps at the start of the array multiple times is fine.
* If a file does not fully replace the empty space, we will need to ensure that the remaining empty space is identified
and left to remain so it can potentially be filled by another file block. Also, we need to continue replacing the file
block that gets moved with the blank space - they are TRADING places, the empty space does not disappear. Empty spaces
will still increment the index for the final calculations
--ATTEMPT 2--
* First attempt was too high
* Changed the logic to do direct assignment instead of splicing because splicing was doing some weird things and I was
having a hard time identifying the issue. Direct assignment should be fine I think?
--ATTEMPT 3--
* Still too high
* Was not handling `0` properly when formatting the data in my initial loop
* I think I figured out the splice issue - the array was changing lengths and I wasn't accounting for that
--ATTEMPT 4--
* Converted to a `while` loop to better manage the index. Needed consistency of behavior when splicing in a new array of
empty spaces and impacting the array length
* Using a `Map` for recording if a group of files has already been checked so we can directly compare the array
reference
*/
const fs = require('fs')

const data = fs.readFileSync('../data/data_aoc_9.txt', 'utf8')

function doChallenge () {
  let total = 0
  const filesystem = []
  // Using a map will allow us to store the actual array ref itself for comparison
  const locked = new Map()

  for (let i = 0; i < data.length; i++) {
    if (data[i] === '0') continue
    let even = i % 2 === 0

    filesystem.push(new Array(Number(data[i])).fill(even ? i / 2 : null))
  }

  let i = filesystem.length - 1
  while (i >= 0) {
    if (filesystem[i][0] === null || locked.has(filesystem[i])) {
      i--
      continue
    }
    const fileBlock = filesystem[i].slice()
    // This HAS to be `fileBlock` and not `filesystem[i]` since we are cloning the array
    // when initializing the `fileBlock` variable
    locked.set(fileBlock, true)

    for (let j = 0; j < i; j++) {
      if (filesystem[j][0] !== null) continue

      const gapBlock = filesystem[j].slice()
      const len = fileBlock.length
      const gap = gapBlock.length
      const diff = gap - len

      // Not enough space, move on
      if (diff < 0) continue

      const remainder = new Array(diff).fill(null)
      filesystem[j] = fileBlock
      filesystem[i] = new Array(len).fill(null)

      if (remainder.length) {
        filesystem.splice(j + 1, 0, remainder)
        // This counteracts the i-- since we do not want the index to decrement
        // if a new array has been added closer to the start
        i++
      }

      break
    }
    i--
  }

  const flatfiles = filesystem.flat()

  for (let i = 0; i < flatfiles.length; i++) {
    total += (i * flatfiles[i])
  }

  // 7458698291531 was too high
  // 6352043857526 was too high
  // 6292627347268 was too high
  // 9-2 Answer: 6289564433984
  console.log(total)
}

// Run 9-2
doChallenge()
