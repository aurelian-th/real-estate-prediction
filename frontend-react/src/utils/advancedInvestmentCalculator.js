/**
 * Advanced Investment Calculator Utility Functions
 * Provides sophisticated financial calculations for real estate investment analysis
 */

import {
    calculateMonthlyMortgagePayment,
    calculateNPV,
    calculateIRR,
    calculateCapRate,
    calculateCashOnCash,
    generateAmortizationSchedule,
    calculateTotalCostOfOwnership
} from './investmentCalculator';

/**
 * Calculate Break-Even Point
 * @param {number} monthlyCosts - Total monthly costs (mortgage, taxes, insurance, etc.)
 * @param {number} monthlyRentalIncome - Expected monthly rental income
 * @returns {Object} Break-even details including occupancy rate and monthly cash needed
 */
export const calculateBreakEven = (monthlyCosts, monthlyRentalIncome) => {
    // Break-even occupancy rate
    const breakEvenOccupancy = monthlyCosts / monthlyRentalIncome;

    // Monthly cash needed to break even at different occupancy rates
    const cashNeededAt90 = monthlyCosts - (monthlyRentalIncome * 0.9); // 90% occupancy
    const cashNeededAt80 = monthlyCosts - (monthlyRentalIncome * 0.8); // 80% occupancy
    const cashNeededAt70 = monthlyCosts - (monthlyRentalIncome * 0.7); // 70% occupancy

    return {
        breakEvenOccupancy: Math.min(breakEvenOccupancy, 1), // Cap at 100%
        cashNeededAt90: Math.max(cashNeededAt90, 0),
        cashNeededAt80: Math.max(cashNeededAt80, 0),
        cashNeededAt70: Math.max(cashNeededAt70, 0)
    };
};

/**
 * Calculate Debt Service Coverage Ratio (DSCR)
 * Used by lenders to determine loan eligibility for investment properties
 * @param {number} annualNetOperatingIncome - Annual net operating income
 * @param {number} annualDebtService - Annual debt payments
 * @returns {number} DSCR value (>1 is generally favorable)
 */
export const calculateDSCR = (annualNetOperatingIncome, annualDebtService) => {
    return annualNetOperatingIncome / annualDebtService;
};

/**
 * Calculate Gross Rent Multiplier (GRM)
 * @param {number} propertyPrice - Property purchase price
 * @param {number} annualGrossRent - Annual gross rental income
 * @returns {number} GRM value
 */
export const calculateGRM = (propertyPrice, annualGrossRent) => {
    return propertyPrice / annualGrossRent;
};

/**
 * Calculate Return on Investment (ROI) over time
 * @param {number} purchasePrice - Property purchase price
 * @param {number} annualCashFlow - Annual cash flow
 * @param {number} appreciationRate - Annual appreciation rate as decimal
 * @param {number} years - Number of years
 * @returns {Object} ROI details including total ROI and annualized ROI
 */
export const calculateROI = (purchasePrice, annualCashFlow, appreciationRate, years) => {
    const futureValue = purchasePrice * Math.pow(1 + appreciationRate, years);
    const totalAppreciation = futureValue - purchasePrice;
    const totalCashFlow = annualCashFlow * years;
    const totalReturn = totalAppreciation + totalCashFlow;

    const totalROI = totalReturn / purchasePrice;
    const annualizedROI = Math.pow(1 + totalROI, 1 / years) - 1;

    return {
        totalROI,
        annualizedROI,
        futureValue,
        totalAppreciation,
        totalCashFlow,
        totalReturn
    };
};

/**
 * Calculate Modified Internal Rate of Return (MIRR)
 * More realistic than IRR because it accounts for reinvestment rates
 * @param {number} initialInvestment - Initial cash investment
 * @param {Array<number>} cashFlows - Array of cash flows
 * @param {number} financeRate - Rate for negative cash flows
 * @param {number} reinvestRate - Rate for reinvestment of positive cash flows
 * @returns {number} MIRR value
 */
export const calculateMIRR = (initialInvestment, cashFlows, financeRate, reinvestRate) => {
    const n = cashFlows.length;

    // Calculate the future value of positive cash flows
    let positiveFlowsFV = 0;
    cashFlows.forEach((cf, i) => {
        if (cf > 0) {
            positiveFlowsFV += cf * Math.pow(1 + reinvestRate, n - i - 1);
        }
    });

    // Calculate the present value of negative cash flows
    let negativeFlowsPV = 0;
    cashFlows.forEach((cf, i) => {
        if (cf < 0) {
            negativeFlowsPV += cf / Math.pow(1 + financeRate, i + 1);
        }
    });

    // Add initial investment to negative flows PV
    negativeFlowsPV = Math.abs(negativeFlowsPV) + initialInvestment;

    // Calculate MIRR
    return Math.pow(positiveFlowsFV / negativeFlowsPV, 1 / n) - 1;
};

