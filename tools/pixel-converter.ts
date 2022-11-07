export default class PixelConverter {
  divider: number;

  constructor(rootEm: number = 16) {
    this.divider = rootEm / 10;
  }

  pxToRem(px: number): number {
    return px / this.divider;
  }
}
