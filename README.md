
# ether-bip32-api
This is an API service that you can use to generate new vault and address

## Installation

You dont need to install anything just run the file
```
$ node server.js
```
## How to use
### Create New Vault
#### Input
Call the function using POST, this function needs a password in JSON format, something like
```json
{"password":"yourPasswordHere"}
```
#### Output
This function will give you password, seedPhrase, hdPathString, salt. 

```json
{
"password": "yourPasswordHere",
"seedPhrase": "direct file olive main already around smart bicycle frozen quote custom hole",
"hdPathString": "m/0'/0'/0'",
"salt": "ytJAoR/difgt+8CCmlASewq9tmc5UClh22P8suyDIH4="
}

```

**DO NOT LOSE THESE DATA  OR WE'RE FUCKED**


### Create New Address(es)

This function is used for generating new child addresses, the number of address generated depends on your input, default number is 5

#### Input
Also call the function using POST, this function needs the ouput of createNewVault plus number of address(optional) in JSON format, something like

```json
{
"password": "password",
"seedPhrase": "direct file olive main already around smart bicycle frozen quote custom hole",
"hdPathString": "m/0'/0'/0'",
"salt": "ytJAoR/difgt+8CCmlASewq9tmc5UClh22P8suyDIH4=",
"number":"3"
}

```

#### Output
This function will give you address(es) derived from the keystore

```json
[
  "0x7bad9cbbaa446d3bc452ea9a91088d1de250dc69",
  "0xdfc685971b1a02cda015ddce75235dec43768c92",
  "0x8966ff6b38f9c9e00764909199b9384b648a5d6c"
],
```