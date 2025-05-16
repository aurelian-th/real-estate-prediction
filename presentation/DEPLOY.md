# Deploying Your Slidev Presentation

This guide will help you deploy your Slidev presentation online.

## Deploy to Netlify

1. Edit `netlify.toml` in your presentation folder
2. Push your repository to GitHub
3. Visit [Netlify](https://netlify.com) and create a new site from your GitHub repository

## Deploy to Vercel

1. Push your repository to GitHub
2. Visit [Vercel](https://vercel.com) and create a new project from your GitHub repository
3. Use the settings in your `vercel.json` file

## Export as Static HTML

You can export your presentation as static HTML:

```bash
# In your presentation folder
npm run export
```

This will create a `dist` folder with your static site.

## Export as PDF

You can also export your presentation as a PDF:

```bash
# In your presentation folder
npm run export -- --pdf
```

This will create a PDF file in your `dist` folder.
