import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';
import Card from './ui/Card';
import Button from './ui/Button';
import Select from './ui/Select';
import Input from './ui/Input';
import { 
  calculateMonthlyMortgagePayment, 
  calculateNPV, 
  calculateIRR, 
  calculateCapRate,
  calculateCashOnCash,
  calculateTotalCostOfOwnership
} from '../utils/investmentCalculator';
import { Info, Maximize, ArrowRight, TrendingUp } from 'lucide-react';

const InvestmentAnalysis = ({ property }) => {
  // Default values
  const defaultValues = {
    purchasePrice: property ? property.price : 80000,
    downPaymentPercent: 20,
    annualInterestRate: 5,
    loanTermYears: 25,
    annualPropertyTaxRate: 0.5,
    annualInsuranceRate: 0.3,
    monthlyHOA: property ? (property.has_hoa ? 50 : 0) : 0,
    annualMaintenanceRate: 1,
    annualAppreciationRate: 3,
    holdingPeriodYears: 10,
    monthlyRentalIncome: property ? (property.price * 0.005) : 400, // Estimated rental income
    annualVacancyRate: 5,
    annualPropertyManagementRate: 10
  };

  // State for investment parameters
  const [params, setParams] = useState(defaultValues);
  const [scenario, setScenario] = useState('neutral'); // 'pessimistic', 'neutral', 'optimistic'
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [results, setResults] = useState(null);

  // Calculate investment metrics when parameters change
  useEffect(() => {
    calculateInvestmentMetrics();
  }, [params, scenario]);

  // Update params when property changes
  useEffect(() => {
    if (property) {
      setParams(prev => ({
        ...prev,
        purchasePrice: property.price,
        monthlyHOA: property.has_hoa ? 50 : 0,
        monthlyRentalIncome: property.price * 0.005
      }));
    }
  }, [property]);

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const setScenarioPreset = (scenarioType) => {
    setScenario(scenarioType);
    
    // Adjust appreciation rate based on scenario
    let appreciationRate = 3; // neutral
    let vacancyRate = 5;
    let maintenanceRate = 1;
    
    if (scenarioType === 'pessimistic') {
      appreciationRate = 1;
      vacancyRate = 10;
      maintenanceRate = 1.5;
    } else if (scenarioType === 'optimistic') {
      appreciationRate = 5;
      vacancyRate = 2;
      maintenanceRate = 0.8;
    }
    
    setParams(prev => ({
      ...prev,
      annualAppreciationRate: appreciationRate,
      annualVacancyRate: vacancyRate,
      annualMaintenanceRate: maintenanceRate
    }));
  };

  const calculateInvestmentMetrics = () => {
    try {
      // Convert percentages to decimals
      const annualInterestRate = params.annualInterestRate / 100;
      const downPaymentPercent = params.downPaymentPercent / 100;
      const annualPropertyTaxRate = params.annualPropertyTaxRate / 100;
      const annualInsuranceRate = params.annualInsuranceRate / 100;
      const annualMaintenanceRate = params.annualMaintenanceRate / 100;
      const annualAppreciationRate = params.annualAppreciationRate / 100;
      const annualVacancyRate = params.annualVacancyRate / 100;
      const annualPropertyManagementRate = params.annualPropertyManagementRate / 100;

      // Calculate monthly mortgage payment
      const loanAmount = params.purchasePrice * (1 - downPaymentPercent);
      const monthlyMortgagePayment = calculateMonthlyMortgagePayment(
        loanAmount, 
        annualInterestRate, 
        params.loanTermYears
      );

      // Calculate total cost of ownership
      const costOfOwnership = calculateTotalCostOfOwnership(
        params.purchasePrice,
        downPaymentPercent,
        annualInterestRate,
        params.loanTermYears,
        annualPropertyTaxRate,
        annualInsuranceRate,
        params.monthlyHOA,
        annualMaintenanceRate,
        annualAppreciationRate,
        params.holdingPeriodYears
      );

      // Calculate rental income metrics
      const monthlyGrossRentalIncome = params.monthlyRentalIncome;
      const annualGrossRentalIncome = monthlyGrossRentalIncome * 12;
      const annualVacancyLoss = annualGrossRentalIncome * annualVacancyRate;
      const annualEffectiveRentalIncome = annualGrossRentalIncome - annualVacancyLoss;
      
      // Calculate annual expenses
      const annualMortgagePayments = monthlyMortgagePayment * 12;
      const annualPropertyTax = params.purchasePrice * annualPropertyTaxRate;
      const annualInsurance = params.purchasePrice * annualInsuranceRate;
      const annualHOA = params.monthlyHOA * 12;
      const annualMaintenance = params.purchasePrice * annualMaintenanceRate;
      const annualPropertyManagement = annualEffectiveRentalIncome * annualPropertyManagementRate;
      
      const annualExpenses = annualPropertyTax + annualInsurance + 
                             annualHOA + annualMaintenance + annualPropertyManagement;
      
      // Calculate Net Operating Income (NOI)
      const netOperatingIncome = annualEffectiveRentalIncome - 
                                (annualExpenses - annualMortgagePayments);
      
      // Calculate cash flow
      const annualCashFlow = netOperatingIncome - annualMortgagePayments;
      const monthlyCashFlow = annualCashFlow / 12;
      
      // Calculate investment metrics
      const initialInvestment = params.purchasePrice * downPaymentPercent;
      
      // Generate cash flows for NPV and IRR calculations
      const cashFlows = [];
      let propertyValue = params.purchasePrice;
      
      for (let year = 0; year < params.holdingPeriodYears; year++) {
        // Property appreciates each year
        propertyValue *= (1 + annualAppreciationRate);
        
        // Cash flow for this year
        cashFlows.push(annualCashFlow);
      }
      
      // Add sale proceeds to last cash flow
      cashFlows[cashFlows.length - 1] += propertyValue;
      
      // Calculate Cap Rate
      const capRate = calculateCapRate(netOperatingIncome, params.purchasePrice);
      
      // Calculate Cash-on-Cash Return
      const cashOnCash = calculateCashOnCash(annualCashFlow, initialInvestment);
      
      // Calculate NPV with a discount rate of 7%
      const discountRate = 0.07;
      const npv = calculateNPV(initialInvestment, cashFlows, discountRate);
      
      // Calculate IRR
      const irr = calculateIRR(initialInvestment, cashFlows) || 0;

      // Calculate ROI
      const totalReturn = (propertyValue - params.purchasePrice) + 
                          (annualCashFlow * params.holdingPeriodYears);
      const roi = totalReturn / initialInvestment;
      
      // Calculate payback period
      let paybackPeriod = 0;
      let cumulativeCashFlow = -initialInvestment;
      for (let i = 0; i < cashFlows.length; i++) {
        cumulativeCashFlow += cashFlows[i];
        if (cumulativeCashFlow >= 0 && paybackPeriod === 0) {
          paybackPeriod = i + 1;
          break;
        }
      }
      if (cumulativeCashFlow < 0) {
        paybackPeriod = Infinity;
      }
      
      setResults({
        monthlyMortgagePayment,
        costOfOwnership,
        monthlyGrossRentalIncome,
        annualGrossRentalIncome,
        annualVacancyLoss,
        annualEffectiveRentalIncome,
        annualExpenses,
        netOperatingIncome,
        annualCashFlow,
        monthlyCashFlow,
        capRate,
        cashOnCash,
        npv,
        irr,
        roi,
        paybackPeriod,
        finalPropertyValue: propertyValue
      });
    } catch (error) {
      console.error("Error calculating investment metrics:", error);
    }
  };

  if (!results) {
    return <div>Loading analysis...</div>;
  }

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format percentage
  const formatPercent = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'percent', 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(value);
  };

  // Create data for the equity growth chart
  const equityGrowthData = results.costOfOwnership.yearlyData.map(yearData => ({
    year: yearData.year,
    'Property Value': Math.round(yearData.propertyValue),
    'Loan Balance': Math.round(yearData.remainingLoanBalance),
    'Equity': Math.round(yearData.equity)
  }));

  // Create data for the cash flow chart
  const cashFlowData = results.costOfOwnership.yearlyData.map(yearData => {
    const rentalIncome = params.monthlyRentalIncome * 12 * 
                       (1 - (params.annualVacancyRate / 100));
    const expenses = yearData.propertyTax + yearData.insurance + 
                    yearData.hoaFees + yearData.maintenance + 
                    (rentalIncome * (params.annualPropertyManagementRate / 100));
    const cashFlow = rentalIncome - expenses - yearData.mortgagePayment;
    
    return {
      year: yearData.year,
      'Cash Flow': Math.round(cashFlow)
    };
  });

  return (    <div className="space-y-6 animate-fadeIn">
      <Card className="prediction-indicator">
        <Card.Header>
          <h2 className="text-xl font-semibold flex items-center">
            <TrendingUp size={20} className="mr-2 text-primary" />
            Investment Analysis
          </h2>
        </Card.Header>
        <Card.Body>
          <div className="mb-6">
            <div className="bg-blue-50 p-4 rounded-md mb-6 shadow-sm">
              <div className="flex items-start">
                <Info size={20} className="mr-2 text-primary mt-0.5" />
                <p className="text-sm text-gray-700">
                  This analysis helps you evaluate the investment potential of this property.
                  Adjust parameters to see how they affect your return on investment.
                </p>
              </div>
            </div>
            
            {/* Investment Scenario Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Scenario
              </label>
              <div className="flex space-x-2">
                <Button 
                  variant={scenario === 'pessimistic' ? 'primary' : 'outline'}
                  className={scenario === 'pessimistic' ? 'bg-blue-600' : ''}
                  onClick={() => setScenarioPreset('pessimistic')}
                >
                  Conservative
                </Button>
                <Button 
                  variant={scenario === 'neutral' ? 'primary' : 'outline'}
                  className={scenario === 'neutral' ? 'bg-blue-600' : ''}
                  onClick={() => setScenarioPreset('neutral')}
                >
                  Balanced
                </Button>
                <Button 
                  variant={scenario === 'optimistic' ? 'primary' : 'outline'}
                  className={scenario === 'optimistic' ? 'bg-blue-600' : ''}
                  onClick={() => setScenarioPreset('optimistic')}
                >
                  Optimistic
                </Button>
              </div>
            </div>
            
            {/* Basic Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input 
                label="Purchase Price (€)"
                type="number"
                name="purchasePrice"
                value={params.purchasePrice}
                onChange={handleParamChange}
              />
              
              <Input 
                label="Down Payment (%)"
                type="number"
                name="downPaymentPercent"
                value={params.downPaymentPercent}
                onChange={handleParamChange}
              />
              
              <Input 
                label="Annual Interest Rate (%)"
                type="number"
                name="annualInterestRate"
                value={params.annualInterestRate}
                onChange={handleParamChange}
              />
              
              <Input 
                label="Loan Term (Years)"
                type="number"
                name="loanTermYears"
                value={params.loanTermYears}
                onChange={handleParamChange}
              />
              
              <Input 
                label="Monthly Rental Income (€)"
                type="number"
                name="monthlyRentalIncome"
                value={params.monthlyRentalIncome}
                onChange={handleParamChange}
              />
              
              <Input 
                label="Annual Appreciation Rate (%)"
                type="number"
                name="annualAppreciationRate"
                value={params.annualAppreciationRate}
                onChange={handleParamChange}
              />
              
              <Input 
                label="Holding Period (Years)"
                type="number"
                name="holdingPeriodYears"
                value={params.holdingPeriodYears}
                onChange={handleParamChange}
              />
            </div>
            
            {/* Advanced Options Toggle */}
            <div className="mb-4">
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              >
                {showAdvancedOptions ? "Hide" : "Show"} Advanced Options
                <ArrowRight size={16} className={`ml-1 transform ${showAdvancedOptions ? 'rotate-90' : ''}`} />
              </button>
            </div>
            
            {/* Advanced Options */}
            {showAdvancedOptions && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-md">
                <Input 
                  label="Annual Property Tax Rate (%)"
                  type="number"
                  name="annualPropertyTaxRate"
                  value={params.annualPropertyTaxRate}
                  onChange={handleParamChange}
                />
                
                <Input 
                  label="Annual Insurance Rate (%)"
                  type="number"
                  name="annualInsuranceRate"
                  value={params.annualInsuranceRate}
                  onChange={handleParamChange}
                />
                
                <Input 
                  label="Monthly HOA Fees (€)"
                  type="number"
                  name="monthlyHOA"
                  value={params.monthlyHOA}
                  onChange={handleParamChange}
                />
                
                <Input 
                  label="Annual Maintenance Rate (%)"
                  type="number"
                  name="annualMaintenanceRate"
                  value={params.annualMaintenanceRate}
                  onChange={handleParamChange}
                />
                
                <Input 
                  label="Annual Vacancy Rate (%)"
                  type="number"
                  name="annualVacancyRate"
                  value={params.annualVacancyRate}
                  onChange={handleParamChange}
                />
                
                <Input 
                  label="Property Management Fee (%)"
                  type="number"
                  name="annualPropertyManagementRate"
                  value={params.annualPropertyManagementRate}
                  onChange={handleParamChange}
                />
              </div>
            )}
          </div>
          
          {/* Results */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Investment Summary</h3>
            
            {/* Key Metrics */}            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-primary p-6 rounded-lg shadow-md text-white investment-stats-card transform hover:scale-102 transition-all">
                <div className="text-sm text-white mb-1 opacity-90">Cash-on-Cash Return</div>
                <div className="text-2xl font-bold text-white">
                  {formatPercent(results.cashOnCash)}
                </div>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg shadow-md text-white investment-stats-card transform hover:scale-102 transition-all">
                <div className="text-sm text-white mb-1 opacity-90">Cap Rate</div>
                <div className="text-2xl font-bold text-white">
                  {formatPercent(results.capRate)}
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white investment-stats-card transform hover:scale-102 transition-all">
                <div className="text-sm text-white mb-1 opacity-90">IRR</div>
                <div className="text-2xl font-bold text-white">
                  {formatPercent(results.irr)}
                </div>
              </div>
              
              <div className="bg-primary p-6 rounded-lg shadow-md text-white investment-stats-card transform hover:scale-102 transition-all">
                <div className="text-sm text-white mb-1 opacity-90">Monthly Cash Flow</div>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(results.monthlyCashFlow)}
                </div>
              </div>
            </div>
            
            {/* Secondary Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Monthly Mortgage</div>
                <div className="font-semibold">
                  {formatCurrency(results.monthlyMortgagePayment)}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Initial Investment</div>
                <div className="font-semibold">
                  {formatCurrency(params.purchasePrice * (params.downPaymentPercent / 100))}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Total ROI</div>
                <div className="font-semibold">
                  {formatPercent(results.roi)}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Payback Period</div>
                <div className="font-semibold">
                  {results.paybackPeriod === Infinity 
                    ? "N/A" 
                    : `${results.paybackPeriod} years`}
                </div>
              </div>
            </div>
            
            {/* Equity Growth Chart */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-3">Equity Growth Over Time</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={equityGrowthData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      label={{ value: 'Year', position: 'insideBottomRight', offset: -10 }} 
                    />
                    <YAxis 
                      tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value)} 
                      labelFormatter={(year) => `Year ${year}`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="Property Value" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Loan Balance" 
                      stroke="#ef4444" 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Equity" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Cash Flow Chart */}
            <div>
              <h4 className="text-md font-medium mb-3">Annual Cash Flow</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={cashFlowData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      label={{ value: 'Year', position: 'insideBottomRight', offset: -10 }} 
                    />
                    <YAxis 
                      tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value)} 
                      labelFormatter={(year) => `Year ${year}`}
                    />
                    <Legend />
                    <Bar dataKey="Cash Flow">
                      {cashFlowData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry['Cash Flow'] >= 0 ? '#10b981' : '#ef4444'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      
      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
        <div className="flex items-start">
          <Info size={16} className="mr-2 text-gray-500 mt-0.5" />
          <p>
            This analysis is based on the parameters you've provided and is intended
            for informational purposes only. Actual results may vary. Consult with 
            financial and real estate professionals before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAnalysis;
