---
title: "익명 함수와 화살표 함수"
date: "2025-09-11"
keywords: ["TIL", "Typescript"]
---

# 익명 함수와 화살표 함수

함수는 이름이 있는 함수 선언(function declaration) 외에도, 변수에 할당되거나 다른 함수의 인자로 전달되는 익명 함수(anonymous function) 형태로도 자주 사용됩니다. 타입스크립트는 이러한 익명 함수들의 타입을 추론하는 데 강력한 기능을 제공합니다.

## 1. 익명 함수 (Anonymous Functions)

익명 함수는 이름이 없는 함수로, 보통 변수에 할당되거나 콜백(callback)으로 직접 전달됩니다.

```typescript
// 함수 선언식
function greet(name: string) {
  return `Hello, ${name}`;
}

// 함수 표현식 (익명 함수를 변수에 할당)
const greet2 = function (name: string) {
  return `Hello, ${name}`;
};
```

타입스크립트는 `greet2` 변수에 할당된 익명 함수의 매개변수와 반환 타입을 분석하여 `(name: string) => string` 이라는 함수 타입으로 추론합니다.

## 2. 문맥적 타입 추론 (Contextual Typing)

타입스크립트의 가장 강력한 기능 중 하나는 **문맥적 타입 추론**입니다. 함수가 사용되는 위치를 기반으로 해당 함수의 매개변수 타입을 자동으로 추론할 수 있습니다.

예를 들어, `forEach`와 같은 배열 메서드에 전달되는 콜백 함수의 매개변수는 타입을 명시하지 않아도 됩니다.

```typescript
const names = ["Alice", "Bob", "Eve"];

// forEach 메서드는 string[] 타입의 배열에서 호출되었으므로,
// 콜백 함수의 매개변수 s가 string 타입일 것이라고 추론합니다.
n -
  ames.forEach(function (s) {
    // (parameter) s: string
    console.log(s.toUpperCase());
  });
```

이처럼 타입스크립트가 이미 타입을 알고 있는 곳에 함수를 작성하면, 우리는 매개변수 타입을 생략하여 코드를 더 간결하게 만들 수 있습니다.

## 3. 화살표 함수 (Arrow Functions)

ES6에서 도입된 화살표 함수는 `function` 키워드와 `return` 문을 생략하여 함수를 더 간결하게 표현할 수 있게 해줍니다. 타입스크립트에서도 화살표 함수에 타입을 동일하게 적용할 수 있습니다.

### 기본 문법

```typescript
// 매개변수 타입과 반환 타입을 모두 명시
const add = (a: number, b: number): number => {
  return a + b;
};

// 함수 본문이 한 줄이면 중괄호 {}와 return 생략 가능
const subtract = (a: number, b: number): number => a - b;

// 문맥적 타입 추론 활용 (콜백 함수)
const numbers = [1, 2, 3];
numbers.map((num) => num * 2); // num은 number 타입으로 추론됨
```

### 예제: 이벤트 핸들러

DOM 이벤트 핸들러를 작성할 때도 문맥적 타입 추론이 유용하게 사용됩니다.

```typescript
const myButton = document.getElementById("myBtn");

// addEventListener가 "click" 이벤트에 대한 콜백 함수를 기대하므로,
// 매개변수 event가 MouseEvent 타입임을 추론합니다.
myButton?.addEventListener("click", (event) => {
  // (parameter) event: MouseEvent
  console.log(event.clientX, event.clientY);
});
```

이처럼 화살표 함수와 문맥적 타입 추론을 함께 사용하면, 타입의 안정성을 유지하면서도 매우 간결하고 가독성 좋은 코드를 작성할 수 있습니다.
