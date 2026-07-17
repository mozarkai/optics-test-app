const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro configuration (Expo superset of @react-native/metro-config —
 * adds web platform support for `expo export`)
 * https://docs.expo.dev/guides/customizing-metro/
 */
const config = getDefaultConfig(__dirname);

// react-native-linear-gradient has no web implementation — swap it on web.
const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName === 'react-native-linear-gradient') {
    return context.resolveRequest(context, 'react-native-web-linear-gradient', platform);
  }
  return (defaultResolveRequest ?? context.resolveRequest)(context, moduleName, platform);
};

module.exports = config;
