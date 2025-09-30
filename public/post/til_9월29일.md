---
title: "열거형 (Enums)"
date: "2025-09-29"
keywords: ["TIL", "Typescript"]
---

# 열거형 (Enums)

열거형(Enum)은 관련된 상수 값들의 집합에 이름을 붙여 사용하는 타입입니다. 숫자나 문자열 값에 사람이 더 쉽게 읽고 이해할 수 있는 이름을 부여하여 코드의 가독성과 유지보수성을 높입니다.

## 1. 숫자 열거형 (Numeric Enums)

별도로 값을 지정하지 않으면, 열거형의 멤버는 0부터 시작하여 1씩 증가하는 숫자 값을 가집니다.

```typescript
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

let myDirection: Direction = Direction.Up;
console.log(myDirection); // 0

console.log(Direction.Right); // 3
```

초기값을 직접 설정할 수도 있습니다. 초기값이 설정되면, 그 다음 멤버들은 이전 멤버 값에서 1씩 증가한 값을 가집니다.

```typescript
enum ResponseStatus {
  Success = 200,
  NotFound, // 201
  Error, // 202
}

console.log(ResponseStatus.NotFound); // 201
```

### 역방향 매핑 (Reverse Mapping)

숫자 열거형의 특별한 점은, 이름(key)으로 값(value)을 얻을 수 있을 뿐만 아니라, 값으로 이름을 얻는 역방향 매핑도 가능하다는 것입니다.

```typescript
console.log(Direction[0]); // "Up"
console.log(Direction.Up); // 0
```

## 2. 문자열 열거형 (String Enums)

열거형의 각 멤버에 명시적으로 문자열 값을 할당할 수 있습니다. 문자열 열거형은 코드 실행 시점에 더 명확한 의미를 전달하고 디버깅을 용이하게 하는 장점이 있습니다.

```typescript
enum LogLevel {
  Info = "INFO",
  Warning = "WARN",
  Error = "ERROR",
}

let level: LogLevel = LogLevel.Warning;
console.log(level); // "WARN"

function log(message: string, level: LogLevel) {
  console.log(`[${level}] ${message}`);
}

log("Something went wrong", LogLevel.Error);
// 출력: [ERROR] Something went wrong
```

문자열 열거형은 숫자 열거형과 달리 역방향 매핑을 지원하지 않습니다.

## 3. 언제 열거형을 사용할까? (Enum vs. Literal Union Types)

열거형이 하는 역할은 리터럴 유니언 타입으로도 대체할 수 있는 경우가 많습니다.

```typescript
// Enum 사용
enum OrderStatus {
  Pending = "PENDING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
}

// 리터럴 유니언 타입 사용
type OrderStatusLiteral = "PENDING" | "SHIPPED" | "DELIVERED";
```

- **리터럴 유니언 타입 (`type`)을 선호하는 경우**:

  - 타입스크립트 커뮤니티에서는 더 간결하고, 자바스크립트로 변환될 때 추가적인 코드를 생성하지 않는 리터럴 유니언 타입을 선호하는 경향이 있습니다.

- **열거형 (`enum`)을 사용하는 것이 더 나은 경우**:
  - 숫자 값의 집합을 다루거나, 값과 이름 간의 역방향 매핑이 필요할 때 유용합니다.
  - C#이나 Java와 같은 다른 언어의 개발자에게 더 친숙할 수 있습니다.
  - 명확한 "상수 집합"의 개념을 코드에 부여하고 싶을 때 사용합니다.

선택은 프로젝트의 요구사항과 팀의 코딩 스타일에 따라 달라질 수 있습니다. 두 방법의 장단점을 이해하고 상황에 맞게 사용하는 것이 중요합니다.
