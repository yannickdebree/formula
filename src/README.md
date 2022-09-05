# Architecture

About the 5 existing folders, called here "modules" :

- **controllers** can depend on all other modules.
- **core** and **domain** haven't to depend on any module,
- **system** can depend on external dependencies (like "reflect-metadata" or "aurelia-dependency-injection") and **core**.
- **utils** can depend on **core**.
