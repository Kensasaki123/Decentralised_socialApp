export const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_body",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_sender",
				"type": "string"
			}
		],
		"name": "setPost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_nickname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_birthday",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_ipfsUrl",
				"type": "string"
			}
		],
		"name": "setProfile",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allPosts",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "body",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sender",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllPost",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "body",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sender",
						"type": "string"
					}
				],
				"internalType": "struct Post.PostData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getProfile",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserPosts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "body",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sender",
						"type": "string"
					}
				],
				"internalType": "struct Post.PostData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "posts",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "body",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sender",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "profiles",
		"outputs": [
			{
				"internalType": "string",
				"name": "nickname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "birthday",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "profilePicUrl",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export const contractAddress = "0x59570275f9DDA042F3AC655D15EF87898941a18A";