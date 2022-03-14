## IPFS 
*💾Filecoin/IPFS:* Data of all the a) Gaming NFT , b) user's post NFT are stored NFT Metadata on IPFS.


https://github.com/jaydippatel83/Game_station/blob/master/src/components/modal/Modal.js

```javascript
const file = new Moralis.File("data.json", { base64: btoa(JSON.stringify(data)) });
const dataUri = await file.saveIPFS();
const uri = dataUri._ipfs;
```