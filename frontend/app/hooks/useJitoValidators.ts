"use client"

import { useState, useEffect } from 'react'
import { fetchValidatorsFromJitoVault, fetchVaultStatistics, ValidatorData } from '@/app/services/jitoVaultService'

export function useJitoValidators() {
  const [validators, setValidators] = useState<ValidatorData[]>([])
  const [vaultStats, setVaultStats] = useState<{
    totalStaked: string
    totalValidators: number
    averageAPY: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Fetch validators from Jito vault
      const validatorData = await fetchValidatorsFromJitoVault()
      setValidators(validatorData)
      
      // Fetch vault statistics
      const stats = await fetchVaultStatistics()
      setVaultStats(stats)
    } catch (err) {
      console.error('Error fetching validator data from Jito vault:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch validator data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Poll for updates every 60 seconds
    const intervalId = setInterval(fetchData, 60000)
    
    return () => clearInterval(intervalId)
  }, [])

  return {
    validators,
    vaultStats,
    isLoading,
    error,
    refetch: fetchData
  }
} 