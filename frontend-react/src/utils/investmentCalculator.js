/**
 * Investment Calculator Utility Functions
 * Provides financial calculations for real estate investment analysis
 */

/**
 * Calculate monthly mortgage payment
 * @param {number} principal - Loan amount
 * @param {number} annualInterestRate - Annual interest rate (as a decimal, e.g., 0.05 for 5%)
 * @param {number} loanTermYears - Loan term in years
 * @returns {number} Monthly payment
 */
export const calculateMonthlyMortgagePayment = (principal, annualInterestRate, loanTermYears) => {
    const monthlyRate = annualInterestRate / 12;
    const totalPayments = loanTermYears * 12;

    // Handle edge case of zero interest rate
    if (monthlyRate === 0) return principal / totalPayments;

    return principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
};

/**
 * Calculate Net Present Value (NPV) for a real estate investment
 * @param {number} initialInvestment - Initial investment (down payment, closing costs, etc.)
 * @param {Array<number>} cashFlows - Array of projected annual cash flows
 * @param {number} discountRate - Annual discount rate (as a decimal)
 * @returns {number} Net Present Value
 */
export const calculateNPV = (initialInvestment, cashFlows, discountRate) => {
    let npv = -initialInvestment;

    cashFlows.forEach((cashFlow, index) => {
        npv += cashFlow / Math.pow(1 + discountRate, index + 1);
    });

    return npv;
};

/**
 * Calculate Internal Rate of Return (IRR) using the Newton-Raphson method
 * @param {number} initialInvestment - Initial investment
 * @param {Array<number>} cashFlows - Array of projected annual cash flows
 * @param {number} guess - Initial guess for IRR (default 0.1 or 10%)
 * @param {number} tolerance - Error tolerance (default 0.0001)
 * @param {number} maxIterations - Maximum iterations (default 100)
 * @returns {number|null} IRR or null if it doesn't converge
 */
export const calculateIRR = (
    initialInvestment,
    cashFlows,
    guess = 0.1,
    tolerance = 0.0001,
    maxIterations = 100
) => {
    let rate = guess;

    // Newton-Raphson method to find IRR
    for (let iteration = 0; iteration < maxIterations; iteration++) {
        let npv = -initialInvestment;
        let derivativeNpv = 0;

        for (let i = 0; i < cashFlows.length; i++) {
            const t = i + 1;
            npv += cashFlows[i] / Math.pow(1 + rate, t);
            derivativeNpv -= t * cashFlows[i] / Math.pow(1 + rate, t + 1);
        }

        // Check if we've reached desired accuracy
        if (Math.abs(npv) < tolerance) {
            return rate;
        }

        // Avoid division by zero
        if (derivativeNpv === 0) {
            return null;
        }

        // Update rate
        rate = rate - npv / derivativeNpv;

        // Check for non-convergence
        if (rate < -1) {
            return null;
        }
    }

    // If we've reached max iterations without converging
    return null;
};

/**
 * Calculate Cap Rate
 * @param {number} annualNetOperatingIncome - Annual net operating income
 * @param {number} propertyValue - Current property value
 * @returns {number} Cap Rate as a decimal
 */
export const calculateCapRate = (annualNetOperatingIncome, propertyValue) => {
    return annualNetOperatingIncome / propertyValue;
};

/**
 * Calculate Cash-on-Cash Return
 * @param {number} annualCashFlow - Annual cash flow after all expenses and debt service
 * @param {number} initialCashInvestment - Initial cash investment
 * @returns {number} Cash-on-Cash Return as a decimal
 */
export const calculateCashOnCash = (annualCashFlow, initialCashInvestment) => {
    return annualCashFlow / initialCashInvestment;
};

/**
 * Generate an amortization schedule
 * @param {number} principal - Loan amount
 * @param {number} annualInterestRate - Annual interest rate (as a decimal)
 * @param {number} loanTermYears - Loan term in years
 * @returns {Array} Array of objects with payment info for each period
 */
