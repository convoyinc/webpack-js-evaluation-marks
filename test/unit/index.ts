import JSEvaluationMarksPlugin from '../../src';

describe(`JSEvaluationMarksPlugin`, () => {

  it(`constructs`, () => {
    const thing = new JSEvaluationMarksPlugin({
      namePrefix: 'js_eval',
    });
    expect(!!thing).to.be.ok;
  });

});
