import { LogSeverity } from '../types/manager/manager';
import { getLFManager } from '../utils/common';
import { textareaFactory } from '../widgets/textarea';

let VALIDATION_TIMEOUT: NodeJS.Timeout;

export const handleInputChange = (e: Event) => {
  const textarea = e.currentTarget as HTMLTextAreaElement;

  const startValidationTimer = () => {
    const validateAndFormatJSON = async () => {
      try {
        const jsonObject = JSON.parse(textarea.value);
        const formattedJson = JSON.stringify(jsonObject, null, 2);
        if (formattedJson !== '{}') {
          textarea.title = '';
          textarea.value = formattedJson;
          textarea.classList.remove(textareaFactory.cssClasses.widgetError);
        }
      } catch (error) {
        getLFManager().log('Error parsing JSON', { error }, LogSeverity.Warning);
        textarea.classList.add(textareaFactory.cssClasses.widgetError);
        textarea.title = error;
      }
    };

    VALIDATION_TIMEOUT = setTimeout(validateAndFormatJSON, 2500);
  };

  clearTimeout(VALIDATION_TIMEOUT);
  startValidationTimer();
};
