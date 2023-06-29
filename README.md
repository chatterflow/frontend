# Comunicação vendedor-comprador

- Página de chat entre vendedor e comprador

- Componentes relacionados à comunicação entre vendedor e comprador (caixa de chat, notificações de mensagens, etc.)

## Setup
```
# Clone this repo
git clone https://github.com/Programacao-para-web-2023-01/ceublivre---ui-admlocal
# Install dependencies
npm install
# Create environment
ng g @schematics/angular:environments 
# Run
ng serve --o
```

## environment.development
```
export const environment = {
    production: true,
    apiUrl: 'http://localhost:8000',
    websocket_endpoint: 'ws://localhost:8000/ws'
};
```

## environment.ts
```
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8000',
    websocket_endpoint: 'ws://localhost:8000/ws'
};
```


