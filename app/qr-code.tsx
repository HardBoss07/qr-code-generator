// 0 = White
// 1 = Black
// 2 = Quiet Zone (White in final)
// 3 = Format strip
// 5, 6 = White and Black for Fixed bits
import { intToByte } from '@/app/binary-converter';

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
  [6, 5, 5, 5, 5, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
  [6, 6, 6, 6, 6, 6, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 5]
];

console.log(numberArray);
export default function qr_code() {
  return numberArray;
}

export function setLengthOfData(input: number) {
  const byte: number[] = intToByte(input);
  numberArray[numberArray.length - 3][numberArray.length - 1] = byte[0] + 5;
  numberArray[numberArray.length - 3][numberArray.length - 2] = byte[1] + 5;
  numberArray[numberArray.length - 4][numberArray.length - 1] = byte[2] + 5;
  numberArray[numberArray.length - 4][numberArray.length - 2] = byte[3] + 5;
  numberArray[numberArray.length - 5][numberArray.length - 1] = byte[4] + 5;
  numberArray[numberArray.length - 5][numberArray.length - 2] = byte[5] + 5;
  numberArray[numberArray.length - 6][numberArray.length - 1] = byte[6] + 5;
  numberArray[numberArray.length - 6][numberArray.length - 2] = byte[7] + 5;
}

export function colorBits(input: number[]) {
  console.log("input array: ", input);
  numberArray[numberArray.length - 1][numberArray.length - 1] = input[0];
  numberArray[numberArray.length - 1][numberArray.length - 2] = input[1];
  numberArray[numberArray.length - 2][numberArray.length - 1] = input[2];
  numberArray[numberArray.length - 2][numberArray.length - 2] = input[3];
  numberArray[numberArray.length - 3][numberArray.length - 1] = input[4];
  numberArray[numberArray.length - 3][numberArray.length - 2] = input[5];
  numberArray[numberArray.length - 4][numberArray.length - 1] = input[6];
  numberArray[numberArray.length - 4][numberArray.length - 2] = input[7];
}