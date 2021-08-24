import {
  AccessorNode,
  AssignmentNode,
  ConstantNode,
  MathNode,
  OperatorNode,
  ParenthesisNode,
  RelationalNode,
  SymbolNode
} from 'mathjs'

export function num (value: number): MathNode {
  return new ConstantNode(value)
}

export function sym (name: string): SymbolNode {
  return new SymbolNode(name)
}

export function add (...summands: MathNode[]): OperatorNode {
  return new OperatorNode('+', 'add', summands)
}

export function sub (minuent: MathNode, subtrahend: MathNode): OperatorNode {
  return new OperatorNode('-', 'subtract', [minuent, subtrahend])
}

export function mul (...factors: MathNode[]): OperatorNode {
  return new OperatorNode('*', 'multiply', factors, false)
}

export function juxtapos (...factors: MathNode[]): OperatorNode {
  return new OperatorNode('*', 'multiply', factors, true)
}

export function div (dividend: MathNode, divisor: MathNode): OperatorNode {
  return new OperatorNode('/', 'divide', [dividend, divisor])
}

export function paren (content: MathNode): ParenthesisNode {
  return new ParenthesisNode(content)
}

export function assign (variable: SymbolNode | AccessorNode, value: MathNode): AssignmentNode {
  return new AssignmentNode(variable, value)
}

export function eq (lhs: MathNode, rhs: MathNode): OperatorNode {
  return new OperatorNode('==', 'equal', [lhs, rhs])
}

export function lt (lhs: MathNode, rhs: MathNode): OperatorNode {
  return new OperatorNode('<', 'smaller', [lhs, rhs])
}

export function lte (lhs: MathNode, rhs: MathNode): OperatorNode {
  return new OperatorNode('<=', 'smallerEq', [lhs, rhs])
}

export function gte (lhs: MathNode, rhs: MathNode): OperatorNode {
  return new OperatorNode('>=', 'largerEq', [lhs, rhs])
}

export function gt (lhs: MathNode, rhs: MathNode): OperatorNode {
  return new OperatorNode('>', 'larger', [lhs, rhs])
}

const relationalOperators = {
  '<': 'smaller',
  '<=': 'smallerEq',
  '==': 'equal',
  '=>': 'largerEq',
  '>': 'larger'
} as const

export type RelationalOperator = keyof typeof relationalOperators

export function relation (lhs: MathNode, op: RelationalOperator, rhs: MathNode): RelationalNode
export function relation (lhs: MathNode, op1: RelationalOperator, mid: MathNode, op2: RelationalOperator, rhs: MathNode): RelationalNode
export function relation (val1: MathNode, op1: RelationalOperator, val2: MathNode, op2: RelationalOperator, val3: MathNode, op3: RelationalOperator, val4: MathNode): RelationalNode
export function relation (val1: MathNode, op1: RelationalOperator, val2: MathNode, op2: RelationalOperator, val3: MathNode, op3: RelationalOperator, val4: MathNode, ...args: Array<RelationalOperator | MathNode>): RelationalNode
export function relation (lhs: MathNode, ...args: Array<RelationalOperator | MathNode>): RelationalNode {
  const conditionals: Array<typeof relationalOperators[RelationalOperator]> = []
  const values: MathNode[] = [lhs]

  for (let i = 0; i < args.length; i += 2) {
    const op = args[i]
    const val = args[i + 1]

    if (typeof op !== 'string' || typeof relationalOperators[op] !== 'string') { throw new TypeError(`Argument ${i + 2}: Expected a relational operator, instead got ${op.toString()}`) }

    if (typeof val !== 'object') { throw new TypeError(`Argument ${i + 3}: Expected a node, instead got a ${typeof val}`) }

    conditionals.push(relationalOperators[op])
    values.push(val)
  }

  return new RelationalNode(conditionals, values)
}
