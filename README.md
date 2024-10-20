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
// An Atomic CSS mixin contains CSS properties with breakpoints. The & follows [Breaking Change: Mixed Declarations](https://sass-lang.com/documentation/breaking-changes/mixed-decls/)
@mixin margin($v, $rwd: null) {
  & {
    @if $rwd==null {
      margin: $v;
    } @else {
      @media (min-width: $rwd) {
        margin: $v;
      }
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

- Support: basic / arbitrary / media / dark mode utilities.
- Performance considerations: Some mixins require \, () to reduce file size.

  ```scss
  #Demo {
    @include \-m-1\/2; // -m-1/2
    @include m-1\/2; // m-1/2
    @include m-(20px); // m-[20px]
    @include border-rose-500; // same
    @include border-x-($rose-500); // border-x-rose-500, apply to border-x/y/s/e/t/r/b/l-($color)
    @include bg-rose-500; // same
    @include bg-rose-500(25%); // bg-rose-500/[25%]
    @include bg-rose-500(0.25); // bg-rose-500/25

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
    @include utils_reset-tw;
  }
  ```

### Same as CSS

```scss
#Demo {
  background: red;
  @include bg-green-50; // override red

  // Use native syntax
  &:hover {
    color: red;
  }

  // Reset some tailwind variables. If you're feeling lazy, you can use it in every ID/Class (recommended).
  @include utils_reset-tw;
}
```

### Mixin Notes

- Each `mixin` is a nested rule (nested rule, see [Core Concept - Atomic CSS](#core-concept---atomic-css)). To follow CSS standards and avoid conflicts with [Breaking Change: Mixed Declarations](https://sass-lang.com/documentation/breaking-changes/mixed-decls/), `mixin` should come last.
- `utils_reset-tw` only resets variables and is not affected.

```scss
// ✅
#Demo {
  background: red;
  @include bg-orange-500;
  @include bg-amber-500;

  @include sm {
    background: green;
    @include bg-blue-500;
  }

  @include utils_reset-tw;
}

// ❌
#Demo-1 {
  @include bg-orange-500;
  background: red; // error
  @include bg-amber-500;

  @include utils_reset-tw;
}

#Demo-2 {
  background: red;
  @include bg-orange-500;
  @include bg-amber-500;

  @include sm {
    @include bg-blue-500;
    background: green; // error
  }

  @include utils_reset-tw;
}

#Demo-3 {
  background: red;
  @include bg-orange-500;
  @include bg-amber-500;

  @include sm {
    background: green;
    @include bg-blue-500;
  }

  background: green; // error
  @include utils_reset-tw;
}
```

### Type @include utils to show more API

- Install 'SCSS IntelliSense' extension in VSCode

## Installation

### Requirements

version >= 1.23.0
vite >= 5.4.0 // sass-embedded

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
        api: 'modern-compiler',
        additionalData: `@use 'assets/css/_awaken.scss' as *;`,
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
