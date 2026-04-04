export type History = {
    hid: string;
    uid: string;
    imageurl: string;
    vendorurl: string;
    createdat: Date
};

export type Bookmark = {
    bid: string;
    uid: string;
    hid: string;
    savedat: Date
};

export type User = {
    uid: string;
    fname: string;
    lname: string;
    email: string;
}
