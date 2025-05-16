import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import { Calculator, DollarSign, Percent, Calendar, ArrowRight, Info } from 'lucide-react';
import { calculateMonthlyMortgagePayment, generateAmortizationSchedule } from '../utils/investmentCalculator';

const MortgageCalculator = ({ propertyPrice = 80000 }) => {
  const [loanParams, setLoanParams] = useState({
    propertyPrice: propertyPrice,
    downPayment: 20, // as percentage
    loanAmount: propertyPrice * 0.8,
    interestRate: 5.0,
    loanTerm: 25,
    paymentFrequency: 'monthly',
    extraPayment: 0,
    startDate: new Date().toISOString().slice(0, 10)
  });

  const [results, setResults] = useState(null);
  const [showAmortizationTable, setShowAmortizationTable] = useState(false);
  const [comparisonScenarios, setComparisonScenarios] = useState([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Calculate results when params change
  useEffect(() => {
    calculateMortgageResults();
  }, [loanParams]);

  // Update property price when it changes
  useEffect(() => {
    if (propertyPrice) {
      setLoanParams(prev => {
        const downPaymentAmount = prev.downPayment * propertyPrice / 100;
        return {
          ...prev,
          propertyPrice,
          loanAmount: propertyPrice - downPaymentAmount
        };
      });
    }
  }, [propertyPrice]);

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'downPayment') {
      // When down payment percentage changes, recalculate loan amount
      const downPaymentAmount = (parseFloat(value) / 100) * loanParams.propertyPrice;
      setLoanParams(prev => ({
        ...prev,
        [name]: parseFloat(value),
        loanAmount: loanParams.propertyPrice - downPaymentAmount
      }));
    } else if (name === 'loanAmount') {
      // When loan amount changes, recalculate down payment percentage
      const downPaymentPercent = ((loanParams.propertyPrice - parseFloat(value)) / loanParams.propertyPrice) * 100;
      setLoanParams(prev => ({
        ...prev,
        [name]: parseFloat(value),
        downPayment: downPaymentPercent
      }));
    } else if (name === 'propertyPrice') {
      // When property price changes, maintain the down payment percentage
      const newPropertyPrice = parseFloat(value);
      const downPaymentAmount = (loanParams.downPayment / 100) * newPropertyPrice;
      setLoanParams(prev => ({
        ...prev,
        [name]: newPropertyPrice,
        loanAmount: newPropertyPrice - downPaymentAmount
      }));
    } else {
      // For other parameters, just update the value
      setLoanParams(prev => ({
        ...prev,
        [name]: parseFloat(value)
      }));
    }
  };

  const addComparisonScenario = () => {
    // Add current scenario to comparison list with a unique label
    const scenarioCount = comparisonScenarios.length + 1;
    setComparisonScenarios([
      ...comparisonScenarios,
      {
        ...loanParams,
        label: `Scenario ${scenarioCount}`,
        monthlyPayment: results.monthlyPayment,
        totalInterest: results.totalInterest,
        totalCost: results.totalCost
      }
    ]);
  };

  const calculateMortgageResults = () => {
    try {
      const interestRateDecimal = loanParams.interestRate / 100;
      
      // Calculate monthly payment
      const monthlyPayment = calculateMonthlyMortgagePayment(
        loanParams.loanAmount,
        interestRateDecimal,
        loanParams.loanTerm
      );

      // Generate amortization schedule
      const amortizationSchedule = generateAmortizationSchedule(
        loanParams.loanAmount,
        interestRateDecimal,
        loanParams.loanTerm
      );

      // Calculate payment details based on frequency
      let periodicPayment = monthlyPayment;
      let paymentsPerYear = 12;
      if (loanParams.paymentFrequency === 'biweekly') {
        periodicPayment = monthlyPayment * 12 / 26;
        paymentsPerYear = 26;
      } else if (loanParams.paymentFrequency === 'weekly') {
        periodicPayment = monthlyPayment * 12 / 52;
        paymentsPerYear = 52;
      }

      // Add extra payments to the amortization schedule if applicable
      let totalExtraPayments = 0;
      if (loanParams.extraPayment > 0) {
        let remainingBalance = loanParams.loanAmount;
        const extraPaymentSchedule = [];
        let payments = 0;
        let totalInterest = 0;
        
        const monthlyRate = interestRateDecimal / 12;
        const regularPayment = monthlyPayment;
        const totalPayment = regularPayment + loanParams.extraPayment;
        
        while (remainingBalance > 0 && payments < loanParams.loanTerm * 12) {
          const interestPayment = remainingBalance * monthlyRate;
          const principalPayment = Math.min(totalPayment - interestPayment, remainingBalance);
          remainingBalance -= principalPayment;
          totalInterest += interestPayment;
          
          extraPaymentSchedule.push({
            paymentNumber: payments + 1,
            paymentAmount: totalPayment,
            principalPayment: principalPayment,
            interestPayment: interestPayment,
            extraPayment: loanParams.extraPayment,
            remainingBalance: Math.max(0, remainingBalance)
          });
          
          payments++;
          totalExtraPayments += loanParams.extraPayment;
          
          if (remainingBalance <= 0) break;
        }
        
        amortizationSchedule.extraPayments = extraPaymentSchedule;
        amortizationSchedule.yearsWithExtra = payments / 12;
        amortizationSchedule.interestSavings = 
          amortizationSchedule.reduce((total, payment) => total + payment.interestPayment, 0) - totalInterest;
      }

      // Calculate summary statistics
      const totalInterest = amortizationSchedule.reduce(
        (total, payment) => total + payment.interestPayment, 0
      );
      
      const totalCost = loanParams.loanAmount + totalInterest;
      const interestToLoanRatio = totalInterest / loanParams.loanAmount;

      // Calculate early payoff with extra payments if applicable
      let yearsToPayoff = loanParams.loanTerm;
      let payoffDate = new Date(loanParams.startDate);
      
      if (loanParams.extraPayment > 0 && amortizationSchedule.yearsWithExtra) {
        yearsToPayoff = amortizationSchedule.yearsWithExtra;
        payoffDate = new Date(loanParams.startDate);
        payoffDate.setMonth(payoffDate.getMonth() + Math.ceil(yearsToPayoff * 12));
      } else {
        payoffDate.setFullYear(payoffDate.getFullYear() + loanParams.loanTerm);
      }

      // Calculate interest vs. principal ratio over time (yearly)
      const yearlyData = [];
      let cumulativePrincipal = 0;
      let cumulativeInterest = 0;
      
      for (let year = 1; year <= Math.ceil(yearsToPayoff); year++) {
        const startIndex = (year - 1) * 12;
        const endIndex = Math.min(year * 12, amortizationSchedule.length);
        
        let yearlyPrincipal = 0;
        let yearlyInterest = 0;
        let yearEndBalance = 0;
        
        for (let i = startIndex; i < endIndex; i++) {
          if (amortizationSchedule[i]) {
            yearlyPrincipal += amortizationSchedule[i].principalPayment;
            yearlyInterest += amortizationSchedule[i].interestPayment;
            yearEndBalance = amortizationSchedule[i].remainingBalance;
          }
        }
        
        cumulativePrincipal += yearlyPrincipal;
        cumulativeInterest += yearlyInterest;
        
        yearlyData.push({
          year,
          principalPaid: yearlyPrincipal,
          interestPaid: yearlyInterest,
          cumulativePrincipal,
          cumulativeInterest,
          remainingBalance: yearEndBalance
        });
      }

      setResults({
        monthlyPayment,
        periodicPayment,
        totalInterest,
        totalCost,
        interestToLoanRatio,
        amortizationSchedule,
        yearsToPayoff,
        payoffDate: payoffDate.toISOString().slice(0, 10),
        yearlyData,
        interestSavings: amortizationSchedule.interestSavings || 0,
        totalExtraPayments
      });

    } catch (error) {
      console.error("Error calculating mortgage results:", error);
    }
  };

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

  if (!results) {
    return <div>Loading calculator...</div>;
  }

  // Create data for interest vs principal chart
  const paymentBreakdownData = [
    { name: "Principal", value: loanParams.loanAmount },
    { name: "Interest", value: results.totalInterest }
  ];
  const COLORS = ['#10b981', '#ef4444'];

  return (
    <div className="space-y-6 animate-fadeIn">
      <Card className="prediction-indicator">
        <Card.Header>
          <h2 className="text-xl font-semibold flex items-center">
            <Calculator size={20} className="mr-2 text-primary" />
            Mortgage Calculator
          </h2>
        </Card.Header>
        <Card.Body>
          <div className="mb-6">
            <div className="bg-blue-50 p-4 rounded-md mb-6 shadow-sm">
              <div className="flex items-start">
                <Info size={20} className="mr-2 text-primary mt-0.5" />
                <p className="text-sm text-gray-700">
                  Use this mortgage calculator to estimate your monthly payments and see the amortization schedule.
                  Adjust parameters to compare different loan scenarios.
                </p>
              </div>
            </div>
            
            {/* Basic Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input 
                label="Property Price (€)"
                type="number"
                name="propertyPrice"
                value={loanParams.propertyPrice}
                onChange={handleParamChange}
                icon={<DollarSign size={16} />}
              />
              
              <Input 
                label="Down Payment (%)"
                type="number"
                name="downPayment"
                value={loanParams.downPayment}
                onChange={handleParamChange}
                icon={<Percent size={16} />}
              />
              
              <Input 
                label="Loan Amount (€)"
                type="number"
                name="loanAmount"
                value={loanParams.loanAmount}
                onChange={handleParamChange}
                icon={<DollarSign size={16} />}
              />
              
              <Input 
                label="Annual Interest Rate (%)"
                type="number"
                name="interestRate"
                value={loanParams.interestRate}
                onChange={handleParamChange}
                icon={<Percent size={16} />}
              />
              
              <Input 
                label="Loan Term (Years)"
                type="number"
                name="loanTerm"
                value={loanParams.loanTerm}
                onChange={handleParamChange}
                icon={<Calendar size={16} />}
              />
              
              <Select
                label="Payment Frequency"
                name="paymentFrequency"
                value={loanParams.paymentFrequency}
                onChange={(e) => setLoanParams(prev => ({ ...prev, paymentFrequency: e.target.value }))}
                options={[
                  { value: "monthly", label: "Monthly" },
                  { value: "biweekly", label: "Bi-weekly" },
                  { value: "weekly", label: "Weekly" }
                ]}
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
                  label="Extra Monthly Payment (€)"
                  type="number"
                  name="extraPayment"
                  value={loanParams.extraPayment}
                  onChange={handleParamChange}
                  icon={<DollarSign size={16} />}
                />
                
                <Input 
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={loanParams.startDate}
                  onChange={(e) => setLoanParams(prev => ({ ...prev, startDate: e.target.value }))}
                  icon={<Calendar size={16} />}
                />
              </div>
            )}
          </div>
          
          {/* Results */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Mortgage Summary</h3>
            
            {/* Primary Results */}            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-primary p-6 rounded-lg shadow-md text-white investment-stats-card transform hover:scale-102 transition-all">
                <div className="text-sm text-white mb-1 opacity-90">Monthly Payment</div>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(results.monthlyPayment)}
                </div>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg shadow-md text-white investment-stats-card transform hover:scale-102 transition-all">
                <div className="text-sm text-white mb-1 opacity-90">Total Interest</div>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(results.totalInterest)}
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white investment-stats-card transform hover:scale-102 transition-all">
                <div className="text-sm text-white mb-1 opacity-90">Total Cost</div>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(results.totalCost)}
                </div>
              </div>
            </div>
            
            {/* Secondary Results */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Interest to Loan Ratio</div>
                <div className="font-semibold">
                  {formatPercent(results.interestToLoanRatio)}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Years to Pay Off</div>
                <div className="font-semibold">
                  {results.yearsToPayoff.toFixed(1)} years
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Payoff Date</div>
                <div className="font-semibold">
                  {new Date(results.payoffDate).toLocaleDateString()}
                </div>
              </div>
              
              {loanParams.extraPayment > 0 && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Interest Saved</div>
                  <div className="font-semibold text-green-600">
                    {formatCurrency(results.interestSavings)}
                  </div>
                </div>
              )}
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Payment Breakdown Pie Chart */}
              <div>
                <h4 className="text-md font-medium mb-3">Payment Breakdown</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {paymentBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Balance Over Time Chart */}
              <div>
                <h4 className="text-md font-medium mb-3">Balance Over Time</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={results.yearlyData}
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
                        dataKey="remainingBalance" 
                        name="Remaining Balance"
                        stroke="#ef4444" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cumulativeInterest" 
                        name="Cumulative Interest"
                        stroke="#f59e0b" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Annual Payment Breakdown */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-3">Annual Payment Breakdown</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={results.yearlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    barSize={20}
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
                    <Bar dataKey="principalPaid" name="Principal Paid" stackId="a" fill="#10b981" />
                    <Bar dataKey="interestPaid" name="Interest Paid" stackId="a" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Scenario Comparison */}
            {comparisonScenarios.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3">Scenario Comparison</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scenario</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Rate</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Payment</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Interest</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {comparisonScenarios.map((scenario, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap">{scenario.label}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{scenario.interestRate}%</td>
                          <td className="px-4 py-2 whitespace-nowrap">{scenario.loanTerm} years</td>
                          <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(scenario.monthlyPayment)}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(scenario.totalInterest)}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(scenario.totalCost)}</td>
                        </tr>
                      ))}
                      <tr className="bg-blue-50">
                        <td className="px-4 py-2 whitespace-nowrap font-medium">Current</td>
                        <td className="px-4 py-2 whitespace-nowrap">{loanParams.interestRate}%</td>
                        <td className="px-4 py-2 whitespace-nowrap">{loanParams.loanTerm} years</td>
                        <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(results.monthlyPayment)}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(results.totalInterest)}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(results.totalCost)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button 
                onClick={() => setShowAmortizationTable(!showAmortizationTable)}
              >
                {showAmortizationTable ? "Hide" : "Show"} Amortization Schedule
              </Button>
              
              <Button 
                variant="outline"
                onClick={addComparisonScenario}
              >
                Add Current Scenario to Comparison
              </Button>
            </div>
            
            {/* Amortization Schedule */}
            {showAmortizationTable && (
              <div className="mt-6 overflow-x-auto">
                <h4 className="text-md font-medium mb-3">Amortization Schedule</h4>
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment #</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.amortizationSchedule.slice(0, 24).map((payment) => (
                      <tr key={payment.paymentNumber} className={payment.paymentNumber % 12 === 0 ? "bg-blue-50" : ""}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {payment.paymentNumber}
                          {payment.paymentNumber % 12 === 0 && " (Year " + (payment.paymentNumber / 12) + ")"}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(payment.paymentAmount)}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(payment.principalPayment)}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(payment.interestPayment)}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(payment.remainingBalance)}</td>
                      </tr>
                    ))}
                    {results.amortizationSchedule.length > 24 && (
                      <tr>
                        <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                          ... showing first 24 payments of {results.amortizationSchedule.length} total payments
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
      
      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
        <div className="flex items-start">
          <Info size={16} className="mr-2 text-gray-500 mt-0.5" />
          <p>
            This mortgage calculator is for informational purposes only. The actual loan terms and 
            rates will be determined by your lender based on your financial situation and current market conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
