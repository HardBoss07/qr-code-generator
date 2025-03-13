/**
 * qr-code.tsx
 * @author Matteo Bosshard
 * @version 13.03.2025
 */

const ascii_Map = new Map([
  ["a", [0, 1, 1, 0, 0, 0, 0, 1]],
  ["b", [0, 1, 1, 0, 0, 0, 1, 0]],
  ["c", [0, 1, 1, 0, 0, 0, 1, 1]],
  ["d", [0, 1, 1, 0, 0, 1, 0, 0]],
  ["e", [0, 1, 1, 0, 0, 1, 0, 1]],
  ["f", [0, 1, 1, 0, 0, 1, 1, 0]],
  ["g", [0, 1, 1, 0, 0, 1, 1, 1]],
  ["h", [0, 1, 1, 0, 1, 0, 0, 0]],
  ["i", [0, 1, 1, 0, 1, 0, 0, 1]],
  ["j", [0, 1, 1, 0, 1, 0, 1, 0]],
  ["k", [0, 1, 1, 0, 1, 0, 1, 1]],
  ["l", [0, 1, 1, 0, 1, 1, 0, 0]],
  ["m", [0, 1, 1, 0, 1, 1, 0, 1]],
  ["n", [0, 1, 1, 0, 1, 1, 1, 0]],
  ["o", [0, 1, 1, 0, 1, 1, 1, 1]],
  ["p", [0, 1, 1, 1, 0, 0, 0, 0]],
  ["q", [0, 1, 1, 1, 0, 0, 0, 1]],
  ["r", [0, 1, 1, 1, 0, 0, 1, 0]],
  ["s", [0, 1, 1, 1, 0, 0, 1, 1]],
  ["t", [0, 1, 1, 1, 0, 1, 0, 0]],
  ["u", [0, 1, 1, 1, 0, 1, 0, 1]],
  ["v", [0, 1, 1, 1, 0, 1, 1, 0]],
  ["w", [0, 1, 1, 1, 0, 1, 1, 1]],
  ["x", [0, 1, 1, 1, 1, 0, 0, 0]],
  ["y", [0, 1, 1, 1, 1, 0, 0, 1]],
  ["z", [0, 1, 1, 1, 1, 0, 1, 0]],

  ["A", [0, 1, 0, 0, 0, 0, 0, 1]],
  ["B", [0, 1, 0, 0, 0, 0, 1, 0]],
  ["C", [0, 1, 0, 0, 0, 0, 1, 1]],
  ["D", [0, 1, 0, 0, 0, 1, 0, 0]],
  ["E", [0, 1, 0, 0, 0, 1, 0, 1]],
  ["F", [0, 1, 0, 0, 0, 1, 1, 0]],
  ["G", [0, 1, 0, 0, 0, 1, 1, 1]],
  ["H", [0, 1, 0, 0, 1, 0, 0, 0]],
  ["I", [0, 1, 0, 0, 1, 0, 0, 1]],
  ["J", [0, 1, 0, 0, 1, 0, 1, 0]],
  ["K", [0, 1, 0, 0, 1, 0, 1, 1]],
  ["L", [0, 1, 0, 0, 1, 1, 0, 0]],
  ["M", [0, 1, 0, 0, 1, 1, 0, 1]],
  ["N", [0, 1, 0, 0, 1, 1, 1, 0]],
  ["O", [0, 1, 0, 0, 1, 1, 1, 1]],
  ["P", [0, 1, 0, 1, 0, 0, 0, 0]],
  ["Q", [0, 1, 0, 1, 0, 0, 0, 1]],
  ["R", [0, 1, 0, 1, 0, 0, 1, 0]],
  ["S", [0, 1, 0, 1, 0, 0, 1, 1]],
  ["T", [0, 1, 0, 1, 0, 1, 0, 0]],
  ["U", [0, 1, 0, 1, 0, 1, 0, 1]],
  ["V", [0, 1, 0, 1, 0, 1, 1, 0]],
  ["W", [0, 1, 0, 1, 0, 1, 1, 1]],
  ["X", [0, 1, 0, 1, 1, 0, 0, 0]],
  ["Y", [0, 1, 0, 1, 1, 0, 0, 1]],
  ["Z", [0, 1, 0, 1, 1, 0, 1, 0]],

  [".", [0, 0, 1, 0, 1, 1, 1, 0]],
  [",", [0, 0, 1, 0, 1, 1, 0, 0]],
  [":", [0, 0, 1, 1, 1, 0, 1, 0]],
  [";", [0, 0, 1, 1, 1, 0, 1, 1]],
  ["-", [0, 0, 1, 0, 1, 0, 1, 1]],
  ["_", [0, 1, 1, 1, 1, 0, 1, 1]],
  ["/", [0, 0, 1, 0, 1, 0, 0, 1]],
  ["%", [0, 0, 1, 0, 0, 1, 0, 1]],
  ["@", [0, 1, 0, 0, 0, 0, 0, 0]],
  ["#", [0, 0, 1, 0, 0, 1, 1, 1]],
  ["+", [0, 0, 1, 0, 1, 0, 1, 0]],
  ["*", [0, 0, 1, 0, 1, 0, 0, 0]],
  ["=", [0, 0, 1, 1, 0, 1, 1, 0]],
  ["!", [0, 0, 1, 0, 0, 0, 1, 0]],
  ["?", [0, 0, 1, 1, 1, 1, 1, 1]],
  ["(", [0, 0, 1, 0, 0, 1, 0, 0]],
  [")", [0, 0, 1, 0, 0, 1, 0, 1]],
  ["[", [0, 1, 0, 1, 1, 0, 1, 1]],
  ["]", [0, 1, 0, 1, 1, 1, 0, 0]],
  ["{", [0, 1, 1, 1, 0, 0, 0, 1]],
  ["}", [0, 1, 1, 1, 0, 0, 1, 0]],

  ["1", [0, 0, 1, 1, 0, 0, 0, 1]],
  ["2", [0, 0, 1, 1, 0, 0, 1, 0]],
  ["3", [0, 0, 1, 1, 0, 0, 1, 1]],
  ["4", [0, 0, 1, 1, 0, 1, 0, 0]],
  ["5", [0, 0, 1, 1, 0, 1, 0, 1]],
  ["6", [0, 0, 1, 1, 0, 1, 1, 0]],
  ["7", [0, 0, 1, 1, 0, 1, 1, 1]],
  ["8", [0, 0, 1, 1, 1, 0, 0, 0]],
  ["9", [0, 0, 1, 1, 1, 0, 0, 1]],
  ["0", [0, 0, 1, 1, 0, 0, 0, 0]]
]);

export function convert(input: string) {
  const result: number[][] = [];
  for (let i = 0; i < input.length; i++) {
    const asciiValue = ascii_Map.get(input[i]);
    if (asciiValue) {
      result.push(asciiValue);
    }
  }
  return result;
}

export function intToByte(input: number): number[] {
  const result: number[] = [];
  let divisionResult: number = input;

  while (divisionResult > 0) {
    result.unshift(divisionResult % 2);
    divisionResult = Math.floor(divisionResult / 2);
  }

  while (result.length < 8) {
    result.unshift(0);
  }

  return result;
}