/**
 * Calculate Cash-Flow Return on Investment
 * More complete than standard Cash-on-Cash as it includes equity buildup, appreciation, and tax benefits
 * @param {number} annualCashFlow - Annual pre-tax cash flow
 * @param {number} principalReduction - Annual principal reduction
 * @param {number} annualAppreciation - Annual appreciation
 * @param {number} taxBenefits - Annual tax benefits (depreciation, etc.)
 * @param {number} initialInvestment - Initial cash investment
 * @returns {number} CF-ROI as decimal
 */
export const calculateCFROI = (
    annualCashFlow,
    principalReduction,
    annualAppreciation,
    taxBenefits,
    initialInvestment
) => {
    return (annualCashFlow + principalReduction + annualAppreciation + taxBenefits) / initialInvestment;
};

/**
 * Calculate Tax Benefits from Depreciation
 * @param {number} buildingValue - Value of building (excluding land)
 * @param {number} landValuePercent - Land value as percentage of property price
 * @param {number} depreciationPeriod - Depreciation period in years (27.5 for residential in US)
 * @param {number} taxBracket - Investor's income tax bracket as decimal
 * @param {number} purchasePrice - Total property purchase price
 * @returns {Object} Tax benefit details
 */
export const calculateDepreciationTaxBenefits = (
    purchasePrice,
    landValuePercent = 20,
    depreciationPeriod = 27.5,
    taxBracket = 0.24
) => {
    const landValue = purchasePrice * (landValuePercent / 100);
    const buildingValue = purchasePrice - landValue;

    const annualDepreciation = buildingValue / depreciationPeriod;
    const annualTaxBenefit = annualDepreciation * taxBracket;

    return {
        landValue,
        buildingValue,
        annualDepreciation,
        annualTaxBenefit
    };
};

/**
 * Calculate One Percent Rule evaluation
 * Simple rule of thumb: Monthly rent should be ≥ 1% of purchase price
 * @param {number} monthlyRent - Expected monthly rental income
 * @param {number} purchasePrice - Property purchase price
 * @returns {Object} One percent rule details
 */
export const calculateOnePercentRule = (monthlyRent, purchasePrice) => {
    const onePercent = purchasePrice * 0.01;
    const ratio = monthlyRent / purchasePrice;
    const isPassing = monthlyRent >= onePercent;

    return {
        onePercentThreshold: onePercent,
        actualRatio: ratio,
        isPassing
    };
};

/**
 * Calculate Comparable Rent Analysis
 * @param {number} monthlyRent - Current/expected monthly rental income
 * @param {Array<{rent: number, area: number}>} comparables - Array of comparable rental properties
 * @param {number} area - Area of property in same units as comparables
 * @returns {Object} Analysis of rental income compared to market
 */
export const calculateRentalComps = (monthlyRent, comparables, area) => {
    // Calculate average rent per area unit
    let totalRentPerUnit = 0;
    comparables.forEach(comp => {
        totalRentPerUnit += comp.rent / comp.area;
    });
    const avgRentPerUnit = totalRentPerUnit / comparables.length;

    // Expected rent based on comparable data
    const expectedRent = avgRentPerUnit * area;

    // Difference
    const difference = monthlyRent - expectedRent;
    const percentDifference = difference / expectedRent;

    return {
        avgRentPerUnit,
        expectedRent,
        difference,
        percentDifference,
        isUndervalued: monthlyRent < expectedRent,
        isOvervalued: monthlyRent > expectedRent
    };
};

/**
 * Generate sensitivity analysis for key investment parameters
 * @param {Object} baseParams - Base investment parameters
 * @returns {Object} Sensitivity analysis results
 */
