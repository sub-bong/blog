---
title: "타입 별칭과 인터페이스"
date: "2025-09-22"
keywords: ["TIL", "Typescript"]
---

# 타입 별칭과 인터페이스

타입스크립트에서 객체의 형태를 정의하는 두 가지 주요 방법인 타입 별칭(`type`)과 인터페이스(`interface`)는 많은 경우 서로 대체 가능하지만, 몇 가지 핵심적인 차이점이 존재합니다. 언제 무엇을 사용해야 할지 결정하기 위해 이 차이점들을 명확히 이해하는 것이 중요합니다.

## 핵심 차이점 요약

| 특징                                | `interface`                      | `type`                                              |
| :---------------------------------- | :------------------------------- | :-------------------------------------------------- |
| **확장 (Extending)**                | `extends` 키워드 사용            | `&` (인터섹션) 사용                                 |
| **선언 병합 (Declaration Merging)** | 가능 (같은 이름의 선언이 합쳐짐) | 불가능 (같은 이름으로 중복 선언 불가)               |
| **사용 범위**                       | 객체 형태 정의에 주로 사용       | 모든 종류의 타입(원시, 유니언, 튜플 등)에 사용 가능 |
| **구현 (Implementing)**             | 클래스에서 `implements` 가능     | 클래스에서 `implements` 가능 (복잡한 `type`은 불가) |

---

## 1. 확장 문법의 차이

두 방법 모두 다른 타입을 확장하여 새로운 타입을 만들 수 있지만, 사용하는 문법이 다릅니다.

- **인터페이스**: `extends` 키워드를 사용합니다. 더 명확하고 객체지향 프로그래밍(OOP)의 상속 개념과 유사합니다.

```typescript
interface Animal {
  name: string;
}
interface Bear extends Animal {
  honey: boolean;
}
```

- **타입 별칭**: `&` (인터섹션 타입)을 사용합니다. 여러 타입을 하나로 합치는 개념입니다.

```typescript
type Animal = { name: string };
type Bear = Animal & { honey: boolean };
```

## 2. 선언 병합 (Declaration Merging)

가장 큰 차이점 중 하나입니다. 인터페이스는 동일한 이름으로 여러 번 선언하면 모든 선언이 자동으로 하나로 합쳐집니다. 이는 특히 기존에 존재하는 타입을 보강하거나 확장할 때 유용합니다. 예를 들어, 외부 라이브러리의 인터페이스에 새로운 프로퍼티를 추가할 수 있습니다.

```typescript
// 라이브러리에 이미 선언된 인터페이스
interface Request {
  id: string;
}

// 내 프로젝트에서 Request 인터페이스에 user 프로퍼티 추가
interface Request {
  user: { name: string };
}

// 최종적으로 Request 인터페이스는 id와 user를 모두 가짐
const req: Request = { id: "123", user: { name: "Alice" } };
```

반면, 타입 별칭은 동일한 이름으로 중복해서 선언할 수 없습니다.

```typescript
type Person = { name: string };
// type Person = { age: number }; // Error: Duplicate identifier 'Person'.
```

## 3. 표현 가능한 타입의 범위

- **`type`**은 유니언, 튜플, 원시 타입 등 모든 종류의 타입에 별칭을 붙일 수 있습니다.

```typescript
type ID = string | number; // 유니언 타입
type Point = [number, number]; // 튜플 타입
type LogFn = (message: string) => void; // 함수 타입
```

- **`interface`**는 주로 객체의 구조를 정의하는 데 사용됩니다. 유니언이나 튜플 같은 형태를 직접적으로 표현할 수는 없습니다.

## 결론: 언제 무엇을 써야 할까?

타입스크립트 공식 문서에서는 일관성을 위해 둘 중 하나를 선택하여 사용하되, 몇 가지 가이드라인을 제공합니다.

1.  **공개 API(라이브러리 등)의 타입을 정의할 때**: `interface`를 사용하는 것이 좋습니다. 사용자가 `extends` 하거나 선언 병합을 통해 유연하게 확장할 수 있기 때문입니다.

2.  **객체의 구조를 정의할 때**: 일반적으로 `interface` 사용을 권장합니다. 더 나은 오류 메시지, 클래스와의 일관성, 확장성 면에서 이점이 있습니다.

3.  **유니언, 튜플 등 복합적인 타입을 정의할 때**: `type`을 사용해야 합니다.

대부분의 경우 개인이나 팀의 스타일 가이드에 따라 일관되게 사용하는 것이 가장 중요합니다.
