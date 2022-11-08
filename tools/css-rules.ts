export default class CssRules {
  private indent?: boolean;

  constructor(indent?: boolean) {
    this.indent = indent;
  }

  createRules(selector: string, rules: string) {
    let rule = "";

    if (this.indent) {
      rule = `${selector} {\n\t${rules}\n}`;
    } else {
      rule = `${selector} { ${rules} }`;
    }

    return rule;
  }

  createDeclaration(property: string, value: string) {
    return `${property}: ${value};`;
  }
}
