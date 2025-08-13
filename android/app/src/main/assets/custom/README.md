# Configuración de Fuentes Garnett

## Archivos de fuente requeridos

Coloca los siguientes archivos de fuente en la carpeta `assets/fonts/`:

- `Garnett-Regular.ttf` (para texto normal)
- `Garnett-Semibold.ttf` (para títulos)
- `Garnett-Bold.ttf` (opcional, para texto en negritas)

## Configuración para iOS

Los archivos ya se configuraron automáticamente con `react-native.config.js`.

## Configuración para Android

Los archivos ya se configuraron automáticamente con `react-native.config.js`.

## Pasos para aplicar las fuentes:

1. Coloca los archivos `.ttf` en `assets/fonts/`
2. Ejecuta: `npx react-native-asset` (para React Native 0.60+)
3. Reconstruye la aplicación: `npx react-native run-android` o `npx react-native run-ios`

## Uso en componentes:

```typescript
import { textStyles } from '../../core/theme/typography';

// En tu componente
<Text style={textStyles.headerTitle}>Título</Text>
<Text style={textStyles.headerSubtitle}>Subtítulo</Text>
```
