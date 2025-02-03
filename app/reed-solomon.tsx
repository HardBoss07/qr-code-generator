class GaloisField {
  static readonly GF_SIZE = 256;
  static readonly PRIMITIVE_POLY = 0x11D; // x^8 + x^4+ x^3 + x^2 + 1

  static readonly logTable: number[] = new Array(GaloisField.GF_SIZE);
  static readonly expTable: number[] = new Array(GaloisField.GF_SIZE);

  static init() {
    let x = 1;
    for (let i = 0; i < GaloisField.GF_SIZE; i++) {
      GaloisField.expTable[i] = x;
      GaloisField.logTable[x] = i;

      x <<= 1;
      if (x & GaloisField.GF_SIZE) {
        x ^= GaloisField.PRIMITIVE_POLY;
      }
    }
  }

  static multiply(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;

    const logA = GaloisField.logTable[a];
    const logB = GaloisField.logTable[b];

    const sumOfLogs = logA + logB;
    const modOfLogs = sumOfLogs % (GaloisField.GF_SIZE - 1);

    return GaloisField.expTable[modOfLogs];
  }

  static divide(a: number, b: number): number {
    if (b === 0) throw new Error("Division by 0 in reed-solomon.tsx");
    if (a === 0) return 0;

    const logA = GaloisField.logTable[a];
    const logB = GaloisField.logTable[b];

    const diffOfLogs = logA - logB;
    const modOfLogs = (diffOfLogs + GaloisField.GF_SIZE - 1) % (diffOfLogs + GaloisField.GF_SIZE - 1);

    return GaloisField.expTable[modOfLogs];
  }
}

GaloisField.init();

// ECC = Error Correction Codewords
function generateGeneratorPolynomial(ECCamount: number): number[] {
  let final = [1];

  for (let i = 0; i < ECCamount; i++) {
    const term = [1, GaloisField.expTable[i]];
    final = polynomialMultiply(final, term);
  }
  return final;
}

function polynomialMultiply(a: number[], b: number[]): number[] {
  const result = new Array(a.length + b.length - 1).fill(0);

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      result[i + j] ^= GaloisField.multiply(a[i], b[j]);
    }
  }

  return result;
}

export function reedSolomonEncode(data: number[], ECCamount: number): number[] {
  const generator = generateGeneratorPolynomial(ECCamount);

  const paddedData = data.slice();
  for (let i = 0; i < data.length; i++) {
    const coefficient = paddedData[i];
    if (coefficient !== 0) {
      for (let j = 0; j < generator.length; j++) {
        paddedData[i + j] ^= GaloisField.multiply(generator[j], coefficient);
      }
    }
  }

  return paddedData.slice(data.length);
}