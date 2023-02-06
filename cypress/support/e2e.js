// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';

import addContext from 'mochawesome/addContext';
import 'cypress-mochawesome-reporter/register';
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    let parent = runnable.parent;
    let parentTitle = parent.title;
    while (parent.parent?.title) {
      parent = parent.parent;
      parentTitle = `${parent.title} -- ${parentTitle}`;
    }
    const screenshot = `${parentTitle} -- ${test.title} (failed).png`;
    addContext({ test }, screenshot);

    let videoName = Cypress.spec.name;
    videoName = videoName.replace('/.js.*', '.js');
    const videoUrl = 'videos/' + videoName + '.mp4';
    addContext({ test }, videoUrl);
  }
});


