# Cambrian AVS Initialization Logs

```
user@LAPTOP-HJKKDMLP:~/ping-project/ping-cambrian-hack$ camb init -t avs avs
✔ Enter AVS IP address to bind to 127.0.0.1
✔ Enter AVS HTTP port to bind to 3000
✔ Enter AVS WS port to bind to 3001
✔ Enter admin private key or press enter to generate a new one
[PRIVATE_KEY_REDACTED]
✔ Enter Solana API URL or press enter to use default https://api.devnet.solana.com
✔ Enter Solana API WS URL or press enter to use default wss://api.devnet.solana.com
✔ Enter Cambrian Consensus Program name or press enter to generate a new one ping.poa
✔ Enter proposal storage key or press enter to generate a new one ping.storage
✔ Enter storage space 75
✔ Enter consensus threshold 1
✔ Enter stake threshold 1000
Initializing PoA
Account: 36q1ncLzbBGD1YUKGEHY4GUy74p4rYZuq9KGxcYQqW4Y balance: 959867240n balance thresho
Account: 36q1ncLzbBGD1YUKGEHY4GUy74p4rYZuq9KGxcYQqW4Y balance: 959867240n balance threshold: 125000000
 Step 1: Creating token mint...
Mint created at 7bTipDbEzURXndddwbYZA2ETwKvuGeWELKVLBQUoABKd signature 3XojiQjseoUZh8Y7ec
Mint created at 7bTipDbEzURXndddwbYZA2ETwKvuGeWELKVLBQUoABKd signature 3XojiQjseoUZh8Y7eccoRjAJ2cBMQX3varxVnHvjCUVEmANkp2PovrdmKXUoCMfQQQb4ovfJYnoJGbDSpfdSzwC2
 Step 2: Creating associated token account...
Associated token account created at Gx9znFx2x4goeeDiz6UidDWXYSdopBvwxhCBbszPkG6d signatur
Associated token account created at Gx9znFx2x4goeeDiz6UidDWXYSdopBvwxhCBbszPkG6d signature 3NfD2VB9jYZHGWEMX2jedDVvTrYqkHcZy7dtGKad2dz3YqUveoaXzutSY7jBJQ81NT8R5phSsBq9Zg5FnJq9vTf
Associated token account created at Gx9znFx2x4goeeDiz6UidDWXYSdopBvwxhCBbszPkG6d signature 3NfD2VB9jYZHGWEMX2jedDVvTrYqkHcZy7dtGKad2dz3YqUveoaXzutSY7jBJQ81NT8R5phSsBq9Zg5FnJq9vTfy
 Step 3: Minting tokens...
Minted 1 000 000 tokens to Gx9znFx2x4goeeDiz6UidDWXYSdopBvwxhCBbszPkG6d signature 61ZZAP8
Minted 1 000 000 tokens to Gx9znFx2x4goeeDiz6UidDWXYSdopBvwxhCBbszPkG6d signature 61ZZAP8CNFVZpUBxjZphWxjVz3ppQiHWt1HALXrHZ4cbUrVerbZwh8kCNxxfHQTs87jrRq9kk5noik8VuvJ2Q1eP
 Step 4: Initializing the NCN...
Initialized ncn 2pS3w59nrwCj71wArhjsGP5rUff61rUbeGQiimNJfQGP signature MRkRsiPuBuNxvQnS3d
Initialized ncn 2pS3w59nrwCj71wArhjsGP5rUff61rUbeGQiimNJfQGP signature MRkRsiPuBuNxvQnS3dEXX3EVBgZ69Uzg9iWjQ3NWvHzHm37qkBpoajS2xzUE12CapcbVCXk5iVVDXHDDf7mZ1EU
 Step 5: Initializing the PoA
PoA state ping.poa Uint8Array(8) [
  112, 105, 110, 103,
   46, 112, 111,  97
]
Account: 33rGigYGTgvcSDawhXU7V5NhYz9nvbsaw3cLdmkMcEb6 balance: 1000000n balance threshold
Account: 33rGigYGTgvcSDawhXU7V5NhYz9nvbsaw3cLdmkMcEb6 balance: 1000000n balance threshold: 1000000
Initialized poa signature 3K8yDuzLVasqEpZhA17vzbBbFb6nRRHyVp4QCuXEUu7x5teyJJh2bvxoyuUVSbH
Initialized poa signature 3K8yDuzLVasqEpZhA17vzbBbFb6nRRHyVp4QCuXEUu7x5teyJJh2bvxoyuUVSbHzi1CjocKo3cjg7kMb4tcWv5Yw ncn 2pS3w59nrwCj71wArhjsGP5rUff61rUbeGQiimNJfQGP poa name ping.
Initialized poa signature 3K8yDuzLVasqEpZhA17vzbBbFb6nRRHyVp4QCuXEUu7x5teyJJh2bvxoyuUVSbHzi1CjocKo3cjg7kMb4tcWv5Yw ncn 2pS3w59nrwCj71wArhjsGP5rUff61rUbeGQiimNJfQGP poa name ping.poa poaStateKey Uint8Array(8) [
  112, 105, 110, 103,
   46, 112, 111,  97
] poaStatePDA 8UQs2jEXD8K2CMXSXfqC2GMzGCi6sfhM5mx5J67CrfiW
 Step 6: Initializing the Vault...
Initialized vault config
Initialized the Vault, signature 3Wehq4gZHi8VGYLeC658K46wD8ciRG74e8dgSeGjFyrrvgoR9iUdvVju
Initialized the Vault, signature 3Wehq4gZHi8VGYLeC658K46wD8ciRG74e8dgSeGjFyrrvgoR9iUdvVjuUzCFcyQVpFkqtGmX7gEG64EA1KcbJ2SF vaultPubkey 5RZqs2PJRqdyqFc6vpykNCJP3M1yJYtHnmFChRpdM2iN
Initialized the Vault, signature 3Wehq4gZHi8VGYLeC658K46wD8ciRG74e8dgSeGjFyrrvgoR9iUdvVjuUzCFcyQVpFkqtGmX7gEG64EA1KcbJ2SF vaultPubkey 5RZqs2PJRqdyqFc6vpykNCJP3M1yJYtHnmFChRpdM2iN vrtToken Exrq7RYHr3sH7EWXmuuqtriZZ32X8RDeSskanb9i6dda
 Step 7: Initializing the NCN Vault Ticket
Initialized the NCN Vault Ticket, signature 3KQgwv6WmkYGxJDyNbU5hFMtFpvNrE3yPYYkbma7hV3dN
Initialized the NCN Vault Ticket, signature 3KQgwv6WmkYGxJDyNbU5hFMtFpvNrE3yPYYkbma7hV3dNYZXvVJ7JoHQGmasNp8QHoMbyqNN7oRtCXhSc1pvzz9M ncn vault ticket 7eudbK6TdsY9PrQMC8RvuXaKfMut
Initialized the NCN Vault Ticket, signature 3KQgwv6WmkYGxJDyNbU5hFMtFpvNrE3yPYYkbma7hV3dNYZXvVJ7JoHQGmasNp8QHoMbyqNN7oRtCXhSc1pvzz9M ncn vault ticket 7eudbK6TdsY9PrQMC8RvuXaKfMutXHioJwuKwxXLuanD
 Step 8: Initializing the Vault NCN Ticket
Initialized the Vault NCN Ticket, signature 3mXiYwZ2BBh6ZiAcdUNzTyLKxkLnV3tU4wzkHpYjLanZr
Initialized the Vault NCN Ticket, signature 3mXiYwZ2BBh6ZiAcdUNzTyLKxkLnV3tU4wzkHpYjLanZr9BsicTyP28hAmh5xjpyFTnazj7uhwR9UkbGLqVSEUMP vault ncn ticket Di8dhyp7mTTh6JyHUidJeYaX6GT5
Initialized the Vault NCN Ticket, signature 3mXiYwZ2BBh6ZiAcdUNzTyLKxkLnV3tU4wzkHpYjLanZr9BsicTyP28hAmh5xjpyFTnazj7uhwR9UkbGLqVSEUMP vault ncn ticket Di8dhyp7mTTh6JyHUidJeYaX6GT5QFVcXhyDJaXCFRgk
 Step 9: Staking tokens to the Vault
Vrt wallet created, signature 3LmFBDh7SdcmDYXvyNi9Kn7kzxR9uFPAkwbQHqzN3ydSBPofoLNpBh9s8hn
Vrt wallet created, signature 3LmFBDh7SdcmDYXvyNi9Kn7kzxR9uFPAkwbQHqzN3ydSBPofoLNpBh9s8hnRLChhbDUYc5KCjkinrmxpKoS9bHbb
Mint token to vault, signature 2RabBMY163nMj12SsxtCJUocs67g2Y1uiSZ43ZPhQyKhFBbXp7yN2jn3tY
Mint token to vault, signature 2RabBMY163nMj12SsxtCJUocs67g2Y1uiSZ43ZPhQyKhFBbXp7yN2jn3tYCuc7KokV6k5huJQQXUkjEXeVJtkwsR vrtToken Exrq7RYHr3sH7EWXmuuqtriZZ32X8RDeSskanb9i6dda amou
Mint token to vault, signature 2RabBMY163nMj12SsxtCJUocs67g2Y1uiSZ43ZPhQyKhFBbXp7yN2jn3tYCuc7KokV6k5huJQQXUkjEXeVJtkwsR vrtToken Exrq7RYHr3sH7EWXmuuqtriZZ32X8RDeSskanb9i6dda amount 1000n
PoA name: ping.poa ncn: 2pS3w59nrwCj71wArhjsGP5rUff61rUbeGQiimNJfQGP vault: 5RZqs2PJRqdyq
PoA name: ping.poa ncn: 2pS3w59nrwCj71wArhjsGP5rUff61rUbeGQiimNJfQGP vault: 5RZqs2PJRqdyqFc6vpykNCJP3M1yJYtHnmFChRpdM2iN poaStatePDA: 8UQs2jEXD8K2CMXSXfqC2GMzGCi6sfhM5mx5J67CrfiW
AVS 36q1ncLzbBGD1YUKGEHY4GUy74p4rYZuq9KGxcYQqW4Y has been initialized

# Operator Initialization Logs

```
user@LAPTOP-HJKKDMLP:~/ping-project/ping-cambrian-hack$ camb init -t operator validator
✔ Enter AVS HTTP URL http://host.docker.internal:3000
✔ Enter AVS WS URL ws://host.docker.internal:3001

