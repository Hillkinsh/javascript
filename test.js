#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const latest_version_1 = require("latest-version");
const semver = require("semver");
const websocket_1 = require("../websocket");
const servicesList = require("../serviceList");
const utils_1 = require("../utils");
const axios_1 = require("axios");
const fs_extra_1 = require("fs-extra");
const path = require("path");
const program = require("commander");

const services = {
    git: (readOnly) => new servicesList.GitClient(readOnly),
    hardhat: (readOnly) => new servicesList.HardhatClient(readOnly),
    slither: (readOnly) => new servicesList.SlitherClient(readOnly),
    folder: (readOnly) => new servicesList.Sharedfolder(readOnly)
};
// Similar object is also defined in websocket.ts
const ports = {
    git: 65521,
    hardhat: 65522,
    slither: 65523,
    folder: 65520
};
const killCallBack = [];
function startService(service, callback) {
    const socket = new websocket_1.default(ports[service], { remixIdeUrl: program.remixIde }, () => services[service](program.readOnly || false));
    socket.start(callback);
    killCallBack.push(socket.close.bind(socket));
}
function errorHandler(error, service) {
    const port = ports[service];
