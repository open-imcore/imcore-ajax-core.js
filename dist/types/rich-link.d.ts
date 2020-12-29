export interface RichLinkCpationText {
    text: string;
    maximumNumberOfLines?: number;
    textScale: number;
    color?: Color;
}
export interface RichLinkCaptionButton {
    text: string;
}
export interface RichLinkCaptionSection {
    leading?: RichLinkCpationText;
    trailing?: RichLinkCpationText;
    button?: RichLinkCaptionButton;
}
export interface RichLinkCaptionBar {
    aboveTop?: RichLinkCaptionSection;
    top?: RichLinkCaptionSection;
    bottom?: RichLinkCaptionSection;
    belowBottom?: RichLinkCaptionSection;
    leadingIcon?: RichLinkImage;
    trailingIcon?: RichLinkImage;
    additionalTrailingIcons?: RichLinkImage[];
    leadingAccessoryType?: number;
    trailingAccessoryType?: number;
    leadingIconSize?: unknown;
    trailingIconSize?: unknown;
}
export interface RichLinkAsset {
    accessibilityText?: string;
    attachmentIndex?: number;
}
export interface RichLinkStreamableAsset {
    streamingURL?: string;
}
export interface RichLinkImage extends RichLinkAsset {
    shouldApplyBackground?: boolean;
    requireFixedSize?: boolean;
    filter?: number;
    scalingMode?: number;
    maskColor?: Color;
    type?: number;
    overlaidTextColor?: Color;
}
export interface RichLinkVideo extends RichLinkAsset {
    hasAudio?: boolean;
    youTubeURL?: string;
    streamingURL?: string;
}
export interface RichLinkAudio extends RichLinkStreamableAsset {
}
export declare enum RichLinkSpecialization {
    podcastEpisode = "podcastEpisode",
    familyInvitation = "familyInvitation",
    movieBundle = "movieBundle",
    software = "software",
    file = "file",
    playlist = "playlist",
    artist = "artist",
    icloudSharing = "icloudSharing",
    map = "map",
    tvEpisode = "tvEpisode",
    news = "news",
    radio = "radio",
    movie = "movie",
    tvShow = "tvShow",
    album = "album",
    tvSeason = "tvSeason",
    podcast = "podcast",
    businessChat = "businessChat",
    appleTV = "appleTV",
    song = "song",
    mapCollection = "mapCollection",
    audioBook = "audioBook",
    musicVideo = "musicVideo",
    summarizedLink = "summarizedLink",
    walletPass = "walletPass",
    appStoreStory = "appStoreStory",
    book = "book",
    gameCenterInvitation = "gameCenterInvitation",
    applePhotosStatus = "applePhotosStatus",
    applePhotosMoment = "applePhotosMoment"
}
export interface Color {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}
export interface RichLink {
    captionBar?: RichLinkCaptionBar;
    mediaTopCaptionBar?: RichLinkCaptionBar;
    mediaBottomCpationBar?: RichLinkCaptionBar;
    image?: RichLinkImage;
    video?: RichLinkVideo;
    audio?: RichLinkAudio;
    url?: string;
    backgroundColor?: Color;
    style?: string;
    itemType?: string;
    quotedText?: string;
    specialization?: RichLinkSpecialization;
    preliminary?: boolean;
}
//# sourceMappingURL=rich-link.d.ts.map