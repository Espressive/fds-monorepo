// Action Modules
import ActionButton from './ActionButton';

// Data Modules
import DataCheckbox from './DataCheckbox';
import DataEmail from './DataEmail';
import DataNumber from './DataNumber';
import DataRadio from './DataRadio';
import DataSelect from './DataSelect';
import DataText from './DataText';
import DataTextArea from './DataTextArea';

const actionModules = {
  button: ActionButton,
};

const dataModules = {
  checkbox: DataCheckbox,
  email: DataEmail,
  number: DataNumber,
  radio: DataRadio,
  select: DataSelect,
  // switch: DataCheckbox,
  text: DataText,
  textarea: DataTextArea,
};

export { actionModules, dataModules };
