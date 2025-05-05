![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

## What is ESCSS-SCSS?

ESCSS-SCSS is built on SCSS and supports both standard CSS and Tailwind — ensuring your CSS stack stays modern and future-proof.

## Installation

### Requirements

- sass >= v1.23.0
- vite (if >= v5.4.0, Recommended sass-embedded faster)

### Copy file

- copy `_awaken.scss` from the `download` directory

### Install extension for auto-complete

- SCSS IntelliSense

### Installing

```bash
npm add -D sass-embedded
```

```bash
yarn add -D sass-embedded
```

```bash
pnpm add -D sass-embedded
```

```bash
bun add -D sass-embedded
```

```js
//  vite.config.js
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `@use '/assets/scss/_awaken.scss' as *;`,
      },
    },
  },
});
```

## Usage

### Configure breakpoints for your project

```scss
$SM: 0px;
$MD: 0px;
$LG: 0px;
$XL: 0px;
$XXL: 0px;
```

### Tailwind API

```scss
#Demo {
  // -m-1/2
  @include \-m-1\/2;

  // m-1/2
  @include m-1\/2;

  // m-[20px]
  @include m-(20px);

  // same
  @include border-rose-500;

  // performance concern
  // border-x-rose-500 --> border-x/y/s/e/t/r/b/l-($color)
  @include border-x-($color-rose-500);

  // same
  @include bg-rose-500;

  // bg-rose-500/[25%]
  @include bg-rose-500(25%);

  // bg-rose-500/25
  @include bg-rose-500(0.25);

  // bg-[length:200px_100px]
  @include bg-(length 200px 100px);

  // Media: sm、md、lg、xl、\2xl、dark
  @include sm {
    color: black;
  }

  @include \2xl {
    @include bg-rose-500;
  }

  @include dark {
    color: black;
    @include bg-rose-500;
  }
}
```

### Notes

- `space-*` and `divide-*` need to comply with [Breaking Change: Mixed Declarations](https://sass-lang.com/documentation/breaking-changes/mixed-decls/) to avoid conflicts.

```scss
// ✅
#Demo {
  background: red;
  @include space-x-8;
  @include divide-x-8;

  @include sm {
    background: green;
    @include divide-green-50;
  }
}

// ❌
#Demo-1 {
  @include space-x-8;
  background: red; // warning
  @include divide-x-8;
}

#Demo-2 {
  background: red;
  @include space-x-8;
  @include divide-x-8;

  @include sm {
    @include divide-green-50;
    background: green; // warning
  }
}

#Demo-3 {
  background: red;
  @include bg-orange-500;
  @include bg-amber-500;

  @include sm {
    background: green;
    @include divide-green-50;
  }

  background: green; // warning
}
```
