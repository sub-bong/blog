---
title: "타입 별칭 (Type Aliases)"
date: "2025-09-18"
keywords: ["TIL", "Typescript"]
---

# 타입 별칭 (Type Aliases)

지금까지 우리는 객체 타입이나 유니언 타입을 사용할 때마다 직접 타입을 작성했습니다. 코드가 복잡해지면 동일한 타입을 여러 곳에서 반복적으로 사용하게 될 수 있습니다. 타입 별칭은 기존 타입에 새로운 이름을 붙여 재사용할 수 있게 해주는 기능입니다.

## 1. 타입 별칭이란?

`type` 키워드를 사용하여 타입에 새로운 이름을 부여할 수 있습니다. 이는 코드의 가독성을 높이고, 반복적인 타입 선언을 줄여줍니다.

```typescript
// Point 라는 이름의 객체 타입을 새로 정의
type Point = {
  x: number;
  y: number;
};

// 이제 Point는 { x: number; y: number }를 대체하는 이름으로 사용될 수 있습니다.
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

타입 별칭은 새로운 타입을 생성하는 것이 아니라, 기존 타입에 다른 이름을 붙여주는 것입니다. 따라서 `{ x: number; y: number }`와 `Point`는 완전히 동일하게 취급됩니다.

## 2. 다양한 타입에 별칭 사용하기

타입 별칭은 객체 타입뿐만 아니라 원시 타입, 유니언 타입 등 모든 종류의 타입에 사용할 수 있습니다.

### 원시 타입 별칭

```typescript
type MyString = string;

const myName: MyString = "Alice";
```

### 유니언 타입 별칭

```typescript
type ID = number | string;

function processId(id: ID) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

const userId: ID = 12345;
const orderId: ID = "XYZ-987";
```

### 복잡한 타입 별칭

유니언 타입과 객체 타입을 조합한 복잡한 타입에도 이름을 붙여 코드를 훨씬 더 깔끔하게 만들 수 있습니다.

```typescript
type User = {
  id: ID; // 위에서 정의한 ID 타입을 재사용
  name: string;
};

type LogLevel = "debug" | "info" | "error";

function log(message: string, level: LogLevel) {
  // ...
}
```

## 3. 타입 별칭의 장점

- **재사용성**: 동일한 타입을 여러 곳에서 재사용할 수 있어 코드 중복을 줄입니다.
- **가독성**: 복잡한 타입에 의미 있는 이름을 부여하여 코드의 의도를 명확하게 전달할 수 있습니다. (예: `{ x: number, y: number }` 보다 `Point`가 훨씬 이해하기 쉽습니다.)
- **유지보수**: 타입 정의가 한 곳에 모여있으므로, 타입 구조가 변경될 때 해당 별칭만 수정하면 되어 유지보수가 용이합니다.

다음 시간에는 타입 별칭과 유사하지만 약간의 차이가 있는 **인터페이스(Interface)**에 대해 알아보겠습니다.
