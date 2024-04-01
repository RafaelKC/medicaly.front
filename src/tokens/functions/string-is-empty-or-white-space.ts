export function stringIsNullOrEmptyOrWhitespace(str: string): boolean {
  return str == null || str.length === 0 || str.trim() === '';
}
