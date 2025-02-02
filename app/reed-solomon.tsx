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