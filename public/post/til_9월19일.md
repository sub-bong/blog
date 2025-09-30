---
title: "인터페이스 (Interfaces)"
date: "2025-09-19"
keywords: ["TIL", "Typescript"]
---

# 인터페이스 (Interfaces)

인터페이스는 타입 별칭과 마찬가지로 객체의 형태를 정의하는 데 사용되는 강력한 도구입니다. `interface` 키워드를 사용하여 선언하며, 객체가 특정 구조를 따르도록 강제하는 "계약(contract)" 역할을 합니다.

## 1. 인터페이스란?

인터페이스는 객체의 타입을 정의하는 또 다른 방법입니다. 타입 별칭과 매우 유사하게 작동합니다.

```typescript
// Point 라는 이름의 인터페이스를 정의
interface Point {
  x: number;
  y: number;
}

// Point 인터페이스를 타입으로 사용
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

위 예제는 어제 배운 타입 별칭을 사용했을 때와 거의 동일하게 보입니다. 이처럼 객체의 형태를 묘사하는 데에는 타입 별칭과 인터페이스 둘 다 사용할 수 있습니다.

## 2. 인터페이스 확장하기 (Extending)

인터페이스의 가장 중요한 특징 중 하나는 다른 인터페이스를 **확장(extend)**할 수 있다는 것입니다. 이를 통해 기존 인터페이스의 멤버를 상속받아 새로운 인터페이스를 만들 수 있습니다.

```typescript
// 기본 동물 인터페이스
interface Animal {
  name: string;
}

// Animal 인터페이스를 확장하여 Bear 인터페이스를 정의
// Bear는 Animal의 모든 멤버(name)와 추가적인 멤버(honey)를 가집니다.
interface Bear extends Animal {
  honey: boolean;
}

const bear: Bear = {
  name: "Winnie",
  honey: true,
};

console.log(bear.name); // "Winnie"
console.log(bear.honey); // true
```

`extends` 키워드를 사용하면 코드 중복을 줄이고 타입 간의 관계를 명확하게 표현할 수 있습니다.

## 3. 인터페이스에 새 멤버 추가하기 (Declaration Merging)

인터페이스는 타입 별칭과 달리, 동일한 이름으로 여러 번 선언될 수 있으며 이때 선언들이 자동으로 **병합(merge)**됩니다. 이 특징은 외부 라이브러리의 타입을 확장하거나 기존 타입을 보강할 때 유용합니다.

```typescript
// 첫 번째 Window 인터페이스 선언
interface Window {
  title: string;
}

// 동일한 이름으로 Window 인터페이스 다시 선언
interface Window {
  ts: { version: string };
}

// 두 선언이 병합되어 Window 인터페이스는 title과 ts 프로퍼티를 모두 가집니다.
const myWindow: Window = {
  title: "My App",
  ts: { version: "4.8" },
};
```

반면, 타입 별칭은 동일한 이름으로 다시 선언할 수 없습니다.

```typescript
type MyType = { x: number };
// type MyType = { y: number }; // Error: Duplicate identifier 'MyType'.
```

## 4. 언제 무엇을 써야 할까?

타입 별칭과 인터페이스는 겹치는 기능이 많아 혼란스러울 수 있습니다. 일반적인 가이드라인은 다음과 같습니다.

- **`interface` 사용을 우선적으로 고려**: 객체의 구조를 정의할 때는 `extends`와 `implements`(클래스에서 사용) 같은 확장성을 고려하여 인터페이스를 사용하는 것이 좋습니다.
- **`type` 사용이 필요할 때**: 유니언 타입(`string | number`)이나 튜플 등, 객체 형태가 아닌 타입을 정의해야 할 때는 타입 별칭을 사용해야 합니다.

다음 시간에는 이 둘의 차이점을 더 자세히 비교하고 정리해 보겠습니다.
