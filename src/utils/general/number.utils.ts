export class NumberUtils {
  public static roundByDecimals(value: number, decimals = 2) {
    const correction = 10 ** decimals
    return Math.round((value + Number.EPSILON) * correction) / correction
  }
}