✔ Enter oracle update method container-stream
✔ Enter image for oracle update container oracle-updater
✔ Enter optional arguments for oracle update container 
✔ Enter optional env for oracle update container 
✔ Enter Solana API URL or press enter to use default https://api.devnet.solana.com
✔ Enter Solana API WS URL or press enter to use default wss://api.devnet.solana.com
✔ Enter admin private key [PRIVATE_KEY_REDACTED]
✔ Enter voter (operator) private key or press enter to generate a new one
[PRIVATE_KEY_REDACTED]
 Step 10: Initializing operator
Initialized operator, signature 4mWxMztnTLZK23DQiE3WjquPoLScBoBmT4Ayh8rBzakcXp9DCKo3SRawS7Ws5UActpsPXfu3oXuGS1RyGURtrA46 operator DFTHqW9Mf2ATCb
Initialized operator, signature 4mWxMztnTLZK23DQiE3WjquPoLScBoBmT4Ayh8rBzakcXp9DCKo3SRawS7Ws5UActpsPXfu3oXuGS1RyGURtrA46 operator DFTHqW9Mf2ATCbSVKNtFdr1QhZRX4KmEPHfZgzsDdPkm
 Step 11: Setting operator voter...
voter 36q1ncLzbBGD1YUKGEHY4GUy74p4rYZuq9KGxcYQqW4Y
Voter set, signature  3PfhjvKkEuR1cYrZEcT9nt6wD29YfPWewKUBq2sWD6phaAogcxXt1fFDTckBgtsnGECwVXbGNc1YzQNGw6hEAzy
 Step 12: Initializing the NCN Operator state...
