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
*/
const fs = require('fs')

const data = fs.readFileSync('../data/data_aoc_9.txt', 'utf8')

function doChallenge () {
  let total = 0
  const filesystem = []
  const locked = new Map()
  let spliceMod = 0

  for (let i = 0; i < data.length; i++) {
    if (data[i] === '0') continue
    let even = i % 2 === 0

    filesystem.push(new Array(Number(data[i])).fill(even ? i / 2 : null))
  }

  for (let i = filesystem.length - 1; i > 0; i--) {
    if (filesystem[i + spliceMod][0] === null) continue
    const fileBlock = filesystem[i + spliceMod].slice()

    for (let j = 0; j < i; j++) {
      if (filesystem[j][0] !== null) continue

      if (fileBlock.length === 1 && fileBlock[0] === 5) {
      }

      if (locked.has(filesystem[i + spliceMod])) {
        continue
      }

      const gapBlock = filesystem[j].slice()
      const len = fileBlock.length
      const gap = gapBlock.length
      const diff = gap - len

      if (diff < 0) continue

      const remainder = new Array(diff).fill(null)
      filesystem[j] = fileBlock
      filesystem[i + spliceMod] = new Array(len).fill(null)

      if (remainder.length) {
        spliceMod++
        filesystem.splice(j + 1, 0, remainder)
      }

      locked.set(fileBlock, true)

      break
    }
  }

  const flatfiles = filesystem.flat()

  for (let i = 0; i < flatfiles.length; i++) {
    total += (i * flatfiles[i])
  }

  // 7458698291531 was too high
  // 6352043857526 was too high
  // 9-2 Answer: 6292627347268
  console.log(total)
}

// Run 9-2
doChallenge()