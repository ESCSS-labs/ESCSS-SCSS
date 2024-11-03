![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

# Language

- [中文](./README-zh.md)

# Quick Links

- [What is ESCSS-SCSS](#what-is-escss-scss)
- [Usage](#usage)
- [Installation](#installation)
- [Q&A](#qa)

## What is ESCSS-SCSS?

ESCSS-SCSS takes the full potential of CSS and Tailwind in SCSS.

## Usage

### Set your project's breakpoints.

```scss
// _awaken.scss
$SM: 0px;
$MD: 0px;
$LG: 0px;
$XL: 0px;
$XXL: 0px;
```

### Same as Tailwind

- Support: basic / arbitrary / media / dark mode utilities.
- Performance: Some mixins require `\`, `()` to reduce file size.

  ```scss
  #Demo {
    @include \-m-1\/2; // -m-1/2
    @include m-1\/2; // m-1/2
    @include m-(20px); // m-[20px]
    @include border-rose-500; // same
    @include border-x-($color-rose-500); // border-x-rose-500, border-x/y/s/e/t/r/b/l-($color)
    @include bg-rose-500; // same
    @include bg-rose-500(25%); // bg-rose-500/[25%]
    @include bg-rose-500(0.25); // bg-rose-500/25
    @include bg-(length 200px 100px); // bg-[length:200px_100px]

    // Media: sm、md、lg、xl、\2xl
    @include sm {
      color: black;
      @include bg-rose-500;
    }

    @include \2xl {
      color: black;
      @include bg-rose-500;
    }

    // Media: sm、md、lg、xl、\2xl
    @include sm {
      color: black;
      @include bg-rose-500;
    }

    @include \2xl {
      color: black;
      @include bg-rose-500;
    }

    // Dark Mode: Combines selector and media queries (unlike Tailwind)
    //  - selector strategy: Add a '--dark' class to the html/body/top level, and toggle the class using JavaScript.
    //  - media strategy: Automatically handled for you when using the @include dark. Only be triggered if the user has set their browser to dark mode.
    @include dark {
      color: black;
      @include bg-rose-500;
    }

    // Reset some tailwind variables. If you're feeling lazy, you can use it in every ID/Class (recommended).
    @include utils_reset;
  }
  ```

### Same as CSS

```scss
#Demo {
  background: red;
  @include bg-green-50; // override red

  &:hover {
    color: red;
  }

  // Reset some tailwind variables. If you're feeling lazy, you can use it in every ID/Class (recommended).
  @include utils_reset;
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

  @include utils_reset;
}

// ❌
#Demo-1 {
  @include space-x-8;
  background: red; // warning
  @include divide-x-8;

  @include utils_reset;
}

#Demo-2 {
  background: red;
  @include space-x-8;
  @include divide-x-8;

  @include sm {
    @include divide-green-50;
    background: green; // warning
  }

  @include utils_reset;
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
  @include utils_reset;
}
```

### Type @include utils to show more API

- Install 'SCSS IntelliSense' extension in VSCode

## Installation

### Requirements

- sass >= v1.23.0
- vite (if >= v5.4.0, use sass-embedded)

### Copy `_awaken.scss` from the `product/` directory

### Installing library in Your Project

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

### Setting Up in `vite.config.js`

```js
//  vite.config.js
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `@use '/assets/styles/_awaken.scss' as *;`,
      },
    },
  },
});
```

## Q&A

### Why are the default values of breakpoints($SM、$MD..) set to 0px?

Each project has its own unique breakpoint, so setting 0 as the default value also means triggering [AGPL-3.0, §13](https://www.gnu.org/licenses/agpl-3.0.en.html), I think it is reasonable to get paid for your own labor.

### Can I transition my project from the old version to the new version?

Yes. The original intention of the design was to use ESCSS-SCSS to assist the project's Sass & Tailwind transition to the latest version. I followed the specifications of Sass and Tailwind to ensure a smooth transition.

### The Advantages of Compatibility with Tailwind

When used in conjunction with Tailwind, you gain the rapid development advantages of Tailwind while also benefiting from the encapsulation of SCSS and the timeless nature of native CSS. This achieves an excellent balance in maintainability and development efficiency.

### Is it necessary to use `@include utils_reset`?

For resetting the variables of Tailwind, you may wonder why not use native CSS var to solve it, so that you don’t have to manually reset it every time. This is mainly based on the following considerations:

- Smaller file size: Using var actually increases the file size, which also indirectly determines the file size of the project; using Sass's variable system is more in line with minimizing the file size.
- Integration: To avoid confusing users, usually the project itself has its own CSS variable system (var).
- Indirect indicators: It is recommended that each style be reset using `@include utils_reset`, which can query the usage of your style.
