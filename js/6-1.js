/*
--ATTEMPT 1--
* I wanted to set up a way to programmatically update my navigation index values to move from -1 -> 1 and back but was
unable to wrap my head around how I would do that mathematically so I opted for `moveOpts` which is ofc the array of
possible options and when we reach the end of the array we start back at the beginning
* Traversing the grid was conceptually similar to the 4-1 and 4-2 challenges so most of the difficulty I faced was of
my own design, namely the first bullet point. After I stopped worrying about that the actual traversal was relatively
straightforward
 */
const startData = [
  '#.............#.#...........................................................#..........#...........................#..........#...',
  '............#......................#.......#..#.........#...................##....................................................',
  '..............#...........#..#.......#.........#.#...........................#................................#......#............',
  '.....#......................................#......#..#...................#....................#......................#...........',
  '...#............................#................................#................................................................',
  '..........#..................#.....#......................................................#.......................................',
  '..#........#.......#.#...............................................................#......#.................................#...',
  '.#....#................#................#.....#...................#...............................................#..#............',
  '.......................................................................................#...#.#....#........##......#........#.#.##',
  '............................................#.................#.....................#..........................#..................',
  '....#..........##......................#.................................................................................#........',
  '......#.............##.........#.......#.........#.......#.............#...#.......#..............................................',
  '.#............................................................................#..........#....#...................................',
  '...#..#....#..............................#...........................................................................#...........',
  '.............#....................................................................................................................',
  '................................#..................##...................................#...............................#......#..',
  '..........#.........#.................#..........###...........................................#............#...#.................',
  '.............#....................................#.......#.#.#............#............................................#.........',
  '......#.#..............................................................................................#.........................#',
  '...#...#.........#.........#..#......#................##.................#........................................................',
  '.................................#......................#........#................#........................#......................',
  '.......................##..............#................#................#..............................#.........................',
  '.......#...#.....#.....##........................#..................##.....#......................................................',
  '.............................................#...........................#..........................................#.....#.......',
  '.........................#...............#....#..............#.......#...............#.#.................#.................#......',
  '...........................................................#....#..................................#..............................',
  '..........................#.................................................#............................##....#..................',
  '.................#...#.........................................................#........................#.....#..#................',
  '.........................#....#................................................#...#.....................#....#...........#.......',
  '................................................##.......#.#....................................#.......##........................',
  '..........##...#.......................#....#..#....................#........................#....................................',
  '#......#.......................#............#.....................................................................#...............',
  '.......#.......#...#..#..........#.......................................#.............#......#...................................',
  '...............#............#..................#.................................................................................#',
  '.......#...........#.......................##.....#.........#...........#...................#......#.........#.............##....#',
  '...................#.........................#......#..........................................#..........#.........#......#......',
  '.....#............#..............#...#......#....................#.............#..................................................',
  '................................................#........#.....#...................#.....................................#.....#..',
  '......................#.#...##......................##...............................................#.................#..........',
  '#...................#.........................#...........#.....#................#.....................#...................#......',
  '....#................#.....#.............#.....................................#....#...#.................................#.......',
  '.........#.....................................................................................................#.#.......#........',
  '.........#..........##..............................#............................#.#.............................#................',
  '#....#.#..............................................##...#...#...............#.............#....................................',
  '........#..#.#...................#.......................................................................#.............#..#.#...#.',
  '.................................................................................................................#.......#........',
  '............................................#..#...............##........#..........#.......................................#....#',
  '........#...........................#............................#.....#........................#..........#...#..........#.......',
  '.#...........#...................................................#...........................................#................#.#.',
  '............#...............................#........#...........#..........#...........#.#..............#........................',
  '...............................................................................##.#................#..............................',
  '.#.......................#.#...........#..................................#.......................................................',
  '..#..............................................##................#.......#....#..............#.....................#...#........',
  '...................#.....#................................................#..........#.........#.........#.....................#..',
  '........#................#................................................................................#......#................',
  '...................#...#....#.........................#.........................#....................#..........................#.',
  '.................#.......................................................#................................................#.......',
  '..#...........................##.#.............#..#............................................#.......................#.#........',
  '..#......#.........................................................................#.......................#......................',
  '...........................................................................................................#............#......#..',
  '............................................................^..........................................#..........#...............',
  '..#.........#....................#..........................................#........#.........................................#..',
  '........#...............#....#.............#......#.........................................................................#.....',
  '.........#......#.....#..............#...........................................................#..............#.................',
  '.........#...................................................#...###...........#.......#.##.......................................',
  '.....................##.................#.........##.....................#................#................#.........#............',
  '.......................................................................#..............#..............#.................#..........',
  '.##.........#..........................................................................#....................................#.....',
  '.........................#.............................#........................................................................#.',
  '........#.............................................#......#....#.....................................#....................#....',
  '........#...#..............................................................................#.........#............................',
  '..............................#................................#..........#..............#..................................#.....',
  '........##..#...................................#................................#.................#.........#......#..#........#.',
  '..................#......#...................................................................#....................................',
  '..........#.............#..............#........#............#...............#..#..........#..............#.#...#............#....',
  '............................##....#..............#......................................................................#.........',
  '...............................................#.....#...........#.....##...............#..#......................................',
  '.........................#.......#...............................#...........#.........#...........#....#.........................',
  '.#............#...#...............#..............................................................#..........................#....#',
  '#...........#......................................................#.............................#......#.........................',
  '..................................................#....#...............#.........................#................................',
  '................................................#..........................#.......#..............................#....##.......#.',
  '........#......#..#............#................#............................#......#.##.........#....................#..#........',
  '.......................................................#..#.#....................#..#......................................#......',
  '.....................#.......................................................................#............#.......................',
  '.....................##........................#...................#.....................#........................................',
  '..........................#...........................................................................................#...........',
  '..#..........#...................#..............##..#.....................#...................#..............#...........#........',
  '#................................#....##......#.............#..............#.......................#.........#...........#........',
  '..................#................#...............................#.....#..........#................#..............#.............',
  '................#.#.........#.....##...............................................................#..............#...............',
  '..#...............................................................................................#...............................',
  '..........#.................#...........#.......#.........................#...#.......#...........................................',
  '..##....#......................................#.#.......................................#.................#......................',
  '.......................#..#...#.##......................................................................#.........#...#...........',
  '...............#.........#..............#.....................................................#...................#...............',
  '......#.................#............#......#...................#..#.........................#........................#........#..',
  '......................................................................#...........................#........#......................',
  '..........#..........#........................#.............##....................................................................',
  '....#................................................#.......................#................#...............#...................',
  '.................#....................................................#......#....................................................',
  '.#........#.......................................................................................................................',
  '......##..................#....#......#.................#....................#.....................#..#...........#...............',
  '#...#...#...#..............#........#.......................#.#..........#...............................#......#.................',
  '#...#...................#.............#........#..........#...............................................................#...#...',
  '..#................................#...#.........................#...................#......#.....................................',
  '...#...###..........#............#...............................................................#..........#.....................',
  '............#..............#.......#.....#..........#.....#.........................................................#............#',
  '..#......................#..#...#................................#......#.......#.....#..................#.........#..............',
  '....##......#.......................................................#..............................................#..............',
  '...............................#.....#....#.................................................#.......#............#................',
  '..........#....#......................#........#..........................#......#................................................',
  '......#.............................#...........#..................#...........................#................................#.',
  '...........................##..........................................#.....#.#.....................#................#...........',
  '..#..............#.........................................................#........................#.........#.................#.',
  '#.....#.....#......................#....................#........................................#...........#...........#......#.',
  '.......................................#..#................................#.........#.......#..#.....#..........................#',
  '..........#..............##...............#..........................................................#......#......#......#....#..',
  '.............#..............#..#......#........#..#......##.......................#...........#.......#...........................',
  '......................#.......................................#.......#..#.....................................#.........#...##...',
  '...........................#...........................#......#....#.............................#.............................#..',
  '..................#............................#....#........##.........................#..............#.............#............',
  '.......#....................#.....#........#.......#.#...#...............#.....#.#.........................#.......#.#............',
  '.....#.........#.......#..........#.................#..#...#..................................................##..................',
  '................#........................................................#........................................................',
  '....##......#........#..................#.........................#...................................#...#...................#...',
  '..............#....................#.......#.......................#.............#......#..............#..........................',
  '...........................#..............#.....#............#.....................#........#....#.......................#........',
  '........#..##................#.....#.#..............#..............................#........................#.........#...........',
  '.........................................................#...........................##..........#........#.##....................',
]