export const generateAmortizationSchedule = (principal, annualInterestRate, loanTermYears) => {
    const monthlyRate = annualInterestRate / 12;
    const totalPayments = loanTermYears * 12;
    const monthlyPayment = calculateMonthlyMortgagePayment(principal, annualInterestRate, loanTermYears);

    let remainingBalance = principal;
    const schedule = [];

    for (let i = 1; i <= totalPayments; i++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;

        schedule.push({
            paymentNumber: i,
            paymentAmount: monthlyPayment,
            principalPayment: principalPayment,
            interestPayment: interestPayment,
            remainingBalance: Math.max(0, remainingBalance) // Ensure we don't get negative values due to rounding
        });
    }

    return schedule;
};

/**
 * Calculate total cost of ownership over time
 * @param {number} purchasePrice - Property purchase price
 * @param {number} downPaymentPercent - Down payment percentage (as a decimal)
 * @param {number} annualInterestRate - Annual interest rate (as a decimal)
 * @param {number} loanTermYears - Loan term in years
 * @param {number} annualPropertyTaxRate - Annual property tax rate (as a decimal)
 * @param {number} annualInsuranceRate - Annual insurance rate (as a decimal)
 * @param {number} monthlyHOA - Monthly HOA fees
 * @param {number} annualMaintenanceRate - Annual maintenance costs (as a decimal of property value)
 * @param {number} annualAppreciationRate - Annual property appreciation rate (as a decimal)
 * @param {number} holdingPeriodYears - Number of years property will be held
 * @returns {Object} Total cost details including equity, costs, and final value
 */
export const calculateTotalCostOfOwnership = (
    purchasePrice,
    downPaymentPercent,
    annualInterestRate,
    loanTermYears,
    annualPropertyTaxRate,
    annualInsuranceRate,
    monthlyHOA,
    annualMaintenanceRate,
    annualAppreciationRate,
    holdingPeriodYears
) => {
    const downPayment = purchasePrice * downPaymentPercent;
    const loanAmount = purchasePrice - downPayment;
    const monthlyPayment = calculateMonthlyMortgagePayment(loanAmount, annualInterestRate, loanTermYears);

    const yearlyData = [];
    let currentPropertyValue = purchasePrice;
    let remainingBalance = loanAmount;

    for (let year = 1; year <= holdingPeriodYears; year++) {
        // Update property value with appreciation
        currentPropertyValue *= (1 + annualAppreciationRate);

        // Calculate yearly costs
        const yearlyMortgagePayments = monthlyPayment * 12;
        const propertyTax = currentPropertyValue * annualPropertyTaxRate;
        const insurance = currentPropertyValue * annualInsuranceRate;
        const hoaFees = monthlyHOA * 12;
        const maintenance = currentPropertyValue * annualMaintenanceRate;

        // Calculate interest and principal for the year
        let yearlyInterest = 0;
        let yearlyPrincipal = 0;

        for (let month = 1; month <= 12; month++) {
            const monthlyInterest = remainingBalance * (annualInterestRate / 12);
            const monthlyPrincipal = monthlyPayment - monthlyInterest;

            yearlyInterest += monthlyInterest;
            yearlyPrincipal += monthlyPrincipal;
            remainingBalance -= monthlyPrincipal;

            // Ensure remaining balance doesn't go below zero due to rounding errors
            if (remainingBalance < 0) remainingBalance = 0;
        }

        const totalCostsForYear = yearlyMortgagePayments + propertyTax + insurance + hoaFees + maintenance;
        const equity = currentPropertyValue - remainingBalance;

        yearlyData.push({
            year,
            propertyValue: currentPropertyValue,
            equity,
            mortgagePayment: yearlyMortgagePayments,
            principalPaid: yearlyPrincipal,
            interestPaid: yearlyInterest,
            propertyTax,
            insurance,
            hoaFees,
            maintenance,
            totalCosts: totalCostsForYear,
            remainingLoanBalance: remainingBalance
        });
    }

    return {
        initialInvestment: downPayment,
        yearlyData,
        finalPropertyValue: currentPropertyValue,
        totalEquityBuilt: currentPropertyValue - remainingBalance,
        loanPaid: loanAmount - remainingBalance
    };
};