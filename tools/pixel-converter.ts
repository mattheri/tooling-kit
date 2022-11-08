export default class PixelConverter {
  divider: number;

  constructor(rootEm: number = 16) {
    this.divider = rootEm;
  }

  pxToRem(px: number): number {
    return Number((px / this.divider).toFixed(3));
  }
}
