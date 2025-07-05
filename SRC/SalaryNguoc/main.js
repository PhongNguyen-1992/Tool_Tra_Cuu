        // Constants based on the provided information
        const INSURANCE_BASE = 5250000;
        const INSURANCE_RATE = 0.105;
        const AU_COUNT = 1200;
        const AU_RATE = 4700;
        const TAX_THRESHOLD = 11000000;
        const KPI_BONUS = 700000;
        const KPDV_BONUS = 800000;

        // Service prices from the table
        const servicePrices = {
            internet: 80000,
            combo: 140000,
            camera: 80000,
            ap: 45000,
            fptPlay: 45000,
            relocation: 80000,
            swap: 60000
        };

        // Get DOM elements
        const calculateBtn = document.getElementById('calculateBtn');
        const resultSection = document.getElementById('result-section');
        const totalDeploymentsEl = document.getElementById('total-deployments');
        const deploymentsBreakdownEl = document.getElementById('deployments-breakdown');
        const salaryBreakdownEl = document.getElementById('salary-breakdown');

        // Format currency for display
        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);
        };

        // Tax calculation function
        const calculatePersonalIncomeTax = (taxableIncome) => {
            if (taxableIncome <= 5000000) return 0;
            
            let tax = 0;
            let remainingIncome = taxableIncome - 5000000; // Subtract tax-free threshold
            
            const brackets = [
                { limit: 5000000, rate: 0.05 },  // 0-5M: 5%
                { limit: 5000000, rate: 0.10 },  // 5-10M: 10%
                { limit: 8000000, rate: 0.15 },  // 10-18M: 15%
                { limit: 14000000, rate: 0.20 }, // 18-32M: 20%
                { limit: 20000000, rate: 0.25 }, // 32-52M: 25%
                { limit: 28000000, rate: 0.30 }, // 52-80M: 30%
                { limit: Infinity, rate: 0.35 }  // >80M: 35%
            ];
            
            for (const bracket of brackets) {
                if (remainingIncome <= 0) break;
                
                const taxableAtThisBracket = Math.min(remainingIncome, bracket.limit);
                tax += taxableAtThisBracket * bracket.rate;
                remainingIncome -= taxableAtThisBracket;
            }
            
            return tax;
        };

        // Calculate required deployments based on desired salary
        const calculateRequiredDeployments = () => {
            // Parse inputs
            const desiredNetSalary = parseFloat(document.getElementById('desiredNetSalary').value) || 0;
            const levelBonus = parseFloat(document.getElementById('levelBonus').value) || 0;
            const maintenanceCoef = parseFloat(document.getElementById('maintenanceCoef').value) || 1;
            const csat = document.getElementById('csatCheckbox').checked;
            const kpdv = document.getElementById('kpdvCheckbox').checked;
            
            // Fixed components
            const csatBonusValue = csat ? KPI_BONUS : 0;
            const kpdvBonusValue = kpdv ? KPDV_BONUS : 0;
            const fixedBonuses = csatBonusValue + kpdvBonusValue + levelBonus;
            const auSalary = AU_COUNT * AU_RATE * maintenanceCoef;
            const insuranceDeduction = INSURANCE_BASE * INSURANCE_RATE;
            
            // Iterative approach to find the right number of deployments
            // Start with an estimate and adjust
            let estimatedGross = desiredNetSalary + insuranceDeduction;
            let tax = 0;
            let deploymentSalary = 0;
            let netSalary = 0;
            let iterations = 0;
            const maxIterations = 100; // Safety to prevent infinite loops
            
            // Iteratively refine our estimate until we get close to the target net
            do {
                // Calculate potential tax
                const taxableIncome = estimatedGross - insuranceDeduction;
                tax = taxableIncome > TAX_THRESHOLD ? calculatePersonalIncomeTax(taxableIncome) : 0;
                
                // Required deployment salary to reach this gross
                deploymentSalary = estimatedGross - auSalary - fixedBonuses;
                
                // Recalculate net
                netSalary = estimatedGross - insuranceDeduction - tax;
                
                // Adjust gross up or down based on whether we're below or above target
                if (netSalary < desiredNetSalary) {
                    estimatedGross += (desiredNetSalary - netSalary) * 1.2; // Adjust up more aggressively
                } else if (netSalary > desiredNetSalary) {
                    estimatedGross -= (netSalary - desiredNetSalary) * 0.8; // Adjust down more cautiously
                }
                
                iterations++;
            } while (Math.abs(netSalary - desiredNetSalary) > 1000 && iterations < maxIterations);
            
            // If deployment salary is negative, that means fixed components already exceed the target
            if (deploymentSalary <= 0) {
                deploymentSalary = 0;
            }
            
            // Calculate service distribution (50% Internet, others distributed proportionally)
            // Internet is 50% of deployment salary as per requirements
            const internetSalary = deploymentSalary * 0.5;
            const otherServicesSalary = deploymentSalary * 0.5;
            
            // Number of Internet deployments
            const internetDeployments = Math.ceil(internetSalary / servicePrices.internet);
            
            // Distribute remaining among other services
            // Using a simplified distribution model - adjust as needed
            const swapCount = Math.ceil(otherServicesSalary * 0.2 / servicePrices.swap);
            const comboCount = Math.ceil(otherServicesSalary * 0.3 / servicePrices.combo);
            const cameraCount = Math.ceil(otherServicesSalary * 0.15 / servicePrices.camera);
            const apCount = Math.ceil(otherServicesSalary * 0.15 / servicePrices.ap);
            const fptPlayCount = Math.ceil(otherServicesSalary * 0.1 / servicePrices.fptPlay);
            const relocationCount = Math.ceil(otherServicesSalary * 0.1 / servicePrices.relocation);
            
            // Calculate total deployments
            const totalDeployments = internetDeployments + comboCount + cameraCount + 
                                    apCount + fptPlayCount + relocationCount + swapCount;
            
            // Recalculate accurate gross and net salary based on these deployments
            const actualDeploymentSalary = 
                (internetDeployments * servicePrices.internet) +
                (comboCount * servicePrices.combo) +
                (cameraCount * servicePrices.camera) +
                (apCount * servicePrices.ap) +
                (fptPlayCount * servicePrices.fptPlay) +
                (relocationCount * servicePrices.relocation) +
                (swapCount * servicePrices.swap);
            
            const actualGross = actualDeploymentSalary + auSalary + fixedBonuses;
            const actualTaxableIncome = actualGross - insuranceDeduction;
            const actualTax = actualTaxableIncome > TAX_THRESHOLD ? 
                            calculatePersonalIncomeTax(actualTaxableIncome) : 0;
            const actualNet = actualGross - insuranceDeduction - actualTax;
            
            // Create results object
            const results = {
                totalDeployments: totalDeployments,
                breakdown: {
                    internet: internetDeployments,
                    combo: comboCount,
                    camera: cameraCount,
                    ap: apCount,
                    fptPlay: fptPlayCount,
                    relocation: relocationCount,
                    swap: swapCount
                },
                grossSalary: actualGross,
                insuranceDeduction: insuranceDeduction,
                personalIncomeTax: actualTax,
                netSalary: actualNet
            };
            
            // Display results
            displayResults(results);
        };

        // Display results on the page
        const displayResults = (results) => {
            // Display total deployments
            totalDeploymentsEl.textContent = `${results.totalDeployments} ca vụ`;
            
            // Build deployments breakdown HTML
            let deploymentsHTML = '';
            deploymentsHTML += createBreakdownRow('🌐 Internet:', `${results.breakdown.internet} ca`);
            deploymentsHTML += createBreakdownRow('📺 Combo:', `${results.breakdown.combo} ca`);
            deploymentsHTML += createBreakdownRow('📹 Camera:', `${results.breakdown.camera} ca`);
            deploymentsHTML += createBreakdownRow('📡 Lắp AP:', `${results.breakdown.ap} ca`);
            deploymentsHTML += createBreakdownRow('📱 FPT Play:', `${results.breakdown.fptPlay} ca`);
            deploymentsHTML += createBreakdownRow('🏠 Chuyển địa điểm:', `${results.breakdown.relocation} ca`);
            deploymentsHTML += createBreakdownRow('🔄 Swap:', `${results.breakdown.swap} ca`);
            
            deploymentsBreakdownEl.innerHTML = deploymentsHTML;
            
            // Build salary breakdown HTML
            let salaryHTML = '';
            salaryHTML += `<div class="flex justify-between">
                <span class="font-semibold">💰 Tổng lương (Gross):</span>
                <span class="font-bold text-green-400">${formatCurrency(results.grossSalary)}</span>
            </div>`;
            
            salaryHTML += `<div class="text-red-300 space-y-1">
                <div class="flex justify-between">
                    <span>🏥 Bảo hiểm (10.5%):</span>
                    <span class="font-bold">-${formatCurrency(results.insuranceDeduction)}</span>
                </div>`;
            
            if (results.personalIncomeTax > 0) {
                salaryHTML += `<div class="flex justify-between">
                    <span>🏛️ Thuế TNCN:</span>
                    <span class="font-bold">-${formatCurrency(results.personalIncomeTax)}</span>
                </div>`;
            } else {
                salaryHTML += `<div class="flex justify-between">
                    <span>🏛️ Thuế TNCN:</span>
                    <span class="font-bold text-green-400">Miễn thuế</span>
                </div>`;
            }
            
            salaryHTML += `</div>
            <div class="border-t border-gray-600 pt-2 mt-2">
                <div class="flex justify-between text-xl">
                    <span class="font-bold text-yellow-400">💵 Lương thực nhận:</span>
                    <span class="font-bold text-yellow-400">${formatCurrency(results.netSalary)}</span>
                </div>
            </div>`;
            
            salaryBreakdownEl.innerHTML = salaryHTML;
            
            // Show result section
            resultSection.classList.remove('hidden');
            
            // Scroll to results
            resultSection.scrollIntoView({ behavior: 'smooth' });
        };

        // Helper function to create a breakdown row
        const createBreakdownRow = (label, value) => {
            return `<div class="flex justify-between">
                <span>${label}</span>
                <span class="font-bold">${value}</span>
            </div>`;
        };

        // Add event listeners
        calculateBtn.addEventListener('click', calculateRequiredDeployments);
        
        // Prevent non-numeric input in number fields
        document.getElementById('desiredNetSalary').addEventListener('keydown', (e) => {
            // Allow: backspace, delete, tab, escape, enter and .
            if ([46, 8, 9, 27, 13, 110, 190].includes(e.keyCode) ||
                // Allow: Ctrl+A,Ctrl+C,Ctrl+V,Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            // Ensure that it's a number and stop the keypress if not
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && 
                (e.keyCode < 96 || e.keyCode > 105) || 
                // Prevent 'e', 'E', '+', '-'
                ['e', 'E', '+', '-'].includes(e.key)) {
                e.preventDefault();
            }
        });

        // Add input animations
        const inputElements = document.querySelectorAll('.form-input');
        inputElements.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.05)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });

        // Add select animations
        const selectElements = document.querySelectorAll('.form-select');
        selectElements.forEach(select => {
            select.addEventListener('change', function() {
                this.classList.add('animate-pulse');
                setTimeout(() => {
                    this.classList.remove('animate-pulse');
                }, 300);
            });
        });
    