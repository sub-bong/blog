---
title: "타입스크립트와 기본 타입"
date: "2025-09-08"
keywords: ["TIL", "Typescript"]
---

# 타입스크립트와 기본 타입

## 1. 타입스크립트란? (TypeScript)

타입스크립트는 자바스크립트(JavaScript)에 정적 타입(static types) 문법을 추가한 언어입니다. 코드 실행 전(컴파일 단계)에 타입 검사를 통해 오류를 미리 발견하여 코드의 안정성과 가독성을 높여줍니다.

- **정적 타입 검사**: 변수나 함수에 타입을 명시적으로 지정하여, 의도치 않은 값의 할당이나 잘못된 함수 인자 전달을 방지합니다.
- **코드 자동 완성 및 가독성**: 타입 정보는 개발 도구(IDE)가 코드 자동 완성, 리팩토링 등을 더 정확하게 지원하도록 도와주며, 코드를 읽는 사람이 데이터의 구조를 더 쉽게 파악할 수 있게 합니다.

## 2. 타입 명시 (Type Annotation)

변수, 함수 매개변수, 객체 속성 등에 `: 타입` 형태로 타입을 지정할 수 있습니다.

```typescript
// 변수명: 타입 = 값;
let myName: string = "Alice";
```

만약 다른 타입의 값을 할당하려고 하면 타입스크립트 컴파일러가 오류를 발생시킵니다.

```typescript
let myName: string = "Alice";
myName = 30; // Error: 'number' 형식은 'string' 형식에 할당할 수 없습니다.
```

## 3. 기본 원시 타입 (Primitive Types)

자바스크립트의 기본 자료형은 타입스크립트에서도 동일하게 사용됩니다.

### string

문자열 값을 나타냅니다.

```typescript
let message: string = "Hello, TypeScript!";
```

### number

정수 및 부동소수점 숫자를 모두 포함합니다.

```typescript
let count: number = 100;
let pi: number = 3.14;
```

### boolean

참(true) 또는 거짓(false) 값을 나타냅니다.

```typescript
let isLoggedIn: boolean = true;
let isLoading: boolean = false;
```

타입스크립트는 타입 추론(Type Inference) 기능이 있어, 초기값을 할당하면 타입을 명시하지 않아도 자동으로 타입을 인식합니다. 하지만, 코드의 명확성을 위해 타입을 직접 명시하는 것이 권장됩니다.

```typescript
let framework = "React"; // 타입스크립트가 framework를 string으로 추론합니다.
```
