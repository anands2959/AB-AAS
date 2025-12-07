// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// ✅ PRODUCTION-ONLY OPTIMIZATIONS
if (process.env.NODE_ENV === "production") {
  config.transformer.minifierConfig = {
    keep_classnames: false,
    keep_fnames: false,
    mangle: {
      keep_classnames: false,
      keep_fnames: false,
    },
    compress: {
      drop_console: false, // keep console logs in release if you want crash debugging
      reduce_funcs: true,
      collapse_vars: true,
      dead_code: true,
    },
  };
}

// ✅ SVG SUPPORT (WITHOUT OVERWRITING RESOLVER)
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

module.exports = config;
