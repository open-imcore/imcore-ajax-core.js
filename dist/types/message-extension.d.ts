export interface MessagesExtensionLayoutInfo {
    imageSubtitle?: string;
    imageTitle?: string;
    caption?: string;
    subcaption?: string;
    secondarySubcaption?: string;
    tertiarySubcaption?: string;
    tapAction?: number;
}
export interface MessagesExtension {
    layoutInfo?: MessagesExtensionLayoutInfo;
    appIcon?: string;
    liveLayoutInfo?: string;
    layoutClass?: string;
    url?: string;
    payload?: string;
    accessibilityLabel?: string;
    sessionIdentifier?: string;
    appName?: string;
    adamIDI?: string;
    statusText?: string;
    localizedDescription?: string;
    alternateText?: string;
}
//# sourceMappingURL=message-extension.d.ts.map