
   var soap = require('soap');

   var url = 'http://127.0.0.1:50081/DNSWebService/dnsCommand?wsdl';

   var args = { 
      dnsId:'201906210002030004',
	    randVal:"UerPht2qR1JzIkZ",
		  pwdHash:"NzQwZTlhZGM4Nzc2MzY3M2UyMTkxMzEwNmJlNzU1NzdkOWU3ODRmNQ==",
		  command:'eJx1kcsOgjAQRfd+BWGPbQGfqbgzca1+ANKBTEKnpBB8fL0IKgF1Nm3vvZnTduT2qnOnBluioY0rptx1gBKjkLKNezruvKW7jSbOq+TdECRG65gUaLBZk731dht52XsViVXIxXIuWS8No9WtgEhI1q5Dy8aUjbSnrKhsuvhcrPjM50HAmwok6+SvNKQpJBXWcEhMRxopQyb7AZWFxRpz+HUZcyGwUaw0kmTd4StTY4nnvGW/tyPoH4CsUMOhinXRPtcTvueHjlisxWwd8ubPPnY/HfZ/PA+ZEH6c',
		  commandHash:'Nzk1YTdlZWE4ZDJmNjIyZjQ0MDk4YjdjNjE1MjFhZDQ4MDRmMGMyYg==',
		  commandType:19,
		  commandSequence:'19ec953c-35de-11ea-aac1-fc017c52c975',
		  encryptAlgorithm:0,
		  hashAlgorithm:2,
		  compressionFormat:1,
		  commandVersion:'1.1'
  };
   soap.createClient(url, function(err, client) {
	   
     client.dns_command(args, function(err, result) {
       if (err) {
         console.log(err);
       }else {
         console.log(result);
      }
    });

   });
