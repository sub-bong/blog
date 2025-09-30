---
title: "유니언 타입 다루기 (타입 좁히기)"
date: "2025-09-17"
keywords: ["TIL", "Typescript"]
---

# 유니언 타입 다루기 (타입 좁히기)

유니언 타입으로 선언된 변수는 여러 타입 중 하나일 수 있기 때문에, 타입스크립트는 해당 변수가 모든 타입에 공통으로 존재하는 속성이나 메서드에만 접근하도록 허용합니다. 특정 타입에만 존재하는 멤버를 안전하게 사용하기 위해서는 **타입 좁히기(Narrowing)** 라는 과정을 거쳐야 합니다.

타입 좁히기는 특정 코드 영역에서 변수의 타입을 더 구체적인 타입으로 확정하는 과정을 의미합니다.

## 1. `typeof`를 이용한 타입 좁히기

자바스크립트의 `typeof` 연산자는 원시 타입(primitive type)을 확인하는 데 매우 유용합니다. 타입스크립트는 `if` 문에서 `typeof` 검사를 발견하면, 해당 블록 내에서 변수의 타입을 자동으로 좁혀줍니다.

```typescript
function processInput(input: string | number) {
  if (typeof input === "string") {
    // 이 블록 안에서 input은 string 타입으로 간주됩니다.
    console.log(input.toUpperCase());
  } else {
    // 이 블록 안에서 input은 number 타입으로 간주됩니다.
    console.log(input.toFixed(2));
  }
}
```

`typeof`는 `"string"`, `"number"`, `"bigint"`, `"boolean"`, `"symbol"`, `"undefined"`, `"object"`, `"function"` 중 하나의 문자열을 반환합니다.

## 2. 진실성(Truthiness)을 이용한 타입 좁히기

자바스크립트에서는 `null`, `undefined`, `0`, `""`, `false` 와 같은 값들을 조건문에서 `false`로 취급합니다. 이를 이용하여 값이 존재하는지 여부를 간단하게 확인할 수 있습니다.

```typescript
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    // strs가 null이 아니고, 타입이 "object"인 경우 (배열은 typeof 결과가 "object"임)
    // 이 블록 안에서 strs는 string[] 타입으로 간주됩니다.
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    // 이 블록 안에서 strs는 string 타입으로 간주됩니다.
    console.log(strs);
  }
  // 그 외의 경우 (strs가 null인 경우) 아무것도 하지 않음
}
```

**주의**: `""`(빈 문자열)이나 `0`과 같은 falsy 값이 유효한 입력일 수 있는 경우에는 이 방법을 사용하면 안 됩니다.

## 3. 동등성(Equality)을 이용한 타입 좁히기

`===`, `!==`, `==`, `!=` 와 같은 동등 연산자를 사용하여 특정 값과 비교함으로써 타입을 좁힐 수 있습니다.

```typescript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // 이 블록 안에서 x와 y는 모두 string 타입임이 보장됩니다.
    // 두 변수의 타입이 겹치는 string 타입으로 좁혀지기 때문입니다.
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x);
    console.log(y);
  }
}
```

## 4. `in` 연산자를 이용한 타입 좁히기

`in` 연산자는 객체에 특정 프로퍼티가 존재하는지 확인합니다. 이를 통해 객체의 타입을 구별할 수 있습니다.

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    // 이 블록 안에서 animal은 Fish 타입으로 간주됩니다.
    return animal.swim();
  }
  // 이 블록 밖으로 나오면 animal은 Bird 타입임이 확실합니다.
  return animal.fly();
}
```

이 외에도 `instanceof` 연산자(클래스 인스턴스 확인), 타입 서술(type predicate) 등 다양한 타입 좁히기 방법이 있습니다. 타입 좁히기는 유니언 타입을 안전하고 효과적으로 사용하는 핵심적인 기술입니다.
