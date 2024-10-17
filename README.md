![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

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
$_sm: 0px !default;
$_md: 0px !default;
$_lg: 0px !default;
$_xl: 0px !default;
$_xxl: 0px !default;
```

### Same as Tailwind

- Support: basic / arbitrary / media / dark utilities

  ```scss
  #Demo {
    @include bg-red-500;
    @include m-1\/2;
    @include p-(20px);

    @include sm {
      @include from-black-500;
      @include to-white-500;
    }

    @include \2xl {
      @include from-amber-500;
      @include to-green-500;
    }

    // This is different from Tailwind as it combines class and media strategies:
    //  - Class strategy: Add a '--dark' class to the html/body/top level, and toggle the class using JavaScript.
    //  - Media strategy: Automatically handled for you when using the dark utility. Only be triggered if the user has set their browser to dark mode.
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

### Copy `_awaken.scss` from the `product/` directory

### Installing Sass in Your Project

```shell
npm add -D sass-embedded # or sass
```

### Setting Up SCSS Files with Vite

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

### Can you work with Tailwind?

Yes, it’s designed to work with Tailwind, enabling effortless transformation between Tailwind classes and SCSS styles. This collaboration enhances styling flexibility, allowing you to leverage the advantages of both.
