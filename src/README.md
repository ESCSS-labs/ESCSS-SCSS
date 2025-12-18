## File structure

src/style
├── 1.Layout  
│ ├── AspectRatio.scss  
│ ├── BoxDecorationBreak.scss  
│ ├── BoxSizing.scss  
│ ├── usage.md  
│ └── ...  
├── 2.FlexboxGrid
└── ...

[Same as Tailwind web](https://tailwindcss.com/docs/aspect-ratio)

## How to generate SCSS file?

### 1. Use 'Live Sass Compiler'(VSCode Extension) to generate css file in `src/style/index.css`
### 2. Use `Search` to remove `/*x` and `x*/` in index.css

## How to test scss file?

### 1. Copy from `src/style/index.css`
### 2. Past content to `src/test/_escss.scss`
### 3. Run `bun test` to test all cases