Initialized the NCN Operator state, signature 5pMxNqLvQAzWf3mLCQFRFRBnxmXTGVNQYCCQV5ZN8aUfrXM5FeFkXVkUHsLL1YnigAWfSyhVZ6uHywREKH8xjV8b ncnOperat
Initialized the NCN Operator state, signature 5pMxNqLvQAzWf3mLCQFRFRBnxmXTGVNQYCCQV5ZN8aUfrXM5FeFkXVkUHsLL1YnigAWfSyhVZ6uHywREKH8xjV8b ncnOperatorState FEkkXoPLWWjH6qhYw8kWKWBCLbFggMXD8sr2RHioHvQm
 Step 13: Initializing the Operator Vault Ticket
Initialized the Operator Vault Ticket, signature 2v18BSxT2Dx4SDmwSwY2BfVd2HmXi9q1TiNqGg1JGkwFWPrUxR24SmvUUHi5rsU3Lo4vHjxz7VV6bVJXeX7Bvugu operat
Initialized the Operator Vault Ticket, signature 2v18BSxT2Dx4SDmwSwY2BfVd2HmXi9q1TiNqGg1JGkwFWPrUxR24SmvUUHi5rsU3Lo4vHjxz7VV6bVJXeX7Bvugu operatorVaultTicket C7Gm8vETLnD3EUmop24sLariNsxAdFXCLMhpMuUT79RH
 Step 14: Initializing the Vault Operator delegation
