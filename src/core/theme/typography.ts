import { TextStyle } from 'react-native';

// Tipografía Garnett - Configuración de fuentes
export const typography = {
  fonts: {
    garnett: {
      regular: 'Garnett-Regular',
      semibold: 'Garnett-Semibold', 
      bold: 'Garnett-Bold',
    },
  },
  fontSizes: {
    header: 26,
    subtitle: 16,
    body: 14,
    caption: 12,
  },
  lineHeights: {
    header: 32,
    subtitle: 22,
    body: 20,
    caption: 16,
  },
};

// Estilos base para textos con Garnett
export const textStyles: Record<string, TextStyle> = {
  headerTitle: {
    fontFamily: typography.fonts.garnett.semibold,
    fontSize: typography.fontSizes.header,
    lineHeight: typography.lineHeights.header,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontFamily: typography.fonts.garnett.regular,
    fontSize: typography.fontSizes.subtitle,
    lineHeight: typography.lineHeights.subtitle,
    fontWeight: '400',
  },
};
