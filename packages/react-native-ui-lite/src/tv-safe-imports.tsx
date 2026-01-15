/**
 * TV-safe imports for native modules that aren't available on TV platforms.
 * These provide fallbacks when running on Android TV or Apple TV.
 */
import { ReactNode } from 'react';
import {
  Platform,
  ScrollView as RNScrollView,
  ScrollViewProps,
  View,
  ViewStyle,
} from 'react-native';

const isTV = Platform.isTV;

// ScrollView doesn't work on Android TV - RCTScrollView not registered
// Use a simple View wrapper as fallback (no scrolling on TV for now)
const TVScrollView = ({ children, style, contentContainerStyle, ...props }: ScrollViewProps) => (
  <View style={[style, contentContainerStyle, { flex: 1 }]}>{children}</View>
);
const ScrollView: typeof RNScrollView = isTV ? (TVScrollView as any) : RNScrollView;

// Fallback components for TV
const FallbackPortalHost: any = ({ children }: { children?: ReactNode }) => children ?? null;
const FallbackPortalProvider: any = ({ children }: { children?: ReactNode }) => children;
const FallbackSafeAreaProvider: any = ({
  children,
  style,
}: {
  children?: ReactNode;
  style?: ViewStyle;
}) => <View style={style}>{children}</View>;
const fallbackUseSafeAreaInsets = () => ({ top: 0, bottom: 0, left: 0, right: 0 });

// @gorhom/portal - use fallback on TV (native module not available)
let PortalHost: any = FallbackPortalHost;
let PortalProvider: any = FallbackPortalProvider;
if (!isTV) {
  try {
    const portal = require('@gorhom/portal');
    PortalHost = portal.PortalHost;
    PortalProvider = portal.PortalProvider;
  } catch {
    // Portal not available
  }
}

// react-native-safe-area-context - use fallback on TV (native module not available)
let SafeAreaProvider: any = FallbackSafeAreaProvider;
let useSafeAreaInsets = fallbackUseSafeAreaInsets;
if (!isTV) {
  try {
    const safeArea = require('react-native-safe-area-context');
    SafeAreaProvider = safeArea.SafeAreaProvider;
    useSafeAreaInsets = safeArea.useSafeAreaInsets;
  } catch {
    // Safe area not available
  }
}

export { PortalHost, PortalProvider, SafeAreaProvider, ScrollView, useSafeAreaInsets, isTV };
