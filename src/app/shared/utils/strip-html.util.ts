export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>?/gm, '');
}
