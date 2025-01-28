// 0 = White
// 1 = Black
// 2 = Quiet Zone (White in final)
// 3 = Format strip
// 5, 6 = White and Black for Fixed bits
import { intToByte } from '@/app/binary-converter';

const bytePositions = new Map<number, number[][]>();
bytePositions.set(0, [[18, 24], [18, 23], [17, 24], [17, 23], [16, 24], [16, 23], [15, 24], [15, 23]]);

const numberArray: number[][] = [
// 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
  [6, 6, 6, 6, 6, 6, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 6, 6, 6, 6, 6, 6], //0
  [6, 5, 5, 5, 5, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 5, 5, 5, 5, 5, 6], //1
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 5, 6, 6, 6, 5, 6], //2
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 5, 6, 6, 6, 5, 6], //3
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 5, 6, 6, 6, 5, 6], //4
  [6, 5, 5, 5, 5, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 5, 5, 5, 5, 5, 6], //5
  [6, 6, 6, 6, 6, 6, 6, 2, 6, 5, 6, 5, 6, 5, 6, 5, 6, 2, 6, 6, 6, 6, 6, 6, 6], //6
  [2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2], //7
  [3, 3, 3, 3, 3, 3, 6, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3], //8
  [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
  [0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //10
  [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //11
  [0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //12
  [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //13
  [0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //14
  [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //15
  [0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0], //16
  [2, 2, 2, 2, 2, 2, 2, 2, 6, 0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 6, 0, 0, 0, 0], //17
  [6, 6, 6, 6, 6, 6, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 6, 5, 6, 5, 6, 0, 0, 0, 0], //18 <- byte 1 starts here
  [6, 5, 5, 5, 5, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 6, 0, 0, 0, 0], //19
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0], //20
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //21
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //22
  [6, 5, 5, 5, 5, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5], //23
  [6, 6, 6, 6, 6, 6, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 5]  //24
];

console.log(numberArray);
export default function qr_code() {
  return numberArray;
}

export function setLengthOfData(input: number) {
  const byte: number[] = intToByte(input);
  for (let i = 0; i < 8; i++) {
    const row = numberArray.length - (3 + Math.floor(i / 2));
    const col = numberArray.length - (1 + (i % 2));
    numberArray[row][col] = byte[i] + 5;
  }
}

export function setData(data: number[][]) {
  if (data.length != 0) {
    // @ts-expect-error
    const cords: number[][] = bytePositions.get(0);
    numberArray[cords[0][0]][cords[0][1]] = data[0][0];
    numberArray[cords[1][0]][cords[1][1]] = data[0][1];
    numberArray[cords[2][0]][cords[2][1]] = data[0][2];
    numberArray[cords[3][0]][cords[3][1]] = data[0][3];
    numberArray[cords[4][0]][cords[4][1]] = data[0][4];
    numberArray[cords[5][0]][cords[5][1]] = data[0][5];
    numberArray[cords[6][0]][cords[6][1]] = data[0][6];
    numberArray[cords[7][0]][cords[7][1]] = data[0][7];
  }
  /*for (let i = 0; i < data.length; i++) {
    const cords = bytePositions.get(i);
    if (cords) {
      colorByte(cords, data[i]);
    } else {
      console.error(`No byte positions found for index ${i}`);
    }
  }
  console.log(numberArray)*/
}

export function colorByte(cords: number[][], data: number[]) {
  console.log("cords: ", cords, "\n data: ", data);
  numberArray[cords[0][0]][cords[0][1]] = data[0];
  numberArray[cords[0][0]][cords[0][1]] = data[1];
  numberArray[cords[1][0]][cords[1][1]] = data[2];
  numberArray[cords[1][0]][cords[1][1]] = data[3];
  numberArray[cords[2][0]][cords[2][1]] = data[4];
  numberArray[cords[2][0]][cords[2][1]] = data[5];
  numberArray[cords[3][0]][cords[3][1]] = data[6];
  numberArray[cords[3][0]][cords[3][1]] = data[7];
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