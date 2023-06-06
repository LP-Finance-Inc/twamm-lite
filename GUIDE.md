## Start Project

- yarn install
- yarn dev

## Publishing/Tagging new version
- yarn lint -- (if getting eslint error plz fix first)
- yarn prettier -- (if getting prettier issue plz fix first)
- yarn build
- yarn build-widget
- BUNDLE_NAME=main-$(node -e "console.log(require('./package.json').version);") && cp ./public/$BUNDLE_NAME.js ./public/main-v1.js
- Publish

## Scoping Tailwind Preflight CSS

- cp node_modules/tailwindcss/lib/css/preflight.css ./preflight.stylus
- Please check preflight.css new file create in root and scope { }
entire file  with #twamm-terminal.
- npx stylus ./preflight.stylus -o ./public/scoped-preflight.css
- rm ./preflight.stylus
