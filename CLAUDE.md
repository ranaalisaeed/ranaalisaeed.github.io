# Jekyll Website Development Guide

## Build Commands
- Local development: `bundle exec jekyll serve --config _config.yml,_config_dev.yml --open-url`
- With draft posts: `bundle exec jekyll serve --config _config.yml,_config_dev.yml --open-url --drafts`
- Build only: `bundle exec jekyll build`

## Code Style Guidelines
- **HTML/Liquid**: Use 2-space indentation. Keep includes modular in `_includes` folder.
- **SCSS**: Follow BEM methodology. Use variables from `_sass/arch71/_variables.scss`.
- **Content**: Place posts in `my_collections/_posts` with YYYY-MM-DD-title-slug.md format.
- **Frontmatter**: Required fields - layout, title. Optional - date, permalink, excerpt, categories.
- **Images**: Store in `/public/images/` with feature-specific subfolders.
- **Error handling**: Use Jekyll's built-in conditional statements for error cases.

## Project Structure
- All collections stored in `my_collections/` directory.
- Site styling in `_sass/arch71/` with modular components.
- Page-specific styles in `_sass/arch71/pages/`.