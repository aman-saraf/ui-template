export class DictUtils {
  public static clean(dict: any) {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const property in dict) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-param-reassign
      dict[property] || delete dict[property]
    }

    return dict
  }
}
