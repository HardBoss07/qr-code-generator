// 0 = White
// 1 = Black
// 2 = Quiet Zone (White in final)
// 3 = Format strip
// 5, 6 = White and Black for Fixed bits
import { intToByte } from '@/app/binary-converter';
import { reedSolomonEncode } from '@/app/reed-solomon'

const bytePositions = new Map<number, number[][]>();
//         byte nr:       bit-1     bit-2     bit-3     bit-4     bit-5     bit-6     bit-7    bit-8
bytePositions.set( 0, [[18, 24], [18, 23], [17, 24], [17, 23], [16, 24], [16, 23], [15, 24], [15, 23]]);
bytePositions.set( 1, [[14, 24], [14, 23], [13, 24], [13, 23], [12, 24], [12, 23], [11, 24], [11, 23]]);
bytePositions.set( 2, [[10, 24], [10, 23], [ 9, 24], [ 9, 23], [ 9, 22], [ 9, 21], [10, 22], [10, 21]]);
bytePositions.set( 3, [[11, 22], [11, 21], [12, 22], [12, 21], [13, 22], [13, 21], [14, 22], [14, 21]]);
bytePositions.set( 4, [[15, 22], [15, 21], [16, 22], [16, 21], [17, 22], [17, 21], [18, 22], [18, 21]]);
bytePositions.set( 5, [[19, 22], [19, 21], [20, 22], [20, 21], [21, 22], [21, 21], [22, 22], [22, 21]]);
bytePositions.set( 6, [[23, 22], [23, 21], [24, 22], [24, 21], [24, 20], [24, 19], [23, 20], [23, 19]]);
bytePositions.set( 7, [[22, 20], [22, 19], [21, 20], [21, 19], [15, 20], [15, 19], [14, 20], [14, 19]]);
bytePositions.set( 8, [[13, 20], [13, 19], [12, 20], [12, 19], [11, 20], [11, 19], [10, 20], [10, 19]]);
bytePositions.set( 9, [[ 9, 20], [ 9, 19], [ 9, 18], [ 9, 17], [10, 18], [10, 17], [11, 18], [11, 17]]);
bytePositions.set(10, [[12, 18], [12, 17], [13, 18], [13, 17], [14, 18], [14, 17], [15, 18], [15, 17]]);
bytePositions.set(11, [[21, 18], [21, 17], [22, 18], [22, 17], [23, 18], [23, 17], [24, 18], [24, 17]]);
bytePositions.set(12, [[24, 16], [24, 15], [23, 16], [23, 15], [22, 16], [22, 15], [21, 16], [21, 15]]);
bytePositions.set(13, [[20, 15], [19, 15], [18, 15], [17, 15], [16, 15], [15, 16], [15, 15], [14, 16]]);
bytePositions.set(14, [[14, 15], [13, 16], [13, 15], [12, 16], [12, 15], [11, 16], [11, 15], [10, 16]]);
bytePositions.set(15, [[10, 15], [ 9, 16], [ 9, 15], [ 8, 16], [ 8, 15], [ 7, 16], [ 7, 15], [ 5, 16]]);
bytePositions.set(16, [[ 5, 15], [ 4, 16], [ 4, 15], [ 3, 16], [ 3, 15], [ 2, 16], [ 2, 15], [ 1, 16]]);
bytePositions.set(17, [[ 1, 15], [ 0, 16], [ 0, 15], [ 0, 14], [ 0, 13], [ 1, 14], [ 1, 13], [ 2, 14]]);
bytePositions.set(18, [[ 2, 13], [ 3, 14], [ 3, 13], [ 4, 14], [ 4, 13], [ 5, 14], [ 5, 13], [ 7, 14]]);
bytePositions.set(19, [[ 7, 13], [ 8, 14], [ 8, 13], [ 9, 14], [ 9, 13], [10, 14], [10, 13], [11, 14]]);
bytePositions.set(20, [[11, 13], [12, 14], [12, 13], [13, 14], [13, 13], [14, 14], [14, 13], [15, 14]]);
bytePositions.set(21, [[15, 13], [16, 14], [16, 13], [17, 14], [17, 13], [18, 14], [18, 13], [19, 14]]);
bytePositions.set(22, [[19, 13], [20, 14], [20, 13], [21, 14], [21, 13], [22, 14], [22, 13], [23, 14]]);

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
  [6, 6, 6, 6, 6, 6, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 6, 5, 6, 5, 6, 0, 0, 0, 0], //18
  [6, 5, 5, 5, 5, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 6, 0, 0, 0, 0], //19
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0], //20
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //21
  [6, 5, 6, 6, 6, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //22
  [6, 5, 5, 5, 5, 5, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5], //23
  [6, 6, 6, 6, 6, 6, 6, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 5]  //24
// 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24

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
  if (data.length >= 1) {
    for (let j = 0; j < data.length; j++) {
      // @ts-expect-error
      const cords: number[][] = bytePositions.get(j);
      if (cords) {
        for (let i = 0; i < 8; i++) {
          numberArray[cords[i][0]][cords[i][1]] = data[j][i];
        }
      }
    }
    setEndOfData(data.length);
  } else {
    clearData();
  }
}

function setEndOfData(lenghtOfData: number) {
  // @ts-expect-error
  const cords: number[][] = bytePositions.get(lenghtOfData);
  if (cords) {
    for (let i = 0; i < 4; i++) {
      numberArray[cords[i][0]][cords[i][1]] = 5;
    }
  }
}

export function clearData() {
  setLengthOfData(0);
  for (let i = 0; i < bytePositions.size; i++) {
    // @ts-expect-error
    const cords: number[][] = bytePositions.get(i);
    if (cords) {
      for (let j = 0; j < 8; j++) {
        numberArray[cords[j][0]][cords[j][1]] = 0;
      }
    }
  }
  console.log(numberArray);
}

export function setDataWithErrorCorrection(data: number[][], ECCamount: number) {
  const flatData = data.flat();
  const ECC = reedSolomonEncode(flatData, ECCamount);
  const encodedData = [...flatData, ...ECC];

  console.log("in gr", encodedData);

  if (encodedData.length >= 1) {
    for (let i = 0; i < encodedData.length; i++) {
      // @ts-expect-error
      const cords: number[][] = bytePositions.get(i);
      if (cords) {
        for (let j = 0; j < 8; j++) {
          numberArray[cords[j][0]][cords[j][1]] = encodedData[j * 8 + 1];
        }
      }
    }
    setEndOfData(encodedData.length);
  } else {
    clearData();
  }
}