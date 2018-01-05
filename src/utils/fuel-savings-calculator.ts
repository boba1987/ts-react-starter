import {kilometersDrivenTimeframes} from '../reducers/fuel-savings';
import { roundNumber } from './math-helper';
import NumberFormatter from './number-formatter';

export interface ISavings {
  annual: string|number;
  monthly: string|number;
  threeYear: string|number;
}

export interface ISettings { // TODO: Better interface name
  // TODO: Get the right types here.
  kilometersDriven?: number;
  kilometersDrivenTimeframe?: string;
  tradePpg?: number;
  tradeKpl?: number;
  newPpg?: number;
  newKpl?: number;
}

function calculateMonthlyCost(kilometersDrivenPerMonth: number, ppg: number, kpl: number): number {
  const litersUsedPerMonth = kilometersDrivenPerMonth / kpl;

  return litersUsedPerMonth * ppg;
};

function calculatekilometersDrivenPerMonth(kilometersDriven: number, kilometersDrivenTimeframe: kilometersDrivenTimeframes): number {
  const monthsPerYear = 12;
  const weeksPerYear = 52;

  switch (kilometersDrivenTimeframe) {
    case 'week':
      return (kilometersDriven * weeksPerYear) / monthsPerYear;

    case 'month':
      return kilometersDriven;

    case 'year':
      return kilometersDriven / monthsPerYear;

    default:
      throw 'Unknown kilometersDrivenTimeframe passed: ' + kilometersDrivenTimeframe;
  }
}

function calculateSavings(settings): ISavings {
  const monthlySavings = this.calculateSavingsPerMonth(settings);

  return {
    annual: NumberFormatter.getCurrencyFormattedNumber(monthlySavings * 12),
    monthly: NumberFormatter.getCurrencyFormattedNumber(monthlySavings),
    threeYear: NumberFormatter.getCurrencyFormattedNumber(monthlySavings * 12 * 3)
  };
}

function calculateSavingsPerMonth(settings: ISettings): number {
  if (!settings.kilometersDriven) {
    return 0;
  }

  const kilometersDrivenPerMonth = this.calculatekilometersDrivenPerMonth(settings.kilometersDriven, settings.kilometersDrivenTimeframe);
  const tradeFuelCostPerMonth = calculateMonthlyCost(kilometersDrivenPerMonth, settings.tradePpg, settings.tradeKpl);
  const newFuelCostPerMonth = calculateMonthlyCost(kilometersDrivenPerMonth, settings.newPpg, settings.newKpl);
  const savingsPerMonth = tradeFuelCostPerMonth - newFuelCostPerMonth;

  return roundNumber(savingsPerMonth, 2);
}

function necessaryDataIsProvidedToCalculateSavings(settings: ISettings): boolean {
  return settings.newKpl > 0
    && settings.tradeKpl > 0
    && settings.newPpg > 0
    && settings.tradePpg > 0
    && settings.kilometersDriven > 0;
}

const fuelSavingsCalculator = {
  calculatekilometersDrivenPerMonth,
  calculateSavings,
  calculateSavingsPerMonth,
  necessaryDataIsProvidedToCalculateSavings
};

export default fuelSavingsCalculator;
