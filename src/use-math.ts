/* eslint-disable @typescript-eslint/no-explicit-any */
import { compile, format, MathNode, parse } from 'mathjs';
import { useCallback, useState } from 'react';

export interface UseMathResult {
  result: number | null;
  error: string | null;
  evaluate: <TScope extends Record<string, any> = Record<string, any>>(
    expr: string,
    scope?: TScope,
  ) => void;
  isValid: (expr: string) => boolean;
  formatResult: (...args: Parameters<typeof format>) => string | null;
  extractVariables: (expr: string) => string[] | null;
}

type ScopeType = Record<string, any>;

export const useMath = (): UseMathResult => {
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const evaluate: UseMathResult['evaluate'] = useCallback(
    <TScope extends ScopeType = ScopeType>(expr: string, scope?: TScope): void => {
      try {
        const compiled = compile(expr);
        const res = compiled.evaluate(scope);
        setResult(res);
        setError(null);
      } catch (err: any) {
        setResult(null);
        setError(err.message);
      }
    },
    [],
  );

  const isValid: UseMathResult['isValid'] = useCallback((expr: string): boolean => {
    try {
      parse(expr);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }, []);

  const formatResult: UseMathResult['formatResult'] = useCallback(
    (...args: Parameters<typeof format>): string | null => {
      try {
        return format(...args);
      } catch (err: any) {
        setError(err.message);
        return null;
      }
    },
    [],
  );

  const extractVariables: UseMathResult['extractVariables'] = useCallback(
    (expr: string): string[] | null => {
      try {
        const node: MathNode = parse(expr);
        const variables: string[] = [];
        node.traverse((node) => {
          if (node.type === 'SymbolNode') {
            variables.push(node.toString());
          }
        });
        return Array.from(new Set(variables));
      } catch (err: any) {
        setError(err.message);
        return null;
      }
    },
    [],
  );

  return { result, error, evaluate, isValid, formatResult, extractVariables };
};
