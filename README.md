# AEMX - Flight Tracking Application

## Acerca de la Aplicación

AEMX es una aplicación móvil desarrollada en React Native que permite a los usuarios rastrear el estado de vuelos en tiempo real. La aplicación ofrece dos métodos de búsqueda: por número de vuelo específico o por ruta (origen-destino). Los usuarios pueden consultar información detallada como horarios de salida y llegada, estados de vuelo, puertas de embarque, terminales y posibles retrasos.

## Arquitectura

Este proyecto implementa **MVVM (Model-View-ViewModel)** como arquitectura principal:

- **Model**: Definido en `src/core/models/` - Contiene las interfaces y tipos de datos como `FlightStatus`, `FlightResponse`, etc.
- **View**: Componentes React Native en `src/presentation/components/` y `src/presentation/screens/`
- **ViewModel**: Hooks personalizados en `src/presentation/viewmodels/` que manejan la lógica de negocio y estado

La elección de MVVM se debe a:
- **Separación clara de responsabilidades**: La lógica de UI está separada de la lógica de negocio
- **Testabilidad**: Los ViewModels pueden ser probados independientemente de la UI
- **Reutilización**: Los ViewModels pueden ser compartidos entre diferentes componentes
- **Mantenibilidad**: Facilita el mantenimiento y escalabilidad del código

## Patrones de Diseño Implementados

### 1. **Singleton Pattern**
- **Implementado en**: `ApiService`, `FlightRepository`
- **Propósito**: Garantizar una única instancia de servicios compartidos
- **Razón**: Evita múltiples instancias de servicios críticos y centraliza la configuración

### 2. **Repository Pattern**
- **Implementado en**: `FlightRepository`
- **Propósito**: Abstrae el acceso a datos y centraliza las operaciones de búsqueda
- **Razón**: Facilita el testing con mocks y permite cambiar la fuente de datos sin afectar la lógica de negocio

### 3. **Context Pattern**
- **Implementado en**: `PanelContext`
- **Propósito**: Manejo del estado global para la selección de tabs
- **Razón**: Evita prop drilling y centraliza el estado compartido entre componentes

### 4. **Observer Pattern (Implementación mediante TanStack Query)**
- **Implementado en**: ViewModels con `useQuery`
- **Propósito**: Gestión reactiva del estado del servidor y cache automático
- **Razón**: Sincronización automática de datos, manejo de loading states y cache inteligente

## Configuración para Android

Para ejecutar la aplicación en Android, sigue estos pasos:

### Prerrequisitos
1. **Android Studio** instalado con SDK de Android
2. **Java Development Kit (JDK) 17** o superior
3. **Node.js** versión 16 o superior
4. **React Native CLI** instalado globalmente

### Variables de entorno
Asegúrate de tener configuradas las siguientes variables en tu `.bashrc`, `.zshrc` o equivalente:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Pasos de instalación

1. **Instalar dependencias**:
```bash
npm install
# o
yarn install
```

2. **Ejecutar Metro** (en una terminal):
```bash
npx react-native start
```

3. **Compilar y ejecutar en Android** (en otra terminal):
```bash
npx react-native run-android
```

### Notas importantes para Android
- El emulador debe estar ejecutándose o tener un dispositivo Android conectado con depuración USB habilitada
- Si es la primera vez que ejecutas el proyecto, la compilación puede tardar varios minutos
- En caso de errores de build, ejecuta: `cd android && ./gradlew clean && cd ..`

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
