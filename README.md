# Life Less Wasteful Theme

A custom-built Ghost theme for Life Less Wasteful by Zack Creach.

**The main files are:**

- `default.hbs` - The main template file
- `index.hbs` - Used for the home page
- `post.hbs` - Used for individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives
- `author.hbs` - Used for author archives

**Partials include:**

- `banner.hbs` - banner template for tag and individual post pages
- `footer.hbs` - footer template for tag and individual post pages

# Development

Styles are compiled using Gulp/Sass. You'll need to cd into content/themes/discoverer and run:

```bash
$ npm install
$ npm run dev
```

Now you can edit `/styles/` files, which will be compiled to `/assets/styles/` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
$ gulp zip
```
