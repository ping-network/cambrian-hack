"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SolanaProgram } from "@/types/programs"
import { PROGRAM_METADATA } from "@/app/constants/programs"

// Use the program metadata from constants
const devnetPrograms = PROGRAM_METADATA;

export default function ProgramsContent() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ping Network Programs</h1>
      <p className="text-muted-foreground">
        View information about the Ping Network's deployed Solana programs and access them on Solana.fm explorer.
      </p>
      
      <Tabs defaultValue="devnet" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="devnet">
            Devnet Programs
          </TabsTrigger>
          <TabsTrigger value="mainnet" disabled>
            Mainnet Programs (Coming Soon)
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="devnet" className="space-y-4 mt-4">
          {devnetPrograms.map(program => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </TabsContent>
        
        <TabsContent value="mainnet" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6 pb-6 text-center">
              <p className="text-muted-foreground">TBA after public beta release</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProgramCard({ program }: { program: SolanaProgram }) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const getStatusColor = (status: SolanaProgram['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-blue-100 text-blue-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Always use devnet for now since there is no mainnet
  const explorerUrl = `https://solana.fm/address/${program.address}?cluster=devnet-alpha`;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{program.name}</CardTitle>
            <CardDescription className="mt-1">
              {program.id}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(program.status)}>
            {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{program.description}</p>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Program Address</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(program.address)}
              className="h-8 w-8 p-0"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <code className="text-xs block mt-1 break-all">{program.address}</code>
        </div>
        
        <div className="text-sm">
          <span className="text-muted-foreground">Version</span>
          <p>{program.version}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => window.open(explorerUrl, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Solana.fm
        </Button>
      </CardFooter>
    </Card>
  )
} 