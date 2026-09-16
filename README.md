#Pokédex — React Native

Aplicación móvil desarrollada con **React Native CLI + TypeScript** que consume la [PokeAPI](https://pokeapi.co/).

El proyecto fue construido bajo una regla estricta de **"Cero Librerías Externas"**, evitando soluciones como React Navigation, Axios, AsyncStorage, React Native Reanimated, entre otras.

El objetivo principal es demostrar dominio de los fundamentos de React Native, arquitectura de software, patrones de diseño, manejo de estado, navegación, animaciones nativas, testing y consumo de APIs utilizando únicamente las herramientas disponibles en React Native y JavaScript/TypeScript.

---

##Características principales

**Clean Architecture**

  * Separación entre `Domain`, `Data`, `Presentation` y `Core`.
  * Aplicación de principios SOLID.
  * Bajo acoplamiento entre las diferentes capas.

**Enrutador personalizado**

  * Navegación implementada desde cero utilizando `Context API`.
  * Stack de navegación administrado en memoria.
  * Soporte para el botón físico de retroceso de Android mediante `BackHandler`.

**Animaciones nativas**

  * Implementadas exclusivamente con `Animated`.
  * Uso de `useNativeDriver` para ejecutar las animaciones de forma nativa.
  * Hooks independientes para encapsular la lógica de animaciones.

**Cache en memoria**

  * Implementación mediante patrón Singleton.
  * Evita peticiones HTTP innecesarias durante la navegación.
  * Mantiene los datos mientras la aplicación permanece en ejecución.

**Paginación infinita**

  * Carga progresiva de Pokémon.
  * Prevención de peticiones duplicadas.
  * Uso de `onMomentumScrollBegin` para controlar el estado de carga.

**Temas dinámicos**

  * Los colores de la interfaz se adaptan al tipo principal del Pokémon seleccionado.

**Testing**

  * Pruebas de lógica de negocio.
  * Pruebas de casos de uso.
  * Pruebas de mappers.
  * Pruebas del sistema de cache.
  * Pruebas de componentes y pantallas.
  * Jest + React Test Renderer.

# Guía de inicio rápido

## 1. Clonar el repositorio

```bash
git clone https://github.com/lui99990/pokedex.git
cd pokedex
```

## 2. Instalar dependencias

```bash
npm install
```

---

## Ejecutar en Android

Asegúrate de tener un emulador de Android abierto o un dispositivo físico conectado con la depuración USB activa.

```bash
npm run android
```

---

## Ejecutar en iOS

> Requiere macOS y Xcode.

Primero instala las dependencias nativas de CocoaPods:

```bash
cd ios
pod install
cd ..
```

Después ejecuta la aplicación:

```bash
npm run ios
```

---

## Ejecutar pruebas

Las pruebas pueden ejecutarse sin necesidad de tener un emulador o dispositivo conectado.

```bash
npm test
```

### Coverage

Para generar el reporte de cobertura:

```bash
npm test -- --coverage
```

---

# Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener configurado correctamente el entorno de desarrollo para React Native CLI.

* [Node.js](https://nodejs.org/) — v18 o superior
* Ruby
* CocoaPods
* Xcode — para desarrollo iOS
* Android Studio — para desarrollo Android
* JDK compatible con la versión de React Native utilizada
* Android SDK

# Arquitectura

El proyecto utiliza **Clean Architecture** para mantener separadas las responsabilidades de cada capa.

```text
src/
├── core/
│   ├── DIContainer
│   ├── constants
│   └── configuration
│
├── domain/
│   ├── entities
│   ├── repositories
│   └── useCases
│
├── data/
│   ├── repositories
│   ├── mappers
│   ├── services
│   └── cache
│
└── presentation/
    ├── components
    ├── screens
    ├── hooks
    ├── navigation
    └── context
```

### Core

Contiene elementos compartidos y configuraciones fundamentales de la aplicación.

```text
core/
├── DIContainer
├── constants
└── configuration
```

El `DIContainer` permite centralizar la creación e inyección de dependencias.

---

### Domain

Contiene las reglas de negocio de la aplicación.

```text
domain/
├── entities
├── repositories
└── useCases
```

Esta capa no depende de React Native ni de detalles de implementación.

Los repositorios se definen mediante abstracciones y son implementados posteriormente por la capa `Data`.

---

### Data

Contiene las implementaciones técnicas necesarias para obtener y transformar la información.

```text
data/
├── repositories
├── mappers
├── services
└── cache
```

Aquí se encuentra la implementación del consumo de PokeAPI mediante `fetch`, así como los mappers y el sistema de cache en memoria.

---

### Presentation

Contiene la interfaz de usuario y la lógica relacionada con la presentación.

```text
presentation/
├── components
├── screens
├── hooks
├── navigation
└── context
```

Los componentes visuales se mantienen desacoplados de las implementaciones concretas de la capa de datos.

---

# Navegación

Debido a la restricción de **cero librerías externas**, no se utilizó `React Navigation`.

En su lugar se implementó un router basado en Stack utilizando `Context API`.

Conceptualmente:

```text
NavigationContext
       │
       ▼
   Navigation
       │
       ├── Home
       │
       └── Pokemon Detail
```

El stack se mantiene en memoria y permite realizar operaciones como:

```text
push()
pop()
replace()
```

Además, `BackHandler` permite integrar el botón físico de retroceso de Android con el stack personalizado.

---

# Animaciones

Las animaciones utilizan exclusivamente la API `Animated` proporcionada por React Native.

```text
Animated API
     │
     ├── useNativeDriver
     │
     ├── useHomeAnimations
     │
     └── useDetailAnimations
```

La lógica matemática y de transición se mantiene fuera de las vistas mediante Custom Hooks.

Esto permite mantener los componentes enfocados principalmente en la representación declarativa de la interfaz.

---

# Cache en memoria

Para reducir peticiones innecesarias a PokeAPI se implementó un sistema de cache en memoria mediante el patrón **Singleton**.

```text
             ┌───────────────┐
             │   Component   │
             └───────┬───────┘
                     │
                     ▼
             ┌───────────────┐
             │  Use Case     │
             └───────┬───────┘
                     │
                     ▼
             ┌───────────────┐
             │  Repository   │
             └───────┬───────┘
                     │
              ┌──────┴──────┐
              │             │
              ▼             ▼
          ┌───────┐     ┌─────────┐
          │ Cache │     │ PokeAPI │
          └───────┘     └─────────┘
```

Si la información ya se encuentra disponible en cache, se evita realizar una nueva petición HTTP.

> La cache es temporal y se pierde cuando el proceso de la aplicación es destruido.

---

# Paginación infinita

La lista principal utiliza paginación para cargar los Pokémon progresivamente.

El flujo evita solicitudes duplicadas mediante el control del estado de interacción del scroll:

```text
User scroll
     │
     ▼
onMomentumScrollBegin
     │
     ▼
Allow pagination
     │
     ▼
onEndReached
     │
     ▼
Load next page
```

Esto evita múltiples llamadas consecutivas cuando `onEndReached` es ejecutado varias veces durante una misma interacción.

---

# Temas dinámicos

La interfaz adapta el tema visual dependiendo del tipo principal del Pokémon.

Por ejemplo:

```text
Pokemon
   │
   ▼
Primary Type
   │
   ├── fire
   ├── water
   ├── grass
   ├── electric
   └── ...
          │
          ▼
    Dynamic Theme
```

Esto permite que la pantalla de detalle tenga una identidad visual relacionada con el Pokémon seleccionado.

---

# Testing

El proyecto incluye pruebas para validar tanto la lógica de negocio como la interfaz.

### Casos cubiertos

* Use Cases
* Repositories
* Mappers
* InMemoryCache
* Components
* Screens
* Hooks

Ejecutar:

```bash
npm test
```

Ejecutar con cobertura:

```bash
npm test -- --coverage
```
---
# Autor

**Luis Manuel Ramírez Avalos**

GitHub: [@lui99990](https://github.com/lui99990)



