# Vite Playground

```bash
wget https://github.com/mac2000/vite/archive/refs/heads/main.zip
unzip main.zip
rm -rf main.zip
cd vite-main
npm install
npm start
```

Usually, when it comes to some kind of very simple app, I am used to use

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>sample</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,container-queries"></script>
    <script crossorigin src="https://unpkg.com/@babel/standalone/babel.js"></script>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  </head>
  <body class="container my-5 mx-auto bg-slate-200 text-slate-800">
    <div id="root"></div>
  </body>
  <script type="text/babel" data-presets="react" src="index.jsx"></script>
  <script type="text/babel">
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App))
  </script>
</html>
```

but it does not always work, especially when there is a need for some 3rd party libraries

The question is: is there a way to have something small without quadraillion of configuration files

And the anwer is kind of yes - with help of vite it seems to be doable

Still there is a bunch of files, but they more or less will be in any project/repository

Commiting it for my self in future

after a while revisiting approach - in bunch of cases for small demos react is used, also - tiered with building ui from scratch each time, so have wired up shadcn, also, to avoid issues when copying samples in real project wiredup eslint with strict rules
