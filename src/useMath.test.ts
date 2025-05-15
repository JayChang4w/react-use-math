import { describe, it, expect } from 'vitest'
import { useMath } from './useMath';
import { renderHook, act } from '@testing-library/react';

describe('useMath', () => {
  it('evaluates a valid expression', () => {
    const { result } = renderHook(() => useMath())

    const res = result.current.evaluateExpression('2 + 3')
    expect(res).toBe(5)
    expect(result.current.error).toBeNull()
  })

  it('detects invalid expression', () => {
    const { result } = renderHook(() => useMath())

    act(() => {
      const res = result.current.evaluateExpression('2 + ')
      expect(res).toBeNull()
    })

    expect(result.current.error).toBeTruthy();
  })
})