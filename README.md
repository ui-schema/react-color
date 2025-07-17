<p align="center">
  <a href="https://ui-schema.bemit.codes" rel="noopener noreferrer" target="_blank"><img width="125" src="https://ui-schema.bemit.codes/logo.svg" alt="UI Schema Logo"></a>
</p>

<h1 align="center">UI Schema: MUI Color</h1>

React color pickers as [MUI](https://mui.com) widgets for [UI-Schema](https://github.com/ui-schema/ui-schema).

[![Github actions Build](https://github.com/ui-schema/react-color/actions/workflows/blank.yml/badge.svg)](https://github.com/ui-schema/react-color/actions)
[![react compatibility](https://img.shields.io/badge/React-%3E%3D18-success?style=flat-square&logo=react)](https://reactjs.org/)
[![MIT license](https://img.shields.io/npm/l/@ui-schema/ui-schema?style=flat-square)](https://github.com/ui-schema/react-color/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![Typed](https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)

- [`react-color`](https://www.npmjs.com/package/react-color) widgets: `@ui-schema/material-color` [![npm (scoped)](https://img.shields.io/npm/v/@ui-schema/material-color?style=flat-square)](https://www.npmjs.com/package/@ui-schema/material-color) [![Component Documentation](https://img.shields.io/badge/Documentation-green?labelColor=1a237e&color=0d47a1&logoColor=ffffff&style=flat-square&logo=mui)](./docs/material-color/material-color.md)
- [`react-colorful`](https://www.npmjs.com/package/react-colorful) widgets: `@ui-schema/material-colorful` [![npm (scoped)](https://img.shields.io/npm/v/@ui-schema/material-colorful?style=flat-square)](https://www.npmjs.com/package/@ui-schema/material-colorful) [![Component Documentation](https://img.shields.io/badge/Documentation-green?labelColor=1a237e&color=0d47a1&logoColor=ffffff&style=flat-square&logo=mui)](./docs/material-colorful/material-colorful.md)

[![Visit Core Project](https://img.shields.io/badge/Visit%20Core%20Project-white?labelColor=fff&color=107b8c&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDYuMjkgMTQ0Ljg3Ij48ZGVmcz48c3R5bGU+LmE0M2YzMmM3LTZiOWUtNDZhZi05Y2RkLWUxNzc1YjJjNzZiMHtmaWxsOiMwMzM5NDQ7fS5lNDNmYmJjMS0xNWM1LTRhZmUtOTdkNS0yYTk3YzY3MGJmZTN7ZmlsbDojMDVhZWNhO308L3N0eWxlPjwvZGVmcz48dGl0bGU+VUktU2NoZW1hPC90aXRsZT48cGF0aCBjbGFzcz0iYTQzZjMyYzctNmI5ZS00NmFmLTljZGQtZTE3NzViMmM3NmIwIiBkPSJNNTMuMjgsM0MzNCwzLDMwLDIsMTguMTIsNS4yMmMtMTAsMi43Mi0xNiwxMi4zMS0xNiwyMi43NC0uMTMsMTctLjI5LDM0LC4wNiw1MC45My41OCwyOC43NSwyMS4zNiw1NS4zOCw1MC4wNyw2NC43OSwzOC42NCwxMi42Niw4MC4yLTguMjUsOTIuNjgtNDYuNjQuMTMtLjM5LjMxLTEuMzYuMzMtMS40Mi0xLjIyLjM4LTEuNCwxLjE2LTEuODMsMS45LTkuNjksMTctMjQuNDIsMjUuNjUtNDMuOTIsMjUuNzdhNDQuNDMsNDQuNDMsMCwwLDEtMjIuODQtNi42M2MtMTMtNy42Ni0yMS0xOC44NC0yMi45LTM0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMS45MyAtMi41MSkiLz48cGF0aCBjbGFzcz0iZTQzZmJiYzEtMTVjNS00YWZlLTk3ZDUtMmE5N2M2NzBiZmUzIiBkPSJNMTI1LjgsMzUuNzhjLTctOC40MS0xMy4xOS0xNy40MS0yMC42MS0yNS40NS02LjEyLDUuMjItOC4zMSwxMi4xOC04LjM4LDE5Ljg2LS4xMywxNC42NC0uMjEsMjkuMjguMDYsNDMuOTIuMjEsMTEuMzItNi40MiwyMC4xOC0xNywyMi41NkM3MC42NCw5OC43NCw2MC43Niw5NS40Nyw1NSw4NC4zNWExMi4yMiwxMi4yMiwwLDAsMC0xLjI2LTEuNzJjMS45MiwxNS4xOSw5LjkxLDI2LjM3LDIyLjksMzRhNDQuNDMsNDQuNDMsMCwwLDAsMjIuODQsNi42M2MxOS41LS4xMiwzNC4yMy04LjczLDQzLjkyLTI1Ljc3LjQzLS43NC42MS0xLjUyLDEuODMtMS45QzE0OSw4NC44LDE0OC4yNCwzMi4xNSwxNDgsMjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xLjkzIC0yLjUxKSIvPjxwYXRoIGNsYXNzPSJhNDNmMzJjNy02YjllLTQ2YWYtOWNkZC1lMTc3NWIyYzc2YjAiIGQ9Ik0xNDgsMjFWMy4xN2MtMy0uMTctMjEuMzUtMS44NS0zMS41My44OWEzMS42NSwzMS42NSwwLDAsMC0xMS4yOCw2LjI3YzcuNDIsOCwxMy42NSwxNywyMC42MSwyNS40NSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuOTMgLTIuNTEpIi8+PC9zdmc+Cg==)](https://github.com/ui-schema/ui-schema)

[![Get Help on Discord](https://img.shields.io/badge/Get%20Help%20on%20Discord-blue?labelColor=fff&logoColor=505050&color=7B16FF&style=for-the-badge&logo=discord)](https://discord.gg/MAjgpwnm36)

## Versions

This project adheres to [semver](https://semver.org/), until `1.0.0` and beginning with `0.1.0`: all `0.x.0` releases are like MAJOR releases and all `0.0.x` like MINOR or PATCH, modules below `0.1.0` should be considered experimental.

**Get the [latest version](https://github.com/ui-schema/react-color/releases) - or [help build it](CONTRIBUTING.md)!**

## License

Released under the [MIT License](https://github.com/ui-schema/react-color/blob/main/LICENSE).
