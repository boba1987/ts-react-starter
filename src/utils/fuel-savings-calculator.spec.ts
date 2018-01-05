import * as chai from 'chai';
import calculator, {ISettings} from './fuel-savings-calculator';

chai.should();

describe('Fuel Savings Calculator', () => {
    describe('necessaryDataIsProvidedToCalculateSavings', () => {
        it('returns false when necessary data isn\'t provided', () => {
            // arrange
            const settings: ISettings = {
                newKpl: 20
            };

            // act
            const isNecessaryDataProvided = calculator.necessaryDataIsProvidedToCalculateSavings(settings);

            // assert
            isNecessaryDataProvided.should.equal(false);
        });

        it('returns true when necessary data is provided', () => {
            // arrange
            const settings: ISettings = {
                newKpl: 20,
                tradeKpl: 10,
                newPpg: 1.50,
                tradePpg: 1.50,
                kilometersDriven: 100
            };

            // act
            const isNecessaryDataProvided = calculator.necessaryDataIsProvidedToCalculateSavings(settings);

            // assert
            isNecessaryDataProvided.should.equal(true);
        });
    });

    describe('kilometersPerMonth', () => {
        it('converts a weekly timeframe to a monthly timeframe', () => {
            // arrange
            const kilometersPerWeek = 100;

            // act
            const kilometersPerMonth = calculator.calculatekilometersDrivenPerMonth(kilometersPerWeek, 'week');

            // assert
            kilometersPerMonth.should.equal(433.3333333333333);
        });

        it('returns a monthly timeframe untouched', () => {
            // arrange
            const kilometersPerMonth = 300;

            // act
            const kilometersPerMonthCalculated = calculator.calculatekilometersDrivenPerMonth(kilometersPerMonth, 'month');

            // assert
            kilometersPerMonthCalculated.should.equal(kilometersPerMonth);
        });

        it('converts a yearly timeframe to a monthly timeframe', () => {
            // arrange
            const kilometersPerYear = 1200;

            // act
            const kilometersPerMonth = calculator.calculatekilometersDrivenPerMonth(kilometersPerYear, 'year');

            // assert
            kilometersPerMonth.should.equal(100);
        });
    });

    describe('calculateSavingsPerMonth', () => {
        it('returns 29.93 in savings per month with these settings', () => {
            // arrange
            const settings: ISettings = {
                tradePpg: 3.75,
                tradeKpl: 24,
                newPpg: 3.75,
                newKpl: 38,
                kilometersDriven: 120,
                kilometersDrivenTimeframe: 'week'
            };

            // act
            const savingsPerMonth = calculator.calculateSavingsPerMonth(settings);

            // assert
            savingsPerMonth.should.equal(29.93);
        });

        it('returns 40.83 in savings per month with these settings', () => {
            // arrange
            const settings: ISettings = {
                tradeKpl: 24,
                tradePpg: 4.15,
                newKpl: 38,
                newPpg: 3.75,
                kilometersDriven: 550,
                kilometersDrivenTimeframe: 'month'
            };

            // act
            const savingsPerMonth = calculator.calculateSavingsPerMonth(settings);

            // assert
            savingsPerMonth.should.equal(40.83);
        });

        it('returns -157.12 in loss per month with these settings', () => {
            // arrange
            const settings: ISettings = {
                tradePpg: 3.15,
                tradeKpl: 40,
                newPpg: 3.75,
                newKpl: 18,
                kilometersDriven: 14550,
                kilometersDrivenTimeframe: 'year'
            };

            // act
            const savingsPerMonth = calculator.calculateSavingsPerMonth(settings);

            // assert
            savingsPerMonth.should.equal(-157.12);
        });
    });
});