Initialized the Vault Operator delegation, signature 4n5HxymnaX9RwJ5GPg9pymRbJa7yqv8JaJFQR1ihkLm5U3faTp3AsgdMKygYhL9QwVigPdVUvj8gJGX1XBQX5dog va
Initialized the Vault Operator delegation, signature 4n5HxymnaX9RwJ5GPg9pymRbJa7yqv8JaJFQR1ihkLm5U3faTp3AsgdMKygYhL9QwVigPdVUvj8gJGX1XBQX5dog vaultOperatorDelegation 5avZvL4tjTJVjz4KcHLJayVEBKJ2TEjEMzyqvteFRxkz
 Step 15: Delegate tokens to operator
Delegation token to operator, signature 4dJKExgpHznCK7uTt6gTnSM4mVojTgzz2PLbxuDucWimbq6CNb6brZSQZ5Hkxt3x6WUTcczAaBSy5igZaAntvYnf operator DFTHqW
Delegation token to operator, signature 4dJKExgpHznCK7uTt6gTnSM4mVojTgzz2PLbxuDucWimbq6CNb6brZSQZ5Hkxt3x6WUTcczAaBSy5igZaAntvYnf operator DFTHqW9Mf2ATCbSVKNtFdr1QhZRX4KmEPHfZgzsDdPkm
Operator with voter 36q1ncLzbBGD1YUKGEHY4GUy74p4rYZuq9KGxcYQqW4Y has been initialized

## Key Configuration Values

- **AVS IP address**: 127.0.0.1
- **AVS HTTP port**: 3000
- **AVS WS port**: 3001
- **Solana API URL**: https://api.devnet.solana.com
- **Solana API WS URL**: wss://api.devnet.solana.com
- **Cambrian Consensus Program name**: ping.poa
- **Proposal storage key**: ping.storage
- **Storage space**: 75
- **Consensus threshold**: 1
- **Stake threshold**: 1000

## Important Addresses

- **AVS Address**: 36q1ncLzbBGD1YUKGEHY4GUy74p4rYZuq9KGxcYQqW4Y
- **Token Mint**: 7bTipDbEzURXndddwbYZA2ETwKvuGeWELKVLBQUoABKd
- **Associated Token Account**: Gx9znFx2x4goeeDiz6UidDWXYSdopBvwxhCBbszPkG6d
- **NCN Address**: 2pS3w59nrwCj71wArhjsGP5rUff61rUbeGQiimNJfQGP
- **PoA State PDA**: 8UQs2jEXD8K2CMXSXfqC2GMzGCi6sfhM5mx5J67CrfiW
- **Vault Pubkey**: 5RZqs2PJRqdyqFc6vpykNCJP3M1yJYtHnmFChRpdM2iN
- **VRT Token**: Exrq7RYHr3sH7EWXmuuqtriZZ32X8RDeSskanb9i6dda
- **NCN Vault Ticket**: 7eudbK6TdsY9PrQMC8RvuXaKfMutXHioJwuKwxXLuanD
- **Vault NCN Ticket**: Di8dhyp7mTTh6JyHUidJeYaX6GT5QFVcXhyDJaXCFRgk 

## Operator Configuration Values

- **AVS HTTP URL**: http://host.docker.internal:3000
- **AVS WS URL**: ws://host.docker.internal:3001
- **Oracle Update Method**: container-stream
- **Oracle Update Container Image**: oracle-updater
- **Solana API URL**: https://api.devnet.solana.com
- **Solana API WS URL**: wss://api.devnet.solana.com

## Important Operator Addresses

- **Operator Address**: DFTHqW9Mf2ATCbSVKNtFdr1QhZRX4KmEPHfZgzsDdPkm
- **Voter Address**: 36q1ncLzbBGD1YUKGEHY4GUy74p4rYZuq9KGxcYQqW4Y
- **NCN Operator State**: FEkkXoPLWWjH6qhYw8kWKWBCLbFggMXD8sr2RHioHvQm
- **Operator Vault Ticket**: C7Gm8vETLnD3EUmop24sLariNsxAdFXCLMhpMuUT79RH
- **Vault Operator Delegation**: 5avZvL4tjTJVjz4KcHLJayVEBKJ2TEjEMzyqvteFRxkz 