import { ConstructorModule } from './constructor.module';

describe('ConstructorModule', () => {
  let constructorModule: ConstructorModule;

  beforeEach(() => {
    constructorModule = new ConstructorModule();
  });

  it('should create an instance', () => {
    expect(constructorModule).toBeTruthy();
  });
});
