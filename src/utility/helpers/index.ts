export function colorWithOpacity(
  color: string,
  alpha: string | number,
): string {
  if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
    throw new Error(
      `Invalid color value "${color}". Must be a six-digit hex code.`,
    );
  }

  let alphaHex: string;

  if (typeof alpha === 'number') {
    if (alpha < 0 || alpha > 1) {
      throw new Error('Alpha must be a number between 0 and 1.');
    }
    const alphaValue = Math.round(alpha * 255);
    alphaHex = alphaValue.toString(16).padStart(2, '0');
  } else if (typeof alpha === 'string') {
    if (!/^([0-9a-fA-F]{2})$/.test(alpha)) {
      throw new Error(
        `Invalid alpha value "${alpha}". Must be a two-digit hex.`,
      );
    }
    alphaHex = alpha;
  } else {
    throw new Error(
      'Alpha must be a number between 0 and 1 or a two-digit hex string.',
    );
  }

  return `${color}${alphaHex}`;
}
