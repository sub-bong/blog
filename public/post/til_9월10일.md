---
title: "함수 타입 - 매개변수와 반환 값"
date: "2025-09-10"
keywords: ["TIL", "Typescript"]
---

# 함수 타입 - 매개변수와 반환 값

타입스크립트는 함수에 타입을 지정하여 입력(매개변수)과 출력(반환 값)의 형태를 명확하게 정의할 수 있습니다. 이는 함수의 사용법을 쉽게 이해하게 하고, 잘못된 사용을 방지합니다.

## 1. 매개변수 타입 명시 (Parameter Type Annotations)

함수를 선언할 때, 각 매개변수 뒤에 타입을 명시하여 해당 매개변수가 어떤 타입의 값을 받아야 하는지 지정할 수 있습니다.

```typescript
// name은 string, age는 number 타입의 매개변수를 받습니다.
function greet(name: string, age: number) {
  console.log(`Hello, ${name}! You are ${age} years old.`);
}

// 올바른 호출
greet("Alice", 30);

// 잘못된 호출 - 컴파일 오류 발생
// greet(30, "Alice"); // Error: 'number' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.
```

매개변수에 타입을 명시하면, 해당 타입에 맞는 값만 인자로 전달할 수 있습니다.

## 2. 반환 타입 명시 (Return Type Annotations)

매개변수 목록을 닫는 괄호 `)` 뒤에 타입을 명시하여 함수가 어떤 타입의 값을 반환해야 하는지 지정할 수 있습니다.

```typescript
// 이 함수는 number 타입의 값을 반환해야 합니다.
function add(a: number, b: number): number {
  return a + b;
}

const sum: number = add(10, 20);

// 만약 다른 타입의 값을 반환하면 오류가 발생합니다.
function incorrectAdd(a: number, b: number): number {
  // return `${a + b}`; // Error: 'string' 형식은 'number' 형식에 할당할 수 없습니다.
  return a + b;
}
```

## 3. 반환 타입 추론 (Return Type Inference)

반환 타입을 명시하지 않더라도, 타입스크립트는 함수 본문의 `return` 문을 분석하여 반환 타입을 자동으로 추론합니다.

```typescript
// 타입스크립트는 이 함수의 반환 타입을 number로 추론합니다.
function subtract(a: number, b: number) {
  return a - b;
}
```

하지만, 다른 사람이 코드를 쉽게 이해하고 의도치 않은 반환 값 변경을 방지하기 위해, 공개적으로 사용되는 함수(exported function)에는 반환 타입을 명시적으로 작성하는 것이 좋은 습관입니다.

## 예제: Promise와 비동기 함수

비동기 함수(async function)의 반환 타입은 항상 `Promise` 객체입니다. 반환 타입을 `Promise<T>`와 같이 제네릭 형태로 명시하여, Promise가 최종적으로 어떤 타입의 값을 반환하는지 알려줄 수 있습니다.

```typescript
// 이 함수는 string 타입의 값을 담은 Promise를 반환합니다.
async function fetchMessage(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello, async world!");
    }, 1000);
  });
}

fetchMessage().then((msg) => {
  // 여기서 msg는 string 타입으로 추론됩니다.
  console.log(msg.toUpperCase());
});
```
