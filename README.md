# ff-webstore-e2e
Test end-to-end with Cypress.io [ref](https://www.cypress.io)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes

### `Installation of the project`

* Copy the repository in your machine: https://github.com/netshoes/ff-webstore-e2e.git
* Access the folder `cd ff-webstore-e2e`
* Install the dependencies in the project

```bash
# Install dependencies
npm install

# Run the project e2e in the desktop
npm run cypress:desktop

# Run the project e2e in the mobile
npm run cypress:mobile

#Run the project e2e in the desktop and mobile
npm run cypress

```

## Project Structure
By default or Cypress expects integration tests to remain inside the folder `integration`.

```
├── cypress
│   ├── Fixtures: É onde seus mocks são armazenados podendo ser utilizados em qualquer teste.
│   ├── Integrations: Aqui é o diretório onde criará seus arquivos de teste.
│   ├── Plugins: Com eles é possível trocar, modificar ou estender o comportamento interno do Cypress.
│   ├── Support: Neste diretório é possível criar comandos que podem ser executados dentro dos testes ou sobrescrever comandos já existentes.
├──
```

### `To run the e2e tests`

After installing project dependencies, in the project directory you can run: `npm run cypress` and will open it a window

![](https://user-images.githubusercontent.com/24282267/67794728-e6a43580-fa5b-11e9-8dfc-e6c3f6983aea.png)

