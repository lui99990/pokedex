# Pokedex - React Native

Repositorio: https://github.com/lui99990/pokedex

Aplicacion movil desarrollada en React Native CLI (TypeScript) que consume la PokeAPI. Este proyecto fue construido bajo una regla estricta de "Cero Librerias Externas" (sin React Navigation, Axios, AsyncStorage, etc.), demostrando un dominio profundo de los fundamentos del framework, patrones de diseno de software y desarrollo nativo.

## Caracteristicas Principales

- Arquitectura Limpia (Clean Architecture): Separacion estricta en capas (Domain, Data, Presentation, Core) aplicando principios SOLID.
- Enrutador Personalizado: Sistema de navegacion construido desde cero con Context API y soporte nativo para el boton de retroceso en Android (BackHandler).
- Animaciones Nativas: Transiciones de entrada y salida a 60fps usando exclusivamente la API Animated nativa con useNativeDriver.
- Cache en Memoria (Singleton): Sistema de persistencia temporal local para evitar peticiones redundantes a la API al navegar entre pantallas.
- Paginacion Infinita: Carga progresiva optimizada con validacion de inercia (onMomentumScrollBegin) para evitar carga duplicada de datos.
- Temas Dinamicos: La interfaz adapta sus colores base dependiendo del tipo principal del Pokemon seleccionado.
- Pruebas Unitarias: Cobertura de logica de negocio (Casos de Uso, Mappers, Cache) y UI (Componentes y Pantallas aisladas) utilizando jest y react-test-renderer.

## Requisitos Previos

Antes de ejecutar el proyecto, asegurate de tener configurado el entorno de desarrollo para React Native CLI:

- Node.js (v18 o superior)
- Ruby (para dependencias de iOS/CocoaPods)
- Xcode (para compilar y emular en macOS)
- Android Studio (para compilar y emular en Android)

## Instalacion

1. Clonar el repositorio:

```bash
git clone [https://github.com/lui99990/pokedex.git](https://github.com/lui99990/pokedex.git)
cd pokedex

Instalar las dependencias del proyecto:

Bash
npm install
Ejecucion en iOS (Requiere macOS)
Para compilar y correr la aplicacion en el simulador de iOS, primero es necesario instalar las dependencias nativas de CocoaPods:

Bash
cd ios
pod install
cd ..

npm run ios
(Alternativa si falla el comando npm: npx react-native run-ios)

Ejecucion en Android
Asegurate de tener un emulador de Android abierto o un dispositivo fisico conectado con la depuracion USB activa:

Bash
npm run android
(Alternativa si falla el comando npm: npx react-native run-android)

Pruebas Unitarias (Testing)
El proyecto incluye una suite de pruebas para asegurar la integridad de la capa de datos y la correcta renderizacion de la UI simulando los hooks y dependencias. No es necesario tener un emulador abierto para ejecutarlas.

Para correr las pruebas unitarias:

Bash
npm test
Para ejecutar las pruebas y generar el reporte de cobertura de codigo:

Bash
npm test -- --coverage
Estructura del Proyecto (Clean Architecture)
El proyecto esta estructurado para garantizar el desacoplamiento:

src/core/: Inyector de dependencias (DIContainer), constantes globales y configuracion base.

src/domain/: Reglas de negocio puras (Entidades, Repositorios abstractos y Casos de Uso).

src/data/: Implementacion tecnica (Fetch API, Mappers, Singleton de InMemoryCache).

src/presentation/: Capa visual y logica de interfaz (Componentes, Pantallas, Custom Hooks de estado/animacion y Contexto de Navegacion).

```
