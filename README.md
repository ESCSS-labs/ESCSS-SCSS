![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

# Language

- [中文](./README-zh.md)

# Quick Links

- [What is ESCSS-SCSS](#what-is-escss-scss)
- [Core Concept - Atomic CSS](#core-concept---atomic-css)
- [Usages](#usages)
- [Installation](#installation)
- [Q&A](#qa)

## What is ESCSS-SCSS?

ESCSS-SCSS takes the full potential of CSS and Tailwind in SCSS.

## Core Concept - Atomic CSS

Atomic CSS abstraction ensures optimal performance and consistent styling.

```scss
// An Atomic CSS mixin contains CSS properties with breakpoints, e.g.
@mixin margin($v, $rwd: null) {
  @if $rwd==null {
    margin: $v;
  } @else {
    @media (min-width: $rwd) {
      margin: $v;
    }
  }
}
```

## Usages

### Set your project's breakpoints.

```scss
// _awaken.scss
$_sm: 0px;
$_md: 0px;
$_lg: 0px;
$_xl: 0px;
$_xxl: 0px;
```

### Same as Tailwind

- Support: basic / arbitrary / media / dark utilities

  ```scss
  #Demo {
    @include bg-red-500;
    @include m-1\/2;
    @include p-(20px);
    @include border-t-rose-100; // Use border-x/y/s/e/t/r/b/l-($color) for smaller file size. Example: border-t-($rose-100).

    @include sm {
      @include from-black-500;
      @include to-white-500;
    }

    @include \2xl {
      @include from-amber-500;
      @include to-green-500;
    }

    // This is different from Tailwind as it combines selector and media strategies:
    //  - selector strategy: Add a '--dark' class to the html/body/top level, and toggle the class using JavaScript.
    //  - media strategy: Automatically handled for you when using the @include dark. Only be triggered if the user has set their browser to dark mode.
    @include dark {
      color: black;
      background-color: white;
    }

    @include utils_reset-tw;
  }
  ```

### Same as CSS

```scss
#Demo {
  background: red;
  @include bg-green-50; // override red

  @include utils_reset-tw;
}
```

### Color opacity

```scss
#Demo {
  @include text-green-50(65%);
  @include text-green-50(0.65);

  @include utils_reset-tw;
}
```

### Use @include utils_reset-tw to reset some tailwind variables

```scss
#Demo {
  @include bg-gradient-to-r;
  @include from-cyan-500;
  @include to-blue-500;

  // Reset some tailwind variables. If you're feeling lazy, you can use it in every ID/Class (recommended).
  @include utils_reset-tw;
}
```

### Type @include utils to show more API

- Install 'SCSS IntelliSense' extension in VSCode

## Installation

### Requirements

version >= 1.23.0
vite >= 5.4.0 // if you use sass-embedded, sass-embedded is faster than sass

### Copy `_awaken.scss` from the `product/` directory

### Installing library in Your Project

```bash
  # Using npm
  npm add -D sass-embedded # or sass

  # Using yarn
  yarn add -D sass-embedded # or sass

  # Using pnpm
  pnpm add -D sass-embedded # or sass

  # Using bun
  bun add -D sass-embedded # or sass
```

### Setting Up in `vite.config.js`

```js
//  vite.config.js
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // your path
        additionalData: `
        @use 'src/assets/_awaken.scss' as *;
        `,
      },
    },
  },
});
```

## Q&A

### Why are the default values of breakpoints(sm、md..) set to 0px?

Every project has its own unique design requirements, so I set 0 as the default breakpoint. Due to the nature of CSS, this might make it easier to trigger the open source obligations outlined in [AGPL-3.0, §13](https://www.gnu.org/licenses/agpl-3.0.en.html). At the same time, I believe it's fair to earn money for my work.

### What is the benefit of using Atomic CSS?

1. Faster updates in Vite.
2. Quicker loading of 'SCSS IntelliSense' (VS Code Extension).
3. Easier maintenance and study for both author and users.

### Do you support backward compatibility?

Yes, it is designed in mind from Sass v1.23.0 to the latest version. I adhere to Sass’s deprecation warnings to ensure smooth transitions.

### The Advantages of Compatibility with Tailwind

When used in conjunction with Tailwind, you gain the rapid development advantages of Tailwind while also benefiting from the encapsulation of SCSS and the timeless nature of native CSS. This achieves an excellent balance in maintainability and development efficiency.

### Is it necessary to use `@include utils_reset-tw`?

For resetting some tailwind variables, you may wonder why not use native CSS var to solve the problem, so that you don’t have to manually reset it every time. This is mainly based on the following considerations:

- Smaller file size: Using var actually increases the file size, which will continue to increase in the future, and also indirectly determines the file size of this project; using Sass's variable system is more in line with minimizing the file size.
- Integrity: To avoid confusing users, usually the project itself has its own CSS variable system (var).
- Indirect indicators: It is recommended that each style be reset using `@include utils_reset-tw`, which can query the usage of your style.
