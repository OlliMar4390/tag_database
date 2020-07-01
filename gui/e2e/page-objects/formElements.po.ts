import { browser, protractor, ElementFinder } from 'protractor';
import { AppPage, ListDirection } from './app.po';


export class FormElements extends AppPage {
    
    submitButton = 'button[type=submit]';
    selectValue = '.mat-select-value-text span';

    fillInput(inputTag: string, value: string): ElementFinder {
        const input = this.getElement(inputTag);
        input.sendKeys(value);
        return input
    }
  
    fillInputArray(
        inputTag: string,
        value: Array<string>,
        debounceTimePlus: number): Array<ElementFinder> {

      const input = this.getElement(inputTag);
      input.sendKeys(value[0]);
      browser.sleep(debounceTimePlus);

      let inputs = [];
      inputs.push(input);

      if (value.length > 1) {
          for (let t of value.slice(1)) { 
              input.sendKeys(protractor.Key.TAB);
              const nextInput = browser.switchTo().activeElement();
              nextInput.sendKeys(t);
              inputs.push(nextInput);
          }
      }
      return inputs
    }

    changeSelection(selectionTag: string, direction: ListDirection): Array<ElementFinder> {
        const selectElement = this.getElement(selectionTag);
        let elements = [];
        elements.push(selectElement);
        selectElement.click();
        const selection = browser.switchTo().activeElement();

        if (direction === 'up') {
            selection.sendKeys(protractor.Key.UP);
        } else {
            selection.sendKeys(protractor.Key.DOWN);
        }

        selection.sendKeys(protractor.Key.ENTER);
        elements.push(selection);
        return elements
    }

    deleteCharacterAndWait(input: ElementFinder, debounceTimePlus: number) {
        input.sendKeys(protractor.Key.BACK_SPACE);
        browser.sleep(debounceTimePlus);
    }

    deleteCharacterAndLeave(input: ElementFinder) {
        input.sendKeys(protractor.Key.BACK_SPACE);
        input.sendKeys(protractor.Key.TAB);
    }

    submitAndWait(submitButton: ElementFinder, wait = 300) {
        submitButton.click();
        browser.sleep(wait);
    }

}
