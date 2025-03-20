'use server'

import { getNodes } from "./actions/nodes"
import { ExplorerContent } from "@/app/components/explorer-content"

export default async function ExplorerPage() {
  try {
    // Fetch data on the server
    const data = await getNodes();
    
    // Pass data to client component
    return <ExplorerContent initialData={data} />;
  } catch (error) {
    // If there's an error fetching data, return it in the expected format
    return <ExplorerContent initialData={{ nodes: [], error: 'Failed to fetch nodes' }} />;
  }
}