export const generateSensitivityAnalysis = (baseParams) => {
    // Parameter variations
    const variations = {
        purchasePrice: [-10, -5, 0, 5, 10], // Percent changes
        interestRate: [-1, -0.5, 0, 0.5, 1], // Percentage point changes
        rentalIncome: [-10, -5, 0, 5, 10], // Percent changes
        vacancyRate: [-3, -2, 0, 2, 3], // Percentage point changes
        appreciationRate: [-2, -1, 0, 1, 2], // Percentage point changes
    };

    const results = {};

    // Purchase price sensitivity
    results.purchasePrice = variations.purchasePrice.map(variation => {
        const modifiedPrice = baseParams.purchasePrice * (1 + variation / 100);
        const loanAmount = modifiedPrice * (1 - baseParams.downPaymentPercent / 100);
        const monthlyMortgage = calculateMonthlyMortgagePayment(
            loanAmount,
            baseParams.annualInterestRate / 100,
            baseParams.loanTermYears
        );
        const cashFlow = (baseParams.monthlyRentalIncome * (1 - baseParams.annualVacancyRate / 100)) -
            monthlyMortgage -
            (modifiedPrice * baseParams.annualPropertyTaxRate / 100 / 12) -
            (modifiedPrice * baseParams.annualInsuranceRate / 100 / 12) -
            baseParams.monthlyHOA -
            (modifiedPrice * baseParams.annualMaintenanceRate / 100 / 12);

        return {
            variation,
            monthlyCashFlow: cashFlow
        };
    });

    // Interest rate sensitivity
    results.interestRate = variations.interestRate.map(variation => {
        const modifiedRate = baseParams.annualInterestRate + variation;
        const loanAmount = baseParams.purchasePrice * (1 - baseParams.downPaymentPercent / 100);
        const monthlyMortgage = calculateMonthlyMortgagePayment(
            loanAmount,
            modifiedRate / 100,
            baseParams.loanTermYears
        );
        const cashFlow = (baseParams.monthlyRentalIncome * (1 - baseParams.annualVacancyRate / 100)) -
            monthlyMortgage -
            (baseParams.purchasePrice * baseParams.annualPropertyTaxRate / 100 / 12) -
            (baseParams.purchasePrice * baseParams.annualInsuranceRate / 100 / 12) -
            baseParams.monthlyHOA -
            (baseParams.purchasePrice * baseParams.annualMaintenanceRate / 100 / 12);

        return {
            variation,
            monthlyCashFlow: cashFlow
        };
    });

    // Rental income sensitivity
    results.rentalIncome = variations.rentalIncome.map(variation => {
        const modifiedRent = baseParams.monthlyRentalIncome * (1 + variation / 100);
        const loanAmount = baseParams.purchasePrice * (1 - baseParams.downPaymentPercent / 100);
        const monthlyMortgage = calculateMonthlyMortgagePayment(
            loanAmount,
            baseParams.annualInterestRate / 100,
            baseParams.loanTermYears
        );
        const cashFlow = (modifiedRent * (1 - baseParams.annualVacancyRate / 100)) -
            monthlyMortgage -
            (baseParams.purchasePrice * baseParams.annualPropertyTaxRate / 100 / 12) -
            (baseParams.purchasePrice * baseParams.annualInsuranceRate / 100 / 12) -
            baseParams.monthlyHOA -
            (baseParams.purchasePrice * baseParams.annualMaintenanceRate / 100 / 12);

        return {
            variation,
            monthlyCashFlow: cashFlow
        };
    });

    return results;
};

/**
 * Calculate a comprehensive investment score based on various metrics
 * @param {Object} metrics - Investment metrics
 * @returns {Object} Score details with overall score and component scores
 */
export const calculateInvestmentScore = (metrics) => {
    // Define scoring weights
    const weights = {
        cashOnCash: 0.25,
        capRate: 0.2,
        irrScore: 0.15,
        dscr: 0.15,
        onePercentRule: 0.1,
        appreciationPotential: 0.15
    };

    // Score each component (0-100 scale)
    const cashOnCashScore = Math.min(metrics.cashOnCash * 100 * 10, 100);
    const capRateScore = Math.min(metrics.capRate * 100 * 10, 100);
    const irrScore = Math.min(metrics.irr * 100 * 7, 100);
    const dscrScore = Math.min((metrics.dscr - 1) * 100, 100);
    const onePercentScore = metrics.onePercentRule.isPassing ? 100 :
        (metrics.onePercentRule.actualRatio / 0.01) * 100;
    const appreciationScore = Math.min(metrics.annualAppreciationRate * 100 * 20, 100);

    // Calculate weighted overall score
    const overallScore =
        (cashOnCashScore * weights.cashOnCash) +
        (capRateScore * weights.capRate) +
        (irrScore * weights.irrScore) +
        (dscrScore * weights.dscr) +
        (onePercentScore * weights.onePercentRule) +
        (appreciationScore * weights.appreciationPotential);

    // Investment rating based on score
    let rating;
    if (overallScore >= 80) rating = "Excellent";
    else if (overallScore >= 70) rating = "Very Good";
    else if (overallScore >= 60) rating = "Good";
    else if (overallScore >= 50) rating = "Fair";
    else rating = "Poor";

    return {
        overallScore,
        rating,
        componentScores: {
            cashOnCashScore,
            capRateScore,
            irrScore,
            dscrScore,
            onePercentScore,
            appreciationScore
        }
    };
};