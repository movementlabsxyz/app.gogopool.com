default:
  just --list

start:
  yarn dev

install:
  yarn

build:
  yarn build

get-contracts gcpath="../gogopool-contracts":
  #!/bin/zsh
  gcpath={{gcpath}}/artifacts
  CURRENT=$PWD
  CONTRACTS=("Oracle" "Storage" "MinipoolManager" "TokenGGP" "TokenggAVAX" "Staking" "OneInchMock" "RewardsPool" "ClaimNodeOp")

  cd {{gcpath}}
  if [[ ! -d "node_modules" ]]; then
    yarn
  fi
  npx hardhat compile
  cd $CURRENT

  rm -rf src/contracts
  mkdir -p src/contracts

  for contract in "${CONTRACTS[@]}"; do
    CONTRACT_PATH=$(find "$gcpath" -name "$contract.json")
    echo $CONTRACT_PATH
    cp $CONTRACT_PATH src/contracts
  done
