export const UNITS = Object.freeze({
    GRAM: { value: "gr", label: "Grams" },
    MILILITERS: { value: "ml", label: "Mililiters" },
    PIECES: { value: "pcs", label: "Pieces" }
});
export const ALLOWED_UNITS = Object.values(UNITS).map(u => u.value);