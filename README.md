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
This function needs a password in JSON format, something like
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


### Create New Address(es)




