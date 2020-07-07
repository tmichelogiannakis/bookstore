import { ArrayPipe } from './array.pipe';

describe('ArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayPipe();
    expect(pipe).toBeTruthy();
  });

  it('transform "empty" value to null', () => {
    const pipe = new ArrayPipe();
    expect(pipe.transform([], ', ')).toBeNull();
    expect(pipe.transform('', ', ')).toBeNull();
    expect(pipe.transform(null, ', ')).toBeNull();
  });

  it('transform a string to string', () => {
    const pipe = new ArrayPipe();
    expect(pipe.transform('string1', ', ')).toBe('string1');
  });

  it('transform an array to comma separeted string', () => {
    const pipe = new ArrayPipe();
    expect(pipe.transform(['string1', 'string2', 'string3'], ', ')).toBe('string1, string2, string3');
  });
});
