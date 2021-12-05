#!/usr/bin/env node
/**
 * @remix-run/dev v1.0.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
"use strict";

var meow = require("meow");
var commands = require("./cli/commands");

function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { default: e };
}

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== "default") {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(
          n,
          k,
          d.get
            ? d
            : {
                enumerable: true,
                get: function () {
                  return e[k];
                },
              }
        );
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var meow__default = /*#__PURE__*/ _interopDefaultLegacy(meow);
var commands__namespace = /*#__PURE__*/ _interopNamespace(commands);

const helpText = `
 Usage
   $ remix build [remixRoot]
   $ remix dev [remixRoot]
   $ remix setup [remixPlatform]
   $ remix routes [remixRoot]
 
 Options
   --help              Print this help message and exit
   --version, -v       Print the CLI version and exit
 
   --json              Print the routes as JSON (remix routes only)
   --sourcemap        Generate source maps (remix build only)
 
 Values
   [remixPlatform]     "node" is currently the only platform
 
 Examples
   $ remix build my-website
   $ remix dev my-website
   $ remix setup node
   $ remix routes my-website
 `;
const cli = meow__default["default"](helpText, {
  autoHelp: true,
  autoVersion: false,
  description: false,
  flags: {
    version: {
      type: "boolean",
      alias: "v",
    },
    json: {
      type: "boolean",
    },
    sourcemap: {
      type: "boolean",
    },
  },
});

if (cli.flags.version) {
  cli.showVersion();
}

function handleError(error) {
  console.error(error.message);
  process.exit(1);
}

switch (cli.input[0]) {
  case "routes":
    commands__namespace
      .routes(cli.input[1], cli.flags.json ? "json" : "jsx")
      .catch(handleError);
    break;

  case "build":
    if (!process.env.NODE_ENV) process.env.NODE_ENV = "production";
    commands__namespace
      .build(cli.input[1], process.env.NODE_ENV, cli.flags.sourcemap)
      .catch(handleError);
    break;

  case "watch":
    if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
    commands__namespace
      .watch(cli.input[1], process.env.NODE_ENV)
      .catch(handleError);
    break;

  case "setup":
    commands__namespace.setup(cli.input[1]).catch(handleError);
    break;

  case "dev":
    if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
    commands__namespace
      .dev(cli.input[1], process.env.NODE_ENV)
      .catch(handleError);
    break;

  default:
    // `remix ./my-project` is shorthand for `remix dev ./my-project`
    if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
    commands__namespace
      .dev(cli.input[0], process.env.NODE_ENV)
      .catch(handleError);
}
