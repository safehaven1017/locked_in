const gameboard = [
[ 1, 2, 3, 4, 5, 6, 7],
[ 8, 9,10,11,12,13,14],
[15,16,17,18,19,20,21],
[22,23,24,25,26,27,28],
[29,30,31,32,33,34,35],
[36,37,38,39,40,41,42]
]

const p1Moves = [5, 7, 23, 26, 41, 36, 4, 2, 11, 19, 33, 18, 37, 25];

function findMatch(moves, plus) {
    let win = false;
    moves.forEach(move => {
        const match1 = findPlusNumber(move, moves, plus);
        if (match1) {
            const match2 = findPlusNumber(match1, moves, plus);
            if (match2) {
                const match3 = findPlusNumber(match2, moves, plus);
                if (match3) {
                    win = true;
                }
            }
        }
    })
    return win;
}

function findPlusNumber(coordinate, array, plus) {
    return array.find(otherCoordinates => otherCoordinates === coordinate + plus);
}

// console.log(findMatch(p1Moves, -7));