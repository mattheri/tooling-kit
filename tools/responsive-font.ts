export default class ResponsiveFont {
  private _divider: number;
  private _maxSize: string;
  private _minSize: string;
  private _maxWidth: string;
  private _minWidth: string;

  constructor(
    rootEm: string = "16px",
    minFontSize: string,
    maxFontSize: string,
    minWidth: string,
    maxWidth: string
  ) {
    this._divider = parseFloat(rootEm);
    this._maxSize = maxFontSize;
    this._minSize = minFontSize;
    this._maxWidth = maxWidth;
    this._minWidth = minWidth;
  }

  get maxSize(): number {
    if (this._maxSize.includes("rem")) {
      return this.convertToNumber(this._maxSize);
    }

    return this.convertToRem(parseFloat(this._maxSize));
  }

  get minSize(): number {
    if (this._minSize.includes("rem")) {
      return this.convertToNumber(this._minSize);
    }

    return this.convertToRem(parseFloat(this._minSize));
  }

  get maxWidth(): number {
    return this.convertToRem(parseFloat(this._maxWidth));
  }

  get minWidth(): number {
    return this.convertToRem(parseFloat(this._minWidth));
  }

  private convertToRem(px: number): number {
    return Number((px / this._divider).toFixed(3));
  }

  private convertToNumber(value: string): number {
    return Number(parseFloat(value).toFixed(3));
  }

  private get slope(): number {
    return Number(
      ((this.maxSize - this.minSize) / (this.maxWidth - this.minWidth)).toFixed(
        4
      )
    );
  }

  private get yIntercept(): number {
    return Number((-this.minWidth * this.slope + this.minSize).toFixed(3));
  }

  create() {
    return `calc(${this.minSize}rem, ${this.yIntercept}rem + ${
      this.slope * 100
    }vw, ${this.maxSize}rem)`;
  }
}
