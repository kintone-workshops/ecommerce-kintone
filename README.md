# THIS REPO IS UNDER CONSTRUCTION
Please check back later for the completed repo!

---

# Code Together: Ecommerce Frontend and Backend with Kintone

---

![banner.jpg](./docs/img/banner.jpg)

Join us for an **live** code-along where we create an ecommerce frontend and backend in two hours using React and Kintone!
Reserve your spot now and let's **Code Together!**

## Outline <!-- omit in toc -->
* [Completed Project](#completed-project)
* [Get Started](#get-started)
* [Get Your Free Kintone Database](#get-your-free-kintone-database)
* [Workshop Steps](#workshop-steps)
* [Debugging](#debugging)
  * [Not seeing a highlighted `TODO:`?](#not-seeing-a-highlighted-todo)
* [Completed Code](#completed-code)
* [Overview of the Repo](#overview-of-the-repo)

## Completed Project
TODO: Project Demo Gif ![INSERT_PROJECT_DEMO_GIF.gif](./docs/img/INSERT_PROJECT_DEMO_GIF.gif)

## Get Started
_Clone the Repo & Install Dependencies_ 💪

First, clone the [kintone-workshops/ecommerce-kintone](https://github.com/kintone-workshops/ecommerce-kintone) repo!  🚀  
Then go inside the folder & install the dependencies!

```shell
cd Downloads

git clone https://github.com/kintone-workshops/ecommerce-kintone

cd ecommerce-kintone

npm install
```

Open the `ecommerce-kintone` folder in [VS Code](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#_command-line) as well:

```shell
code .
```

## Get Your Free Kintone Database

[kintone.dev/new/](http://kintone.dev/new/)
* ⚡ Only use lowercase, numbers, & hyphens in your subdomain
* ⚠ Do not use uppercase or special characters

|                                                                                                 |                                                                                                                   |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ![Step 1: Fill out the Kintone Developer license sign-up form](./docs/img/common_signup/SignUp-1.png)         | ![Step 2: Email address will be the login name & the subdomain will be your unique link](./docs/img/common_signup/SignUp-2.png) |
| ![Step 3: Check for a "Welcome to Kintone! One More Step To..." email](./docs/img/common_signup/SignUp-3.png) | ![Step 4: Log into Kintone](./docs/img/common_signup/SignUp-4.png)                                                              |

For more information, check out the [Workshop_Steps.md > B. Get Your Free Kintone Database](./docs/Workshop_Steps.md#b-get-your-free-kintone-database) section!

---

## Workshop Steps

TODO: Copy the outline of the workshop steps from [Workshop_Steps.md](./docs/Workshop_Steps.md) & paste it here

---

---

## Debugging
**Let's Fix Those Problems** 💪

Here is a rundown of common problems that may occur & their solutions!

TODO: Update the following section with relevant Debug snippets - See [Snippets_Debug.md](./Snippets_Debug.md)

### Not seeing a highlighted `TODO:`?
Click the `Install` button on the VS Code pop-up message to install [TODO Highlight extension](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight).
* [![vscode-setting-extension.png](./docs/img/common_vscode/vscode-setting-extension.png)](./docs/img/common_vscode/vscode-setting-extension-HD.png)  

---

## Completed Code
If you want the completed code for the index.js file, you can find it here:  
[Solution](./docs/Solution.md)

---

## Overview of the Repo

<details>
  <summary> ↯ Overview of the Repo ↯ </summary>

| File                                                                   | Purpose                                                                   | Need to Modify?        |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------- |
| [package.json](package.json)                                           | Project's metadata & scripts for building and uploading the customization |                        |
| [.env.example](.env.example)                                           | The template for the .env file                                            |                        |
| [.env](.env)                                                           | Holds the Kintone login credential and View ID                            | Yes! - Create it       |
| [src/main.js](src/main.js)                                             | Heart of the project handling the API request body & adding a button      | Yes! Complete the code |
| [src/style.css](src/style.css)                                         | Styling for the project can go here                                       |                        |
| [docs/Workshop_Steps.md](./docs/Workshop_Steps.md)                     | Step-by-step guide that we do during the workshop                         |                        |

</details>
