## NPWriter Developer kit

### Plugin documentation
For a more detailed documentation on how to use the DevKit and develop
plugins for the Infomaker Digital Writer see the
[Writer developer documentation](https://docs.writer.infomaker.io/).

### Get started overview

Clone

```
git clone git@github.com:Infomaker/NPWriterDevKit.git
cd NPWriterDevKit
```

Install dependencies

```
npm install
```


Start a webpack development server running at localhost:3000
```
npm start
```

_Specify port on dev server_ `PORT=1337 npm start`





Config for setting up Plugin on Writer:

"id": ocl.lvlup.reaction,
"name": reaction,
"url”: “”,
“style”: “”,
“enabled”: true,
“mandatory”: false,
"data": {
	"reactionsenabled": false,
    "reactionstring": {
		"like": "1",
		"dislike": "1",
		"heart": "1",
		"smile": "1",
		"frown": "1"
	}
}
