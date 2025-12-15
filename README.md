# Nardi Xhepi - Data Science Portfolio

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## 🚀 Live Site

Visit: [nardi-xhepi.github.io](https://nardi-xhepi.github.io)

## 📁 Project Structure

```
nardi-xhepi.github.io/
├── index.html              # Main portfolio page
├── blog.html               # Blog listing page
├── assets/
│   ├── css/
│   │   ├── main.css        # CSS entry point (imports all)
│   │   ├── base.css        # Variables, reset, typography
│   │   ├── utilities.css   # Layout, buttons, cards
│   │   ├── animations.css  # Keyframes & scroll animations
│   │   ├── blog-post.css   # Individual blog post styles
│   │   ├── components/
│   │   │   ├── navbar.css
│   │   │   ├── footer.css
│   │   │   └── cards.css
│   │   └── sections/
│   │       ├── hero.css
│   │       ├── about.css
│   │       ├── experience.css
│   │       ├── projects.css
│   │       ├── blog.css
│   │       └── contact.css
│   ├── js/
│   │   └── main.js         # Interactive features
│   └── images/             # Profile & project images
└── blog/
    └── posts/              # Individual blog post files
        └── building-production-rag-systems.html
```

## ✨ Features

- **Dark Theme** with gradient accents
- **Glassmorphism** effects
- **Responsive Design** (mobile, tablet, desktop)
- **Scroll Animations**
- **Project Filters**
- **Blog System** with categories
- **Contact Form**

## 🛠️ Development

```bash
# Start local server
python3 -m http.server 3000

# Open in browser
open http://localhost:3000
```

## 📝 Customization

### Add Profile Photo
Replace placeholder in `index.html`:
```html
<div class="image-placeholder">
    <img src="assets/images/profile.jpg" alt="Your Name">
</div>
```

### Add New Blog Post
1. Create `blog/posts/your-post.html` using existing template
2. Add card to `blog.html`

## 📄 License

MIT License