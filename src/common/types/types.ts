export type ActionTypeForeTest<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">;
//T может быть только функцией, о чем говорит типизация <T extends (...args: any) => any>
