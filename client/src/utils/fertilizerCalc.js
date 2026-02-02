export const calculateFertilizerNeeds = (currentNPK, crop = 'Wheat') => {
    // Standard Ideal Targets for Indian Soil (Approximate)
    // Wheat: N:120, P:60, K:40
    // Rice: N:100, P:50, K:50
    const targets = {
        'Wheat': { n: 120, p: 60, k: 40 },
        'Rice': { n: 100, p: 50, k: 50 },
        'Sugarcane': { n: 150, p: 70, k: 60 }
    }[crop] || { n: 100, p: 50, k: 40 };

    const gap = {
        n: Math.max(0, targets.n - currentNPK.nitrogen),
        p: Math.max(0, targets.p - currentNPK.phosphorus),
        k: Math.max(0, targets.k - currentNPK.potassium)
    };

    // Fertilizer Content Specs
    // Urea: 46% N
    // DAP: 18% N, 46% P
    // MOP: 60% K

    // Logic: 
    // 1. Fulfill P requirement using DAP first.
    // 2. DAP adds some N, subtract that from N gap.
    // 3. Fulfill remaining N requirement using Urea.
    // 4. Fulfill K requirement using MOP.

    // 1. DAP Calculation
    const dapNeededKg = gap.p / 0.46;
    const nFromDap = dapNeededKg * 0.18;

    // 2. Remaining N
    const remainingNGap = Math.max(0, gap.n - nFromDap);
    const ureaNeededKg = remainingNGap / 0.46;

    // 3. MOP
    const mopNeededKg = gap.k / 0.60;

    // Convert to Bags (Standard 50kg, but usually 45kg for Urea now in India, let's use 50kg for simplicity or 45kg for realism)
    // Let's use 50kg bags.
    const bags = {
        urea: (ureaNeededKg / 50).toFixed(1),
        dap: (dapNeededKg / 50).toFixed(1),
        mop: (mopNeededKg / 50).toFixed(1)
    };

    return {
        gap,
        bags,
        kg: {
            urea: Math.round(ureaNeededKg),
            dap: Math.round(dapNeededKg),
            mop: Math.round(mopNeededKg)
        }
    };
};
