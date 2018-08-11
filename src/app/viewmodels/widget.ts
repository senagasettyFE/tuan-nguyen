export interface Widget {
    body: any;
    footer: Footer;
}

export interface Footer {
    source: string;
    lastUpdatedDate: string;
}

export interface HeaderIcons {
    filter?: boolean;
    download?: boolean;
    edit?: boolean;
    customize?: boolean;
}
