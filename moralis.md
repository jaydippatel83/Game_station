## Moralis 
Noralis : Login with metamask using Moralis authentication , stored all the users post data in moralis database
https://github.com/jaydippatel83/Game_station/blob/master/src/components/modal/Modal.js

```javascript
    const { user, Moralis, web3EnableError, } = useMoralis();
    const { saveFile, moralisFile } = useMoralisFile();
    const { isSaving, save, error } = useNewMoralisObject("UserPosts");
```