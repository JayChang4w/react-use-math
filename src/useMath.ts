import { evaluate, parse } from 'mathjs'
import { useState } from 'react'

export const useMath = () => {
  const [error, setError] = useState<string | null>(null)

  const evaluateExpression = (expr: string, scope: Record<string, any> = {}) => {
    try {
      setError(null);
      return evaluate(expr, scope);
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  }

  const isValidExpression = (expr: string) => {
    try {
      parse(expr);
      return true;
    } catch {
      return false;
    }
  }

  return { evaluateExpression, isValidExpression, error }
}