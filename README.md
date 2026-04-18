A simple utility with zero external dependencies to create a randomly shuffled BIP 39 word list. The goal is to create shuffled word lists to backup BIP 39 seed phrases. This allows you to backup your seedphrase using symbols as opposed to the actual seed phrase. A symbol is simply a word that has been mapped to another random word in the list. This adds an extra layer of protection in case someone happens to run into your seed phrase backup they will see a list of words symbols instead of your real list of words. Having access to only the map file does not provide any information as to what your seedphrase is. Similary having access to only the symbol backup does not provide your seedphrase. You need to have both to access the real seedphrase.

It is very important to note that losing the symbol map makes the symbol backup useless since it is not possible to recover the seedphrase without it. For this reason you must backup the symbol map, it is safe to back up the map file digitally since it does not reveal any information about the seedphrase (It is just a shuffled BIP 39 word list). There is another option to deterministically create a symbol map using a password. Entropy from the password is used to generate the backup file. It is worth mentioning that this way of creating map files results in considerably less random distributions of words so use it at your own risk. However, having only access to the map file does not reveal in any way your pass phrase. This method of deterministically creating the map file is intended for cases where you would prefer to have the ability to restore the map file from a password as opposed to backing up a file.

The Fisher-Yates shuffle algorithm is used to shuffle the word list. The native crypto module is used to get random integers for the non-deterministic approach. However, the deterministic approach uses entropy from the password to generate pseudo random integers. The non-deterministic approach is more secure, however you must ensure to backup the map file. Where as the deterministic approach just requires to backup the password (or both) which can be done much easily.

Here is a short guide:

**_WARNING: recovering and backing up a passphrase should be done carefully. For instance if you run the recover or backup script avoid using a search feature to lookup each word in your backup as this could leak your passphrase in your text editor or the device in general. This is totally unrelated to this project, but it is worth mentioning. The recomendation is to print out the map file and do the recovery or backup in paper making sure there are no cameras or people around using a pencil to circle out the symbols and then burning the paper._**

```bash
# creates a new random map file
node src/generate.js
# creates a new pseudo random map file with a seed from stdio
node src/generate-deterministic.js
# order by symbol for easy recovery
node src/view.js --recover ./symbol-map-file > recover-map.txt
# order by word for easy backup
node src/view.js --backup ./symbol-map-file > backup-map.txt
```
