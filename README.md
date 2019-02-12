# OpenWeather API

Con esta librería podremos consumir las API de openweather.org y utilizarla en nuestros proyectos.

## Instalación

Javascript
```javascript
var API = require('modulo');
```

TypeScript
```typescript
import openweather-api from 'modulo';
```

### Uso de modulo

Debemos obtener el API Key desde una cuenta en openweather.org

```typescript
const api = new ApiService(APIKEY, 'm', 'es');

API.buscarPorZIP( '28001', 'es').then(
    data => console.log( data )
).catch( error => console.log( error ));
```
