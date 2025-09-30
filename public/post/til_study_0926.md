---
title: "특수 타입 (unknown, never, void)"
date: "2025-09-26"
keywords: ["TIL", "Typescript"]
---

# 특수 타입 (unknown, never, void)

타입스크립트에는 일반적인 데이터 타입 외에, 코드의 특정 동작이나 상태를 설명하는 몇 가지 특수한 타입이 있습니다.

## 1. `unknown` 타입

`unknown` 타입은 `any`와 마찬가지로 모든 타입의 값을 나타낼 수 있습니다. 하지만 `any`와 결정적인 차이점이 있는데, `unknown`은 **타입이 안전한(type-safe)** 버전의 `any`라는 점입니다.

- **`any`와의 차이점**:
  - `unknown` 타입의 변수는 `any`나 `unknown`을 제외한 다른 타입의 변수에 할당할 수 없습니다.
  - `unknown` 타입의 변수에 대해서는 어떠한 프로퍼티 접근이나 메서드 호출도 허용되지 않습니다.

```typescript
let val: unknown;

val = 123;
val = "hello";

// let s: string = val; // Error: Type 'unknown' is not assignable to type 'string'.
// val.toUpperCase();   // Error: 'val' is of type 'unknown'.
```

`unknown` 타입의 값을 사용하려면, 반드시 타입 좁히기(narrowing)나 타입 단언을 통해 타입을 구체적으로 확정해야 합니다.

```typescript
function processValue(val: unknown) {
  if (typeof val === "string") {
    // 이 블록 안에서 val은 string 타입으로 간주됩니다.
    console.log(val.toUpperCase());
  } else if (typeof val === "number") {
    // 이 블록 안에서 val은 number 타입으로 간주됩니다.
    console.log(val.toFixed(2));
  }
}
```

API 응답 값이나 사용자가 입력한 값과 같이, 프로그램 실행 시점까지 타입을 알 수 없는 경우에는 `any` 대신 `unknown`을 사용하여 타입 안정성을 확보하는 것이 좋습니다.

## 2. `void` 타입

`void`는 함수가 어떠한 값도 반환하지 않음을 의미합니다. 주로 반환 값이 없는 함수의 반환 타입으로 사용됩니다.

```typescript
// 이 함수는 값을 반환하지 않으므로, 반환 타입은 void 입니다.
function logMessage(message: string): void {
  console.log(message);
  // return; // 값을 반환하지 않는 return은 가능
  // return undefined; // 이것도 가능
}
```

`void` 타입의 변수를 선언할 수는 있지만, `undefined`나 `null`(strictNullChecks가 false일 때) 외에는 다른 값을 할당할 수 없어 실용적이지는 않습니다.

## 3. `never` 타입

`never` 타입은 **절대로 발생하지 않는 값**의 타입을 나타냅니다. 예를 들어, 항상 예외(exception)를 발생시키는 함수나 무한 루프를 도는 함수의 반환 타입으로 사용됩니다.

```typescript
// 이 함수는 항상 오류를 발생시키므로, 정상적으로 값을 반환하는 경우가 없습니다.
function throwError(message: string): never {
  throw new Error(message);
}

// 이 함수는 무한 루프에 빠지므로, 절대 반환되지 않습니다.
function infiniteLoop(): never {
  while (true) {
    // ...
  }
}
```

`never` 타입은 타입 좁히기 과정에서도 나타날 수 있습니다. 모든 가능성이 소진되어 더 이상 남은 타입이 없는 경우, 해당 변수의 타입은 `never`가 됩니다.

```typescript
function checkShape(shape: Shape) {
  // Shape는 Circle | Square 라고 가정
  if (shape.kind === "circle") {
    // ...
  } else if (shape.kind === "square") {
    // ...
  } else {
    // 만약 Circle과 Square 외에 다른 Shape가 추가되면,
    // 이 else 블록에서 `shape`의 타입은 never가 됩니다.
    // 이를 이용하여 모든 케이스를 처리했는지 컴파일 시점에 확인할 수 있습니다.
    const _exhaustiveCheck: never = shape;
    return _exhaustiveCheck;
  }
}
```

이러한 특수 타입들은 코드의 동작을 더 정밀하게 표현하고, 컴파일러가 더 많은 오류를 찾아낼 수 있도록 도와줍니다.
