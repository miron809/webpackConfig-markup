# webpackConfig - markup
This config is useful when you just need to create couple of HTML pages using JS, CSS/SCSS files.

#### Prerequisites
  - Node.js
  - NPM
  - Git

#### Installing & Local Development
Start by typing the following commands in your terminal in order to get full package on your machine and starting a local development server with live reload feature.

```
> git clone https://github.com/miron809/webpackConfig-markup.git
> cd webpackConfig-markup
> npm i
> npm run start
```



## Files/Folders Structure
Here is a brief explanation of the template folder structure and some of its main files usage:

```
└── src                         # Contains all template source files.
│   └── assets                  # Contains JS, CSS, images and fonts/icon fonts.
│   │   └── scripts             # Contains all JavaScript files.
│   │   │   └── index.js        # Indicator file.
│   │   │
│   │   └── static              # Contains the non-code files.
│   │   │   └── fonts           # Contains fonts files/icon fonts files.
│   │   │   └── images          # Contains all template images/svg.
│   │   │
│   │   └── styles              # Contains all SCSS/CSS files.
│   │       └── common          # Contains general styles.
│   │       └── components      # Contains all template components.
│   │       └── vendor          # Contains all plugin files & custom styles.
│   │       └── index.scss      # Indicator file.
│   │
│   └── templates               # Contains common templates for HTML.
│   │
│   └── *.html                  # All HTML pages files .
│
└── .editorconfig               # Keep same coding styles between code editors.
└── .gitignore                  # Ignored files in Git.
└── package.json                # Package metadata.
└── package-lock.json           # Package metadata.
└── postcss.config.js           # Post-css config file.
└── README.md                   # Manual file.
└── webpack.config.js           # Webpack main config file.
```

## Deployment
In deployment process, you have two commands:

- Build command
Used to generate the final result of compiling src files into build folder. This can be achieved by running the following command:
```
> npm run build
```

- Dev command
Used to generate the final result of compiling src files into build folder without optimization(minimizer). This can be achieved by running the following command:
```
> npm run dev
```

## Thanks
- [Vladilen Minin](https://github.com/vladilenm/webpack-2020)
- [Sergienko Anton](https://github.com/Harrix/static-site-webpack-habr/)
