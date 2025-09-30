---
title: "객체 타입 (Object Types)"
date: "2025-09-12"
keywords: ["TIL", "Typescript"]
---

# 객체 타입 (Object Types)

자바스크립트에서 객체(object)는 가장 중요한 데이터 구조 중 하나입니다. 타입스크립트는 객체의 형태(shape)를 정의하여, 객체가 어떤 프로퍼티(property)를 가져야 하는지 명확하게 지정할 수 있습니다.

## 1. 객체 타입 정의

객체의 타입을 정의할 때는 프로퍼티의 이름과 해당 프로퍼티 값의 타입을 명시합니다.

```typescript
// { name: string; age: number } 형태의 객체를 받는 함수
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

// 올바른 형태의 객체 전달
printCoord({ x: 3, y: 7 });

// 잘못된 형태의 객체 전달 - 컴파일 오류
// printCoord({ x: 3 }); // Error: Property 'y' is missing in type '{ x: number; }' but required in type '{ x: number; y: number; }'.
```

위 예제에서 `pt` 매개변수는 `x`와 `y`라는 두 개의 프로퍼티를 가져야 하며, 두 프로퍼티 모두 `number` 타입이어야 함을 의미합니다.

## 2. 객체 타입과 변수 할당

변수에 객체 타입을 직접 명시하여 해당 변수가 특정 구조를 따르도록 강제할 수 있습니다.

```typescript
let user: { name: string; id: number };

// 올바른 할당
user = {
  name: "Alice",
  id: 1,
};

// 잘못된 할당 - 컴파일 오류
// user = { username: "Bob", id: 2 }; // Error: 'username' in type '{ username: string; id: number; }' is not defined in type '{ name: string; id: number; }'.
```

## 3. 중첩된 객체 타입 (Nested Object Types)

객체의 프로퍼티 값으로 또 다른 객체가 올 수도 있습니다. 이런 경우 타입을 중첩하여 정의할 수 있습니다.

```typescript
// author는 name과 email 프로퍼티를 갖는 객체여야 함
let post: {
  title: string;
  content: string;
  author: { name: string; email: string };
};

post = {
  title: "My First Post",
  content: "Hello, TypeScript!",
  author: {
    name: "Admin",
    email: "admin@example.com",
  },
};

console.log(post.author.name); // "Admin"
```

## 4. 잉여 프로퍼티 검사 (Excess Property Checks)

타입스크립트는 객체 리터럴을 변수나 함수 매개변수에 직접 할당할 때, 타입에 정의되지 않은 추가적인 프로퍼티가 있으면 오류를 발생시킵니다. 이를 통해 오타나 잘못된 프로퍼티 사용을 방지할 수 있습니다.

```typescript
function printUser(user: { name: string; age: number }) {
  // ...
}

// 'email'은 user 타입에 정의되지 않았으므로 오류 발생
// printUser({ name: "Alice", age: 30, email: "alice@example.com" });
// Error: Argument of type '{ name: string; age: number; email: string; }' is not assignable to parameter of type '{ name: string; age: number; }'.
```

객체 타입 정의는 코드의 가독성을 높이고, 객체 구조와 관련된 실수를 줄이는 데 매우 중요한 역할을 합니다. 다음 시간에는 선택적 프로퍼티에 대해 알아보겠습니다.
