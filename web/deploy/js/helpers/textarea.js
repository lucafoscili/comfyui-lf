import { LogSeverity } from '../types/manager/manager.js';
import { getLFManager } from '../utils/common.js';
import { textareaFactory } from '../widgets/textarea.js';
let VALIDATION_TIMEOUT;
export const handleInputChange = (e) => {
    const textarea = e.currentTarget;
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
            }
            catch (error) {
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
