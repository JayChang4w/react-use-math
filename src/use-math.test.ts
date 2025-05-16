import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMath } from './use-math';

describe('useMath', () => {
  describe('evaluate', () => {
    it('evaluates a valid expression', () => {
      const { result } = renderHook(() => useMath());

      act(() => {
        result.current.evaluate('2 + 3');
      });

      expect(result.current.result).toBe(5);
      expect(result.current.error).toBeNull();
    });

    it('detects invalid expression', () => {
      const { result } = renderHook(() => useMath());

      act(() => {
        result.current.evaluate('2 + ');
      });

      expect(result.current.result).toBeNull();
      expect(result.current.error).toBeTruthy();
    });
  });

  describe('isValid', () => {
    it('returns true for valid expression', () => {
      const { result } = renderHook(() => useMath());

      act(() => {
        const isValid = result.current.isValid('2 + 3');
        expect(isValid).toBe(true);
      });
    });

    it('returns false for invalid expression', () => {
      const { result } = renderHook(() => useMath());

      act(() => {
        const isValid = result.current.isValid('2 + ');
        expect(isValid).toBe(false);
      });
    });
  });

  describe('formatResult', () => {
    it('should format numbers correctly', () => {
      const { result } = renderHook(() => useMath());

      act(() => {
        const formattedNumber = result.current.formatResult(3.14159265359, { precision: 4 });
        expect(formattedNumber).toBe('3.142');
      });
    });
  });

  describe('extractVariables', () => {
    it('should return unique variables without duplicates', () => {
      const { result } = renderHook(() => useMath());

      const variables = result.current.extractVariables('x + x + y + y + z');
      expect(variables).toEqual(['x', 'y', 'z']);
    });
  });
});
