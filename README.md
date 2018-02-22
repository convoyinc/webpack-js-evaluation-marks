# JS Evaluation Marks Webpack Plugin

Adds performance.marks at the beginning and end of webpack bundles to measure JS evaluation time

## Getting started
```
npm install webpack-js-evaluation-marks --save
```

```js
new JSEvaluationMarksPlugin({
  namePrefix: 'js_evaluation_',
})
```

```js
const measures = window.performance.getEntriesByType('measure');
const measure = measures.find(m => m.name === `js_evaluation_${bundleName}`);
```
