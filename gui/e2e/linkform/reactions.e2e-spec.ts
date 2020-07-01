import { LinkFormPage } from '../page-objects/linkform.po';

describe('reactions |', () => {
  let linkForm: LinkFormPage;

  beforeEach(() => {
    linkForm = new LinkFormPage();
    linkForm.setup();
  });

  it('add and remove tag fields', () => {

    // add 2 tags and 2 new tag fields
    let [tagField, tagField2] = linkForm.addTags(['m', 'm']);

    // TEST number of tag fields
    expect(linkForm.getAllElements('input').count()).toBe(5,
      'after 2 tag fields were added, there should be 5 input fields now');
        
    // remove first tag
    linkForm.deleteCharacterAndWait(tagField);

    // TEST number of tag fields
    expect(linkForm.getAllElements('input').count()).toBe(5,
      'after the first tag fields is emptied, there should be still 5 input fields now');

    // remove second tag and both last empty tag fields
    linkForm.deleteCharacterAndWait(tagField2);
    
    // TEST number of tag fields
    expect(linkForm.getAllElements('input').count()).toBe(3,
      'as all tag fields were empty, 2 have been deleted and there should be 3 input fields now');
  });

  it('show error fields and filter/reset option list', () => {

    // make urlField dirty and leave it XD
    let urlField = linkForm.addURL('a');
    linkForm.deleteCharacterAndLeave(urlField);

    // TEST url error field pop up
    let urlErrorField = linkForm.urlErrorField;
    expect(linkForm.getElement(urlErrorField)).toBeTruthy(
      'the error field should pop up');

    // TEST url error field to contain missing url message
    expect(linkForm.getParagraphText(urlErrorField)).toBe(linkForm.missingUrlMessage,
      `error field should contain the error message`);

    // TEST url error field to contain invalid url message
    urlField.sendKeys('a');
    expect(linkForm.getParagraphText(urlErrorField)).toBe(linkForm.invalidUrlMessage,
      `error field should contain the error message`);

    // make option list appear
    let defaultOptionChar = linkForm.defaultOptionChar;
    let [tagField] = linkForm.addTags(defaultOptionChar);

    // TEST option list to appear
    expect(linkForm.getElement(linkForm.optionList)).toBeTruthy(
      'option list should pop up');

    // TEST option list to contain filtered tags
    let firstCharacter = defaultOptionChar[0]
    let firstOption = linkForm.firstOption
    expect(linkForm.getFirstParagraphText(firstOption).then(value => value[0]))
    .toBe(firstCharacter,
      'options should be filtered and the first option should therfore start with the same ' +
      'character as the entered character');
    
    // empty the tag field
    linkForm.deleteCharacterAndWait(tagField);

    // TEST option list to contain unfiltered tags
    expect(linkForm.getFirstParagraphText(firstOption).then(value => value[0]))
    .not.toBe(firstCharacter,
      'options should not be filtered and first option should therefore not start with the same ' +
      'character as the previously entered character');
    
    // TEST tag error field pop up
    expect(linkForm.getElement(linkForm.tagErrorField)).toBeTruthy(
      'the error field should pop up');

    // fill option list with filtered fallback list (all tags of all domains)
    tagField.sendKeys(linkForm.defaultTagNotInDefDom);

    // Test option list be filled with fallback list (all tags of all domains)
    expect(linkForm.getFirstParagraphText(firstOption)).toEqual(linkForm.defaultTagNotInDefDom,
      'options should contain the tag not associated with the default domain')
  });

});
