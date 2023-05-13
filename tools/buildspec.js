/// AUTOGENERATED COPYRIGHT HEADER START
// Copyright (C) 2023 Michael Fabian 'Xaymar' Dirks <info@xaymar.com>
// AUTOGENERATED COPYRIGHT HEADER END
const process = require("node:process");
const fs = require("node:fs");
const path = require("node:path/posix");

const specFile = process.argv[2];
const name = process.argv[3];
const variant = process.argv[4];

try {
	let osarch = variant.split('-');
	let fileName = "";
	switch (name) {
		case "prebuilt":
			fileName = "deps";
			break;
		case "qt6":
			fileName = "deps-qt6";
			break;
		case "cef":
			throw new Error("Not yet implemented");
		case "vlc":
			throw new Error("Not yet implemented");
	}

	let json = JSON.parse(fs.readFileSync(specFile));
	let data = json.dependencies[name];
	if (data == undefined) {
		throw new TypeError("Expected object, but got nothing.");
	}

	let url = `${data.baseUrl}/${data.version}/${osarch[0]}-${fileName}-${data.version}-${osarch[1]}.${osarch[0] == "windows" ? "zip" : "tar.xz"}`;
	console.log(data.version);
	console.log(data.hashes[variant]);
	console.log(encodeURI(url));

	process.exit(0);
} catch (ex) {
	console.log(ex);
	process.exit(1);
}
