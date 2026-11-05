'use client';

import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';

// Suppress React 19 false-positive script warning during dev/HMR when scripts are encountered
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const origError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Encountered a script tag while rendering React component')
    ) {
      return;
    }
    origError.apply(console, args);
  };
}

export function ThemeScript({ script }: { script: string }) {
  useServerInsertedHTML(() => (
    <script
      key="afterglow-theme-init"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  ));

  return null;
}
