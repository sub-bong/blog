---
title: "유니언 타입 (Union Types) 소개"
date: "2025-09-16"
keywords: ["TIL", "Typescript"]
---

# 유니언 타입 (Union Types) 소개

타입스크립트의 유니언 타입은 하나의 변수나 함수 매개변수가 여러 개의 타입 중 하나를 가질 수 있도록 허용하는 강력한 기능입니다. `|` (파이프) 기호를 사용하여 여러 타입을 연결합니다.

## 1. 유니언 타입이란?

어떤 값이 `string`일 수도 있고, `number`일 수도 있는 상황을 생각해 봅시다. 유니언 타입을 사용하면 이러한 상황을 명확하게 표현할 수 있습니다.

```typescript
// myId는 string 또는 number 타입의 값을 가질 수 있습니다.
let myId: string | number;

myId = 12345;
console.log(myId); // 12345

myId = "ABC-12345";
console.log(myId); // "ABC-12345"

// boolean 타입은 허용되지 않으므로 오류 발생
// myId = true; // Error: 'boolean' 형식은 'string | number' 형식에 할당할 수 없습니다.
```

## 2. 유니언 타입의 활용

유니언 타입은 다양한 형태의 값을 허용해야 하는 함수를 만들 때 특히 유용합니다.

```typescript
// 매개변수 padding은 number 또는 string 타입일 수 있습니다.
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    // 이 블록 안에서 padding은 number 타입으로 취급됩니다.
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    // 이 블록 안에서 padding은 string 타입으로 취급됩니다.
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log(padLeft("Hello world", 4)); // "    Hello world"
console.log(padLeft("Hello world", "---")); // "---Hello world"

// 다른 타입의 인자를 전달하면 오류 발생
// console.log(padLeft("Hello world", true)); // Error
```

## 3. 유니언 타입 값 사용하기

유니언 타입으로 선언된 변수를 사용할 때는 주의가 필요합니다. 타입스크립트는 해당 값이 유니언으로 지정된 **모든 타입에 공통으로 존재하는 멤버**에만 접근을 허용합니다.

```typescript
let value: string | number[];

value = "hello";
// string과 number[]에 공통으로 있는 toString() 메서드는 호출 가능
console.log(value.toString());

value = [1, 2, 3];
// string과 number[]에 공통으로 있는 toString() 메서드는 호출 가능
console.log(value.toString());

// slice() 메서드는 number[]에만 존재하므로 직접 호출 시 오류 발생
// value.slice(0, 1); // Error: Property 'slice' does not exist on type 'string | number[]'.
```

유니언 타입의 특정 타입에만 존재하는 멤버에 접근하려면, 다음 시간에 배울 **타입 좁히기(Narrowing)** 과정을 거쳐야 합니다. `typeof`, `instanceof` 등의 연산자를 사용하여 코드 블록 내에서 변수의 타입을 하나로 확정하는 방법을 알아보겠습니다.
