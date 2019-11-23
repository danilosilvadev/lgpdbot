import { AsyncDepthPipe } from './async-depth.pipe';

describe('AsyncDepthPipe', () => {
  it('create an instance', () => {
    const pipe = new AsyncDepthPipe();
    expect(pipe).toBeTruthy();
  });
});
