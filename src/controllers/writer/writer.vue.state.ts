import { Formula } from '../../domain';
import { MenuState } from '../../utils';

export default interface WriterVueState {
  formulas: Array<Formula>;
  errorMessages: { [formulaName: string]: string };
  menuState?: MenuState;
  createFormula?: () => void;
  removeFormula?: (index: number) => void;
  submit?: () => void;
};
