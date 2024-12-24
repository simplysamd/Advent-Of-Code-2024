/*
--ATTEMPT 1--
* Please forgive my data manipulation. I was in a hurry
* Took a brute force approach and checked all possible combinations
 */

const fs = require('fs')
const rawData = fs.readFileSync('../data/data_aoc_13.txt', 'utf8')
// This is a terrible way to do this. All these unnecessary loops...
const data = rawData
  .replaceAll('\r', '')
  .split('\n\n')
  .map(scenario => {
    const x = scenario.split('\n')
    let value = {a: [], b: [], z: []}
    for (const each of x) {
      switch (each.slice(0, 8)) {
        case 'Button A': {
          value.a.push(Number(each.slice(each.indexOf('X') + 1, each.indexOf(', '))))
          value.a.push(Number(each.slice(each.indexOf('Y') + 1)))
          break
        }
        case 'Button B': {
          value.b.push(Number(each.slice(each.indexOf('X') + 1, each.indexOf(', '))))
          value.b.push(Number(each.slice(each.indexOf('Y') + 1)))
          break
        }
        case 'Prize: X': {
          value.z.push(Number(each.slice(each.indexOf('X=') + 2, each.indexOf(', '))))
          value.z.push(Number(each.slice(each.indexOf('Y=') + 2)))
          break
        }
      }
    }
    return value
  })

function doChallenge () {
  let total = 0

  for (const {a, b, z} of data) {
    let cost = null

    // Disqualify obvious impossibilities
    if ((a[0] * 100) + (b[0] * 100) < z[0] || (a[1] * 100) + (b[1] * 100) < z[1]) {
      continue
    }

    for (let i = 100; i >= 0; i--) {
      const bx = b[0] * i
      const by = b[1] * i

      for (let j = 0; j <= 100; j++) {
        const ax = a[0] * j
        const ay = a[1] * j

        if (ax + bx === z[0] && ay + by === z[1]) {
          const tokens = i + (j * 3)

          if (cost === null || tokens < cost) cost = tokens
        }
      }
    }

    if (cost) total += cost
  }

  // 13-1 Answer: 29598
  console.log('Answer: ', total)
}

// Run 13-1
doChallenge()
