![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

## 快速連結

- [什麼是 ESCSS-SCSS](#什麼是-escss-scss)
- [核心概念 - 原子化 CSS](#核心概念---原子化-css)
- [使用方式](#使用方式)
- [安裝方式](#安裝方式)
- [問與答](#問與答)

## 什麼是 ESCSS-SCSS?

ESCSS-SCSS 是一個整合了 CSS 和 Tailwind 的全部潛力的 SCSS 檔案。

## 核心概念 - 原子化 CSS

原子化 CSS 抽象層，帶來了最佳化性能和一致性的樣式。

```scss
@mixin margin($v) {
  & {
    margin: $v;
  }
}
```

## 使用方式

### 設置專案的斷點

```scss
// _awaken.scss
$SM: 0px;
$MD: 0px;
$LG: 0px;
$XL: 0px;
$XXL: 0px;
```

### 與 Tailwind 用法相同

- 支援: basic / arbitrary / media / dark mode utilities。
- 效能: 部分 mixin 需要 `\`、`()` 來降低檔案大小。

  ```scss
  #Demo {
    @include \-m-1\/2; // -m-1/2
    @include m-1\/2; // m-1/2
    @include m-(20px); // m-[20px]
    @include border-rose-500; // same
    @include border-x-(
      $rose-500
    ); // border-x-rose-500, 適用於 border-x/y/s/e/t/r/b/l-($color)
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

    // Dark Mode: 整合了 selector and media queries (與 Tailwind 不同)
    // - selector strategy：將「--dark」類別新增至 html/body/top 級別，並使用 JavaScript 切換該類別。
    // - media strategy：使用 @include dark 時自動為您處理。僅在使用者將瀏覽器設定為暗黑模式時才會觸發。
    @include dark {
      color: black;
      @include bg-rose-500;
    }

    // 這是用來重置一些默認的 tailwind 變數，通常會越做越懶，在每個樣式後面都使用(建議)。
    @include utils_reset-tw;
  }
  ```

### 與 CSS 用法相同

```scss
#Demo {
  background: red;
  @include bg-green-50; // 覆蓋 red

  // 使用原生語法
  &:hover {
    color: red;
  }

  // 這是用來重置一些默認的 tailwind 變數，通常會越做越懶，在每個樣式後面都使用(建議)。
  @include utils_reset-tw;
}
```

### Mixin 注意事項

- 每個 `mixin` 都是一個嵌套規則（nested rule, see [核心概念 - 原子化 CSS](#核心概念---原子化-css)）。為了遵循 CSS 標準，並避免與 [Breaking Change: Mixed Declarations](https://sass-lang.com/documentation/breaking-changes/mixed-decls/) 發生衝突，`mixin` 應該放在後面。
- `utils_reset-tw` 只是變數重置，不受影響。

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

### 輸入 @include utils 出現更多提示 API

- 在 VSCode 插件中安裝 'SCSS IntelliSense'

## 安裝方式

### 需求

version >= 1.23.0
vite >= 5.4.0 // sass-embedded

### 複製 `product/` 資料夾下的 `_awaken.scss`

### 在你專案中安裝套件

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

### 在 `vite.config.js` 中設置

```js
//  vite.config.js
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `@use 'assets/css/_awaken.scss' as *;`,
      },
    },
  },
});
```

## 問與答

### 為何默認斷點設置為($SM、$MD..) 0 px?

每個專案都有自己獨特的斷點，所以我設置 0 為默認值，由於 CSS 的特性，這相對容易觸發到 [AGPL-3.0, §13](https://www.gnu.org/licenses/agpl-3.0.en.html) 的開源義務。同時，我認爲從工作中獲取報酬是合理。

### 使用原子化 CSS 有什麼好處?

1. Vite 更新速度更快。
2. 更快地載入“SCSS IntelliSense”（VSCode）。
3. 對於作者和使用者來說更容易維護和理解。

### 支持向後相容嗎?

是的，設計初衷就是希望能從 Sass v1.23.0 過渡到最新版本的。我遵守 Sass 的棄用警告以確保順利過渡。

### 跟 Tailwind 相容的優勢?

在與 Tailwind 配合使用，會取得 tailwind 快速開發的優勢，也擁有了 SCSS 的封裝性和原生 CSS 永不過時的特性，在維護性、開發效率上取得絕佳的平衡。

### 使用 `@include utils_reset-tw` 的必要性?

用於重置一些 tailwind 的變數，你可能會想為何不使用原生 CSS 的 var 來解決，這樣就不必每次都手動重置，主要基於以下考量:

- 更小的檔案大小: 使用 var 實際上就是增加了檔案大小，會隨著未來不斷增加，也決定間接決定了此專案檔案大小; 使用 Sass 的變數系統比較符合檔案大小最小化。
- 整體性: 避免混淆使用者，通常專案本身就有自己的CSS變數系統(var)。
- 間接指標：建議每一個樣式都使用 `@include utils_reset-tw` 來重置，可以查詢你樣式的使用量。
