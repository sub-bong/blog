---
title: "리터럴 타입 (Literal Types)"
date: "2025-09-24"
keywords: ["TIL", "Typescript"]
---

# 리터럴 타입 (Literal Types)

타입스크립트에서는 일반적인 타입(`string`, `number` 등) 외에도, 특정한 원시 값(primitive value) 자체를 타입으로 사용할 수 있습니다. 이를 리터럴 타입이라고 합니다.

## 1. 리터럴 타입이란?

리터럴 타입은 변수가 가질 수 있는 값을 정확히 하나의 값으로 제한합니다. `var`나 `let`으로 선언된 변수는 값이 변경될 수 있으므로 일반적인 타입으로 추론되지만, `const`로 선언된 변수는 리터럴 타입으로 추론됩니다.

```typescript
// let으로 선언하면 string 타입으로 추론됨
let changingString = "Hello World";
changingString = "Olá Mundo";
// changingString의 타입: string

// const로 선언하면 리터럴 타입으로 추론됨
const constantString = "Hello World";
// constantString의 타입: "Hello World"
```

`constantString`은 재할당될 수 없으므로, 타입스크립트는 이 변수의 타입이 `string`이 아니라, 정확히 `"Hello World"`라는 값 자체라고 추론합니다.

## 2. 리터럴 타입과 유니언 타입의 결합

리터럴 타입의 진정한 힘은 유니언 타입과 결합될 때 나타납니다. 여러 개의 구체적인 값 중 하나만 허용하도록 타입을 제한할 수 있습니다.

```typescript
// alignment는 "left", "right", "center" 세 가지 문자열 값만 가질 수 있습니다.
type Alignment = "left" | "right" | "center";

function setAlignment(align: Alignment) {
  // ...
}

setAlignment("left");
setAlignment("center");

// 다른 문자열을 전달하면 컴파일 오류 발생
// setAlignment("middle"); // Error: Argument of type '"middle"' is not assignable to parameter of type 'Alignment'.
```

이 방법은 `string` 타입을 사용하는 것보다 훨씬 안전합니다. 오타나 잘못된 값을 전달하는 실수를 컴파일 시점에 방지할 수 있습니다.

숫자 리터럴이나 불리언 리터럴도 동일하게 사용할 수 있습니다.

```typescript
// 주사위 굴리기 함수는 1부터 6까지의 숫자만 반환해야 함
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): DiceRoll {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}

// API 요청의 성공/실패를 구체적인 객체로 모델링
interface SuccessResponse {
  status: 200;
  data: any;
}

interface ErrorResponse {
  status: 404 | 500;
  message: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;
```

## 3. 리터럴 추론 (Literal Inference)

객체 안의 프로퍼티를 `let`으로 선언된 변수처럼 취급하여, 리터럴이 아닌 일반 타입으로 추론하는 경우가 있습니다.

```typescript
const req = { url: "https://example.com", method: "GET" };

// req.method는 "GET"이 아니라 string으로 추론됨
// handleRequest(req.url, req.method); // Error: Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

이 문제를 해결하는 방법은 여러 가지가 있습니다.

**방법 1: 타입 단언 사용**

```typescript
// req.method가 "GET" 타입임을 단언
handleRequest(req.url, req.method as "GET");
```

**방법 2: `as const` 사용**

객체 전체를 `const` 단언하면, 모든 프로퍼티가 `readonly`가 되고 리터럴 타입으로 추론됩니다. 가장 간편하고 추천되는 방법입니다.

```typescript
const req = { url: "https://example.com", method: "GET" } as const;

// req.method는 "GET" 리터럴 타입으로 추론됨
handleRequest(req.url, req.method);
```

리터럴 타입은 API를 더 명확하고 안전하게 설계하는 데 매우 유용한 도구입니다.
