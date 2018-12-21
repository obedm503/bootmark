import { newE2EPage } from '@stencil/core/testing';

describe('app', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<boot-mark-app></boot-mark-app>' });

    const element = await page.find('boot-mark-app');
    expect(element).toHaveClass('hydrated');
  });

  // it('renders changes to the name data', async () => {
  //   const page = await newE2EPage();

  //   await page.setContent('<boot-mark-app></boot-mark-app>');
  //   const component = await page.find('boot-mark-app');
  //   const element = await page.find('boot-mark-app >>> div');
  //   expect(element.textContent).toEqual(`Hello, World! I'm `);

  //   component.setProperty('first', 'James');
  //   await page.waitForChanges();
  //   expect(element.textContent).toEqual(`Hello, World! I'm James`);

  //   component.setProperty('last', 'Quincy');
  //   await page.waitForChanges();
  //   expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

  //   component.setProperty('middle', 'Earl');
  //   await page.waitForChanges();
  //   expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  // });
});
