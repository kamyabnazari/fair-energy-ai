import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    try {
        let energyConsumed = url.searchParams.get('energyConsumed') || 'default_value';

        // Function to generate random fluctuations
        const generateFluctuatedValue = (base: number, fluctuation = 1000) => {
            return Math.max(base + Math.floor(Math.random() * fluctuation) - fluctuation / 2, 0);
        };

        // Function to generate daily consumption data
        const generateDailyConsumption = (average: number, days: number) => {
            return Array.from({ length: days }, (_, index) => ({
                x: `Day ${index + 1}`,
                y: generateFluctuatedValue(average, 3) // Small fluctuation for daily data
            }));
        };

        // Full mock energy consumption data
        const data = {
            dailyConsumption: generateDailyConsumption(3.6, 30), // Generating 30 days of data
            monthlyConsumption: Array.from({ length: 12 }, (_, index) => ({
                x: new Date(0, index).toLocaleString('default', { month: 'short' }),
                y: generateFluctuatedValue(Number(energyConsumed))
            })),
        };

        return json(data);
    } catch (e) {
        console.error(e);
        return json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
