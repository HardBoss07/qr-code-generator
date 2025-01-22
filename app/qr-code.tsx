// 0 = White
// 1 = Black
// 2 = Quiet Zone (White in final)
// 3 = Format strip
// 5, 6 = White and Black for Fixed bits

const numberArray: number[][] = [
  [6, 6, 6, 6, 6, 6, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 6, 6, 6, 6, 6, 6],
  [6, 5, 5, 5, 5, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 5, 5, 5, 5, 5, 6],
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 5, 6, 6, 6, 5, 6],
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 5, 6, 6, 6, 5, 6],
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 5, 6, 6, 6, 5, 6],
  [6, 5, 5, 5, 5, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 5, 5, 5, 5, 5, 6],
  [6, 6, 6, 6, 6, 6, 6, 2, 6, 5, 6, 5, 6, 5, 6, 5, 6, 2, 6, 6, 6, 6, 6, 6, 6],
  [2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2],
  [3, 3, 3, 3, 3, 3, 6, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3],
  [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, 2, 2, 2, 6, 0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 6, 0, 0, 0, 0],
  [6, 6, 6, 6, 6, 6, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 6, 5, 6, 5, 6, 0, 0, 0, 0],
  [6, 5, 5, 5, 5, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 6, 0, 0, 0, 0],
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0],
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [6, 5, 5, 5, 5, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [6, 6, 6, 6, 6, 6, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

console.log(numberArray);
export default function qr_code() {
  return numberArray;
}