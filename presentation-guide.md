# Running the Presentation

## Development Mode

To run the presentation in development mode:

```bash
cd presentation
npm run dev
```

This will start a dev server at http://localhost:3030

## Building for Production

To build the presentation for production:

```bash
cd presentation
npm run build
```

This will generate files in the `dist` folder.

## Exporting to PDF

To export the presentation to PDF:

```bash
cd presentation
npm run export
```

This will create a PDF file of your presentation.

## Customizing the Presentation

- Edit `slides.md` to modify the content
- Add or modify components in the `components` folder
- Customize styles in `style.css`
- Add background images in the `public` folder
- Create additional pages in the `pages` folder

## Using Components

The presentation includes custom components:

1. `PropertyCounter` - An interactive counter
2. `BarChart` - A simple bar chart for data visualization

See `pages/components-demo.md` for examples of how to use these components.

## Deployment

The presentation can be deployed to:

- Netlify
- Vercel
- GitHub Pages
- Any static hosting

See `DEPLOY.md` for detailed deployment instructions.
