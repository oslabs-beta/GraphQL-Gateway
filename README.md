<div align="center">
   <img width="50px" src="https://user-images.githubusercontent.com/89324687/182067950-54c00964-2be4-481a-976b-773d9112a4c0.png"/>
   <h1>GraphQL Gateway Developer Portal</h1>
   <a href="https://github.com/oslabs-beta/GraphQL-Gateway"><img src="https://img.shields.io/badge/license-MIT-blue"/></a> <a href="https://github.com/oslabs-beta/graphql-gateway/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/oslabs-beta/graphql-gateway"></a> <a             href="https://github.com/oslabs-beta/Graphql-gateway/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/oslabs-beta/graphql-gateway"></a> <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/graphql-gateway">
   <br />
   </div>
&nbsp;

## <a name=""></a> 🛡 GraphQL Gateway Developer Portal

GGDP is designed for offering a visualization of how your GraphQL API endpoints is secured using rate limits and depth limits. With this tool, users can:

-   Visualize API call data and facilitate a tuning of rate limiting algorithm settings
-   Seek for query resolution optimizations for GraphQL APIs
-   View cached performance metrics

## ✏️ Table of Contents

-   [Prerequisites](#prerequisites)
-   [Getting Started](#getting-started)
-   [Contributions](#contributions)
-   [Developers](#developers)
-   [More Information](#for-more-information)

## <a name="prerequisites"></a> 📖 Prerequisites

1. Signup/login to the [Gateway developer portal](graphqlgate.io).

2. Create a new project to recieve a project ID and API key.

3. Import and configure the [GraphQLGate logger package](https://www.npmjs.com/package/gate-logger)

```
npm i gate-logger
```

4. Import and configure the [GraphQLGate rate-limiting package](https://www.npmjs.com/package/graphql-limiter)

```
npm i graphql-limiter
```

## <a name="getting-started"></a>📍 Getting Started

-   Register if you are first-time user, otherwise, login to the portal with your email and password
<div align="center"><img src='./public/login.GIF'></div>

-   Select your existing project or create a new project from the toolbar on your left
<div align="center"><img src='./public/project.GIF'></div>

-   Use features on the chart and view your cached performance metrics sorted by time periods/algorithms
<div align="center"><img src='./public/queries.GIF'></div>

## <a name="contributions"></a> 🧠 Contributions

Contributions to the code, examples, documentation, etc. are very much appreciated🧑‍💻👩‍💻

-   Please report issues and bugs directly in this [GitHub project](https://github.com/oslabs-beta/GraphQL-Gateway/issues).

## <a name="developers"></a> 💻 Developers

-   [Evan McNeely](https://github.com/evanmcneely)
-   [Stephan Halarewicz](https://github.com/shalarewicz)
-   [Flora Yufei Wu](https://github.com/feiw101)
-   [Jon Dewey](https://github.com/donjewey)
-   [Milos Popovic](https://github.com/milos381)

## <a name="for-more-information"></a> 🔍 For More Information

GraphQLGate rate-limiting and Logger package documentation:

-   [GraphQLGate rate-limiting package](https://github.com/oslabs-beta/GraphQL-Gate)
-   [GraphQLGate logger package](https://github.com/oslabs-beta/Gate-Logger)
