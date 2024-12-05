/*
--ATTEMPT 1--
* Using the 4-1 logic as the starting point. Pretty similar but we need to check cardinal/diagonal pairs and we're using
coordinates (via pre-defined index increments) + their inverse to check for the proper characters instead of iterating
the length of the required text
* While I like the idea of my naming conventions in the "movesloop" I did make a few early mistakes because I typo'd the
very similar names
* I initially assumed that ANY combination of two "MAS" that crossed would be considered valid - eg, a diagonal and
cardinal "MAS" would be just as valid as two cardinal or two diagonal "MAS" but this does not seem correct based on the
sample data so I changed the `moves` to be a 3D array that contains an array of cardinal index arrays and an array of
diagonal index arrays. Previously it was a 2D array.
 */

const {sample, data} = require('./4-1')

function doChallenge () {
  let total = 0

  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    for (let j = 0; j < row.length; j++) {
      const char = row[j]

      // To simplify the logic, we will only check for matches when we can
      // use "A" as our starting point
      if (char !== 'A') continue

      // Matches will take place using one of the cardinal/diagonal directions and its inverse
      // For it to be a match it either both need to be cardinal or both need to be diagonal
      const moves = [
        [
          [-1, 0],
          [0, 1]
        ], [
          [-1, 1],
          [1, 1]
        ]
      ]

      movesloop: for (const move of moves) {
        let count = 0

        // Since the "MAS" needs to be paired by cardinal/diagonal, if one of the pairs fails
        // we can proceed to the next set of pairs
        for (const [iIt, jIt] of move) {
          // One char from the pattern should appear at the specified index and the other at its inverse
          const pattern = ['M', 'S']
          let index = i + iIt
          let jndex = j + jIt
          const aMatch = pattern.indexOf(data[index]?.[jndex])
          let bMatch

          if (aMatch === -1) {
            continue movesloop
          }

          // I think reassigning a value is faster than deleting it?
          pattern[aMatch] = null
          index = i + (iIt * -1)
          jndex = j + (jIt * -1)
          bMatch = pattern.indexOf(data[index]?.[jndex])

          if (bMatch === -1) {
            continue movesloop
          }

          // "M" is on one side of the "A" and "S" is on the other
          count++
        }

        // VALID: "MAS" was found in both cardinal or both diagonal directions
        if (count === 2) total++
      }
    }
  }

  // 4-2 Answer: 2016
  console.log(total)
}

// Run 4-2
doChallenge()
