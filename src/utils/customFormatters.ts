export function italic<Content extends string>(
  content: Content,
): `*${Content}*` {
  return `*${content}*`;
}

export function bracketed<Content extends string>(
  content: Content,
): `\\[${Content}\\]` {
  return `\\[${content}\\]`;
}
