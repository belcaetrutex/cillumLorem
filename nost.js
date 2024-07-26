function validatePredicate(predicate) {
    if (!isValidPredicate(predicate)) {
        throw new Error("Invalid field predicate: " + JSON.stringify(predicate));
    }
}

// Example usage
try {
    validatePredicate({ field: "name", operator: "equals", value: "John" });
} catch (error) {
    console.error(error.message); // Logs: Invalid field predicate: {"field":"name","operator":"equals","value":"John"}
}
