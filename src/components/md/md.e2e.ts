import { newE2EPage } from '@stencil/core/testing';
import fetch from 'node-fetch';
import * as showdown from 'showdown';
import { getShowdownConfig } from '../../util';

const kitchenSinkUrl =
  'https://raw.githubusercontent.com/obedm503/markdown-kitchen-sink/master/README.md';
let kitchenSink: string;

beforeAll(async () => {
  const res = await fetch(kitchenSinkUrl);
  kitchenSink = await res.text();
});

describe('md', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: '<boot-mark>\n# Hello\n</boot-mark>',
    });
    const element = await page.find('boot-mark');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<boot-mark src="${kitchenSinkUrl}"></boot-mark>`,
    );
    await page.waitForChanges();
    const converter = new showdown.Converter(getShowdownConfig());
    console.log('page', await page.content());
    const component = await page.find('boot-mark');

    // await page.waitForSelector('boot-mark > section')
    console.log(component.innerHTML);
    const element = await component.find('section');
    expect(element.innerHTML).toEqual(converter.makeHtml(kitchenSink));

    // component.setProperty('first', 'James');
    // await page.waitForChanges();
    // expect(element.textContent).toEqual(`Hello, World! I'm James`);

    // component.setProperty('last', 'Quincy');
    // await page.waitForChanges();
    // expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    // component.setProperty('middle', 'Earl');
    // await page.waitForChanges();
    // expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
