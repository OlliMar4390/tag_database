import { ElementFinder, browser } from 'protractor';
import { FormElements } from './formElements.po';
import { ListDirection } from './app.po';


export class LinkFormPage extends FormElements {

  route = '';

  // css paths
  urlInput = '#mat-input-0';
  tagInput = '#mat-input-2';
  descriptionInput = '#mat-input-1';
  linkErrorField = '#errMess';
  urlErrorField = '#mat-error-0';
  tagErrorField = '#mat-error-1';
  optionList = '#mat-autocomplete-0';
  optionTag = 'mat-option';
  firstOption = `${this.optionList} ${this.optionTag} span`;

  // default values
  defaultDomain = 'Dtl';
  defaultURL = 'test.de';
  defaultTag = 'Medien';
  defaultTagNotInDefDom = 'Frankreich';
  defaultDescription = 'keine';
  defaultDirectionSelect = ListDirection.down;
  debounceTimePlus = 300;
  missingUrlMessage = 'URL is required.';
  invalidUrlMessage = 'URL must be valid.';
  // database must contain tags (linked to default domain) that start with defaultOptionChar
  // also, the first tag (alphabetically) must not begin with defaultOptionChar
  defaultOptionChar = ['M'];
  
  setup() {
    browser.baseUrl = this.baseUrl;
    this.navigateToLink(this.route);
  }

  addURL(url = this.defaultURL): ElementFinder {
    return this.fillInput(this.urlInput, url);
  }

  addTags(tags = [this.defaultTag]): Array<ElementFinder> {
    return this.fillInputArray(this.tagInput, tags, this.debounceTimePlus);
  }

  addDescription(defaultDescription = this.defaultDescription): ElementFinder {
    return this.fillInput(this.descriptionInput, defaultDescription);
  }

  changeDomain(direction = this.defaultDirectionSelect): Array<ElementFinder> {
    return this.changeSelection(this.selectValue, direction);
  }
  
  deleteCharacterAndWait(input: ElementFinder) {
    super.deleteCharacterAndWait(input, this.debounceTimePlus);
  }
  
}
