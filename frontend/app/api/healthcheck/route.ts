import { NextResponse } from 'next/server'

async function checkExternalAPI() {
  try {
    const response = await fetch('https://api.pingnet.org/validator/v1/nodes')
    return response.ok
  } catch (error) {
    return false
  }
}

export async function GET() {
  const externalAPIStatus = await checkExternalAPI()

  return NextResponse.json({
    status: 'ok',
    dependencies: {
      'pingnet-api': externalAPIStatus ? 'healthy' : 'unhealthy'
    },
    timestamp: new Date().toISOString()
  }, { 
    status: externalAPIStatus ? 200 : 503
  })
} 