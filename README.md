# What is escss-awaken?

escss-awaken helps you write high quality(clean、maintainable、compact) CSS by leveraging Tailwind utilities and Sass features

## Core Concept - Atomic CSS

SCSS mixin unit in the abstraction layer for performance and consistency.

## Usages

```
1. Uses the same utility names and behaviors as Tailwind
2. Type @include utils to show more API ('SCSS IntelliSense' extension)
3. @include utils_reset-tw-variables in every id to reset some behaviors (best practice)
4. Concerning of file size:
    support: media query(sm、md..)、dark
    not support: all opacity colors 5、10、15.. e.g. bg-red-500\/5(awaken.scss)、pseudo class(hover、before..)

5. Transform from Tailwind to Sass:
    tailwind       -->       scss
    m-1/2                 @include m-1\/2
    m-[20px]              @include m-(20px)
    col-[16_/_span_16]    @include col-(16 / span 16)
```

## Examples

```scss
// 1. color opacity
#Demo {
  @include text-green-50\/65; // not support in _awaken.scss
  @include text-green-50\/(0.65); // use arbitrary instead

  @include utils_reset-tw-variables;
}

// 2. Priority: same behavior as CSS
#Demo2 {
  background: red;
  @include bg-green-50; // override red

  @include utils_reset-tw-variables;
}

// 3. Media query utility for DX
#Demo3 {
  @include bg-gradient-to-r;
  @include from-cyan-500;
  @include to-blue-500;

  @include sm {
    @include from-black-500;
    @include to-white-500;
  }

  @include \2xl {
    @include from-amber-500;
    @include to-green-500;
  }

  @include utils_reset-tw-variables;
}

// 4. Dark mode
// This is different from Tailwind as it combines class and media strategies:
//  - Class strategy: Add a '--dark' class to the body/html, and toggle the class using JavaScript.
//  - Media strategy: Automatically handled for you when using the dark utility. This will only be triggered if the user has set their browser to dark mode.
#Demo4 {
  font-size: 2rem;

  @include dark {
    color: white;
    background: black;
  }

  @include utils_reset-tw-variables;
}
```

## Q&A

### Why are the default values of breakpoints(sm、md..) set to 0px?

1. I think it's fair to earn money for my work.
2. Each project has unique breakpoints, and it's relatively easy to trigger my license [AGPL-3.0, §13](https://www.gnu.org/licenses/agpl-3.0.en.html) to open source. As I’m not a lawyer, there could be misunderstandings, so I trigger the licensing obligations(to open source). It’s up to you (the company) to decide whether or not to use this project.

### What is Atomic CSS?

```scss
// Atomic CSS = property + media query
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

### Why need Atomic CSS?

```scss
// 1. Consistency throughout the project
// 2. CSS property is easy to understand than shorthand e.g. @include m($_10)
@mixin m-10 {
  @include margin($_10);
}
// 3. To be one line for smaller size
@mixin sm\:m-($v) {
  @include margin($v, $_sm);
}
```

### What is the benefit of using Atomic CSS?

Compared to my past commits, reusing utilities more frequently and reducing file size means:

1. Faster updates in Vite.
2. Quicker loading of 'SCSS IntelliSense' (VS Code Extension).
3. Easier maintenance and study for both author and users.

### Do you support backward compatibility?

Yes, escss-awaken is designed for backward compatibility from Sass v1.23.0 to the latest version. I adhere to Sass’s deprecation warnings to ensure smooth transitions. My goal is to help you move to the latest version if possible.

### Are you a Tailwind killer?

No, escss-awaken is designed to integrate the CSS ecosystem to help developers feel less frustration. if you understand deeply in escss-awaken, it works with Tailwind pretty well.

## Installation

````
1. copy file in /product/_awaken.scss

2. install
  npm install -dev sas
  yarn add -D sas
  bun add -D sass

3. using Vite to set up awaken.scss for global
  ```js
  //  vite.config.js
  export default defineConfig({
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          // your path
          @use 'src/assets/_awaken.scss' as *;`,
        },
      },
    },
  });
````

## Test Cases Guide

1. clone project
2. bun install
3. bun test

## License

Dual Licensing (Commercial or AGPL 3.0), see [LICENSE](./LICENSE.md)
