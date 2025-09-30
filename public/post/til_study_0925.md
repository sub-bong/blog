---
title: "null과 undefined"
date: "2025-09-25"
keywords: ["TIL", "Typescript"]
---

# null과 undefined

자바스크립트에는 "값이 없음"을 나타내는 두 가지 원시 값, `null`과 `undefined`가 있습니다. 타입스크립트는 이 두 값을 각각의 타입으로 다루며, `strictNullChecks` 설정을 통해 이들을 더 안전하게 처리할 수 있도록 도와줍니다.

## 1. `null`과 `undefined`의 차이

- **`undefined`**: 값이 아직 할당되지 않았음을 의미합니다. 변수를 선언만 하고 초기화하지 않았을 때의 기본값입니다.
- **`null`**: 개발자가 의도적으로 "값이 없음"을 명시하기 위해 사용하는 값입니다.

```typescript
let u: undefined = undefined;
let n: null = null;

let a; // a의 값은 undefined

function getUser() {
  if (Math.random() > 0.5) {
    return { name: "Alice" };
  } else {
    return null; // 사용자를 찾지 못했음을 명시적으로 표현
  }
}
```

## 2. `strictNullChecks` 옵션

`tsconfig.json` 파일에서 `strictNullChecks` 옵션을 `true`로 설정하는 것은 타입스크립트 프로젝트에서 가장 권장되는 방식 중 하나입니다. 이 옵션이 코드의 안정성을 어떻게 향상시키는지 알아보겠습니다.

### `strictNullChecks: false` (기본값 또는 비활성화 시)

이 옵션이 꺼져 있으면, `null`과 `undefined`는 다른 모든 타입에 자유롭게 할당될 수 있습니다. 이는 자바스크립트의 동작 방식과 유사하지만, "cannot read property 'x' of null"과 같은 흔한 런타임 오류의 원인이 됩니다.

```typescript
// strictNullChecks: false
let name: string = "Alice";
name = null; // 오류 없음
name = undefined; // 오류 없음

function greet(name: string) {
  // name이 null일 수 있음에도 불구하고 컴파일러가 오류를 잡지 못함
  // 런타임에서 오류 발생 가능
  console.log(name.toUpperCase());
}

greet(null);
```

### `strictNullChecks: true` (활성화 시)

이 옵션이 켜져 있으면, `null`과 `undefined`는 자기 자신 타입과 `any` 타입에만 할당할 수 있습니다. 다른 타입의 변수에 `null`이나 `undefined`를 할당하려면, 유니언 타입을 사용하여 명시적으로 허용해야 합니다.

```typescript
// strictNullChecks: true
let name: string = "Alice";
// name = null; // Error: 'null' is not assignable to type 'string'.

// null일 수 있는 문자열을 표현하려면 유니언 타입을 사용해야 합니다.
let nullableName: string | null = "Bob";
nullableName = null; // OK

function greet(name: string | null) {
  // name이 null일 수 있음을 컴파일러가 인지하고 경고합니다.
  // console.log(name.toUpperCase()); // Error: 'name' is possibly 'null'.

  // 타입 좁히기(narrowing)를 통해 안전하게 접근해야 합니다.
  if (name) {
    console.log(name.toUpperCase());
  } else {
    console.log("Hello, guest!");
  }
}

greet(null);
```

## 3. 선택적 프로퍼티 및 연산자

`strictNullChecks`가 켜져 있을 때, 선택적 프로퍼티(`?`)는 자동으로 `| undefined`가 유니언 타입에 추가된 것으로 간주됩니다.

```typescript
interface User {
  name: string;
  age?: number;
}

// 위 인터페이스는 아래와 같이 처리됩니다.
// interface User {
//   name: string;
//   age: number | undefined;
// }
```

또한, `null` 이나 `undefined`일 수 있는 값에 안전하게 접근하기 위해 **선택적 체이닝(Optional Chaining, `?.`)** 이나 **null 병합 연산자(Nullish Coalescing, `??`)** 를 사용할 수 있습니다.

```typescript
function printUser(user: User | null) {
  // user가 null이나 undefined가 아니면 name을, 그렇지 않으면 "Guest"를 출력
  console.log(user?.name ?? "Guest");
}
```

`strictNullChecks`는 타입스크립트의 가장 큰 장점 중 하나이므로, 새로운 프로젝트를 시작할 때는 반드시 활성화하는 것이 좋습니다.
