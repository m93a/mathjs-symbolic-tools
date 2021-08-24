import {
  parse,
  MathNode,
  AccessorNode,
  ArrayNode,
  AssignmentNode,
  BlockNode,
  ConditionalNode,
  ConstantNode,
  FunctionAssignmentNode,
  FunctionNode,
  IndexNode,
  ObjectNode,
  OperatorNode,
  ParenthesisNode,
  RangeNode,
  RelationalNode,
  SymbolNode
} from 'mathjs'

/*
  2 + ?x
  2 * ?_
  2 + ?{Symbol}
  8 + ?{x : Paren}
  ?x + ?y
  ?{op : ImplicitMul}(a, b)
  ?{x: Paren | Symbol}
*/
const REGEX = {
  identifier: /[a-zA-Z]\w*/,
  whitespace: /\s*/
}

export function parseQuery (query: string): MathNode {
  const wildcards: WildcardNode[] = []

  for (let i = 0; i < query.length; ) {
    i = query.indexOf('?', i)
    if (i === -1) break
    // TODO
  }

  // TODO
}

export type MathNodeCtor = new (...args: any) => MathNode
export type NodeTest = (n: MathNode) => boolean

export class WildcardNode extends SymbolNode {
  public tests: NodeTest[]

  matches (n: MathNode): boolean {
    return this.tests.some(t => t(n))
  }

  constructor (name: string, tests: Array<NodeTest | MathNodeCtor> = []) {
    super(name)

    this.tests = tests.map(t => {
      if (t.prototype === undefined) return t as NodeTest
      switch (t) {
        case AccessorNode:
          return n => n.isAccessorNode === true
        case ArrayNode:
          return n => n.isArrayNode === true
        case AssignmentNode:
          return n => n.isAssignmentNode === true
        case BlockNode:
          return n => n.isBlockNode === true
        case ConditionalNode:
          return n => n.isConditionalNode === true
        case ConstantNode:
          return n => n.isConstantNode === true
        case FunctionAssignmentNode:
          return n => n.isFunctionAssignmentNode === true
        case FunctionNode:
          return n => n.isFunctionNode === true
        case IndexNode:
          return n => n.isIndexNode === true
        case ObjectNode:
          return n => n.isObjectNode === true
        case OperatorNode:
          return n => n.isOperatorNode === true
        case ParenthesisNode:
          return n => n.isParenthesisNode === true
        case RangeNode:
          return n => n.isRangeNode === true
        case RelationalNode:
          return n => n.isRelationalNode === true
        case SymbolNode:
          return n => n.isSymbolNode === true
        default:
          return n => n instanceof t
      }
    })
  }
}
