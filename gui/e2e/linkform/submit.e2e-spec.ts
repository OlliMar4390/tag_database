import { browser } from 'protractor';
import { LinkFormPage } from '../page-objects/linkform.po';

describe('submit |', () => {
  let linkForm: LinkFormPage;  
  
  it('add a new link, change the domain and reset', () => {

    linkForm = new LinkFormPage();
    linkForm.setup();
    browser.sleep(300);

    // TEST focus on url field
    let urlInput = linkForm.urlInput
    expect(browser.switchTo().activeElement().getId()).toEqual(
      linkForm.getElement(urlInput).getId(),
      'the url field should be focused at the beginning');

    // TEST default domain
    let selectValue = linkForm.selectValue
    let defDom = linkForm.defaultDomain
    expect(linkForm.getParagraphText(selectValue)).toBe(defDom,
      'should get the default domain');

    // add url
    linkForm.addURL();

    // add 2 tags
    linkForm.addTags([linkForm.defaultTag, linkForm.defaultTag]);

    // select the domain below the default domain
    linkForm.changeDomain();

    // add a description
    linkForm.addDescription();

    // TEST the state of the submitt button
    const submitButton = linkForm.getElement(linkForm.submitButton);
    submitButton.isEnabled().then(value => {
      expect(value).toBe(true,
        'the submit button should be enabled');
    });

    // TEST check for possible errors
    expect(linkForm.containsElement(linkForm.urlErrorField)).toBe(false,
      'no error field should be shown for the url');

    expect(linkForm.containsElement(linkForm.tagErrorField)).toBe(false,
      'no error field should be shown for the tags');

    // submit the form
    linkForm.submitAndWait(submitButton);

    // TEST no error
    expect(linkForm.containsElement(linkForm.linkErrorField)).toBe(false,
      'no error message should show up');

    // TEST current domain
    expect(linkForm.getParagraphText(selectValue)).not.toEqual('',
      'the domain should not be nothing');

    expect(linkForm.getParagraphText(selectValue)).not.toEqual(defDom,
      'the domain should not be default domain');

    // TEST input fields
    expect(linkForm.getParagraphText(urlInput)).toEqual('',
      'should reset the url field ');

    expect(linkForm.getParagraphText(linkForm.descriptionInput)).toEqual('',
      'should reset the description field');
    
    expect(linkForm.getParagraphText(linkForm.tagInput)).toEqual('',
      'should reset the tag field');
    
    // TEST number of tag fields
    expect(linkForm.getAllElements('input').count()).toBe(3, 
      'should reset the tag field number');
      
  });

});
