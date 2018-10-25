import { ConcatSource } from 'webpack-sources';
import * as webpack from 'webpack';

export interface JSEvaluationMarksOptions {
  namePrefix?: string;
}

// A named JavaScript function.
export default class JSEvaluationMarksPlugin {
  private _prefix: string;

  constructor(options: JSEvaluationMarksOptions = {}) {
    this._prefix = options.namePrefix || `js_evaluation_`;
  }

  apply(compiler: webpack.Compiler) {
    // Specifies webpack's event hook to attach itself.
    compiler.plugin('emit', (compilation: any, callback) => {
      compilation.chunks.forEach((chunk: any) => {
        const filepath = compilation.getPath(
          compilation.options.output.filename,
          { chunk },
        );

        // chunk.name can be empty sometimes. In those cases, we will not insert marks. Only names chunks would be inspected for marks. Unnamed marks are useless.//#endregion
        if (!chunk.name) return;
        const name = chunk.name.replace(/\./g, '_');
        const markName = this._prefix + name;

        const beforeContent =
          `;\n` +
          `var __jsEvaluationMarkGlobal = typeof global === 'object' ? global : window;` +
          `__jsEvaluationMarkGlobal.performance && ` +
          `__jsEvaluationMarkGlobal.performance.mark && ` +
          `__jsEvaluationMarkGlobal.performance.mark('${markName}_start'); `;

        const afterContent =
          `;\n` +
          `__jsEvaluationMarkGlobal.performance && __jsEvaluationMarkGlobal.performance.mark && ` +
          `__jsEvaluationMarkGlobal.performance.mark('${markName}_end'); ` +
          `__jsEvaluationMarkGlobal.performance && ` +
          `__jsEvaluationMarkGlobal.performance.measure && ` +
          `__jsEvaluationMarkGlobal.performance.measure('${markName}', '${markName}_start', '${markName}_end'); `;

        compilation.assets[filepath] = new ConcatSource(
          beforeContent,
          compilation.assets[filepath],
          afterContent,
        );
      });

      callback();
    });
  }
}
