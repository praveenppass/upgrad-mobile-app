// Helper function to create route objects with better type safety
export const createRoutes = <T extends Record<string, string>>(
	routes: T,
): Readonly<T> => Object.freeze(routes);
