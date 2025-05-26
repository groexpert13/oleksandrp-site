'use client';

import { marked } from 'marked';
import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: string;
}

export default function ReactMarkdown({ children, ...props }: Props) {
  const html = marked.parse(children);
  return <div {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}
