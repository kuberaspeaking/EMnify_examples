# Get Authentication Token with Application Token
## Requirement
- Node
- NPM
- EMnify Application token
<br/>If you do not already have the above, download it from [here](https://nodejs.org/en/download/)

## Get EMnify Application Token
- Log in to the [EMnify Portal](https://portal.emnify.com)
- Go to Integrations
- Scroll down to Application Tokens and create a token.

## Use
Clone the Examples Repo
```
git clone https://github.com/kuberaspeaking/EMnify_examples.git
```
Navigate to the JS Authentication example

```
cd JS/Authenticate_app_token
```

```
npm install
```
Replace ${process.env.APP_TOKEN} in  index.js with your Application Token

```
node index.js
```
