---
title: "선택적 프로퍼티 (Optional Properties)"
date: "2025-09-15"
keywords: ["TIL", "Typescript"]
---

# 선택적 프로퍼티 (Optional Properties)

객체 타입을 정의할 때, 어떤 프로퍼티들은 항상 존재하지 않을 수도 있습니다. 타입스크립트에서는 프로퍼티 이름 뒤에 `?`를 붙여 해당 프로퍼티가 선택적(optional)임을 표시할 수 있습니다.

## 1. 선택적 프로퍼티 정의

객체 타입의 일부 프로퍼티가 있어도 되고 없어도 되는 경우, `?`를 사용하여 선택적으로 만들 수 있습니다.

```typescript
// last 프로퍼티는 선택적입니다.
function printName(obj: { first: string; last?: string }) {
  // ...
}

// 두 가지 호출 모두 유효합니다.
printName({ first: "Bob" });
printName({ first: "Alice", last: "Williams" });
```

위 예제에서 `printName` 함수는 `first` 프로퍼티는 반드시 포함하지만, `last` 프로퍼티는 포함하지 않을 수도 있는 객체를 인자로 받습니다.

## 2. 선택적 프로퍼티 사용 시 주의점

선택적 프로퍼티는 값이 존재하지 않을 수 있으므로, 타입스크립트는 해당 프로퍼티가 `undefined`일 가능성이 있다고 알려줍니다. 따라서 해당 프로퍼티에 접근하기 전에 값이 실제로 존재하는지 확인하는 코드를 작성하는 것이 안전합니다.

```typescript
function printName(obj: { first: string; last?: string }) {
  // 오류 발생 가능성! obj.last가 undefined일 수 있습니다.
  // console.log(obj.last.toUpperCase());
  // Object is possibly 'undefined'.

  // 해결 방법: 값이 존재하는지 확인합니다.
  if (obj.last !== undefined) {
    // 이 블록 안에서는 obj.last가 string 타입임이 보장됩니다.
    console.log(obj.last.toUpperCase());
  }

  // 최신 자바스크립트 문법: Optional Chaining
  // obj.last가 undefined나 null이 아니면 toUpperCase()를 호출하고, 그렇지 않으면 undefined를 반환합니다.
  console.log(obj.last?.toUpperCase());
}
```

`strictNullChecks` 옵션이 켜져 있으면, 타입스크립트는 `undefined`일 수 있는 값에 대해 엄격하게 검사하여 런타임 오류를 방지하도록 도와줍니다.

## 3. 선택적 프로퍼티와 기본값

선택적 프로퍼티를 사용하는 함수 내부에서 해당 값에 기본값을 설정하여 다루는 것도 좋은 방법입니다.

```typescript
function createEmail(to: string, subject?: string, from?: string) {
  const finalSubject = subject || "No Subject"; // subject가 없으면 기본값 사용
  const finalFrom = from ?? "noreply@example.com"; // from이 null 또는 undefined이면 기본값 사용

  console.log(`To: ${to}`);
  console.log(`From: ${finalFrom}`);
  console.log(`Subject: ${finalSubject}`);
}

createEmail("test@example.com");
// To: test@example.com
// From: noreply@example.com
// Subject: No Subject

createEmail("test@example.com", "Hello!");
// To: test@example.com
// From: noreply@example.com
// Subject: Hello!
```

선택적 프로퍼티는 API를 설계하거나 다양한 형태의 객체를 다룰 때 유연성을 크게 향상시켜 줍니다.
