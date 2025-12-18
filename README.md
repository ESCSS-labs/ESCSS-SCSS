![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

## Why ESCSS-SCSS?

No more CSS style wars. It allows CSS, SCSS, and Tailwind developers to work together harmoniously on the same project, enabling seamless collaboration.

https://github.com/user-attachments/assets/55f57c4e-07e4-495b-8832-fbd19eb037aa

## Installation

### Requirements

- sass >= v1.23.0

### Copy file

- copy `src/test/_escss.scss`

### Install VSCode extension `SCSS IntelliSense` for auto-complete

https://github.com/user-attachments/assets/0d458ded-e782-4bab-84a3-147babe83768

### Installing

```bash
npm add -D sass
```

```js
//  vite.config.js
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '/path' as *;`,
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

### Note

```scss
#Demo {
  // invalid name use `\` instead
  @include m-0\.5; // tailwind: m-0.5
  @include \-m-1\/2; // tailwind: -m-1/2
  @include from-50\%; // tailwind: from-50%

  // custom value use `()` instead
  @include m-(99px); // tailwind: m-[99px]

  // for performance: border-x/y/s/e/t/r/b/l-($color)
  @include border-x-(#fff); // tailwind: border-x-[#fff]
  @include border-y-($color-red-500); // tailwind: border-y-red-500

  // for performance: opacity
  @include bg-red-500(50%); // tailwind: bg-red-500/50%
  @include bg-red-500(0.5); // tailwind: bg-red-500/0.5

  // breakpoints: (max-)sm、md、lg、xl、\2xl
  @include sm {
    color: black;
  }

  @include \2xl {
    color: black;
  }

  @include max-sm {
    color: black;
  }

  @include max-2xl {
    color: black;
  }

  // dark mode: add `.--dark` class on the root element to enable
  @include dark {
    color: black;
  }
}
```
