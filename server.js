var express = require('express');
var app = express();
var fs = require('fs');
var lightwallet = require('eth-lightwallet');
var keyStore = lightwallet.keystore;
var router = express.Router();

const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/HelloWorld', function (req, res) {
   res.send('Hello World');
})

app.get('/getNewSecretSeed',function(req,res){//return 12 words seed

  res.send(lightwallet.keystore.generateRandomSeed());
})

app.post('/test',function (req,res){ //json tester
  console.log(req.body.name);
  res.send(req.body.name);
})

app.post('/createNewVault', function (req, res) {//return new vault data

  var password = req.body.password;
  var seedPhrase = lightwallet.keystore.generateRandomSeed();
  var hdPathString = "m/0'/0'/0'";
  var salt = keyStore.generateSalt(32);

  var vault = new Object();

  vault.password = password;
  vault.seedPhrase = seedPhrase;
  vault.hdPathString = hdPathString;
  vault.salt = salt;
  res.send(vault);
})

app.post('/generateNewAddress',function(req,res){

  var password = req.body.password;

  var number = req.body.number;

  if(number == null) number = 5;

  keyStore.createVault({
    password: req.body.password,
    seedPhrase: req.body.seedPhrase, // Optionally provide a 12-word seed phrase
    hdPathString: req.body.hdPathString,    // Optional custom HD Path String this is BIP 32
    salt: req.body.salt,
  }, function (err, ks) {

    // Some methods will require providing the `pwDerivedKey`,
    // Allowing you to only decrypt private keys on an as-needed basis.
    // You can generate that value with this convenient method:
    console.log(ks);

    ks.keyFromPassword(password, function (err, pwDerivedKey) {
      if (err) throw err;

      // generate five new address/private key pairs
      // the corresponding private keys are also encrypted
      ks.generateNewAddress(pwDerivedKey, number);
      var addr = ks.getAddresses();

      res.send(addr);

      ks.passwordProvider = function (callback) {
        var pw = "password2"
        callback(null, pw);
      };

      // Now set ks as transaction_signer in the hooked web3 provider
      // and you can start using web3 using the keys/addresses in ks!
    });
  });
})



var server = app.listen(3002, function () {
   var host = server.address().address
   //ip server gw
   var port = server.address().port

   console.log("Kotakoin Ether BIP32 Wallet listening at http://%s port: %s", host, port)
})