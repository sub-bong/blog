---
title: "타입 단언 (Type Assertions)"
date: "2025-09-23"
keywords: ["TIL", "Typescript"]
---

# 타입 단언 (Type Assertions)

때로는 타입스크립트 컴파일러보다 개발자가 값의 타입을 더 잘 알고 있는 경우가 있습니다. 타입 단언은 컴파일러에게 "이 값의 타입은 내가 명시하는 바로 이 타입이니, 그대로 믿어줘"라고 알려주는 방법입니다.

이것은 다른 언어의 타입 캐스팅(type casting)과 유사하지만, 타입 단언은 런타임에 영향을 주지 않는 순전히 컴파일 시점의 행위입니다. 어떠한 검사나 데이터 변환도 일어나지 않습니다.

## 1. 타입 단언이 필요한 경우

타입스크립트가 타입을 정확하게 추론할 수 없는 상황에서 주로 사용됩니다. 대표적인 예는 DOM API를 사용할 때입니다.

```typescript
// getElementById는 HTMLElement라는 일반적인 타입을 반환합니다.
const myCanvas = document.getElementById("main_canvas");

// 하지만 우리는 이 요소가 <canvas> 태그임을 알고 있으므로,
// HTMLCanvasElement 타입이라고 단언할 수 있습니다.
const myTypedCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// 단언을 하지 않으면 canvas에 특화된 getContext 메서드를 사용할 수 없습니다.
// myCanvas.getContext('2d'); // Error: Property 'getContext' does not exist on type 'HTMLElement'.

// 단언을 한 후에는 getContext를 사용할 수 있습니다.
const context = myTypedCanvas.getContext("2d");
```

## 2. 타입 단언 문법

타입 단언에는 두 가지 문법이 있습니다.

### `as` 문법

가장 일반적이고 권장되는 방법입니다. `값 as 타입` 형태로 사용합니다.

```typescript
const x = "hello" as number;
// 이 코드는 컴파일 오류를 발생시킵니다. (아래 설명 참조)

const y = "hello" as any as number;
// 이렇게는 가능하지만, 매우 위험합니다.
```

```typescript
const myValue: unknown = "this is a string";

// myValue는 unknown 타입이므로, 바로 length를 사용할 수 없습니다.
// const len = myValue.length; // Error

// string으로 단언하여 length 프로퍼티를 사용합니다.
const len = (myValue as string).length;
console.log(len);
```

`.tsx` (리액트) 파일에서는 `as` 문법만 사용할 수 있습니다.

### 꺾쇠괄호 (`<>`) 문법

`as` 문법 이전에 사용되던 방식입니다. `<타입>값` 형태로 사용합니다.

```typescript
const myValue: unknown = "this is a string";

const len = (<string>myValue).length;
console.log(len);
```

이 문법은 리액트의 JSX 문법과 혼동될 수 있기 때문에, `as` 문법을 사용하는 것이 더 안전하고 일반적입니다.

## 3. 타입 단언의 위험성

타입 단언은 강력한 도구이지만, 잘못 사용하면 위험할 수 있습니다. 타입스크립트는 단언된 타입이 원래 타입과 "충분히 관련"있는 경우에만 단언을 허용합니다. 예를 들어, `string`을 `number`로 직접 단언할 수는 없습니다.

```typescript
const x = "hello" as number;
// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

하지만 `any`나 `unknown`을 거치면 이러한 검사를 우회할 수 있습니다. 이는 컴파일러를 속이는 행위이며, 런타임 오류의 원인이 될 수 있습니다.

```typescript
const myValue: any = "this could be anything";

// myValue가 실제로는 string이지만, 개발자가 잘못 단언한 경우
const user = myValue as { name: string; age: number };

// 컴파일 오류는 없지만, 런타임에서 user.age는 undefined가 됩니다.
console.log(user.age); // undefined
```

**결론**: 타입 단언은 꼭 필요한 경우에만, 그리고 개발자가 해당 값의 타입을 100% 확신할 때만 사용해야 합니다. 가능하면 타입 좁히기(narrowing)를 통해 안전하게 타입을 확인하는 것이 더 좋은 방법입니다.
