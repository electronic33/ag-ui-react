import { useLayoutEffect } from 'react';
import { theme as defaultTheme } from './default';
import { deepMerge } from './deep-merge';

export const ThemeProvider = ({ children, theme = {} }) => {
  useLayoutEffect(() => {
    const sheet = document.styleSheets[0];

    const mergedTheme = deepMerge(defaultTheme, theme);

    Object.entries(mergedTheme.colors).forEach(
      ([colorGroupKey, colorGroupValue]) => {
        if (typeof colorGroupValue === 'string') {
          sheet.insertRule(
            `:root{--ag-colors-${colorGroupKey}-:${colorGroupValue}}`,
          );
        } else {
          Object.entries(colorGroupValue).forEach(([colorKey, colorValue]) => {
            sheet.insertRule(
              `:root{--ag-colors-${colorGroupKey}-${colorKey}:${colorValue}}`,
            );
          });
        }
      },
    );

    Object.entries(mergedTheme.spacings).forEach(
      ([colorGroupKey, colorGroupValue]) => {
        Object.entries(colorGroupValue).forEach(([colorKey, colorValue]) => {
          sheet.insertRule(
            `:root{--ag-colors-${colorGroupKey}-${colorKey}:${colorValue}}`,
          );
        });
      },
    );
  }, [theme]);

  return children;
};
