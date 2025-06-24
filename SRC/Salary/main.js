        // Salary calculation logic
        document.getElementById('salaryForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const htTk = parseFloat(document.getElementById('HT_TK').value) || 0;
            const htSwap = parseFloat(document.getElementById('HT_Swap').value) || 0;
            const au = parseFloat(document.getElementById('AU').value) || 0;
            const heSo = parseFloat(document.getElementById('He_So').value) || 1;
            const bacNghe = parseFloat(document.getElementById('Bac_Nghe').value) || 0;
            const kpiBonus = document.getElementById('check_1').checked ? 1000000 : 0;
            const kpdvBonus = document.getElementById('check_2').checked ? 800000 : 0;
            
            // Calculate salary components
            const deploymentSalary = htTk * 100000; // 100k per deployment
            const swapSalary = htSwap * 60000; // 60k per swap
            const activeSalary = au * 4700; // 4.7k per active ownership
            const levelBonus = bacNghe;
            const bonuses = kpiBonus + kpdvBonus;
            
            // Calculate total gross salary
            const baseSalary = deploymentSalary + swapSalary + (activeSalary * heSo);
            const grossSalary = (baseSalary + levelBonus + bonuses);
            
            // Calculate insurance deduction (10.5% of basic salary 5,250,000)
            const basicSalaryForInsurance = 5250000;
            const insuranceDeduction = basicSalaryForInsurance * 0.105;
            
            // Calculate taxable income
            const taxableIncome = grossSalary - insuranceDeduction;
            
            // Calculate personal income tax using progressive tax brackets
            function calculatePersonalIncomeTax(taxableIncome) {
                if (taxableIncome <= 5000000) return 0;
                
                let tax = 0;
                let remainingIncome = taxableIncome - 5000000; // Subtract tax-free threshold
                
                // Tax brackets from the image
                const brackets = [
                    { limit: 5000000, rate: 0.05 },      // 0-5M: 5%
                    { limit: 5000000, rate: 0.10 },      // 5-10M: 10%
                    { limit: 8000000, rate: 0.15 },      // 10-18M: 15%
                    { limit: 14000000, rate: 0.20 },     // 18-32M: 20%
                    { limit: 20000000, rate: 0.25 },     // 32-52M: 25%
                    { limit: 28000000, rate: 0.30 },     // 52-80M: 30%
                    { limit: Infinity, rate: 0.35 }      // >80M: 35%
                ];
                
                for (const bracket of brackets) {
                    if (remainingIncome <= 0) break;
                    
                    const taxableAtThisBracket = Math.min(remainingIncome, bracket.limit);
                    tax += taxableAtThisBracket * bracket.rate;
                    remainingIncome -= taxableAtThisBracket;
                }
                
                return tax;
            }
            
            // Calculate tax only if taxable income > 11,000,000
            const personalIncomeTax = taxableIncome > 11000000 ? calculatePersonalIncomeTax(taxableIncome) : 0;
            
            // Calculate net salary
            const netSalary = grossSalary - insuranceDeduction - personalIncomeTax;
            
            // Display result
            const resultSection = document.getElementById('result-section');
            const salaryResult = document.getElementById('salary-result');
            const salaryBreakdown = document.getElementById('salaryBreakdown');
            
            salaryResult.textContent = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(netSalary);
            
            salaryBreakdown.innerHTML = `
                <div class="text-left space-y-2">
                    <div class="flex justify-between">
                        <span>💼 Lương TK-BT:</span>
                        <span class="font-bold">${new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(baseSalary)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>🎯 Lương bậc nghề:</span>
                        <span class="font-bold">${new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(levelBonus)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>🏆 Thưởng KPI/KPDV:</span>
                        <span class="font-bold">${new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(bonuses)}</span>
                    </div>
                    <div class="border-t border-gray-600 pt-2 mt-2">
                        <div class="flex justify-between">
                            <span class="font-semibold text-green-400">💰 Tổng lương (Gross):</span>
                            <span class="font-bold text-green-400">${new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(grossSalary)}</span>
                        </div>
                    </div>
                    <div class="text-red-300 space-y-1">
                        <div class="flex justify-between">
                            <span>🏥 Bảo hiểm (10.5%):</span>
                            <span class="font-bold">-${new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(insuranceDeduction)}</span>
                        </div>
                        ${personalIncomeTax > 0 ? 
                            `<div class="flex justify-between">
                                <span>🏛️ Thuế TNCN:</span>
                                <span class="font-bold">-${new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(personalIncomeTax)}</span>
                            </div>` : 
                            `<div class="flex justify-between">
                                <span>🏛️ Thuế TNCN:</span>
                                <span class="font-bold text-green-400">Miễn thuế</span>
                            </div>`
                        }
                    </div>
                    <div class="border-t border-gray-600 pt-2 mt-2">
                        <div class="flex justify-between text-xl">
                            <span class="font-bold text-yellow-400">💵 Lương thực nhận:</span>
                            <span class="font-bold text-yellow-400">${new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(netSalary)}</span>
                        </div>
                    </div>
                </div>
            `;
            
            resultSection.classList.remove('hidden');
            resultSection.scrollIntoView({ behavior: 'smooth' });
        });

        // Add input animations
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('scale-105');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('scale-105');
            });
        });

        // Add select animations
        document.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', function() {
                this.classList.add('animate-pulse');
                setTimeout(() => {
                    this.classList.remove('animate-pulse');
                }, 300);
            });
        });
