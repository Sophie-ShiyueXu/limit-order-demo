import { Assertion, assert, expect, config, should } from 'chai';
/**
 * @category expect
 * Asserts that two values are roughly equal within a specified relative difference.
 * This function is useful for cases where precision issues might cause direct comparisons to fail.
 * @remarks
 * This function will revert with a message if the values are of different signs
 * or if the actual value deviates from the expected by more than the specified relative difference.
 * @param expected The expected value as a string, number, or bigint.
 * @param actual The actual value obtained, to compare against the expected value.
 * @param relativeDiff The maximum allowed relative difference between the expected and actual values.
 * The relative difference is calculated as the absolute difference divided by the expected value,
 * ensuring that the actual value is within this relative difference from the expected value.
 */
export declare function assertRoughlyEqualValues(expected: string | number | bigint, actual: string | number | bigint, relativeDiff: number): void;
export { Assertion, assert, expect, config, should };
