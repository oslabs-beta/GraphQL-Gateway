<div align="center">
   <img width="50px" src="https://user-images.githubusercontent.com/89324687/182067950-54c00964-2be4-481a-976b-773d9112a4c0.png"/>
   <h1>GraphQL Gateway Visualizer</h1>
   <a href="https://github.com/oslabs-beta/GraphQL-Gateway"><img src="https://img.shields.io/badge/license-MIT-blue"/></a> <a href="https://github.com/oslabs-beta/graphql-gateway/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/oslabs-beta/graphql-gateway"></a> <a             href="https://github.com/oslabs-beta/Graphql-gateway/issues"><img alt="GitHub issues" src="https://github.com/oslabs-beta/Graphql-gateway/issues"></a> <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/graphql-gateway">

   <h3 align="center"> <strong>The GraphQL Gateway developer portal.</strong></h3>
   </div>
   
&nbsp;

## <a name="prerequisites"></a> Prerequisites

This package intrefaces with the GraphQLGate rate-limiting package to log query data for visualization in the Gateway developer portal

1. Signup/login to the [Gateway developer portal](graphqlgate.io).

2. Create a new project to recieve a project ID and API key.

3. Import and configure the [GraphQLGate rate-limiting package](https://www.npmjs.com/package/graphqlgate)

## <a name="getting-started"></a> Getting Started

Install the package

```
npm i gate-logger
```

Import the package and add the logging middleware to the Express middleware chain BEFORE the GraphQLGate middleware.

** ERRORS WILL BE THROWN if the logger is added after the limiter **

Copy the project ID and the API key from your project on the Gateway developer portal and include them as middleware arguments.
