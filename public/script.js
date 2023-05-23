
var provider, signer, account, walletConnected, chainId;

let productaddress = '0x8d65f5c544Be93FB3A6ffff75783cF0A9f8d5323';

let productabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"components":[{"internalType":"address","name":"bidder","type":"address"},{"internalType":"uint256","name":"bidValue","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"indexed":false,"internalType":"struct product.bid","name":"","type":"tuple"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"BidPlaced","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"productBaught","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"address","name":"seller","type":"address"},{"internalType":"uint256","name":"tokenid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"timeline","type":"uint256"},{"internalType":"enum Marketplace1.saletype","name":"saletype","type":"uint8"}],"indexed":false,"internalType":"struct product.product","name":"","type":"tuple"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"productplaced","type":"event"},{"inputs":[{"internalType":"uint256","name":"_product_id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"nft_address","type":"address"}],"name":"Claimbid","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_product_id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"nft_address","type":"address"}],"name":"buy_now","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"_product_id","type":"uint256"},{"internalType":"uint256","name":"_tokenid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"address","name":"nft","type":"address"},{"internalType":"uint256","name":"timeline","type":"uint256"}],"name":"place_product","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_product_id","type":"uint256"},{"internalType":"uint256","name":"_bid_value","type":"uint256"}],"name":"placebid","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"product_bid_map","outputs":[{"internalType":"address","name":"bidder","type":"address"},{"internalType":"uint256","name":"bidValue","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"productmap","outputs":[{"internalType":"address","name":"seller","type":"address"},{"internalType":"uint256","name":"tokenid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"timeline","type":"uint256"},{"internalType":"enum Marketplace1.saletype","name":"saletype","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];

let erc1155address = '0x851e5c9B7be2768A30acd7EF1181A36F656214e1';

let erc1155abi =[{"inputs":[{"internalType":"address","name":"_escrow","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payee","type":"address"},{"indexed":false,"internalType":"uint256","name":"weiAmount","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payee","type":"address"},{"indexed":false,"internalType":"uint256","name":"weiAmount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"payee","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"payee","type":"address"}],"name":"depositsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"escrowaddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getdata","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenid","type":"uint256"}],"name":"getsaletype","outputs":[{"internalType":"enum Marketplace1.saletype","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"geturl","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"productid","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"},{"internalType":"enum Marketplace1.saletype","name":"_type","type":"uint8"},{"internalType":"uint256","name":"_timeline","type":"uint256"}],"name":"mintERC1155","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payment_method","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"payee","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

var productcontract;
var erc1155contract;

const btn = document.getElementById('connect-wallet');
const myproduct = document.getElementById('myproduct');



window.addEventListener('load', async () => {
	await isConnected();
	await initContract();
	await addProducts();
	await buying();
	await biding();
	await claim();
	btn.addEventListener('click', async () => {
		if (window.ethereum) {
			provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			signer = provider.getSigner();
			account = (await signer.getAddress()).toLowerCase();
			btn.setAttribute('disabled', 'disabled')
			window.location.reload();
		}
	})

	myproduct.addEventListener('click', async () => {
		if (walletConnected) {

			location.assign(`http://localhost:3000/gettoken/` + account)
		} else {
			alert("please Connect Wallet First")
		}
	})


	window.ethereum.on('accountsChanged', async (accounts) => {
		window.location.reload()
	})
})

async function isConnected() {
		const accounts = await ethereum.request({ method: 'eth_accounts' });
		if (accounts.length) {
			provider = new ethers.providers.Web3Provider(window.ethereum);
			signer = provider.getSigner();
			const chainId = (await provider.getNetwork()).chainId;
			account = accounts[0].toLowerCase();
			btn.setAttribute('disabled', 'disabled')
			walletConnected = true;
		} else {
			walletConnected = false;
		}
	}


const initContract = async () => {
	if (walletConnected) {
		productcontract = new ethers.Contract(productaddress, productabi, signer);
		erc1155contract = new ethers.Contract(erc1155address, erc1155abi, signer);
		btn.innerHTML = account;
	}
}

var image;
const imageEle = document.getElementById('image')

if (imageEle) {

	imageEle.addEventListener('change', (event) => {
		if (event.target.files.length > 0) {
			image = event.target.files[0];
		}
	})
}

const addProducts = async () => {
	const addProductForm = document.getElementById('addproduct');
	if (addProductForm !== null) {
		if (walletConnected) {
			addProductForm.addEventListener('submit', async (e) => {
				e.preventDefault();
				const tokenid = document.getElementById('tokenid').value;
				const amount = document.getElementById('amount').value;
				const price = document.getElementById('price').value;
				const isToken = document.querySelector('input[name="isToken"]:checked').value;
				const timeline = document.getElementById('timeline').value;

				const imageData = new FormData();
				imageData.append('image', image);

				try {
					const imageResponse = await fetch('http://localhost:3000/imageupload', {
						method: 'post',
						body: imageData,
					})
					const imageIPFS = await imageResponse.json()

					const imageIPFSLink = imageIPFS.response;
					console.log("ipfs link is : " + imageIPFSLink)
					try {
						
						const value= ethers.utils.formatUnits(1000 , "wei")
						alert("Listing Pirce Is : "+value + " Wei")
						//const mint = await erc1155contract.mintERC1155(tokenid, tokenid, amount, price, imageIPFSLink, isToken, timeline)
						const mint = await erc1155contract.mintERC1155(tokenid, tokenid, amount, ethers.utils.parseEther(price.toString()), imageIPFSLink, isToken, timeline,{ value: value})
						//valur = 0.00026408
						await mint.wait(1);
						const response = fetch('http://localhost:3000/product', {
							method: 'post',
							body: JSON.stringify({
								tokenid: tokenid,
								amount: amount,
								account: account,
								price: price,
								uri: imageIPFSLink,
								isToken: isToken,
								timeline: timeline
							}),
							headers: {
								'Content-type': 'application/json'
							}
						})
							.then((response) => response.json())
							.then(async () => {

								alert("Data Added")
							})
					} catch (err) {
						alert('product not added  :'+err.message)
						console.log(err)
					}
				} catch (err) {
					alert('error')
					console.log(err)
				}
			})
		} else {
			console.log('Please connect metamask')
		}
	}
};


const biding = async () => {
	const addProductForm = document.getElementById('bid_product');
	if (addProductForm !== null) {
		if (walletConnected) {
			addProductForm.addEventListener('submit', async (e) => {
				e.preventDefault();
				const tokenid = document.getElementById('tokenid').value;
				const bidvalue = document.getElementById('bidvalue').value;


				try {
					const mint = await productcontract.placebid(tokenid, ethers.utils.parseEther(bidvalue.toString()))
					await mint.wait(1);
					const response = fetch('http://localhost:3000/biding', {
						method: 'post',
						body: JSON.stringify({
							tokenid: tokenid,
							bidvalue: bidvalue,
							bidaccount: account
						}),
						headers: {
							'Content-type': 'application/json'
						}
					})
						.then((response) => response.json())
						.then(async () => {

							alert("biding complete")

						})
				} catch (err) {
					alert('Biding is not completed'+err.message)
					console.log(err)
				}
			})
		} else {
			console.log('Please connect metamask')
		}
	}
};

const buying = async () => {
	const addProductForm = document.getElementById('buy_product');
	if (addProductForm !== null) {
		if (walletConnected) {
			addProductForm.addEventListener('submit', async (e) => {
				e.preventDefault();
				const tokenid = document.getElementById('tokenid').value;
				const amount = document.getElementById('amount').value;
				const price=document.getElementById('price').value;
				try {

					// const value= ethers.utils.formatUnits(price *amount , "wei")
					//alert("Price Of Buying Is :"+ethers.utils.parseEther(price *amount).toString())
					const ethvalue=ethers.utils.parseEther((price * amount).toString())
					console.log(ethvalue.toString());
					const buy = await productcontract.buy_now(tokenid, amount, erc1155address,{value: ethvalue});
					await buy.wait(1)
					const response = fetch('http://localhost:3000/buying', {
						method: 'post',
						body: JSON.stringify({
							tokenid: tokenid,
							account: account
						}),
						headers: {
							'Content-type': 'application/json'
						}
					})
						.then((response) => response.json())
						.then(async () => {

							alert("buy complete")

						})
				} catch (err) {
					alert('buying is not completed'+err.message)
					
				}
			})
		} else {
			alert('Please connect metamask')
		}
	}
};

const claim = async () => {
	const addProductForm = document.getElementById('claim_product');
	if (addProductForm !== null) {
		if (walletConnected) {
			addProductForm.addEventListener('submit', async (e) => {
				e.preventDefault();
				const tokenid = document.getElementById('tokenid').value;
				const amount = document.getElementById('amount').value;
				const lastbiding=document.getElementById('lastbiding').value;
				try {
					const ethvalue=ethers.utils.parseEther((lastbiding * amount).toString())
					const buy = await productcontract.Claimbid(tokenid, amount, erc1155address,{value:ethvalue})
					await buy.wait(1);
					const response = fetch('http://localhost:3000/claimbid', {
						method: 'post',
						body: JSON.stringify({
							tokenid: tokenid,
							account: account
						}),
						headers: {
							'Content-type': 'application/json'
						}
					})
						.then((response) => response.json())
						.then(async () => {

							alert("Claim complete")

						})
				} catch (err) {
					alert('Claim is not completed'+err.message)
					console.log(err)
				}
			})
		} else {
			console.log('Please connect metamask')
		}
	}
};


