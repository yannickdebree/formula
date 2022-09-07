import { Formula } from '../../domain';
import { MenuState } from '../../utils';

export type WriterVueState = {
  formulas: Array<Formula>;
  menuState?: MenuState;
  createFormula?: () => void;
  removeFormula?: (index: number) => void;
  submit?: () => void;
};
