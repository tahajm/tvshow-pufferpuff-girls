export function stripHtmlTags(html: string): string {
  return html.replaceAll(/<[^>]*>/g, "");
}

export function shortenText(
  text: string,
  maxLength: number,
  addEllipsis = true,
): string {
  if (text.length <= maxLength) return text;
  const shortened = text.slice(0, maxLength);
  return addEllipsis ? `${shortened}...` : shortened;
}

export function cleanAndShorten(html: string, maxLength: number): string {
  const plainText = stripHtmlTags(html);
  return shortenText(plainText, maxLength, false);
}
