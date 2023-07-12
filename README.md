# ChatterFlow
ChatterFlow frontend is a real-time messaging API service built with Angular2+ and Typescript. It is designed to facilitate smooth, real-time chats while preserving all the history of the conversation.
Features

- Real-Time Communication: ChatterFlow enables users to chat in real time, providing instant exchange of messages.
- Conversation History: With ChatterFlow, every chat's history is stored and can be retrieved at any time, ensuring no conversation details are ever lost.
- Robust and Scalable: Built on CockroachDB, ChatterFlow is designed to scale easily while ensuring data consistency.
- Fast and Efficient: ChatterFlow utilizes the power of FastAPI to provide a fast, efficient, and easy-to-use solution.

# Technologies

ChatterFlow is powered by several prominent technologies:

- Angular2+: A powerful and widely-used web application framework developed by Google, it helps create dynamic, single-page applications using HTML and TypeScript. It provides a complete frontend solution, with features like data binding, dependency injection, and more.
- TypeScript: A robust, statically-typed superset of JavaScript, TypeScript brings optional static types to JavaScript, enhancing code readability and maintainability. It offers better tooling support with autocompletion, type checking, and source documentation, facilitating easier debugging and application scaling.

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
## Prerequisites

What you need:
- Angular2+
- Backend API

## Setup
```
# Clone this repo
git clone https://github.com/chatterflow/frontend
# Install dependencies
npm install
# Create environment
ng g @schematics/angular:environments 
# Run
ng serve --o
# Make sure to also run the backend api
https://github.com/chatterflow/backend
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


