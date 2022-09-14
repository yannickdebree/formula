import { CalculusTree } from './CalculusTree';
import { CalculusTreeFactory } from './CalculusTreeFactory';
import { Formula } from './Formula';

describe(CalculusTreeFactory.name, () => {
  it('Can create calculus from formula', () => {
    const formulaA = new Formula('f', 'x');
    const { left: calculusTreeA } = CalculusTreeFactory.fromFormula(formulaA);
    expect(calculusTreeA).toBeDefined();
    expect(calculusTreeA?.operator).toBe('x');

    const formulaB = new Formula('f', '1/x');
    const { left: calculusTreeB } = CalculusTreeFactory.fromFormula(formulaB);
    expect(calculusTreeB).toBeDefined();
    expect(calculusTreeB?.operator).toBe('/');
    expect(calculusTreeB?.parameters[0]).toBe(1);
    expect((calculusTreeB?.parameters[1] as CalculusTree).operator).toBe('x');
  });
});
