export function generateGreenHSLColors(count: number) {
    const hue = 140;
    const saturationRange = [40, 90];
    const lightnessRange = [10, 50];

    return Array.from({ length: count }, (_, i) => {
        const saturation = saturationRange[0] + (i / (count - 1)) * (saturationRange[1] - saturationRange[0]);
        const lightness = lightnessRange[0] + (i / (count - 1)) * (lightnessRange[1] - lightnessRange[0]);
        return `${Math.round(hue)} ${Math.round(saturation)}% ${Math.round(lightness)}%`;
    }).reverse();
}