import { IStore } from 'types';

type StringOrNumber = string | number;
type StackElements = StringOrNumber[];

class Stack implements IStore<StackElements> {
  private static array: StackElements = [];

  public removeAll() {
    Stack.array = [];
  }

  public getAll() {
    return Stack.array;
  }

  public push(value: StringOrNumber) {
    Stack.array.push(value);
  }

  public pop() {
    return Stack.array.pop();
  }
}

export const StackApi = new Stack();
