export function stringIsNullOrEmptyOrWhitespace(str?: string | null | undefined): boolean {
  return str == null || str.length === 0 || str.trim() === '';
}
