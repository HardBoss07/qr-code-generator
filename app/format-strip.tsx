export class FormatStrip {
  static readonly errorCorrectionMap = new Map([
    ["L", [0, 1]], // Low 7%
    ["M", [0, 0]], // Medium 15%
    ["Q", [1, 1]], // Quartile 25%
    ["H", [1, 0]]  // High 30%
  ]);

  static readonly qrCodeMaskMap = new Map([
    [0, [0, 0, 0]], // Mask Pattern 0
    [1, [0, 0, 1]], // Mask Pattern 1
    [2, [0, 1, 0]], // Mask Pattern 2
    [3, [0, 1, 1]], // Mask Pattern 3
    [4, [1, 0, 0]], // Mask Pattern 4
    [5, [1, 0, 1]], // Mask Pattern 5
    [6, [1, 1, 0]], // Mask Pattern 6
    [7, [1, 1, 1]]  // Mask Pattern 7
  ]);

  static fiveBitCode(errorCorrectionLevel: string, maskNumb: number): number[] {
    const errorCorrectionBits = FormatStrip.errorCorrectionMap.get(errorCorrectionLevel)!;
    const maskBits = FormatStrip.qrCodeMaskMap.get(maskNumb)!;

    return [...errorCorrectionBits, ...maskBits];
  }
}
