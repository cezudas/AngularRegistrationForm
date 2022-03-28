import {Component, Directive, Type} from '@angular/core';

export function MockDirective(options: Component): Type<Directive> {
  const metadata: Directive = {
    selector: options.selector,
    inputs: options.inputs,
    outputs: options.outputs,
  };

  return Directive(metadata)(class MockDirectiveClass {});
}
