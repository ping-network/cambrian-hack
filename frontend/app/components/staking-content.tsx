"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWalletConnection } from "../hooks/useWalletConnection"
import { useTokenBalances } from "../hooks/useTokenBalances"
import { useTokenMinting } from "../hooks/useTokenMinting"
import { useValidatorNodes } from "../hooks/useValidatorNodes"
import { useVaultStaking } from "../hooks/useVaultStaking"
import { ArrowRight, Wallet, Coins, LockKeyhole, AlertCircle, Shield, Server, ExternalLink, Gift, Check, Clock, Activity, Database } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function StakingContent() {
  const { isConnected, connect } = useWalletConnection()
  const { pingBalance, vrtBalance, isLoading: isLoadingBalances } = useTokenBalances()
  const { 
    mintPingTokens, 
    isLoading: isMinting, 
    success, 
    txSignature, 
    error, 
    remainingAttempts,
    resetTime,
    fetchRemainingAttempts
  } = useTokenMinting()
  const { validators, isLoading: isLoadingValidators, error: validatorsError } = useValidatorNodes()
  const { stakeToVault, isStaking, txSignature: vaultTxSignature, error: vaultError } = useVaultStaking()
  const [stakeAmount, setStakeAmount] = useState<number>(0)
  const [sliderValue, setSliderValue] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("stake")
  const [selectedValidator, setSelectedValidator] = useState<string | null>(null)
  const [vaultStakeAmount, setVaultStakeAmount] = useState<number>(0)
  const [vaultSliderValue, setVaultSliderValue] = useState<number>(0)
  
  // Reset stake amount when balance changes
  useEffect(() => {
    if (pingBalance !== null) {
      setStakeAmount(0)
      setSliderValue(0)
    }
  }, [pingBalance])
  
  // Format the reset time as a human-readable string
  const formatResetTime = () => {
    if (!resetTime) return "";
    
    const now = Date.now();
    const timeRemaining = resetTime - now;
    
    if (timeRemaining <= 0) return "Available now";
    
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };
  
  // Show toast when minting is successful or fails
  useEffect(() => {
    if (success && txSignature) {
      toast.success(
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Airdrop successful!</span>
          </div>
          <div className="text-xs text-muted-foreground break-all">
            Transaction: {txSignature.slice(0, 8)}...{txSignature.slice(-8)}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-1 text-xs"
            onClick={() => window.open(`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`, '_blank')}
          >
            View on Explorer <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </div>
      );
    } else if (error) {
      toast.error(`Airdrop failed: ${error}`);
    }
  }, [success, txSignature, error]);
  
  const handleSliderChange = (value: number[]) => {
    const newValue = value[0]
    setSliderValue(newValue)
    
    if (pingBalance) {
      setStakeAmount(Math.floor(pingBalance * (newValue / 100)))
    }
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    
    if (pingBalance) {
      const newValue = Math.min(value, pingBalance)
      setStakeAmount(newValue)
      setSliderValue((newValue / pingBalance) * 100)
    }
  }
  
  const handleMaxClick = () => {
    if (pingBalance) {
      setStakeAmount(pingBalance)
      setSliderValue(100)
    }
  }
  
  const handleStake = async () => {
    if (!isConnected || stakeAmount <= 0 || !selectedValidator) return
    
    setIsLoading(true)
    
    try {
      // In a real implementation, we would call the staking contract
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update balances will happen automatically through the useTokenBalances hook
      setStakeAmount(0)
      setSliderValue(0)
      
      toast.success(
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Successfully staked {stakeAmount} PING tokens!</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Your tokens have been delegated to the selected validator.
          </div>
        </div>
      );
    } catch (error) {
      console.error("Staking failed:", error)
      toast.error("Failed to stake tokens. Please try again.");
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleBecomeValidator = () => {
    // TODO: Add validator application link
    window.open("https://docs.pingnetwork.io/", "_blank")
  }
  
  const handleAirdrop = async () => {
    if (!isConnected) return
    
    await mintPingTokens(100);
  }
  
  // Helper function to render validator status badge
  const renderStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online':
        return <Badge className="bg-green-500">Online</Badge>;
      case 'offline':
        return <Badge variant="destructive">Offline</Badge>;
      case 'degraded':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-400 bg-yellow-50">Degraded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Format uptime percentage
  const formatUptime = (uptime: number) => {
    return `${uptime.toFixed(2)}%`;
  };
  
  // Handle vault slider change
  const handleVaultSliderChange = (value: number[]) => {
    const newValue = value[0]
    setVaultSliderValue(newValue)
    
    if (pingBalance) {
      setVaultStakeAmount(Math.floor(pingBalance * (newValue / 100)))
    }
  }
  
  // Handle vault input change
  const handleVaultInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    
    if (pingBalance) {
      const newValue = Math.min(value, pingBalance)
      setVaultStakeAmount(newValue)
      setVaultSliderValue((newValue / pingBalance) * 100)
    }
  }
  
  // Handle vault max click
  const handleVaultMaxClick = () => {
    if (pingBalance) {
      setVaultStakeAmount(pingBalance)
      setVaultSliderValue(100)
    }
  }
  
  // Handle vault stake
  const handleVaultStake = async () => {
    if (!isConnected || vaultStakeAmount <= 0) return
    
    const success = await stakeToVault(vaultStakeAmount)
    
    if (success) {
      toast.success(
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Successfully deposited {vaultStakeAmount} PING tokens to vault!</span>
          </div>
          <div className="text-xs text-muted-foreground">
            You received {vaultStakeAmount} VRT tokens in return.
          </div>
          {vaultTxSignature && (
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-1 text-xs"
              onClick={() => window.open(`https://explorer.solana.com/tx/${vaultTxSignature}?cluster=devnet`, '_blank')}
            >
              View on Explorer <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          )}
        </div>
      );
      
      // Reset values
      setVaultStakeAmount(0)
      setVaultSliderValue(0)
    }
  }
  
  if (!isConnected) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Staking</h1>
        <p className="text-muted-foreground">
          Stake your Ping tokens to earn rewards through the Jito Restaking protocol.
        </p>
        
        <Card className="mt-8">
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
            <Wallet className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
            <p className="text-muted-foreground text-center mb-6">
              Please connect your wallet to view your token balances and stake your Ping tokens.
            </p>
            <Button onClick={connect}>Connect Wallet</Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6 pb-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Server className="h-10 w-10 text-blue-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Run a Validator Node</h3>
                <p className="text-sm text-gray-600">Help secure the network and earn additional rewards</p>
              </div>
            </div>
            <Button 
              onClick={handleBecomeValidator}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Become a Validator <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Staking</h1>
      <p className="text-muted-foreground">
        Stake your Ping tokens to receive Vault Receipt Tokens (VRT) through the Jito Restaking protocol.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center">
              <Wallet className="mr-2 h-5 w-5" /> Your Balances
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleAirdrop} 
                      disabled={isMinting || remainingAttempts === 0}
                      className="flex items-center"
                    >
                      <Gift className="mr-2 h-4 w-4" />
                      {isMinting ? "Airdropping..." : "Get Airdrop"}
                      {remainingAttempts !== null && remainingAttempts > 0 && (
                        <span className="ml-1 text-xs bg-green-100 text-green-800 rounded-full px-1.5 py-0.5">
                          {remainingAttempts}
                        </span>
                      )}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {remainingAttempts === 0 ? (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Next airdrop available in {formatResetTime()}</span>
                    </div>
                  ) : (
                    <span>Get 100 PING tokens ({remainingAttempts} airdrops remaining today)</span>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            {isLoadingBalances ? (
              <div className="flex justify-center py-8">
                <div className="animate-pulse flex space-x-4">
                  <div className="space-y-6 flex-1">
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-blue-600">P</span>
                    </div>
                    <div>
                      <p className="font-medium">Ping Tokens</p>
                      <p className="text-sm text-muted-foreground">Available for staking</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{pingBalance?.toLocaleString() ?? "0"}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-green-600">V</span>
                    </div>
                    <div>
                      <p className="font-medium">VRT Tokens</p>
                      <p className="text-sm text-muted-foreground">Vault Receipt Tokens</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{vrtBalance?.toLocaleString() ?? "0"}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Staking Rewards</CardTitle>
            <CardDescription>Current staking rewards and benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Conversion Rate</span>
                <span className="font-medium">1:1</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Minimum Stake</span>
                <span className="font-medium">10 PING</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Unstaking Period</span>
                <span className="font-medium">7 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delegation Rewards</span>
                <span className="font-medium">7-9% APY</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6 pb-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Server className="h-10 w-10 text-blue-500 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Run a Validator Node</h3>
              <p className="text-sm text-gray-600">Help secure the network and earn additional rewards</p>
            </div>
          </div>
          <Button 
            onClick={handleBecomeValidator}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Become a Validator <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5" /> Deposit to Vault
          </CardTitle>
          <CardDescription>
            Deposit your PING tokens directly to the vault to receive VRT tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Direct Vault Deposit</AlertTitle>
            <AlertDescription>
              Depositing PING tokens directly to the vault will give you VRT tokens at a 1:1 ratio without delegating to a validator. You can delegate your VRT tokens to validators later.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="vault-stake-amount">Deposit Amount</Label>
              <Button 
                variant="link" 
                className="h-auto p-0 text-sm" 
                onClick={handleVaultMaxClick}
              >
                Max
              </Button>
            </div>
            <div className="flex space-x-2">
              <Input
                id="vault-stake-amount"
                type="number"
                value={vaultStakeAmount}
                onChange={handleVaultInputChange}
                min={0}
                max={pingBalance || 0}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                className="w-20"
                disabled
              >
                PING
              </Button>
            </div>
            <Slider
              value={[vaultSliderValue]}
              onValueChange={handleVaultSliderChange}
              max={100}
              step={1}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
          
          <div className="rounded-lg border p-4">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">You will receive</span>
              <span className="font-medium">{vaultStakeAmount} VRT</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Coins className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">PING</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center">
                <LockKeyhole className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">VRT</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            disabled={!vaultStakeAmount || isStaking} 
            onClick={handleVaultStake}
          >
            {isStaking ? "Processing..." : "Deposit to Vault"}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <Tabs defaultValue="stake" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stake">Stake</TabsTrigger>
              <TabsTrigger value="unstake">Unstake</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {activeTab === "stake" ? (
            <div className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Staked PING tokens are converted to VRT (Vault Receipt Tokens) at a 1:1 ratio. These tokens are part of the Jito Restaking protocol and can be delegated to active validators to earn rewards.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="stake-amount">Stake Amount</Label>
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-sm" 
                    onClick={handleMaxClick}
                  >
                    Max
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="stake-amount"
                    type="number"
                    value={stakeAmount}
                    onChange={handleInputChange}
                    min={0}
                    max={pingBalance || 0}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    className="w-20"
                    disabled
                  >
                    PING
                  </Button>
                </div>
                <Slider
                  value={[sliderValue]}
                  onValueChange={handleSliderChange}
                  max={100}
                  step={1}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">You will receive</span>
                  <span className="font-medium">{stakeAmount} VRT</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Coins className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">PING</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center">
                    <LockKeyhole className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">VRT</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-md font-medium">Select a Validator to Delegate</h3>
                <p className="text-sm text-muted-foreground">
                  Delegate your VRT to one of these active validators to earn rewards.
                </p>
                
                {isLoadingValidators ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Skeleton className="h-5 w-5 mr-2 rounded-full" />
                            <div>
                              <Skeleton className="h-4 w-32 mb-1" />
                              <Skeleton className="h-3 w-24" />
                            </div>
                          </div>
                          <div className="text-right">
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : validatorsError ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Failed to load validators. Please try again later.
                    </AlertDescription>
                  </Alert>
                ) : validators.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Validators</AlertTitle>
                    <AlertDescription>
                      No validators are currently available. Please check back later.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-2">
                    {validators.map((validator) => (
                      <div 
                        key={validator.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedValidator === validator.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                        onClick={() => setSelectedValidator(validator.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Shield className="h-5 w-5 mr-2 text-blue-500" />
                            <div>
                              <div className="flex items-center">
                                <p className="font-medium">{validator.name}</p>
                                <div className="ml-2">
                                  {renderStatusBadge(validator.status)}
                                </div>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span>{validator.delegated.toLocaleString()} VRT delegated</span>
                                <span className="mx-2">•</span>
                                <div className="flex items-center">
                                  <Activity className="h-3 w-3 mr-1" />
                                  <span>Uptime: {formatUptime(validator.uptime)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">{validator.apy} APY</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <LockKeyhole className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Unstaking Coming Soon</h3>
              <p className="text-muted-foreground text-center max-w-md">
                The unstaking feature will be available after the public beta release. Stay tuned for updates!
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            disabled={!stakeAmount || isLoading || activeTab !== "stake" || !selectedValidator} 
            onClick={handleStake}
          >
            {isLoading ? "Processing..." : "Stake PING Tokens"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 