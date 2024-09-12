export async function parseGraphJSON(jsonFile: File): Promise<{ nodes: any[]; edges: any[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); // Create a new FileReader instance
  
      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result as string); // Parse the file content as JSON
  
          // Check if "nodes" and "edges" exist in the parsed data
          const nodes = jsonData.nodes ?? {}; // Extract "nodes" object or default to an empty object
          const edges = jsonData.edges ?? {}; // Extract "edges" object or default to an empty object
  
          // Check if conversion resulted in arrays
          if (!(nodes instanceof Object) || !(edges instanceof Object)) {
            throw new Error("Invalid JSON structure: 'nodes' or 'edges' is not an object");
          }
  
          resolve({ nodes, edges }); // Resolve the Promise with the nodes and edges arrays
        } catch (error) {
          console.error("Error parsing JSON:", error);
          reject(new Error("Failed to parse JSON file"));
        }
      };
  
      reader.onerror = () => {
        console.error("Error reading file:", reader.error);
        reject(new Error("Error reading file"));
      };
  
      reader.readAsText(jsonFile); // Read the file as text
    });
}