const sampleData = [
  '....#.....',
  '.........#',
  '..........',
  '..#.......',
  '.......#..',
  '..........',
  '.#..^.....',
  '........#.',
  '#.........',
  '......#...',
]

const data = startData

function explore(start, data, extraConditions) {
  const tilesExplored = new Set([start[0] + '-' + start[1]])
  let onGrid = true
  let col = start[0]
  let row = start[1]
  const moveOpts = [-1, 0, 1, 0]
  let colMoveIndex = 0
  let rowMoveIndex = 1

  gridloop: while (onGrid) {
    // Check what the next tile is
    const nextCol = col + moveOpts[colMoveIndex]
    const nextRow = row + moveOpts[rowMoveIndex]
    const nextTile = data[nextCol]?.[nextRow]

    // Allow extra conditions to be passed that can cause the `while` loop to exit early
    if (extraConditions && extraConditions.length) {
      for (const condition of extraConditions) {
        if (condition(col, row, nextCol, nextRow, data)) {
          break gridloop
        }
      }
    }

    // If no next tile, we are off grid and end the loop
    if (nextTile === undefined) {
      onGrid = false
      break
    }

    // If next tile is blocked, we turn and continue
    if (nextTile === '#') {
      colMoveIndex = moveOpts[colMoveIndex + 1] === undefined ? 0 : colMoveIndex + 1
      rowMoveIndex = moveOpts[rowMoveIndex + 1] === undefined ? 0 : rowMoveIndex + 1
      continue
    }

    // Since the next tile is available, we move into it and record its index
    col = nextCol
    row = nextRow
    tilesExplored.add(`${col}-${row}`)
  }

  return tilesExplored
}

function doChallenge () {
  let start

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === '^') {
        start = [i, j]
      }
    }
  }

  const total = explore(start, data)

  // 6-1 Answer: 4663
  // console.log(total.size)
}

// Run 6-1
// doChallenge()

module.exports = {startData, sampleData, explore}
