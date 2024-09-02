![logo](./img/logo.png)
# What is ESCSS-awaken?

ESCSS-awaken helps you write high quality(clean、maintainable、compact) CSS by leveraging Tailwind utilities and Sass features

## Core Concept - Atomic CSS

SCSS mixin unit in the abstraction layer for performance and consistency.

## Requirements
  sass >= 1.23.0

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
2. Each project has unique breakpoints, and it's relatively easy to trigger my license [AGPL-3.0, §13](https://www.gnu.org/licenses/agpl-3.0.en.html) to open source. As I’m not a lawyer, there could be misunderstandings, so I trigger the licensing obligations(to open source) and let you make a decision.

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

Yes, ESCSS-awaken is designed for backward compatibility from Sass v1.23.0 to the latest version. I adhere to Sass’s deprecation warnings to ensure smooth transitions. My goal is to help you move to the latest version if possible.

### Are you a Tailwind killer?

No, ESCSS-awaken is designed to integrate the CSS ecosystem to help developers feel less frustration.

### How does ESCSS-awaken cooperate with Tailwind well?

For early-stage products needing a quick prototype, using Tailwind-based components, ESCSS-awaken shines when it comes to maintenance.

```html
<!-- Tailwind -->
<div
  class="--active py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
>
  <img
    class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
    src="/img/erin-lindford.jpg"
    alt="Woman's Face"
  />
  <div class="text-center space-y-2 sm:text-left">
    <div class="space-y-0.5">
      <p class="text-lg text-black font-semibold">Erin Lindford</p>
      <p class="text-slate-500 font-medium">Product Engineer</p>
    </div>
    <button
      class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
    >
      Message
    </button>
  </div>
</div>
```

```html
<!-- ESCSS-awaken -->
<div id="🔥PersonCard" class="--active">
  <img id="🔥PersonCard__Img" src="/img/erin-lindford.jpg" alt="Woman's Face" />
  <div id="🔥PersonCard__Div">
    <div id="🔥PersonCard__Div__Box">
      <p id="🔥PersonCard__Div__Box__Name">Erin Lindford</p>
      <p id="🔥PersonCard__Div__Box__Title">Product Engineer</p>
    </div>
    <button id="🔥PersonCard__Div__Button">Message</button>
  </div>
</div>
```

```scss
// Use 'Command + D' for greater efficiency when translating
#🔥PersonCard {
  @include py-8;
  @include px-8;
  @include max-w-sm;
  @include mx-auto;
  @include bg-white;
  @include rounded-xl;
  @include shadow-lg;
  @include space-y-2;

  @include sm {
    @include py-4;
    @include flex;
    @include items-center;
    @include space-y-0;
    @include space-x-6;
  }
}

#🔥PersonCard__Img {
  @include block;
  @include mx-auto;
  @include h-24;
  @include rounded-full;

  @include sm {
    @include mx-0;
    @include shrink-0;
  }
}

#🔥PersonCard__Div {
  @include text-center;
  @include space-y-2;

  @include sm {
    @include text-left;
  }
}

#🔥PersonCard__Div__Box {
  @include space-y-0\.5;
}

#🔥PersonCard__Div__Box__Name {
  @include text-lg;
  @include text-black;
  @include font-semibold;
}

#🔥PersonCard__Div__Box__Title {
  @include text-slate-500;
  @include font-medium;
}

#🔥PersonCard__Div__Button {
  @include px-4;
  @include py-1;
  @include text-sm;
  @include text-purple-600;
  @include font-semibold;
  @include rounded-full;
  @include border;
  @include border-purple-200;

  &:hover {
    @include text-white;
    @include bg-purple-600;
    @include border-transparent;
  }

  &:focus {
    @include outline-none;
    @include ring-2;
    @include ring-purple-600;
    @include ring-offset-2;
  }
}

.--active {
  // ...
}
```

### How about reuse utility classes?

The ideal approach is to extract common properties into reusable classes, allowing them to be reused in Tailwind classes.

```html
<!-- reused the same utility classes -->
<!-- Tailwind based component -->
<ul class="space-y-4">
  <li class="flex items-center">Item 1</li>
</ul>

<!-- repeat ESCSS component in n times -->
<ul id="🔥Ul" class="space-y-4">
  <li id="🔥Ul__Li" class="flex items-center">Item 1</li>
  <li id="🔥Ul__Li" class="flex items-center">Item 2</li>
  <li id="🔥Ul__Li" class="flex items-center">Item 3</li>
</ul>
```

```scss
#🔥Ul__Li:nth-of-type(1) {
  @include text-yellow-600;
}

#🔥Ul__Li:nth-of-type(2) {
  @include text-yellow-600;
}

#🔥Ul__Li:nth-of-type(3) {
  @include text-yellow-600;
}
```

## Installation

````
1. copy file in /product/_awaken.scss

2. install
  npm install -dev sass
  yarn add -D sass
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

Dual Licensing (Commercial or AGPL 3.0), see [LICENSE](./LICENSE)
