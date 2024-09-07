# Playwright Demo

Ce projet est un exemple de tests automatisés avec Playwright. Il comprend un ensemble de fichiers et de code qui permettent de lancer des tests sur une application web.

## Fichiers

### .github/workflows/playwright.yml

Ce fichier définit les étapes pour lancer les tests Playwright. Il comprend les éléments suivants :

- `name` : Nom du workflow.
- `on` : Événements qui déclenchent le workflow (push et pull request).
- `jobs` : Tâches à effectuer dans le workflow.
- `test` : Tâche qui lance les tests Playwright.

### package.json

Ce fichier liste les dépendances nécessaires pour lancer les tests. Il comprend les éléments suivants :

- `name` : Nom du projet.
- `version` : Version du projet.
- `main` : Fichier principal du projet.
- `scripts` : Scripts pour lancer les tests.
- `keywords` : Mots-clés pour le projet.
- `author` : Auteur du projet.
- `license` : Licence du projet.
- `description` : Description du projet.
- `devDependencies` : Dépendances de développement.
- `dependencies` : Dépendances du projet.

### functions/myFunctions.ts

Ce fichier contient des fonctions utilitaires pour les tests. Il comprend les éléments suivants :

- `verifierHomePage` : Fonction qui vérifie la page d'accueil.
- `acceptConsent` : Fonction qui accepte les conditions d'utilisation.
- `cliquerSurLoginButton` : Fonction qui clique sur le bouton de connexion.
- `registerUser` : Fonction qui enregistre un utilisateur.
- `verifyUserIsLogin` : Fonction qui vérifie si l'utilisateur est connecté.
- `deleteAccount` : Fonction qui supprime un compte.
- `loginUser` : Fonction qui connecte un utilisateur.

### pages/homePage.ts

Ce fichier contient la définition de la page d'accueil de l'application. Il comprend les éléments suivants :

- `HomePage` : Classe qui définit la page d'accueil.

### pages/loginPage.ts

Ce fichier contient la définition de la page de connexion de l'application. Il comprend les éléments suivants :

- `LoginPage` : Classe qui définit la page de connexion.

### pages/registerPage.ts

Ce fichier contient la définition de la page d'inscription de l'application. Il comprend les éléments suivants :

- `RegisterPage` : Classe qui définit la page d'inscription.

### pages/todoPage.ts

Ce fichier contient la définition de la page des tâches de l'application. Il comprend les éléments suivants :

- `TodoPage` : Classe qui définit la page des tâches.

### tests-examples/demo-todo-app.spec.ts

Ce fichier contient des exemples de tests pour l'application Todo. Il comprend les éléments suivants :

- `test.describe` : Fonction qui décrit les tests.
- `test.beforeEach` : Fonction qui est exécutée avant chaque test.
- `test` : Fonction qui définit un test.

### send-results.js

Ce fichier envoie les résultats des tests à Xray. Il comprend les éléments suivants :

- `xrayApiToken` : Token d'API Xray.
- `axios` : Bibliothèque pour envoyer des requêtes HTTP.
- `fs` : Bibliothèque pour lire et écrire des fichiers.

## Code

### Fichier `.github/workflows/playwright.yml`

```yaml
name: Playwright Tests

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test:
    name: Playwright Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 16
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

### Fichier `package.json`

```json
{
  "name": "playwright-demo",
  "version": "1.0.0",
  "main": "functions/index.js",
  "scripts": {
    "test": "playwright test"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "description": "Playwright Demo",
  "devDependencies": {
    "@playwright/test": "^1.28.1"
  },
  "dependencies": {
    "axios": "^0.27.2",
    "dotenv": "^16.0.3"
  }
}
```

### Fichier `functions/myFunctions.ts`

```typescript
export function verifierHomePage(page: Page): Promise<void> {
  return page.waitForSelector('h1').then(() => {
    const title = page.$eval('h1', (element) => element.textContent);
    expect(title).toBe('Accueil');
  });
}

export function acceptConsent(page: Page): Promise<void> {
  return page.click('button[type="accept"]');
}

export function cliquerSurLoginButton(page: Page): Promise<void> {
  return page.click('button[type="login"]');
}

export function registerUser(page: Page, username: string, email: string, password: string): Promise<void> {
  return page.fill('input[name="username"]', username)
    .fill('input[name="email"]', email)
    .fill('input[name="password"]', password)
    .click('button[type="submit"]');
}

export function verifyUserIsLogin(page: Page): Promise<void> {
  return page.waitForSelector('h2').then(() => {
    const title = page.$eval('h2', (element) => element.textContent);
    expect(title).toBe('Bienvenue sur l\'application !');
  });
}

export function deleteAccount(page: Page): Promise<void> {
  return page.click('button[type="delete"]');
}

export function loginUser(page: Page, username: string, password: string): Promise<void> {
  return page.fill('input[name="username"]', username)
    .fill('input[name="password"]', password)
    .click('button[type="submit"]');
}
```

### Fichier `pages/homePage.ts`

```typescript
import { Page } from '@playwright/test';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async verifierHomePage(): Promise<void> {
    await this.page.waitForSelector('h1');
    const title = await this.page.$eval('h1', (element) => element.textContent);
    expect(title).toBe('Accueil');
  }
}
```

### Fichier `pages/loginPage.ts`

```typescript
import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async loginUser(username: string, password: string): Promise<void> {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
```

### Fichier `pages/registerPage.ts`

```typescript
import { Page } from '@playwright/test';

export class RegisterPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async register(username: string, email: string, password: string): Promise<void> {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
```

### Fichier `pages/todoPage.ts`

```typescript
import { Page } from '@playwright/test';

export class TodoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async addTodo(todo: string): Promise<void> {
    await this.page.fill('input[name="todo"]', todo);
    await this.page.click('button[type="submit"]');
  }

  public async deleteTodo(todo: string): Promise<void> {
    await this.page.click(`button[data-todo="${todo}"]`);
  }
}
``