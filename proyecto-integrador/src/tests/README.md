# 📋 Pruebas Unitarias - TaskManager

Este directorio contiene las pruebas unitarias de la aplicación TaskManager.

## 🎯 Resumen de Pruebas

Total: **21 pruebas** distribuidas en **6 archivos**

### Archivos de Prueba

1. **App.test.jsx** (4 pruebas)
   - Estructura principal de la aplicación
   - Renderizado de Header y Footer
   - Estilos globales

2. **Header.test.jsx** (3 pruebas)
   - Logo y navegación
   - Menú móvil (hamburguesa)
   - Links de navegación

3. **Home.test.jsx** (3 pruebas)
   - Loader durante carga
   - Cálculo de estadísticas
   - Saludo personalizado por hora

4. **RecentTasks.test.jsx** (3 pruebas)
   - Estado vacío
   - Estilo de tareas completadas
   - Límite de 5 tareas

5. **UpcomingTasks.test.jsx** (3 pruebas)
   - Estado vacío
   - Filtrado de tareas futuras
   - Formato de fechas

6. **About.test.jsx** (5 pruebas)
   - Título y descripción
   - Características (features)
   - Stack tecnológico
   - Estadísticas
   - Enlace de contacto

## 🚀 Comandos Disponibles

```bash
# Ejecutar todas las pruebas una vez
npm run test:run

# Ejecutar pruebas en modo watch (se re-ejecutan al guardar cambios)
npm test

# Ejecutar pruebas con interfaz visual
npm run test:ui

# Ejecutar pruebas con reporte de cobertura
npm run test:coverage
```

## 🛠️ Tecnologías Utilizadas

- **Vitest**: Framework de testing rápido y moderno
- **React Testing Library**: Testing centrado en el usuario
- **@testing-library/jest-dom**: Matchers adicionales para el DOM
- **jsdom**: Simulación del DOM en Node.js

## 📝 Convenciones

### Estructura de un Test

Cada archivo de prueba sigue esta estructura:

```javascript
/**
 * PRUEBAS UNITARIAS - [NOMBRE DEL COMPONENTE]
 * 
 * Descripción breve de qué se está probando
 */

describe('Nombre del Componente', () => {
  /**
   * TEST X: Descripción del test
   * 
   * Propósito: Por qué existe este test
   * Qué verifica: Qué comportamiento específico se valida
   */
  it('debe hacer algo específico', () => {
    // Arrange (preparar)
    // Act (actuar)
    // Assert (verificar)
  });
});
```

### Nomenclatura

- Los archivos de prueba terminan en `.test.jsx`
- Los nombres de tests usan español y son descriptivos
- Cada test tiene comentarios explicando su propósito

## ✅ Buenas Prácticas

1. **Tests Independientes**: Cada test puede ejecutarse solo sin depender de otros
2. **Datos de Prueba**: Se crean datos mock específicos para cada test
3. **Limpieza**: Se usa `cleanup()` automáticamente después de cada test
4. **Comentarios**: Cada test está documentado con su propósito

## 🔍 Qué se Prueba

### Renderizado
- Componentes se renderizan sin errores
- Elementos esperados están presentes en el DOM

### Interacciones
- Clicks en botones funcionan correctamente
- Menús se abren y cierran

### Lógica de Negocio
- Filtrado de tareas
- Cálculo de estadísticas
- Formato de fechas

### Estilos Condicionales
- Clases CSS se aplican según estado
- Tareas completadas tienen line-through

## 📊 Resultados Esperados

Al ejecutar `npm run test:run` deberías ver:

```
✓ src/tests/App.test.jsx (4 tests)
✓ src/tests/Header.test.jsx (3 tests)
✓ src/tests/Home.test.jsx (3 tests)
✓ src/tests/RecentTasks.test.jsx (3 tests)
✓ src/tests/UpcomingTasks.test.jsx (3 tests)
✓ src/tests/About.test.jsx (5 tests)

Test Files  6 passed (6)
Tests  21 passed (21)
```

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
npm install
```

### Tests fallan después de cambios
1. Verifica que los cambios no rompieron la funcionalidad
2. Actualiza los tests si el comportamiento cambió intencionalmente

### Tests lentos
- Usa `npm run test:run` en lugar de modo watch
- Considera ejecutar tests específicos: `npm test Header.test.jsx`

## 📚 Recursos

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
